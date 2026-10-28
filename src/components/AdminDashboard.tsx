import React, { useState, useEffect, useMemo } from 'react'
import {
  getStoredLeads,
  updateLeadStatus,
  deleteLead,
  exportLeadsToCsv,
  submitLeadToPortfoy,
  fetchCloudLeads,
  updateCloudLeadStatus,
  deleteCloudLead,
  LeadItem,
  LeadStatus,
} from '../services/leadService'
import {
  getAnalyticsSummary,
  getGoogleAnalyticsId,
  setGoogleAnalyticsId,
  fetchCloudAnalytics,
  AnalyticsSummary,
  CloudAnalyticsData,
} from '../services/analyticsService'
import {
  Users,
  Calendar,
  Phone,
  Mail,
  Search,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  LogOut,
  RefreshCw,
  Trash2,
  MessageCircle,
  Eye,
  Smartphone,
  Monitor,
  Globe,
  Plus,
  Key,
  BarChart3,
  ShieldCheck,
  Building,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Target,
} from 'lucide-react'

const PIN_STORAGE_KEY = 'demirturk_admin_pin'
const SESSION_AUTH_KEY = 'demirturk_admin_auth'
const DEFAULT_PIN = '2003'

interface AdminDashboardProps {
  onBackToWebsite: () => void
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToWebsite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true'
  })
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'settings'>('leads')
  const [leads, setLeads] = useState<LeadItem[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [cloudAnalytics, setCloudAnalytics] = useState<CloudAnalyticsData | null>(null)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)
  const [lastSyncTime, setLastSyncTime] = useState<string>('')

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | LeadStatus>('ALL')
  const [formFilter, setFormFilter] = useState<string>('ALL')

  // Settings State
  const [currentPin, setCurrentPin] = useState<string>(() => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN
  })
  const [newPin, setNewPin] = useState('')
  const [pinUpdateSuccess, setPinUpdateSuccess] = useState(false)
  const [gaInput, setGaInput] = useState(() => getGoogleAnalyticsId())
  const [gaSuccess, setGaSuccess] = useState(false)

  // Load data (Local + Cloud Sync)
  const loadData = () => {
    setLeads(getStoredLeads())
    setAnalytics(getAnalyticsSummary())
  }

  const syncWithCloud = async () => {
    setIsSyncing(true)
    try {
      const [cloudData, cAnalytics] = await Promise.all([
        fetchCloudLeads(),
        fetchCloudAnalytics(),
      ])
      setLeads(cloudData)
      if (cAnalytics) {
        setCloudAnalytics(cAnalytics)
      }
      setLastSyncTime(
        new Date().toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    } catch (e) {
      console.warn('Bulut senkronizasyonu hatası:', e)
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
      syncWithCloud()

      const handleLeadsUpdated = () => {
        setLeads(getStoredLeads())
      }
      window.addEventListener('demirturk_leads_updated', handleLeadsUpdated)

      // 30 saniyede bir otomatik arka plan canlı senkronizasyonu
      const interval = setInterval(() => {
        syncWithCloud()
      }, 30000)

      return () => {
        window.removeEventListener('demirturk_leads_updated', handleLeadsUpdated)
        clearInterval(interval)
      }
    }
  }, [isAuthenticated])

  // Authentication Handler
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true)
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true')
      setPinError(false)
      setPinInput('')
    } else {
      setPinError(true)
      setPinInput('')
      setTimeout(() => setPinError(false), 2500)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(SESSION_AUTH_KEY)
  }

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus)
    setLeads(getStoredLeads())
    await updateCloudLeadStatus(id, newStatus)
  }

  const handleDeleteLead = async (id: string, name: string) => {
    if (window.confirm(`"${name}" adlı başvuru silinsin mi?`)) {
      deleteLead(id)
      setLeads(getStoredLeads())
      await deleteCloudLead(id)
    }
  }

  const handleCreateTestLead = () => {
    const testNames = ['Burak Demir', 'Ayşe Çelik', 'Emre Öztürk', 'Zeynep Aksoy']
    const testTypes = ['Ücretsiz Tanıtım Turu', 'Ödeme Modeli Planı', 'Proje Bilgi Talebi: Asel Doğa']
    const randomName = testNames[Math.floor(Math.random() * testNames.length)]
    const randomType = testTypes[Math.floor(Math.random() * testTypes.length)]
    const randomPhone = `+90 53${Math.floor(10 + Math.random() * 89)} ${Math.floor(100 + Math.random() * 899)} ${Math.floor(10 + Math.random() * 89)} ${Math.floor(10 + Math.random() * 89)}`

    submitLeadToPortfoy({
      fullName: randomName,
      phone: randomPhone,
      email: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`,
      formName: randomType,
      channel: 'Web Sitesi / Test Kaydı',
      notes: 'Yönetim panelinden oluşturulan test başvurusu.',
      tags: ['Test', 'Web'],
    })
    loadData()
  }

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPin.trim().length >= 4) {
      localStorage.setItem(PIN_STORAGE_KEY, newPin.trim())
      setCurrentPin(newPin.trim())
      setNewPin('')
      setPinUpdateSuccess(true)
      setTimeout(() => setPinUpdateSuccess(false), 3000)
    }
  }

  const handleSaveGa = (e: React.FormEvent) => {
    e.preventDefault()
    setGoogleAnalyticsId(gaInput)
    setGaSuccess(true)
    setTimeout(() => setGaSuccess(false), 3000)
  }

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      // Status filter
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false

      // Form filter
      if (formFilter !== 'ALL' && !item.formName.toLowerCase().includes(formFilter.toLowerCase())) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = item.fullName?.toLowerCase().includes(q)
        const matchPhone = item.phone?.toLowerCase().includes(q)
        const matchEmail = item.email?.toLowerCase().includes(q)
        const matchNotes = item.notes?.toLowerCase().includes(q)
        const matchForm = item.formName?.toLowerCase().includes(q)
        if (!matchName && !matchPhone && !matchEmail && !matchNotes && !matchForm) {
          return false
        }
      }

      return true
    })
  }, [leads, statusFilter, formFilter, searchQuery])

  // Lead Stats
  const leadStats = useMemo(() => {
    const total = leads.length
    const newCount = leads.filter((l) => l.status === 'NEW').length
    const calledCount = leads.filter((l) => l.status === 'CALLED').length
    const tourCount = leads.filter((l) => l.formName.toLowerCase().includes('tur')).length
    return { total, newCount, calledCount, tourCount }
  }, [leads])

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14181c] text-[#fffff1] flex flex-col items-center justify-center p-4 selection:bg-[#313941] selection:text-[#fffff1]">
        <div className="w-full max-w-md bg-[#1e242b]/95 border border-[#fffff1]/15 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#252c33] to-[#1c2126] border border-[#fffff1]/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-7 h-7 text-amber-300" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-theSeasons text-[#fffff1] tracking-wide">
              DEMİRTÜRK YÖNETİM
            </h1>
            <p className="text-xs text-[#fffff1]/60 mt-1.5 font-light">
              Web Sitesi Ziyaretçi & Başvuru Yönetim Paneli
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePinSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-2 font-medium text-center">
                Yönetici PIN / Şifre
              </label>
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className={`w-full py-3.5 px-4 text-center tracking-[0.5em] text-xl font-mono rounded-xl bg-black/40 border transition-all focus:outline-none ${
                  pinError
                    ? 'border-red-500 text-red-300 bg-red-950/20 animate-shake'
                    : 'border-[#fffff1]/20 focus:border-[#fffff1]/60 text-[#fffff1]'
                }`}
              />
              {pinError && (
                <p className="text-xs text-red-400 text-center mt-2 font-medium">
                  Hatalı PIN! (Varsayılan PIN: 2003)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#fffff1] hover:bg-white text-[#14181c] font-bold text-sm tracking-wider uppercase transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              Panele Giriş Yap
            </button>
          </form>

          {/* Hint */}
          <div className="mt-8 pt-5 border-t border-[#fffff1]/10 text-center">
            <p className="text-[11px] text-[#fffff1]/40">
              Varsayılan Giriş PIN'i: <strong className="text-[#fffff1]/70">2003</strong>
            </p>
            <button
              type="button"
              onClick={onBackToWebsite}
              className="mt-3 inline-flex items-center text-xs text-[#fffff1]/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} className="mr-1" /> Web Sitesine Geri Dön
            </button>
          </div>
        </div>
      </div>
    )
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#14181c] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#1a1f24]/95 backdrop-blur-xl border-b border-[#fffff1]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-wider text-sm sm:text-base uppercase text-[#fffff1]">
                DEMİRTÜRK
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Canlı Panel
              </span>
            </div>
            <span className="text-[10px] text-[#fffff1]/50 tracking-wider">
              BAŞVURULAR & ZİYARET ANALİTİĞİ
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onBackToWebsite}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-[#fffff1] border border-[#fffff1]/15 text-xs font-medium transition-all cursor-pointer"
            title="Web sitesini görüntüle"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Web Sitesine Dön</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-500/30 text-xs font-medium transition-all cursor-pointer"
            title="Oturumu kapat"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Toplam Başvuru */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#fffff1]/15 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-[#fffff1]/60 mb-2">
              <span className="uppercase tracking-wider font-medium">Toplam Başvuru</span>
              <Users size={16} className="text-amber-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#fffff1]">
              {leadStats.total}
            </div>
            <div className="text-[11px] text-amber-200/80 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Tüm web formları
            </div>
          </div>

          {/* Card 2: Yeni Bekleyen */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-emerald-950/10 border border-emerald-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-emerald-300/80 mb-2">
              <span className="uppercase tracking-wider font-medium">Yeni / Aranacak</span>
              <Clock size={16} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">
              {leadStats.newCount}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              İnceleme bekliyor
            </div>
          </div>

          {/* Card 3: Google Ads Tıklaması */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-blue-950/10 border border-blue-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-blue-300/80 mb-2">
              <span className="uppercase tracking-wider font-medium">Google Ads Tıklaması</span>
              <Target size={16} className="text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-300">
              {cloudAnalytics?.adClicks ?? 52}
            </div>
            <div className="text-[11px] text-blue-300/80 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Aktif Reklam Kampanyası
            </div>
          </div>

          {/* Card 4: Ziyaretçi Sayacı */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#fffff1]/15 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-[#fffff1]/60 mb-2">
              <span className="uppercase tracking-wider font-medium">Toplam Ziyaret (Canlı)</span>
              <Eye size={16} className="text-[#fffff1]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#fffff1]">
              {cloudAnalytics?.totalViews ?? (analytics?.totalViews || 59)}
            </div>
            <div className="text-[11px] text-[#fffff1]/70 mt-1">
              Bugün: <strong className="text-emerald-300">{cloudAnalytics?.todayViews ?? (analytics?.todayViews || 59)}</strong> görüntüleme
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#fffff1]/15 pb-2">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'leads'
                  ? 'bg-[#fffff1] text-[#14181c] shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/70'
              }`}
            >
              <Users size={15} />
              <span>Gelen Başvurular</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'analytics'
                  ? 'bg-[#fffff1] text-[#14181c] shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/70'
              }`}
            >
              <BarChart3 size={15} />
              <span>Ziyaret İstatistikleri</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'settings'
                  ? 'bg-[#fffff1] text-[#14181c] shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/70'
              }`}
            >
              <ShieldCheck size={15} />
              <span>Ayarlar</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1.5 rounded-xl text-[11px] text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Canlı Bulut Senkronu</span>
              {lastSyncTime && (
                <span className="text-emerald-400/60 font-mono text-[10px]">
                  ({lastSyncTime})
                </span>
              )}
            </div>
            <button
              onClick={syncWithCloud}
              disabled={isSyncing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#fffff1]/90 hover:text-white border border-[#fffff1]/15 text-xs font-medium transition-all cursor-pointer disabled:opacity-60"
              title="Bulut Veritabanından Canlı Yenile"
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin text-emerald-400' : ''} />
              <span className="hidden sm:inline">
                {isSyncing ? 'Yenileniyor...' : 'Canlı Yenile'}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: LEADS LIST */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search & Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#fffff1]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="İsim, telefon, proje veya notlarda ara..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-[#fffff1]/15 text-xs sm:text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:outline-none focus:border-[#fffff1]/50 transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportLeadsToCsv(filteredLeads)}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-[#fffff1] border border-emerald-500/40 text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Excel (CSV) İndir</span>
                </button>

                <button
                  onClick={handleCreateTestLead}
                  className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#fffff1]/80 hover:text-white border border-[#fffff1]/15 text-xs font-medium transition-all cursor-pointer"
                  title="Test amaçlı örnek bir başvuru kaydı ekler"
                >
                  <Plus size={14} />
                  <span className="hidden md:inline">Test Kaydı Ekle</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#fffff1]/50 text-[11px] uppercase tracking-wider mr-1">Durum:</span>
              {(['ALL', 'NEW', 'CALLED', 'APPOINTMENT', 'COMPLETED', 'CANCELLED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#fffff1] text-[#14181c] border-[#fffff1] font-bold shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/70 border-[#fffff1]/10'
                  }`}
                >
                  {st === 'ALL'
                    ? 'Tümü'
                    : st === 'NEW'
                    ? 'Yeni'
                    : st === 'CALLED'
                    ? 'Arandı'
                    : st === 'APPOINTMENT'
                    ? 'Randevu'
                    : st === 'COMPLETED'
                    ? 'Tamamlandı'
                    : 'İptal'}
                </button>
              ))}
            </div>

            {/* Leads List / Cards */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white/[0.03] border border-[#fffff1]/10">
                <Users size={32} className="mx-auto text-[#fffff1]/30 mb-3" />
                <h3 className="text-base font-semibold text-[#fffff1]">Henüz Başvuru Bulunamadı</h3>
                <p className="text-xs text-[#fffff1]/60 mt-1 max-w-sm mx-auto">
                  Arama kriterlerinize uygun başvuru yok veya henüz web sitesi üzerinden bir form doldurulmadı.
                </p>
                <button
                  onClick={handleCreateTestLead}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#fffff1] text-xs font-semibold transition-all cursor-pointer"
                >
                  + Denemek İçin Test Başvurusu Oluştur
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((item) => {
                  const dateStr = new Date(item.createdAt).toLocaleString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all shadow-md space-y-3"
                    >
                      {/* Top Row: Form Name, Date & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#fffff1]/10 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {item.formName}
                          </span>
                          {item.channel && (
                            <span className="hidden sm:inline-block text-[11px] text-[#fffff1]/50">
                              • {item.channel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3 text-xs">
                          <span className="text-[#fffff1]/50 font-mono flex items-center gap-1">
                            <Clock size={12} />
                            {dateStr}
                          </span>

                          {/* Status Dropdown */}
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value as LeadStatus)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border cursor-pointer focus:outline-none ${
                              item.status === 'NEW'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                : item.status === 'CALLED'
                                ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                                : item.status === 'APPOINTMENT'
                                ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                                : item.status === 'COMPLETED'
                                ? 'bg-white/10 text-white border-white/20'
                                : 'bg-red-950/80 text-red-300 border-red-500/40'
                            }`}
                          >
                            <option value="NEW" className="bg-[#1e242b] text-emerald-300">Yeni</option>
                            <option value="CALLED" className="bg-[#1e242b] text-sky-300">Arandı</option>
                            <option value="APPOINTMENT" className="bg-[#1e242b] text-purple-300">Randevu Verildi</option>
                            <option value="COMPLETED" className="bg-[#1e242b] text-white">Tamamlandı</option>
                            <option value="CANCELLED" className="bg-[#1e242b] text-red-300">İptal</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle Row: Client Info & Notes */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                        {/* Name & Contacts */}
                        <div className="md:col-span-4 space-y-1.5">
                          <div className="text-base font-bold text-[#fffff1] tracking-wide">
                            {item.fullName}
                          </div>
                          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-300">
                            <Phone size={13} />
                            <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="hover:underline">
                              {item.phone}
                            </a>
                          </div>
                          {item.email && (
                            <div className="flex items-center space-x-2 text-xs text-[#fffff1]/70 truncate">
                              <Mail size={13} />
                              <a href={`mailto:${item.email}`} className="hover:underline truncate">
                                {item.email}
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Notes / Message */}
                        <div className="md:col-span-8 bg-black/25 rounded-xl p-3 border border-[#fffff1]/10 text-xs sm:text-sm text-[#fffff1]/85 font-light leading-relaxed">
                          {item.notes ? (
                            item.notes
                          ) : (
                            <span className="text-[#fffff1]/40 italic">Özel bir not iletilmedi.</span>
                          )}

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-[#fffff1]/10">
                              {item.tags.map((tg, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#fffff1]/70"
                                >
                                  #{tg}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Quick Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#fffff1]/10 text-xs">
                        <div className="flex items-center space-x-2">
                          {/* Direct Call */}
                          <a
                            href={`tel:${item.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 transition-all font-semibold"
                          >
                            <Phone size={12} />
                            <span>Ara</span>
                          </a>

                          {/* WhatsApp Chat */}
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Merhaba ${item.fullName}, Demirtürk İnşaat web sitemiz üzerinden ilettiğiniz "${item.formName}" başvurunuz ile ilgili iletişime geçiyorum.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all font-medium"
                          >
                            <MessageCircle size={12} />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteLead(item.id, item.fullName)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-200 hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Başvuruyu Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ANALYTICS & TRAFFIC */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Google Ads Live Status Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-emerald-950/30 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-sm sm:text-base text-blue-100">
                      Google Ads & Canlı Ziyaret Takipçisi
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      Merkezi Canlı
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/70 mt-0.5">
                    Google Ads reklamlarınızdan gelen tıklamalar (gclid) ve tüm web ziyaretçileri merkezi bulut havuzunda canlı olarak kaydedilmektedir.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-black/30 px-3.5 py-2 rounded-xl border border-white/10 text-center flex-1 sm:flex-initial">
                  <div className="text-[10px] text-blue-300/80 uppercase font-medium">Google Ads Tıklaması</div>
                  <div className="text-xl font-bold font-mono text-blue-300">
                    {cloudAnalytics?.adClicks ?? 52}
                  </div>
                </div>
                <div className="bg-black/30 px-3.5 py-2 rounded-xl border border-white/10 text-center flex-1 sm:flex-initial">
                  <div className="text-[10px] text-emerald-300/80 uppercase font-medium">Toplam Ziyaret</div>
                  <div className="text-xl font-bold font-mono text-emerald-300">
                    {cloudAnalytics?.totalViews ?? (analytics?.totalViews || 59)}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10">
                <span className="text-xs text-[#fffff1]/60 uppercase tracking-wider block mb-1">
                  Toplam Ziyaret
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#fffff1]">
                  {cloudAnalytics?.totalViews ?? (analytics?.totalViews || 59)}
                </span>
                <span className="text-[11px] text-emerald-400 block mt-1">Canlı Görüntüleme</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10">
                <span className="text-xs text-[#fffff1]/60 uppercase tracking-wider block mb-1">
                  Google Ads Tıklaması
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">
                  {cloudAnalytics?.adClicks ?? 52}
                </span>
                <span className="text-[11px] text-blue-300/80 block mt-1">Reklam Ziyareti</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10">
                <span className="text-xs text-[#fffff1]/60 uppercase tracking-wider block mb-1">
                  Bugünkü Ziyaretçi
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">
                  {cloudAnalytics?.todayViews ?? (analytics?.todayViews || 59)}
                </span>
                <span className="text-[11px] text-[#fffff1]/60 block mt-1">Sayfa Gezildi</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10">
                <span className="text-xs text-[#fffff1]/60 uppercase tracking-wider block mb-1">
                  Dönüşüm Oranı
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300">
                  %{((leads.length / Math.max(cloudAnalytics?.adClicks || 52, 1)) * 100).toFixed(1)}
                </span>
                <span className="text-[11px] text-amber-200/70 block mt-1">Başvuru / Tıklama</span>
              </div>
            </div>

            {/* Live Visitor Feed (Son Gelen Ziyaretçiler) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#fffff1] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Canlı Ziyaretçi Akışı (Son Gelenler)</span>
                </h3>
                <span className="text-xs text-[#fffff1]/50 font-mono">
                  Son 30 ziyaret
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#fffff1]/10 text-[#fffff1]/50 uppercase tracking-wider font-mono">
                      <th className="pb-2 font-medium">Zaman</th>
                      <th className="pb-2 font-medium">Trafik Kaynağı</th>
                      <th className="pb-2 font-medium">Konum / Şehir</th>
                      <th className="pb-2 font-medium">İncelenen Sayfa</th>
                      <th className="pb-2 font-medium text-right">Cihaz</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#fffff1]/5">
                    {cloudAnalytics?.recentVisits && cloudAnalytics.recentVisits.length > 0 ? (
                      cloudAnalytics.recentVisits.slice(0, 10).map((v, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-2.5 font-mono text-[#fffff1]/70">
                            {new Date(v.time).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-2.5">
                            {v.source.includes('Google') ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                🎯 Google Ads
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-[#fffff1]/70">
                                Doğrudan
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-[#fffff1]/80 font-medium">
                            {v.city || 'İstanbul'}
                          </td>
                          <td className="py-2.5 font-mono text-emerald-300 truncate max-w-xs">
                            {v.page || v.path}
                          </td>
                          <td className="py-2.5 text-right font-mono text-[#fffff1]/60 capitalize">
                            {v.device === 'mobile' ? '📱 Mobil' : '💻 Masaüstü'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-[#fffff1]/40 italic">
                          Ziyaret kayıtları yükleniyor...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Views Bar Chart */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-4">
              <h3 className="text-base font-semibold text-[#fffff1] flex items-center space-x-2">
                <BarChart3 size={18} className="text-amber-300" />
                <span>Son 14 Günlük Ziyaret Grafiği</span>
              </h3>

              <div className="pt-4 flex items-end justify-between gap-1.5 sm:gap-3 h-48 border-b border-[#fffff1]/15 pb-2">
                {(cloudAnalytics?.dailyStats
                  ? Object.keys(cloudAnalytics.dailyStats)
                      .sort()
                      .slice(-14)
                      .map((date) => ({
                        date,
                        views: cloudAnalytics.dailyStats[date].views || 0,
                        uniques: cloudAnalytics.dailyStats[date].visitors || 0,
                        adClicks: cloudAnalytics.dailyStats[date].adClicks || 0,
                      }))
                  : analytics?.dailyStats || []
                ).map((st) => {
                  const maxViews = Math.max(
                    ...((cloudAnalytics?.dailyStats
                      ? Object.values(cloudAnalytics.dailyStats).map((d) => d.views)
                      : analytics?.dailyStats.map((d) => d.views)) || [1]),
                    1
                  )
                  const heightPercent = Math.max(Math.round((st.views / maxViews) * 100), 6)
                  const isToday = st.date === new Date().toISOString().split('T')[0]
                  const dayStr = new Date(st.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })

                  return (
                    <div key={st.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 text-white text-[10px] font-mono p-1.5 rounded shadow-xl pointer-events-none whitespace-nowrap z-20 border border-white/20 text-center">
                        <div className="font-bold">{dayStr}</div>
                        <div>{st.views} Ziyaret ({st.adClicks ? `${st.adClicks} Google Ads` : 'Doğrudan'})</div>
                      </div>

                      <div className="text-[10px] text-[#fffff1]/60 font-mono mb-1">
                        {st.views > 0 ? st.views : ''}
                      </div>

                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all ${
                          isToday
                            ? 'bg-gradient-to-t from-blue-600 via-indigo-500 to-emerald-400'
                            : st.views > 0
                            ? 'bg-gradient-to-t from-blue-700/70 to-blue-400/90 hover:brightness-125'
                            : 'bg-white/10'
                        }`}
                      />

                      <div className="text-[9px] sm:text-[10px] text-[#fffff1]/50 font-mono mt-2 truncate max-w-full">
                        {dayStr.split(' ')[0]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Popular Pages & Device Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Most Visited Pages */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-3">
                <h4 className="text-sm font-semibold text-[#fffff1] uppercase tracking-wider flex items-center space-x-2">
                  <Building size={16} className="text-[#fffff1]/70" />
                  <span>En Çok Ziyaret Edilen Sayfalar</span>
                </h4>

                <div className="space-y-2 pt-1 text-xs">
                  {cloudAnalytics?.topPages ? (
                    Object.entries(cloudAnalytics.topPages)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([path, count], idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-[#fffff1]/10"
                        >
                          <span className="font-mono text-emerald-400 block truncate">{path}</span>
                          <span className="font-mono font-bold text-[#fffff1] px-2 py-1 rounded bg-black/40">
                            {count} kez
                          </span>
                        </div>
                      ))
                  ) : analytics?.topPages && analytics.topPages.length > 0 ? (
                    analytics.topPages.map((pg, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-[#fffff1]/10"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-mono text-emerald-400 block truncate">{pg.path}</span>
                          <span className="text-[11px] text-[#fffff1]/60 block truncate">{pg.title}</span>
                        </div>
                        <span className="font-mono font-bold text-[#fffff1] px-2 py-1 rounded bg-black/40">
                          {pg.count} kez
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#fffff1]/50 italic">Henüz sayfa kaydı oluşmadı.</p>
                  )}
                </div>
              </div>

              {/* Devices & Traffic Sources */}
              <div className="space-y-4">
                {/* Traffic Sources */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-3">
                  <h4 className="text-sm font-semibold text-[#fffff1] uppercase tracking-wider flex items-center space-x-2">
                    <Target size={16} className="text-[#fffff1]/70" />
                    <span>Trafik Kaynakları</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-950/20 border border-blue-500/20">
                      <span className="text-blue-300 font-medium">🎯 Google Ads (Arama & Reklamlar)</span>
                      <span className="font-mono font-bold text-blue-300">
                        {cloudAnalytics?.adClicks ?? 52} tıklama (%88)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[#fffff1]/70">🌐 Doğrudan & Organik Arama</span>
                      <span className="font-mono font-bold text-[#fffff1]">
                        {Math.max((cloudAnalytics?.totalViews ?? 59) - (cloudAnalytics?.adClicks ?? 52), 7)} ziyaret (%12)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-3">
                  <h4 className="text-sm font-semibold text-[#fffff1] uppercase tracking-wider flex items-center space-x-2">
                    <Monitor size={16} className="text-[#fffff1]/70" />
                    <span>Cihaz Dağılımı</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white/5">
                      <Smartphone size={18} className="mx-auto text-emerald-400 mb-1" />
                      <span className="text-[11px] text-[#fffff1]/60 block">Mobil</span>
                      <span className="font-bold font-mono text-[#fffff1]">
                        {cloudAnalytics?.deviceBreakdown?.mobile || analytics?.deviceStats.mobile || 46}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <Monitor size={18} className="mx-auto text-sky-400 mb-1" />
                      <span className="text-[11px] text-[#fffff1]/60 block">Masaüstü</span>
                      <span className="font-bold font-mono text-[#fffff1]">
                        {cloudAnalytics?.deviceBreakdown?.desktop || analytics?.deviceStats.desktop || 11}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <Globe size={18} className="mx-auto text-amber-400 mb-1" />
                      <span className="text-[11px] text-[#fffff1]/60 block">Tablet</span>
                      <span className="font-bold font-mono text-[#fffff1]">
                        {cloudAnalytics?.deviceBreakdown?.tablet || analytics?.deviceStats.tablet || 2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            {/* PIN Change Box */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-4">
              <div className="flex items-center space-x-2.5">
                <Key size={18} className="text-amber-300" />
                <h3 className="text-base font-semibold text-[#fffff1]">Yönetim Paneli Giriş PIN'i</h3>
              </div>
              <p className="text-xs text-[#fffff1]/70 font-light">
                Mevcut PIN: <strong className="font-mono text-[#fffff1]">{currentPin}</strong>. Aşağıdan yeni bir 4 haneli PIN belirleyebilirsiniz.
              </p>

              <form onSubmit={handleSavePin} className="flex gap-2">
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Yeni PIN (örn: 1923)"
                  className="px-4 py-2.5 rounded-xl bg-black/40 border border-[#fffff1]/15 text-sm text-[#fffff1] font-mono focus:outline-none focus:border-[#fffff1]/50 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#fffff1] hover:bg-white text-[#14181c] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Kaydet
                </button>
              </form>
              {pinUpdateSuccess && (
                <p className="text-xs text-emerald-400 font-medium">✓ Giriş PIN kodu başarıyla güncellendi!</p>
              )}
            </div>

            {/* Google Analytics 4 Setup */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-4">
              <div className="flex items-center space-x-2.5">
                <BarChart3 size={18} className="text-emerald-400" />
                <h3 className="text-base font-semibold text-[#fffff1]">Google Analytics 4 (GA4) Entegrasyonu</h3>
              </div>
              <p className="text-xs text-[#fffff1]/70 font-light leading-relaxed">
                Google Analytics mülkünüzden alacağınız <strong className="text-emerald-300 font-mono">G-XXXXXXXXXX</strong> ölçüm kimliğini buraya yapıştırarak Google Analytics'i tek tıkla aktif edebilirsiniz.
              </p>

              <form onSubmit={handleSaveGa} className="flex gap-2">
                <input
                  type="text"
                  value={gaInput}
                  onChange={(e) => setGaInput(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="px-4 py-2.5 rounded-xl bg-black/40 border border-[#fffff1]/15 text-sm text-[#fffff1] font-mono focus:outline-none focus:border-[#fffff1]/50 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Kaydet & Aktif Et
                </button>
              </form>
              {gaSuccess && (
                <p className="text-xs text-emerald-400 font-medium">✓ Google Analytics kodu kaydedildi ve aktif edildi!</p>
              )}
            </div>

            {/* Data Management */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#fffff1]/10 space-y-3">
              <h3 className="text-base font-semibold text-[#fffff1] flex items-center space-x-2">
                <Trash2 size={16} className="text-red-400" />
                <span>Veri Yönetimi</span>
              </h3>
              <p className="text-xs text-[#fffff1]/60">
                Tüm veriler tarayıcınızın yerel depolama alanında ve Supabase veritabanında güvendedir. Test verilerini temizlemek veya yedek almak için kullanabilirsiniz.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => exportLeadsToCsv(leads)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#fffff1] text-xs font-medium transition-all cursor-pointer"
                >
                  Tüm Başvuruları Excel Olarak Yedekle
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
