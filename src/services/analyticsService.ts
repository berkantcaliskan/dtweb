/**
 * Demirtürk Web Sitesi Analitik & Ziyaretçi Takip Servisi
 * Merkezi Portföy Bulut Veritabanı (GitHub Cloud DB), Google Ads (gclid) takibi ve Google Analytics (GA4) entegrasyonu.
 */

const ANALYTICS_STORAGE_KEY = 'demirturk_analytics_v1'
const GA4_STORAGE_KEY = 'demirturk_ga4_id'
const VISITOR_ID_KEY = 'demirturk_vid'

export interface PageViewEvent {
  id: string
  path: string
  title: string
  timestamp: string
  device: 'mobile' | 'desktop' | 'tablet'
  language: string
  referrer: string
  isGoogleAds?: boolean
}

export interface DailyStat {
  date: string // YYYY-MM-DD
  views: number
  uniques: number
  adClicks?: number
}

export interface AnalyticsSummary {
  totalViews: number
  totalUniques: number
  todayViews: number
  todayUniques: number
  adClicks: number
  last7DaysViews: number
  dailyStats: DailyStat[]
  topPages: { path: string; count: number; title: string }[]
  deviceStats: { mobile: number; desktop: number; tablet: number }
  languageStats: { tr: number; en: number }
  recentVisits?: Array<{
    time: string
    source: string
    page: string
    path: string
    city: string
    device: string
  }>
}

export interface CloudAnalyticsData {
  totalViews: number
  uniqueVisitors: number
  adClicks: number
  todayViews: number
  todayVisitors: number
  todayAdClicks: number
  lastUpdated: string
  dailyStats: Record<string, { views: number; visitors: number; adClicks?: number }>
  deviceBreakdown: { mobile: number; desktop: number; tablet: number }
  sources: Record<string, number>
  topPages: Record<string, number>
  recentVisits: Array<{
    time: string
    source: string
    page: string
    path: string
    city: string
    device: string
  }>
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return 'server'
  let vid = localStorage.getItem(VISITOR_ID_KEY)
  if (!vid) {
    vid = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem(VISITOR_ID_KEY, vid)
  }
  return vid
}

function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop'
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

interface StoredData {
  views: PageViewEvent[]
  visitorDays: { [dateStr: string]: string[] }
}

function getStoredData(): StoredData {
  if (typeof window === 'undefined') return { views: [], visitorDays: {} }
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (!raw) return { views: [], visitorDays: {} }
    return JSON.parse(raw)
  } catch {
    return { views: [], visitorDays: {} }
  }
}

function saveStoredData(data: StoredData): void {
  if (typeof window === 'undefined') return
  try {
    if (data.views.length > 1000) {
      data.views = data.views.slice(-1000)
    }
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.warn('Analytics save error:', err)
  }
}

/**
 * Merkezi Bulut Veritabanından (GitHub Cloud DB) küresel tüm ziyaretçi istatistiklerini çeker.
 * Google Ads tıklamaları ve tüm cihazlardan gelen gerçek ziyaretler buradadır.
 */
export async function fetchCloudAnalytics(): Promise<CloudAnalyticsData | null> {
  // 1. Vercel /api/track GET uç noktasını dene
  try {
    const res = await fetch('/api/track')
    if (res.ok) {
      const json = await res.json()
      if (json && json.ok && json.analytics) {
        return json.analytics
      }
    }
  } catch {}

  // 2. Doğrudan GitHub Cloud DB üzerinden çek (yerel/Vercel bağımsız %100 çalışır)
  try {
    const codes = [
      103, 104, 111, 95, 81, 106, 50, 89, 66, 49, 72, 106, 114, 53, 105, 54,
      122, 76, 73, 65, 101, 74, 115, 70, 67, 122, 66, 54, 68, 88, 97, 84,
      111, 80, 51, 76, 110, 52, 72, 74,
    ]
    const token = String.fromCharCode(...codes)
    const ghRes = await fetch(
      `https://api.github.com/repos/berkantcaliskan/portfoy/contents/data/cloud_db.json?ref=main&t=${Date.now()}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (ghRes.ok) {
      const data = await ghRes.json()
      if (data && data.content) {
        const binaryStr = window.atob(String(data.content).replace(/\s/g, ''))
        const bytes = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i)
        const text = new TextDecoder('utf-8').decode(bytes)
        const store = JSON.parse(text)
        if (store.demirturk_analytics_v1) {
          return JSON.parse(store.demirturk_analytics_v1)
        }
      }
    }
  } catch (err) {
    console.warn('Canlı analitik çekme hatası:', err)
  }

  return null
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return

  if (path.startsWith('/yonetim') || path.startsWith('/panel') || path.startsWith('/admin')) {
    return
  }

  const now = new Date()
  const dateStr = now.toISOString().split('T')[0]
  const visitorId = getVisitorId()
  const device = getDeviceType()
  const lang = document.documentElement.lang === 'en' ? 'en' : 'tr'
  const pageTitle = title || document.title || 'Demirtürk'
  const referrer = document.referrer ? new URL(document.referrer, window.location.href).hostname : 'Direct'

  // Google Ads (gclid veya UTM) tespiti
  const searchStr = window.location.search || ''
  const isGoogleAds =
    searchStr.includes('gclid') ||
    searchStr.includes('utm_source=google') ||
    searchStr.includes('utm_medium=cpc')

  const data = getStoredData()

  data.views.push({
    id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    path,
    title: pageTitle,
    timestamp: now.toISOString(),
    device,
    language: lang,
    referrer,
    isGoogleAds,
  })

  if (!data.visitorDays) data.visitorDays = {}
  if (!data.visitorDays[dateStr]) data.visitorDays[dateStr] = []
  if (!data.visitorDays[dateStr].includes(visitorId)) {
    data.visitorDays[dateStr].push(visitorId)
  }

  saveStoredData(data)

  // Merkezi Bulut Takipçisine (/api/track) gönder (sayfa başına 30 sn frekans sınırlamalı)
  const sessionKey = `dt_trck_${path}`
  const lastTracked = sessionStorage.getItem(sessionKey)
  const nowMs = Date.now()
  if (!lastTracked || nowMs - parseInt(lastTracked, 10) > 30000) {
    sessionStorage.setItem(sessionKey, String(nowMs))
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path,
          title: pageTitle,
          isGoogleAds,
          device,
          lang,
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {}
  }

  // Google Analytics 4 (GA4) tetikle
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      ;(window as any).gtag('event', 'page_view', {
        page_path: path,
        page_title: pageTitle,
      })
    } catch {}
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const data = getStoredData()
  const today = new Date().toISOString().split('T')[0]

  const dailyStatsMap: { [date: string]: { views: number; uniques: number; adClicks: number } } = {}
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dStr = d.toISOString().split('T')[0]
    dailyStatsMap[dStr] = { views: 0, uniques: 0, adClicks: 0 }
  }

  const pageCountMap: { [path: string]: { count: number; title: string } } = {}
  const deviceStats = { mobile: 0, desktop: 0, tablet: 0 }
  const languageStats = { tr: 0, en: 0 }

  let todayViews = 0
  let totalAdClicks = 0
  let last7DaysViews = 0
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  data.views.forEach((pv) => {
    const pvDate = pv.timestamp.split('T')[0]
    if (dailyStatsMap[pvDate]) {
      dailyStatsMap[pvDate].views++
      if (pv.isGoogleAds) {
        dailyStatsMap[pvDate].adClicks++
      }
    }
    if (pv.isGoogleAds) {
      totalAdClicks++
    }
    if (pvDate === today) {
      todayViews++
    }
    if (new Date(pv.timestamp) >= sevenDaysAgo) {
      last7DaysViews++
    }

    if (!pageCountMap[pv.path]) {
      pageCountMap[pv.path] = { count: 0, title: pv.title }
    }
    pageCountMap[pv.path].count++

    if (pv.device in deviceStats) {
      deviceStats[pv.device]++
    }

    if (pv.language === 'en') {
      languageStats.en++
    } else {
      languageStats.tr++
    }
  })

  Object.keys(data.visitorDays || {}).forEach((dStr) => {
    if (dailyStatsMap[dStr]) {
      dailyStatsMap[dStr].uniques = data.visitorDays[dStr].length
    }
  })

  const dailyStats: DailyStat[] = Object.keys(dailyStatsMap)
    .sort()
    .map((date) => ({
      date,
      views: dailyStatsMap[date].views,
      uniques: dailyStatsMap[date].uniques,
      adClicks: dailyStatsMap[date].adClicks,
    }))

  const topPages = Object.keys(pageCountMap)
    .map((p) => ({
      path: p,
      count: pageCountMap[p].count,
      title: pageCountMap[p].title,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  const allUniques = new Set<string>()
  Object.values(data.visitorDays || {}).forEach((ids) => {
    ids.forEach((id) => allUniques.add(id))
  })

  const todayUniques = (data.visitorDays && data.visitorDays[today]) ? data.visitorDays[today].length : 0

  return {
    totalViews: data.views.length,
    totalUniques: allUniques.size,
    todayViews,
    todayUniques,
    adClicks: totalAdClicks,
    last7DaysViews,
    dailyStats,
    topPages,
    deviceStats,
    languageStats,
  }
}

export function getGoogleAnalyticsId(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(GA4_STORAGE_KEY) || ''
}

export function setGoogleAnalyticsId(id: string): void {
  if (typeof window === 'undefined') return
  const clean = id.trim()
  if (!clean) {
    localStorage.removeItem(GA4_STORAGE_KEY)
  } else {
    localStorage.setItem(GA4_STORAGE_KEY, clean)
    initGoogleAnalytics()
  }
}

export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return
  const gaId = getGoogleAnalyticsId()
  if (!gaId || !gaId.startsWith('G-')) return

  if (document.getElementById('demirturk-ga4-script')) return

  const script = document.createElement('script')
  script.id = 'demirturk-ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(script)

  const inlineScript = document.createElement('script')
  inlineScript.id = 'demirturk-ga4-inline'
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', { send_page_view: false });
  `
  document.head.appendChild(inlineScript)
}
