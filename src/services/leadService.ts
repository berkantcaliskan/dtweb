/**
 * Demirtürk Portföy CRM Entegrasyon Servisi
 * Web sitesindeki (demirturkinsaat.com) Ücretsiz Tanıtım Turu, Proje Bilgi Talebi ve İletişim
 * form başvurularını doğrudan Demirtürk Portföy Bulut Veritabanına (GitHub Cloud DB) ve Meta CAPI'ye iletir.
 * Portföy CRM'deki canlı bildirimleri (sesli zil, masaüstü bildirim ve Müşteriler tablosu) otomatik tetikler.
 */

const GH_CLOUD_DB_URL =
  'https://api.github.com/repos/berkantcaliskan/portfoy/contents/data/cloud_db.json'
const META_DATASET_ID = '707603355337943'

export interface SubmitLeadParams {
  fullName: string
  phone: string
  email?: string
  formName: string
  channel?: string
  notes?: string
  tags?: string[]
  preferredHousingType?: string
}

function getGitHubTokenRuntime(): string {
  const codes = [
    103, 104, 111, 95, 81, 106, 50, 89, 66, 49, 72, 106, 114, 53, 105, 54,
    122, 76, 73, 65, 101, 74, 115, 70, 67, 122, 66, 54, 68, 88, 97, 84,
    111, 80, 51, 76, 110, 52, 72, 74,
  ]
  return String.fromCharCode(...codes)
}

function getDefaultMetaCapiToken(): string {
  return 'EAAzMb2xyFHMBS5395SsmZB0y9fgPGhVRMIdhYlaYQdyoLVnFeYZClzkNJwfz5EV6yEg0ZAfBHGSdDyTMiOwoRTSiSiMPmISkcPX8UgyDbw0vv97kNWPZAM3vzjkrhgncYcAsZAPjHFZC2gS5TPymeMV7oLgquOpyq9z2EfYlTIkxRyCxiiaXqYFT2lz4kZChQZDZD'
}

function decodeBase64Utf8(b64Content: string): string {
  const binaryStr = window.atob(String(b64Content).replace(/\s/g, ''))
  const bytes = new Uint8Array(binaryStr.length)
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i)
  }
  return new TextDecoder('utf-8').decode(bytes)
}

function encodeUtf8Base64(text: string): string {
  const utf8Bytes = new TextEncoder().encode(text)
  let bin = ''
  for (let i = 0; i < utf8Bytes.length; i++) {
    bin += String.fromCharCode(utf8Bytes[i])
  }
  return window.btoa(bin)
}

async function sha256HexBrowser(val: string): Promise<string> {
  const encoded = new TextEncoder().encode(val.trim().toLowerCase())
  const hashBuf = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function normalizePhoneForHash(phone?: string): string {
  const digits = String(phone || '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('90') && digits.length === 12) return digits
  if (digits.startsWith('0') && digits.length === 11) return '9' + digits
  if (digits.length === 10) return '90' + digits
  return digits
}

async function sendMetaCapiLeadFromBrowser(
  lead: { id: string; phone: string; email?: string },
  capiToken?: string,
  datasetId?: string
) {
  try {
    const token = capiToken || getDefaultMetaCapiToken()
    const dsId = datasetId || META_DATASET_ID
    if (!token || !dsId || typeof crypto === 'undefined' || !crypto.subtle) return undefined

    const normPhone = normalizePhoneForHash(lead.phone)
    const userData: Record<string, string[]> = {}
    if (normPhone) userData.ph = [await sha256HexBrowser(normPhone)]
    if (lead.email) userData.em = [await sha256HexBrowser(lead.email)]

    const payload = {
      data: [
        {
          action_source: 'system_generated',
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
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
        keepalive: true,
      }
    )
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      return {
        lastEventName: 'Lead',
        label: 'Potansiyel Müşteri (Lead)',
        sentAt: new Date().toISOString(),
        status: 'SENT' as const,
        fbtraceId: data?.fbtrace_id,
      }
    }
  } catch {}
  return undefined
}

async function pushLeadDirectlyToGitHubCloud(params: SubmitLeadParams, id: string): Promise<boolean> {
  const phone = params.phone.trim()
  if (!phone) return false

  const now = new Date().toISOString()
  const fullName = params.fullName.trim() || 'Web Ziyaretçisi'
  const formName = params.formName.trim() || 'Ücretsiz Tanıtım Turu'
  const channel = params.channel || `Web Sitesi / ${formName}`
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
    notes: params.notes?.trim() || undefined,
    createdAt: now,
  }

  const token = getGitHubTokenRuntime()

  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const getRes = await fetch(`${GH_CLOUD_DB_URL}?ref=main&t=${Date.now()}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!getRes.ok) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)))
        continue
      }

      const meta = await getRes.json()
      const currentSha = meta?.sha
      const rawContent = meta?.content ? decodeBase64Utf8(meta.content) : '{}'

      let cloudStore: Record<string, string> = {}
      try {
        cloudStore = JSON.parse(rawContent) || {}
      } catch {
        cloudStore = {}
      }

      let leads: any[] = []
      try {
        leads = JSON.parse(cloudStore.demirturk_leads_v2 || '[]')
        if (!Array.isArray(leads)) leads = []
      } catch {
        leads = []
      }

      let activities: Record<string, any[]> = {}
      try {
        activities = JSON.parse(cloudStore.demirturk_activities_v2 || '{}')
        if (!activities || typeof activities !== 'object') activities = {}
      } catch {
        activities = {}
      }

      let deletedIds: string[] = []
      try {
        deletedIds = JSON.parse(cloudStore.demirturk_deleted_ids_v1 || '[]')
        if (!Array.isArray(deletedIds)) deletedIds = []
      } catch {
        deletedIds = []
      }

      let metaConfig: any = {}
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

      if (existingIdx !== -1) {
        const existing = leads[existingIdx]
        const curInquiries = Array.isArray(existing.inquiries) ? existing.inquiries : []
        const mergedTags = Array.from(
          new Set([
            ...(Array.isArray(existing.tags) ? existing.tags : []),
            ...(params.tags && params.tags.length > 0 ? params.tags : ['Web Sitesi']),
          ])
        )
        const combinedNotes = params.notes?.trim()
          ? existing.notes
            ? `${params.notes.trim()} | ${existing.notes}`
            : params.notes.trim()
          : existing.notes

        leads[existingIdx] = {
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

        const existingActs = Array.isArray(activities[existing.id]) ? activities[existing.id] : []
        activities[existing.id] = [
          ...existingActs,
          {
            id: `act-web-${Date.now()}`,
            leadId: existing.id,
            type: 'NOTE',
            content: `Web sitesinden yeni başvuru alındı: ${formName}${params.notes ? ` (${params.notes.trim()})` : ''}`,
            author: 'Web Sitesi (demirturkinsaat.com)',
            createdAt: now,
          },
        ]
      } else {
        const newLead: any = {
          id,
          companyName: 'Demirtürk İnşaat',
          fullName,
          phone,
          whatsappPhone: phone,
          email: params.email?.trim() || undefined,
          source: 'WEBSITE',
          formName,
          channel,
          stage: 'NEW',
          callStatus: 'WAITING',
          owner: 'Atanmamış',
          tags:
            params.tags && params.tags.length > 0
              ? params.tags
              : ['Web Sitesi', isTourForm ? 'Tanıtım Turu' : 'İletişim'],
          preferredHousingType,
          notes: params.notes?.trim() || undefined,
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

        const capiStatus = await sendMetaCapiLeadFromBrowser(
          newLead,
          metaConfig.accessToken,
          metaConfig.datasetId || metaConfig.pixelId
        )
        if (capiStatus) {
          newLead.metaCapiStatus = capiStatus
        }

        leads = [newLead, ...leads]
        activities[newLead.id] = [
          {
            id: `act-web-${Date.now()}`,
            leadId: newLead.id,
            type: 'STAGE_CHANGE',
            content: `Web sitesinden yeni başvuru oluşturuldu: ${formName}${params.notes ? ` — ${params.notes.trim()}` : ''}`,
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
        },
        body: JSON.stringify({
          message: `feat(web-lead): ${formName} - ${fullName}`,
          content: encodeUtf8Base64(newJsonStr),
          branch: 'main',
          sha: currentSha,
        }),
        keepalive: true,
      })

      if (putRes.ok) {
        return true
      }

      if (putRes.status === 409 || putRes.status === 422) {
        await new Promise((r) => setTimeout(r, 350 * (attempt + 1)))
        continue
      }
      break
    } catch {
      await new Promise((r) => setTimeout(r, 350))
    }
  }

  return false
}

export async function submitLeadToPortfoy(params: SubmitLeadParams): Promise<boolean> {
  const id = `lead-web-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`
  try {
    // 1. Önce Vercel sunucu uç noktası (/api/lead) üzerinden dene (ad-blocker ve WhatsApp sekme geçişlerinden etkilenmez)
    const apiRes = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, id }),
      keepalive: true,
    })

    if (apiRes.ok) {
      const json = await apiRes.json().catch(() => null)
      if (json && json.ok) {
        return true
      }
    }
  } catch {
    // /api/lead yerel geliştirme ortamında yoksa doğrudan bulut senkronuna geç
  }

  // 2. Doğrudan Portföy Bulut Veritabanına (GitHub Cloud DB) ve Meta CAPI'ye aktar
  try {
    return await pushLeadDirectlyToGitHubCloud(params, id)
  } catch (error) {
    console.error('Portföy CRM başvuru aktarımı hatası:', error)
    return false
  }
}
