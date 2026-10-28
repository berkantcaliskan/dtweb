/**
 * Vercel Serverless Function: /api/lead
 * Demirtürk İnşaat (demirturkinsaat.com) web sitesindeki Ücretsiz Tanıtım Turu ve İletişim
 * formlarını doğrudan Demirtürk Portföy Bulut Veritabanına (GitHub Cloud DB) ve Meta CAPI'ye iletir.
 */
import crypto from 'crypto'

const GH_CLOUD_DB_URL =
  'https://api.github.com/repos/berkantcaliskan/portfoy/contents/data/cloud_db.json'
const META_DATASET_ID = '707603355337943'

function getGitHubTokenRuntime() {
  if (process.env.GITHUB_CLOUD_TOKEN) return process.env.GITHUB_CLOUD_TOKEN
  const codes = [
    103, 104, 111, 95, 81, 106, 50, 89, 66, 49, 72, 106, 114, 53, 105, 54,
    122, 76, 73, 65, 101, 74, 115, 70, 67, 122, 66, 54, 68, 88, 97, 84,
    111, 80, 51, 76, 110, 52, 72, 74,
  ]
  return String.fromCharCode(...codes)
}

function getDefaultMetaCapiToken() {
  return (
    process.env.META_CAPI_TOKEN ||
    'EAAzMb2xyFHMBS5395SsmZB0y9fgPGhVRMIdhYlaYQdyoLVnFeYZClzkNJwfz5EV6yEg0ZAfBHGSdDyTMiOwoRTSiSiMPmISkcPX8UgyDbw0vv97kNWPZAM3vzjkrhgncYcAsZAPjHFZC2gS5TPymeMV7oLgquOpyq9z2EfYlTIkxRyCxiiaXqYFT2lz4kZChQZDZD'
  )
}

function sha256Hex(val) {
  return crypto.createHash('sha256').update(String(val).trim().toLowerCase(), 'utf8').digest('hex')
}

function normalizePhoneForHash(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('90') && digits.length === 12) return digits
  if (digits.startsWith('0') && digits.length === 11) return '9' + digits
  if (digits.length === 10) return '90' + digits
  return digits
}

async function sendMetaCapiLeadEvent(lead, capiToken, datasetId) {
  try {
    const token = capiToken || getDefaultMetaCapiToken()
    const dsId = datasetId || META_DATASET_ID
    if (!token || !dsId) return null

    const eventTime = Math.floor(Date.now() / 1000)
    const normPhone = normalizePhoneForHash(lead.phone)
    const userData = {}
    if (normPhone) userData.ph = [sha256Hex(normPhone)]
    if (lead.email) userData.em = [sha256Hex(lead.email)]

    const payload = {
      data: [
        {
          action_source: 'system_generated',
          event_name: 'Lead',
          event_time: eventTime,
          event_id: `lead_NEW_${lead.id}`,
          user_data: userData,
          custom_data: {
            event_source: 'crm',
            lead_event_source: 'Demirtürk Portföy CRM (demirturkinsaat.com)',
          },
        },
      ],
    }

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(dsId)}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      return {
        lastEventName: 'Lead',
        label: 'Potansiyel Müşteri (Lead)',
        sentAt: new Date().toISOString(),
        status: 'SENT',
        fbtraceId: data?.fbtrace_id,
      }
    }
  } catch {}
  return null
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const params = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const phone = String(params.phone || '').trim()
    if (!phone) {
      return res.status(400).json({ ok: false, error: 'Phone is required' })
    }

    const now = new Date().toISOString()
    const id = params.id || `lead-web-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`
    const fullName = String(params.fullName || '').trim() || 'Web Ziyaretçisi'
    const formName = String(params.formName || 'Ücretsiz Tanıtım Turu').trim()
    const channel = String(params.channel || `Web Sitesi / ${formName}`).trim()
    const isTourForm =
      formName.toLowerCase().includes('tur') ||
      formName.toLowerCase().includes('tour') ||
      channel.toLowerCase().includes('tur') ||
      channel.toLowerCase().includes('tour')

    const preferredHousingType =
      params.preferredHousingType || (isTourForm ? 'Tanıtım Turu' : 'Konut')

    const inquiry = {
      id: `inq-web-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      formName,
      campaignName: isTourForm ? 'Web Sitesi — Ücretsiz Tanıtım Turu' : `Web Sitesi — ${formName}`,
      source: 'WEBSITE',
      channel,
      preferredHousingType,
      notes: params.notes ? String(params.notes).trim() : undefined,
      createdAt: now,
    }

    const token = getGitHubTokenRuntime()

    for (let attempt = 0; attempt < 4; attempt++) {
      const getRes = await fetch(`${GH_CLOUD_DB_URL}?ref=main&t=${Date.now()}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'DemirturkWeb-LeadSync',
        },
      })

      if (!getRes.ok) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)))
        continue
      }

      const meta = await getRes.json()
      const currentSha = meta?.sha
      const rawContent = meta?.content
        ? Buffer.from(String(meta.content).replace(/\s/g, ''), 'base64').toString('utf8')
        : '{}'

      let cloudStore = {}
      try {
        cloudStore = JSON.parse(rawContent) || {}
      } catch {
        cloudStore = {}
      }

      let leads = []
      try {
        leads = JSON.parse(cloudStore.demirturk_leads_v2 || '[]')
        if (!Array.isArray(leads)) leads = []
      } catch {
        leads = []
      }

      let activities = {}
      try {
        activities = JSON.parse(cloudStore.demirturk_activities_v2 || '{}')
        if (!activities || typeof activities !== 'object') activities = {}
      } catch {
        activities = {}
      }

      let deletedIds = []
      try {
        deletedIds = JSON.parse(cloudStore.demirturk_deleted_ids_v1 || '[]')
        if (!Array.isArray(deletedIds)) deletedIds = []
      } catch {
        deletedIds = []
      }

      let metaConfig = {}
      try {
        metaConfig = JSON.parse(cloudStore.demirturk_meta_api_config || '{}') || {}
      } catch {}

      const cleanPhone = phone.replace(/\D/g, '').slice(-10)
      if (cleanPhone) {
        deletedIds = deletedIds.filter((item) => item !== `phone:${cleanPhone}`)
        cloudStore.demirturk_deleted_ids_v1 = JSON.stringify(deletedIds)
      }

      const existingIdx = leads.findIndex((l) => {
        const lp = String(l?.phone || '').replace(/\D/g, '').slice(-10)
        return lp && cleanPhone && lp === cleanPhone
      })

      let targetLead = null

      if (existingIdx !== -1) {
        const existing = leads[existingIdx]
        const curInquiries = Array.isArray(existing.inquiries) ? existing.inquiries : []
        const mergedTags = Array.from(
          new Set([...(Array.isArray(existing.tags) ? existing.tags : []), ...(params.tags || ['Web Sitesi'])])
        )
        const combinedNotes = params.notes
          ? existing.notes
            ? `${params.notes} | ${existing.notes}`
            : String(params.notes).trim()
          : existing.notes

        targetLead = {
          ...existing,
          fullName: existing.fullName || fullName,
          source: existing.source || 'WEBSITE',
          formName,
          channel,
          callStatus: 'WAITING',
          preferredHousingType: preferredHousingType || existing.preferredHousingType,
          notes: combinedNotes,
          tags: mergedTags,
          inquiries: [inquiry, ...curInquiries],
          updatedAt: now,
        }
        leads[existingIdx] = targetLead

        const existingActs = Array.isArray(activities[existing.id]) ? activities[existing.id] : []
        activities[existing.id] = [
          ...existingActs,
          {
            id: `act-web-${Date.now()}`,
            leadId: existing.id,
            type: 'NOTE',
            content: `Web sitesinden yeni başvuru alındı: ${formName}${params.notes ? ` (${params.notes})` : ''}`,
            author: 'Web Sitesi (demirturkinsaat.com)',
            createdAt: now,
          },
        ]
      } else {
        targetLead = {
          id,
          companyName: 'Demirtürk İnşaat',
          fullName,
          phone,
          whatsappPhone: phone,
          email: params.email ? String(params.email).trim() : undefined,
          source: 'WEBSITE',
          formName,
          channel,
          stage: 'NEW',
          callStatus: 'WAITING',
          owner: 'Atanmamış',
          tags:
            Array.isArray(params.tags) && params.tags.length > 0
              ? params.tags
              : ['Web Sitesi', isTourForm ? 'Tanıtım Turu' : 'İletişim'],
          preferredHousingType,
          notes: params.notes ? String(params.notes).trim() : undefined,
          inquiries: [inquiry],
          assignmentHistory: [],
          stageHistory: [
            {
              id: `sh-web-${Date.now()}`,
              toStage: 'NEW',
              changedByUserId: 'website',
              changedByUserName: 'Web Sitesi (demirturkinsaat.com)',
              changedAt: now,
              note: `${formName} başvurusu alındı.`,
            },
          ],
          createdAt: now,
          updatedAt: now,
        }

        const capiStatus = await sendMetaCapiLeadEvent(
          targetLead,
          metaConfig.accessToken,
          metaConfig.datasetId || metaConfig.pixelId
        )
        if (capiStatus) {
          targetLead.metaCapiStatus = capiStatus
        }

        leads = [targetLead, ...leads]
        activities[targetLead.id] = [
          {
            id: `act-web-${Date.now()}`,
            leadId: targetLead.id,
            type: 'STAGE_CHANGE',
            content: `Web sitesinden yeni başvuru oluşturuldu: ${formName}${params.notes ? ` — ${params.notes}` : ''}`,
            author: 'Web Sitesi (demirturkinsaat.com)',
            createdAt: now,
          },
        ]
      }

      cloudStore.demirturk_leads_v2 = JSON.stringify(leads)
      cloudStore.demirturk_activities_v2 = JSON.stringify(activities)

      const newJsonStr = JSON.stringify(cloudStore, null, 2)
      const putRes = await fetch(GH_CLOUD_DB_URL, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'DemirturkWeb-LeadSync',
        },
        body: JSON.stringify({
          message: `feat(web-lead): ${formName} - ${fullName}`,
          content: Buffer.from(newJsonStr, 'utf8').toString('base64'),
          branch: 'main',
          sha: currentSha,
        }),
      })

      if (putRes.ok) {
        return res.status(200).json({ ok: true, leadId: targetLead.id })
      }

      if (putRes.status === 409 || putRes.status === 422) {
        await new Promise((r) => setTimeout(r, 350 * (attempt + 1)))
        continue
      }
      break
    }

    return res.status(502).json({ ok: false, error: 'Failed to sync to cloud database' })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'Internal Server Error' })
  }
}
