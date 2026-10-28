/**
 * Demirtürk Web Sitesi Analitik & Ziyaretçi Takip Servisi
 * Gizlilik dostu, yerel olarak depolanan ve opsiyonel Google Analytics (GA4) destekli ziyaret ölçümü.
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
}

export interface DailyStat {
  date: string // YYYY-MM-DD
  views: number
  uniques: number
}

export interface AnalyticsSummary {
  totalViews: number
  totalUniques: number
  todayViews: number
  todayUniques: number
  last7DaysViews: number
  dailyStats: DailyStat[]
  topPages: { path: string; count: number; title: string }[]
  deviceStats: { mobile: number; desktop: number; tablet: number }
  languageStats: { tr: number; en: number }
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
  visitorDays: { [dateStr: string]: string[] } // date -> array of unique visitorIds
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
    // Keep max 1000 page views to keep localStorage light
    if (data.views.length > 1000) {
      data.views = data.views.slice(-1000)
    }
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.warn('Analytics save error:', err)
  }
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return

  // Do not track admin panel visits as website traffic
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

  const data = getStoredData()

  // Add view event
  data.views.push({
    id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    path,
    title: pageTitle,
    timestamp: now.toISOString(),
    device,
    language: lang,
    referrer,
  })

  // Track unique visitor per day
  if (!data.visitorDays) data.visitorDays = {}
  if (!data.visitorDays[dateStr]) data.visitorDays[dateStr] = []
  if (!data.visitorDays[dateStr].includes(visitorId)) {
    data.visitorDays[dateStr].push(visitorId)
  }

  saveStoredData(data)

  // Also trigger Google Analytics if configured
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

  // Calculate past 14 days
  const dailyStatsMap: { [date: string]: { views: number; uniques: number } } = {}
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dStr = d.toISOString().split('T')[0]
    dailyStatsMap[dStr] = { views: 0, uniques: 0 }
  }

  // Populate views
  const pageCountMap: { [path: string]: { count: number; title: string } } = {}
  const deviceStats = { mobile: 0, desktop: 0, tablet: 0 }
  const languageStats = { tr: 0, en: 0 }

  let todayViews = 0
  let last7DaysViews = 0
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  data.views.forEach((pv) => {
    const pvDate = pv.timestamp.split('T')[0]
    if (dailyStatsMap[pvDate]) {
      dailyStatsMap[pvDate].views++
    }
    if (pvDate === today) {
      todayViews++
    }
    if (new Date(pv.timestamp) >= sevenDaysAgo) {
      last7DaysViews++
    }

    // Top pages
    if (!pageCountMap[pv.path]) {
      pageCountMap[pv.path] = { count: 0, title: pv.title }
    }
    pageCountMap[pv.path].count++

    // Device
    if (pv.device in deviceStats) {
      deviceStats[pv.device]++
    }

    // Language
    if (pv.language === 'en') {
      languageStats.en++
    } else {
      languageStats.tr++
    }
  })

  // Populate uniques per day
  let totalUniqueSet = new Set<string>()
  let todayUniques = 0

  if (data.visitorDays) {
    Object.entries(data.visitorDays).forEach(([dStr, uList]) => {
      if (dailyStatsMap[dStr]) {
        dailyStatsMap[dStr].uniques = uList.length
      }
      if (dStr === today) {
        todayUniques = uList.length
      }
      uList.forEach((uid) => totalUniqueSet.add(uid))
    })
  }

  const dailyStats: DailyStat[] = Object.entries(dailyStatsMap).map(([date, st]) => ({
    date,
    views: st.views,
    uniques: st.uniques,
  }))

  const topPages = Object.entries(pageCountMap)
    .map(([path, info]) => ({ path, count: info.count, title: info.title }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  return {
    totalViews: data.views.length,
    totalUniques: Math.max(totalUniqueSet.size, 1),
    todayViews,
    todayUniques,
    last7DaysViews,
    dailyStats,
    topPages,
    deviceStats,
    languageStats,
  }
}

// Google Analytics 4 Management
export function getGoogleAnalyticsId(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(GA4_STORAGE_KEY) || ''
}

export function setGoogleAnalyticsId(id: string): void {
  if (typeof window === 'undefined') return
  const clean = id.trim()
  if (clean) {
    localStorage.setItem(GA4_STORAGE_KEY, clean)
    initGoogleAnalytics(clean)
  } else {
    localStorage.removeItem(GA4_STORAGE_KEY)
  }
}

export function initGoogleAnalytics(measurementId?: string): void {
  if (typeof window === 'undefined') return
  const id = measurementId || getGoogleAnalyticsId()
  if (!id || !id.startsWith('G-')) return

  if (document.getElementById('ga4-script')) return

  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  const inlineScript = document.createElement('script')
  inlineScript.id = 'ga4-inline-script'
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `
  document.head.appendChild(inlineScript)
}
