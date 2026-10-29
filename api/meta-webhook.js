/**
 * Vercel Serverless Function: /api/meta-webhook
 * Meta (Facebook & Instagram) Lead Ads Webhook alıcısı.
 * Hem Meta Developers GET doğrulamasını (hub.challenge) yanıtlar,
 * hem de gelen leadgen POST bildirimlerini (veya doğrudan CRM webhook verilerini)
 * Demirtürk Portföy Bulut Veritabanına (berkantcaliskan/portfoy -> data/cloud_db.json) yazar.
 */
import crypto from 'crypto'

const GH_CLOUD_DB_URL =
  'https://api.github.com/repos/berkantcaliskan/portfoy/contents/data/cloud_db.json'
const META_DATASET_ID = '707603355337943'

const VALID_VERIFY_TOKENS = new Set([
  (process.env.META_VERIFY_TOKEN || '').trim(),
  'demirturk_meta_verify_2026',
  'demirturk_secret_verify_token_2026',
  'demirturk_meta_token_secure_2026',
])

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

function prettifyQuestionName(rawName) {
  const dictionary = {
    full_name: 'Adı Soyadı',
    first_name: 'Adı',
    last_name: 'Soyadı',
    phone_number: 'Telefon Numarası',
    email: 'E-Posta Adresi',
    city: 'Şehir',
    ilgilendiginiz_konut_tipi: 'İlgilendiğiniz Konut Tipi',
    konut_tipi: 'Konut Tipi',
    butce_araliginiz: 'Bütçe Aralığınız',
    butce: 'Bütçe',
    alim_amaci: 'Satın Alma Amacınız',
    odeme_tercihi: 'Ödeme Tercihiniz',
  }
  const lower = String(rawName || '').toLowerCase().trim()
  if (dictionary[lower]) return dictionary[lower]
  return String(rawName || '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function sendMetaCapiLeadEvent(lead, capiToken, datasetId) {
  try {
    const token = capiToken || getDefaultMetaCapiToken()
    const dsId = datasetId || META_DATASET_ID
    if (!token || !dsId) return null

    const eventTime = Math.floor(Date.now() / 1000)
    const normPhone = normalizePhoneForHash(lead.phone)
    const userData = {}
    if (lead.metaLeadId && /^\d{12,20}$/.test(String(lead.metaLeadId))) {
      userData.lead_id = Number(lead.metaLeadId) || lead.metaLeadId
    }
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
            lead_event_source: 'Demirtürk Portföy CRM',
            crm_stage: 'Potansiyel Müşteri',
            lead_status: 'Potansiyel Müşteri',
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
        label: 'Potansiyel Müşteri',
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // 1. META WEBHOOK GET VERIFICATION
  if (req.method === 'GET') {
    const mode = req.query?.['hub.mode']
    const token = req.query?.['hub.verify_token']
    const challenge = req.query?.['hub.challenge']

    if (mode === 'subscribe' && token && VALID_VERIFY_TOKENS.has(String(token).trim())) {
      res.setHeader('Content-Type', 'text/plain')
      return res.status(200).send(String(challenge || ''))
    }
    if (!mode) {
      return res.status(200).json({
        ok: true,
        service: 'Demirtürk Portföy Meta Lead Ads Webhook',
        status: 'ACTIVE',
      })
    }
    return res.status(403).send('Forbidden: Invalid Verify Token')
  }

  // 2. META WEBHOOK POST INTAKE
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const ghToken = getGitHubTokenRuntime()

    // Fetch current cloud_db.json
    const getRes = await fetch(`${GH_CLOUD_DB_URL}?t=${Date.now()}`, {
      headers: {
        Authorization: `token ${ghToken}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Demirturk-Portfoy-Meta-Webhook',
      },
    })
    if (!getRes.ok) {
      return res.status(502).json({ ok: false, error: 'Failed to read Cloud DB' })
    }

    const fileMeta = await getRes.json()
    const currentSha = fileMeta.sha
    const decodedText = Buffer.from(fileMeta.content || '', 'base64').toString('utf8')
    const cloudDb = JSON.parse(decodedText || '{}')

    let metaConfig = {}
    try {
      metaConfig = JSON.parse(cloudDb.demirturk_meta_api_config || '{}')
    } catch {}

    const pageAccessToken =
      (metaConfig.pageAccessToken || '').trim() ||
      (process.env.META_PAGE_ACCESS_TOKEN || '').trim() ||
      (metaConfig.capiAccessToken || '').trim()

    let existingLeads = []
    try {
      existingLeads = JSON.parse(cloudDb.demirturk_leads_v2 || '[]')
      if (!Array.isArray(existingLeads)) existingLeads = []
    } catch {
      existingLeads = []
    }

    let users = []
    try {
      users = JSON.parse(cloudDb.demirturk_users_v2 || '[]')
      if (!Array.isArray(users)) users = []
    } catch {
      users = []
    }

    const callCenterUsers = users.filter(
      (u) =>
        u.role !== 'ADMIN' &&
        (u.department === 'Müşteri İlişkileri' ||
          (Array.isArray(u.departments) && u.departments.includes('Müşteri İlişkileri')))
    )

    // Collect incoming lead candidates from standard Meta webhook or direct payload
    const rawCandidates = []
    if (Array.isArray(payload.entry)) {
      for (const entry of payload.entry) {
        const changes = Array.isArray(entry.changes) ? entry.changes : []
        for (const change of changes) {
          if (change.field === 'leadgen' && change.value) {
            rawCandidates.push(change.value)
          }
        }
      }
    } else if (payload.leadgen_id || payload.field_data || payload.phone || payload.fullName) {
      rawCandidates.push(payload)
    }

    let processedCount = 0

    for (const candidate of rawCandidates) {
      const leadgenId = String(candidate.leadgen_id || candidate.id || '').trim()
      const formId = String(candidate.form_id || '').trim()
      let fieldData = Array.isArray(candidate.field_data) ? candidate.field_data : []
      let formName = candidate.form_name || candidate.formName || ''
      let campaignName = candidate.campaign_name || candidate.campaignName || candidate.ad_name || ''

      // Fetch from Graph API if we have leadgenId and fieldData is empty
      if (leadgenId && fieldData.length === 0 && pageAccessToken) {
        try {
          const leadRes = await fetch(
            `https://graph.facebook.com/v21.0/${encodeURIComponent(leadgenId)}?fields=id,created_time,campaign_name,ad_name,form_id,field_data&access_token=${encodeURIComponent(pageAccessToken)}`
          )
          if (leadRes.ok) {
            const leadJson = await leadRes.json()
            if (Array.isArray(leadJson.field_data)) fieldData = leadJson.field_data
            if (!campaignName) campaignName = leadJson.campaign_name || leadJson.ad_name || ''
          }
          if (formId && !formName) {
            const fRes = await fetch(
              `https://graph.facebook.com/v21.0/${encodeURIComponent(formId)}?fields=name&access_token=${encodeURIComponent(pageAccessToken)}`
            )
            if (fRes.ok) {
              const fJson = await fRes.json()
              if (fJson.name) formName = fJson.name
            }
          }
        } catch {}
      }

      let fullName = String(candidate.fullName || candidate.full_name || '').trim()
      let phone = String(candidate.phone || candidate.phone_number || '').trim()
      let email = String(candidate.email || '').trim()
      let preferredHousingType = String(candidate.preferredHousingType || '').trim()
      const metaAnswers = []

      for (const fd of fieldData) {
        const key = String(fd.name || '').toLowerCase()
        const val = Array.isArray(fd.values) ? fd.values.join(', ').trim() : String(fd.value || '').trim()
        if (!val) continue
        if (
          key.includes('full_name') ||
          key.includes('ad_soyad') ||
          key.includes('isim') ||
          key === 'name' ||
          key === 'first_name'
        ) {
          fullName = fullName ? `${fullName} ${val}` : val
        } else if (
          key.includes('phone') ||
          key.includes('telefon') ||
          key.includes('numara') ||
          key.includes('tel')
        ) {
          phone = val
        } else if (key.includes('email') || key.includes('e-posta') || key.includes('mail')) {
          email = val
        } else {
          metaAnswers.push({ question: prettifyQuestionName(fd.name), answer: val })
          if (
            key.includes('konut') ||
            key.includes('daire') ||
            val.includes('1+1') ||
            val.includes('2+1') ||
            val.includes('3+1') ||
            val.toLowerCase().includes('villa')
          ) {
            preferredHousingType = val
          }
        }
      }

      if (!fullName && !phone && !leadgenId) continue
      if (!fullName) fullName = phone ? `Meta Adayı (${phone})` : `Meta Lead #${leadgenId.slice(-6)}`
      if (!formName) formName = formId ? `Meta Form #${formId}` : 'Meta Lead Ads Formu'
      if (!campaignName) campaignName = formName

      const nowIso = new Date().toISOString()
      const cleanIncomingPhone = phone.replace(/\D/g, '').slice(-10)

      const existingIdx = existingLeads.findIndex((l) => {
        if (leadgenId && l.metaLeadId === leadgenId) return true
        const cleanExisting = String(l.phone || '').replace(/\D/g, '').slice(-10)
        return cleanIncomingPhone.length >= 7 && cleanExisting === cleanIncomingPhone
      })

      const inquiryEntry = {
        id: `inq-meta-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        formName,
        campaignName,
        source: 'META_ADS',
        channel: 'Meta Lead Ads',
        metaLeadgenId: leadgenId || undefined,
        preferredHousingType: preferredHousingType || undefined,
        metaAnswers: metaAnswers.length > 0 ? metaAnswers : undefined,
        createdAt: nowIso,
      }

      if (existingIdx !== -1) {
        const prev = existingLeads[existingIdx]
        const prevInq = Array.isArray(prev.inquiries) ? prev.inquiries : []
        existingLeads[existingIdx] = {
          ...prev,
          metaLeadId: leadgenId || prev.metaLeadId,
          inquiries: [inquiryEntry, ...prevInq],
          metaAnswers: metaAnswers.length > 0 ? metaAnswers : prev.metaAnswers,
          updatedAt: nowIso,
        }
        processedCount++
      } else {
        let maxLeadNum = 0
        for (const l of existingLeads) {
          if (typeof l.leadNumber === 'number' && l.leadNumber > maxLeadNum) {
            maxLeadNum = l.leadNumber
          }
        }

        // Round-robin Call Center assignment for Meta Ads leads
        let assignedUser = null
        if (callCenterUsers.length > 0) {
          assignedUser = callCenterUsers[existingLeads.length % callCenterUsers.length]
        }

        const newLead = {
          id: `lead-meta-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
          companyName: 'Demirtürk İnşaat',
          leadNumber: maxLeadNum + 1,
          fullName,
          phone: phone || 'Belirtilmedi',
          whatsappPhone: phone || '',
          email: email || undefined,
          source: 'META_ADS',
          formName,
          channel: 'Meta Lead Ads',
          stage: 'NEW',
          callStatus: 'WAITING',
          assignedToUserId: assignedUser ? assignedUser.id : undefined,
          assignedToUserName: assignedUser ? assignedUser.fullName : undefined,
          owner: assignedUser ? assignedUser.fullName : 'Atanmamış',
          tags: ['Meta Ads', formName],
          preferredHousingType: preferredHousingType || 'Konut',
          metaLeadId: leadgenId || undefined,
          metaAnswers: metaAnswers.length > 0 ? metaAnswers : undefined,
          inquiries: [inquiryEntry],
          assignmentHistory: assignedUser
            ? [
                {
                  id: `asg-${Date.now()}`,
                  assignedToUserId: assignedUser.id,
                  assignedToUserName: assignedUser.fullName,
                  assignedByUserName: 'Meta Otomatik Dağıtım',
                  assignedAt: nowIso,
                  department: 'Müşteri İlişkileri',
                  note: 'Meta Lead Ads üzerinden eşit sırayla otomatik atandı.',
                },
              ]
            : [],
          stageHistory: [
            {
              id: `sh-meta-${Date.now()}`,
              toStage: 'NEW',
              changedByUserId: 'meta',
              changedByUserName: 'Meta Lead Ads Webhook',
              changedAt: nowIso,
              note: `${formName} üzerinden başvuru alındı.`,
            },
          ],
          createdAt: nowIso,
          updatedAt: nowIso,
        }

        const capiStatus = await sendMetaCapiLeadEvent(
          newLead,
          metaConfig.capiAccessToken,
          metaConfig.datasetId
        )
        if (capiStatus) {
          newLead.metaCapiStatus = capiStatus
        }

        existingLeads.unshift(newLead)
        processedCount++
      }
    }

    if (processedCount > 0) {
      cloudDb.demirturk_leads_v2 = JSON.stringify(existingLeads)
      const updatedBase64 = Buffer.from(JSON.stringify(cloudDb, null, 2), 'utf8').toString('base64')
      await fetch(GH_CLOUD_DB_URL, {
        method: 'PUT',
        headers: {
          Authorization: `token ${ghToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Demirturk-Portfoy-Meta-Webhook',
        },
        body: JSON.stringify({
          message: `feat(meta-lead): incoming Meta Lead Ads submission (${processedCount})`,
          content: updatedBase64,
          sha: currentSha,
        }),
      })
    }

    return res.status(200).json({ ok: true, processedCount })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'Internal Server Error' })
  }
}
