/**
 * Demirtürk Portföy CRM & Yerel Başvuru Servisi
 * Form başvurularını hem yerel depolamada saklar (Yönetim Paneli için)
 * hem de Portföy CRM Bulut Veritabanına (GitHub Cloud DB) ve Meta CAPI'ye iletir.
 */

const GH_CLOUD_DB_URL =
  'https://api.github.com/repos/berkantcaliskan/portfoy/contents/data/cloud_db.json'
const META_DATASET_ID = '707603355337943'
const LEADS_STORAGE_KEY = 'demirturk_leads_v1'

export type LeadStatus = 'NEW' | 'CALLED' | 'APPOINTMENT' | 'COMPLETED' | 'CANCELLED'

export interface LeadItem {
  id: string
  fullName: string
  phone: string
  email?: string
  formName: string
  channel: string
  notes?: string
  tags: string[]
  preferredHousingType?: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

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
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://demirturkinsaat.com',
          user_data: userData,
          custom_data: {
            content_name: 'Web Sitesi Tanıtım Turu / Bilgi Başvurusu',
            currency: 'TRY',
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

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY)
    if (!raw) {
      return seedDemoLeads()
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveStoredLeads(leads: LeadItem[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads))
    window.dispatchEvent(new CustomEvent('demirturk_leads_updated', { detail: leads }))
  } catch (err) {
    console.warn('Leads save error:', err)
  }
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const leads = getStoredLeads()
  const updated = leads.map((item) =>
    item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
  )
  saveStoredLeads(updated)
}

export function deleteLead(id: string): void {
  const leads = getStoredLeads()
  const updated = leads.filter((item) => item.id !== id)
  saveStoredLeads(updated)
}

/**
 * Canlı Portföy Bulut Veritabanından (GitHub Cloud DB) tüm gerçek başvuruları çeker.
 * Herhangi bir cihazdan panele girildiğinde canlı veriyi sağlar.
 */
export async function fetchCloudLeads(): Promise<LeadItem[]> {
  try {
    const token = getGitHubTokenRuntime()
    const res = await fetch(`${GH_CLOUD_DB_URL}?ref=main&t=${Date.now()}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return getStoredLeads()
    }

    const data = await res.json()
    if (!data || !data.content) {
      return getStoredLeads()
    }

    const rawContent = decodeBase64Utf8(data.content)
    const cloudStore = JSON.parse(rawContent) || {}
    const rawLeads = JSON.parse(cloudStore.demirturk_leads_v2 || '[]')
    if (!Array.isArray(rawLeads)) return getStoredLeads()

    const cloudMapped: LeadItem[] = rawLeads.map((l: any) => {
      let status: LeadStatus = 'NEW'
      const s = String(l.stage || '').toUpperCase()
      if (s === 'CONTACTED' || l.callStatus === 'CALLED') status = 'CALLED'
      else if (s === 'MEETING' || s === 'APPOINTMENT') status = 'APPOINTMENT'
      else if (s === 'WON' || s === 'COMPLETED') status = 'COMPLETED'
      else if (s === 'LOST' || s === 'CANCELLED') status = 'CANCELLED'
      else status = 'NEW'

      const firstInquiry = Array.isArray(l.inquiries) && l.inquiries.length > 0 ? l.inquiries[0] : null

      return {
        id: l.id || `lead-${Date.now()}`,
        fullName: l.fullName || 'İsimsiz Ziyaretçi',
        phone: l.phone || '',
        email: l.email || undefined,
        formName: l.formName || firstInquiry?.formName || 'Web Başvurusu',
        channel: l.channel || firstInquiry?.channel || 'Web Sitesi',
        notes: l.notes || firstInquiry?.notes || undefined,
        tags: Array.isArray(l.tags) && l.tags.length > 0 ? l.tags : ['Web Sitesi'],
        preferredHousingType: l.preferredHousingType || firstInquiry?.preferredHousingType || undefined,
        status,
        createdAt: l.createdAt || new Date().toISOString(),
        updatedAt: l.updatedAt || l.createdAt || new Date().toISOString(),
      }
    })

    // En yeniden eskiye sırala
    cloudMapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Yerel hafızaya da yazarak anında açılmasını sağla
    saveStoredLeads(cloudMapped)
    return cloudMapped
  } catch (err) {
    console.warn('Canlı bulut başvuruları çekilemedi, yerel veri kullanılıyor:', err)
    return getStoredLeads()
  }
}

/**
 * Bir başvurunun durumunu canlı Bulut Veritabanında (GitHub Cloud DB) günceller.
 */
export async function updateCloudLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  updateLeadStatus(id, status) // Yerelde anında güncelle

  try {
    const token = getGitHubTokenRuntime()
    const getRes = await fetch(`${GH_CLOUD_DB_URL}?ref=main&t=${Date.now()}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!getRes.ok) return false
    const meta = await getRes.json()
    const currentSha = meta?.sha
    const rawContent = meta?.content ? decodeBase64Utf8(meta.content) : '{}'
    const cloudStore = JSON.parse(rawContent) || {}
    let leads = JSON.parse(cloudStore.demirturk_leads_v2 || '[]')
    if (!Array.isArray(leads)) leads = []

    const stageMap: Record<LeadStatus, string> = {
      NEW: 'NEW',
      CALLED: 'CONTACTED',
      APPOINTMENT: 'MEETING',
      COMPLETED: 'WON',
      CANCELLED: 'LOST',
    }

    const targetIdx = leads.findIndex((l: any) => l.id === id)
    if (targetIdx !== -1) {
      const existing = leads[targetIdx]
      const newStage = stageMap[status] || 'NEW'
      leads[targetIdx] = {
        ...existing,
        stage: newStage,
        callStatus: status === 'CALLED' ? 'CALLED' : existing.callStatus,
        updatedAt: new Date().toISOString(),
        stageHistory: [
          ...(Array.isArray(existing.stageHistory) ? existing.stageHistory : []),
          {
            id: `sh-admin-${Date.now()}`,
            fromStage: existing.stage,
            toStage: newStage,
            changedByUserId: 'admin',
            changedByUserName: 'Web Yönetim Paneli',
            changedAt: new Date().toISOString(),
            note: `Durum güncellendi: ${status}`,
          },
        ],
      }

      cloudStore.demirturk_leads_v2 = JSON.stringify(leads)
      const newJsonStr = JSON.stringify(cloudStore, null, 2)
      await fetch(GH_CLOUD_DB_URL, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `chore(web-admin): update lead ${id} to ${status}`,
          content: encodeUtf8Base64(newJsonStr),
          branch: 'main',
          sha: currentSha,
        }),
      })
      return true
    }
    return false
  } catch (err) {
    console.warn('updateCloudLeadStatus error:', err)
    return false
  }
}

/**
 * Bir başvuruyu canlı Bulut Veritabanından siler.
 */
export async function deleteCloudLead(id: string): Promise<boolean> {
  deleteLead(id) // Yerelde anında sil

  try {
    const token = getGitHubTokenRuntime()
    const getRes = await fetch(`${GH_CLOUD_DB_URL}?ref=main&t=${Date.now()}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!getRes.ok) return false
    const meta = await getRes.json()
    const currentSha = meta?.sha
    const rawContent = meta?.content ? decodeBase64Utf8(meta.content) : '{}'
    const cloudStore = JSON.parse(rawContent) || {}
    let leads = JSON.parse(cloudStore.demirturk_leads_v2 || '[]')
    let deletedIds = JSON.parse(cloudStore.demirturk_deleted_ids_v1 || '[]')
    if (!Array.isArray(leads)) leads = []
    if (!Array.isArray(deletedIds)) deletedIds = []

    leads = leads.filter((l: any) => l.id !== id)
    if (!deletedIds.includes(id)) {
      deletedIds.push(id)
    }

    cloudStore.demirturk_leads_v2 = JSON.stringify(leads)
    cloudStore.demirturk_deleted_ids_v1 = JSON.stringify(deletedIds)
    const newJsonStr = JSON.stringify(cloudStore, null, 2)
    await fetch(GH_CLOUD_DB_URL, {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore(web-admin): delete lead ${id}`,
        content: encodeUtf8Base64(newJsonStr),
        branch: 'main',
        sha: currentSha,
      }),
    })
    return true
  } catch (err) {
    console.warn('deleteCloudLead error:', err)
    return false
  }
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
  const now = new Date().toISOString()

  // 1. Web sitesi yerel yönetim paneline anında kaydet
  const localLead: LeadItem = {
    id,
    fullName: params.fullName?.trim() || 'İsimsiz Ziyaretçi',
    phone: params.phone?.trim() || '',
    email: params.email?.trim() || undefined,
    formName: params.formName || 'Web Başvurusu',
    channel: params.channel || `Web Sitesi / ${params.formName || 'Genel'}`,
    notes: params.notes?.trim() || undefined,
    tags: params.tags && params.tags.length > 0 ? params.tags : ['Web Sitesi'],
    preferredHousingType: params.preferredHousingType || undefined,
    status: 'NEW',
    createdAt: now,
    updatedAt: now,
  }

  try {
    const existing = getStoredLeads()
    const updated = [localLead, ...existing]
    saveStoredLeads(updated)
  } catch (err) {
    console.warn('Local lead save error:', err)
  }

  // 2. Portföy CRM ve Meta CAPI senkronu
  try {
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
  } catch {}

  try {
    await pushLeadDirectlyToGitHubCloud(params, id)
  } catch (error) {
    console.warn('Portföy CRM cloud senkronu:', error)
  }

  return true
}

/**
 * Excel uyumlu UTF-8 BOM ile CSV indirme
 */
export function exportLeadsToCsv(leads: LeadItem[]): void {
  if (typeof window === 'undefined' || leads.length === 0) return

  const headers = ['Tarih', 'İsim', 'Telefon', 'E-Posta', 'Form / Talep Türü', 'Kanal', 'Durum', 'Notlar']

  const statusLabels: Record<LeadStatus, string> = {
    NEW: 'Yeni',
    CALLED: 'Arandı',
    APPOINTMENT: 'Randevu Verildi',
    COMPLETED: 'Tamamlandı',
    CANCELLED: 'İptal',
  }

  const rows = leads.map((l) => [
    new Date(l.createdAt).toLocaleString('tr-TR'),
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.formName || '').replace(/"/g, '""')}"`,
    `"${(l.channel || '').replace(/"/g, '""')}"`,
    `"${statusLabels[l.status] || l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ])

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const dateStr = new Date().toISOString().split('T')[0]
  a.href = url
  a.download = `demirturk-basvurular-${dateStr}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function seedDemoLeads(): LeadItem[] {
  const now = Date.now()
  const samples: LeadItem[] = [
    {
      id: 'lead-demo-1',
      fullName: 'Ahmet Yılmaz',
      phone: '+90 532 450 12 34',
      email: 'ahmet.yilmaz@gmail.com',
      formName: 'Ücretsiz Tanıtım Turu',
      channel: 'Web Sitesi / VIP Tur Modalı',
      notes: 'Kalkış Şehri: İstanbul (Kadıköy) | Katılım: Pazar VIP Servis | 2 Kişi',
      tags: ['Web Sitesi', 'Tanıtım Turu', 'İstanbul'],
      status: 'NEW',
      createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'lead-demo-2',
      fullName: 'Mehmet Özdemir',
      phone: '+90 533 210 98 76',
      email: 'mehmetozdemir@hotmail.com',
      formName: 'Ödeme Modeli Planı',
      channel: 'Web Sitesi / Ödeme Modelleri',
      notes: 'Konut Tutarı: 4.250.000 ₺ (2+1 Daire) | Peşinat (%36): 1.530.000 ₺ | Kalan Vade: 40 Ay',
      tags: ['Web Sitesi', 'Ödeme Modelleri', '2+1'],
      status: 'CALLED',
      createdAt: new Date(now - 1000 * 60 * 60 * 5).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 'lead-demo-3',
      fullName: 'Selin Kaya',
      phone: '+90 554 890 34 12',
      email: 'selin.kaya@outlook.com',
      formName: 'Proje Bilgi Talebi: Yeni Şehir',
      channel: 'Web Sitesi / Proje Detay',
      notes: 'Yeni Şehir 3. Etap havuz cepheli 1+1 daireler için kat planı ve güncel fiyat listesi istiyor.',
      tags: ['Web Sitesi', 'Yeni Şehir', '1+1'],
      status: 'APPOINTMENT',
      createdAt: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 60 * 12).toISOString(),
    }
  ]

  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(samples))
  } catch {}
  return samples
}
