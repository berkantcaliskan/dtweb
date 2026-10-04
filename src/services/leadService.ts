/**
 * Demirtürk Portföy CRM Entegrasyon Servisi
 * Web sitesindeki form başvurularını doğrudan Demirtürk Portföy Supabase veritabanına iletir.
 * Portföy CRM'deki Realtime bildirimleri (sesli zil, masaüstü bildirim ve "Giriş (Yeni)" kanban kartı) otomatik tetiklenir.
 */

const SUPABASE_URL = 'https://unjfqfservizfmbgofhq.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable__99mhA3MbU9nnH8bn9S9nw_X7gWNlAO'

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

export async function submitLeadToPortfoy(params: SubmitLeadParams): Promise<boolean> {
  try {
    const id = `lead-web-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const now = new Date().toISOString()

    const body = {
      id,
      full_name: params.fullName.trim() || 'Web Ziyaretçisi',
      phone: params.phone.trim(),
      email: params.email?.trim() || null,
      source: 'WEBSITE',
      form_name: params.formName,
      channel: params.channel || `Web Sitesi / ${params.formName}`,
      stage: 'NEW',
      owner: 'Atanmamış',
      tags: params.tags && params.tags.length > 0 ? params.tags : ['Web Sitesi'],
      notes: params.notes?.trim() || null,
      preferred_housing_type: params.preferredHousingType || null,
      created_at: now,
      updated_at: now,
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.warn('Portföy CRM yanıt kodu:', response.status, await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error('Portföy CRM başvuru aktarımı hatası:', error)
    return false
  }
}
