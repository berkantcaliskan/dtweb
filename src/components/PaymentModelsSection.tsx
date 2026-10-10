import React, { useState, useMemo } from 'react'
import { FINANCING_ADVANTAGES, COMPANY_INFO } from '../data/websiteData'
import { Bus, CheckCircle2, ShieldCheck, FileCheck, Layers, Award, MessageSquare, Calculator, Percent, Calendar, ArrowRight, RefreshCw, Car, Banknote, Sparkles, Info } from 'lucide-react'
import { submitLeadToPortfoy } from '../services/leadService'

export const PaymentModelsSection: React.FC = () => {
  // Tour Booking State
  const [tourName, setTourName] = useState('')
  const [tourPhone, setTourPhone] = useState('')
  const [tourCity, setTourCity] = useState('İstanbul')
  const [tourTransportChoice, setTourTransportChoice] = useState('Pazar Günü (VIP Servis)')
  const [tourSubmitted, setTourSubmitted] = useState(false)

  // Interactive Payment Calculator State (Min 3.250.000 ₺, Peşinat %25 - %36, Maks 40 Ay Vade)
  const [selectedBudget, setSelectedBudget] = useState<number>(3250000)
  const [downPaymentRatio, setDownPaymentRatio] = useState<number>(25) // %25 min, %36 maks
  const [termMonths, setTermMonths] = useState<number>(40) // 40 ay maks

  // Preset Budget Options (1+1, 2+1, Bahçe Katı - En düşük 3.250.000 ₺)
  const budgetPresets = [
    { label: '1+1 Daire', value: 3250000 },
    { label: '2+1 Daire', value: 4250000 },
    { label: 'Bahçe Katı', value: 4950000 },
  ]

  // Calculated Values
  const calculation = useMemo(() => {
    const downPaymentAmount = Math.round((selectedBudget * downPaymentRatio) / 100)
    const remainingAmount = selectedBudget - downPaymentAmount
    const monthlyInstallment = Math.round(remainingAmount / termMonths)

    return {
      downPaymentAmount,
      remainingAmount,
      monthlyInstallment,
      formattedBudget: selectedBudget.toLocaleString('tr-TR'),
      formattedDownPayment: downPaymentAmount.toLocaleString('tr-TR'),
      formattedRemaining: remainingAmount.toLocaleString('tr-TR'),
      formattedMonthly: monthlyInstallment.toLocaleString('tr-TR'),
    }
  }, [selectedBudget, downPaymentRatio, termMonths])

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tourPhone.trim()) return

    submitLeadToPortfoy({
      fullName: tourName,
      phone: tourPhone,
      formName: 'Ücretsiz Tanıtım Turu',
      channel: 'Web Sitesi / Ödeme Modelleri & Tanıtım Turu Bölümü',
      notes: `Kalkış Şehri: ${tourCity} | Katılım Şekli: ${tourTransportChoice}`,
      tags: ['Web Sitesi', 'Ödeme Modelleri', 'Tanıtım Turu', tourCity, tourTransportChoice === 'Kendi Aracımla Geleceğim' ? 'Kendi Aracı' : 'Pazar VIP Servis'],
    })

    setTourSubmitted(true)
  }

  // Payment Models Data
  const paymentModels = [
    {
      id: 'senet',
      title: 'Kredisiz & Kefilsiz Elden Senet',
      badge: 'EN ÇOK TERCİH EDİLEN',
      highlightColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      icon: Layers,
      summary: 'Banka kredisi, faiz veya dosya masrafı olmadan, doğrudan Demirtürk İnşaat bünyesinde 40 aya varan elden senet modeli.',
      features: [
        'Peşinat sonrası 40 aya varan eşit senet taksitleri',
        'Banka faizi ve dosya masrafı yok',
        'Kredi notu sorgusu veya kefil zorunluluğu yok',
        'Senetler bankalara devredilmez, şirket bünyesinde kalır',
      ],
    },
    {
      id: 'pesin',
      title: 'Peşin & Lansman İndirimi',
      badge: 'MAKSİMUM FİYAT AVANTAJI',
      highlightColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      icon: Banknote,
      summary: 'Tamamı peşin alımlarda projelere özel doğrudan nakit iskontosu ve hemen tapu devir imkânı.',
      features: [
        'Nakit alımlarda %10 - %15 lansman fiyat indirimi',
        'Hemen tapu devri ve anahtar teslimi',
        'Gününde ve güvenilir yatırım getirisi',
        'Proje başlangıç aşamalarında en yüksek prim marjı',
      ],
    },
    {
      id: 'ara-odeme',
      title: 'Kişiye Özel Esnek Ara Ödemeli Plan',
      badge: 'KİŞİYE ÖZEL PLANLAMA',
      highlightColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      icon: Calendar,
      summary: 'Aylık taksitleri düşük tutup hasat, prim veya ikramiye dönemlerinize uygun ara ödemeler ile esnek plan.',
      features: [
        'Düşük tutarlı aylık taksit konforu',
        'Yılda 1 veya 2 kez bütçenize göre planlanan ara ödemeler',
        'Tarım, fındık hasadı veya dönemsel gelire uyarlanabilirlik',
        'Kendi nakit akışınıza göre şekillenen ödeme takvimi',
      ],
    },
    {
      id: 'takas',
      title: 'Değerinde Araç & Gayrimenkul Takası',
      badge: 'DEĞERİNDE TAKAS',
      highlightColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      icon: Car,
      summary: 'Mevcut aracınızı veya mülkünüzü güncel piyasa ekspertiz değeriyle peşinata ya da konut bedeline sayma ayrıcalığı.',
      features: [
        'Binek veya hafif ticari araçlarda değerinde takas',
        'Marmara bölgesi arsa veya gayrimenkul takas olanağı',
        'Nakit bağlamadan yeni projeye doğrudan geçiş',
        'Şeffaf, güvenli ve hızlı mülkiyet devir süreçleri',
      ],
    },
  ]

  return (
    <section id="odeme-modelleri" className="py-12 sm:py-20 md:py-28 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative">
      {/* Anchor for backward compatibility with #finansman */}
      <div id="finansman" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>ÖDEME MODELLERİ & FİNANSMAN / PAYMENT MODELS</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1] leading-tight">
            Banka Kredisiz, Kefilsiz — Esnek Ödeme Modellerimiz
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            20 yılı aşkın süredir Karasu’da güven inşa eden Demirtürk İnşaat ile ev sahibi olmak faizsiz, bankasız ve bürokrasiden uzak. Bütçenize göre şekillenen 4 farklı modelle hayalinizdeki sahil evine hemen sahip olun.
          </p>
        </div>

        {/* 1. 4 Core Payment Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 sm:mb-20">
          {paymentModels.map((model) => {
            const Icon = model.icon
            return (
              <div
                key={model.id}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-[#fffff1]/15 hover:border-[#fffff1]/35 transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-md border ${model.highlightColor}`}>
                      {model.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-[#fffff1]/15 flex items-center justify-center text-[#fffff1]/80 group-hover:text-white group-hover:border-[#fffff1]/30 transition-all flex-shrink-0">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-theSeasons text-xl font-bold text-[#fffff1] mb-2.5 leading-snug">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light leading-relaxed mb-6">
                    {model.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#fffff1]/10 space-y-2">
                  {model.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-[12px] text-[#fffff1]/85">
                      <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="font-light leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 2. Interactive Installment Calculator (Simülatör) */}
        <div className="mb-14 sm:mb-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl border border-[#fffff1]/20 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#fffff1]/70 font-semibold mb-2">
              <Calculator size={15} className="text-[#fffff1]" />
              <span>İNTERAKTİF SENET & TAKSİT HESAPLAYICI</span>
            </div>
            <h3 className="font-theSeasons text-2xl sm:text-4xl font-bold text-[#fffff1]">
              Kendi Ödeme Planınızı Simüle Edin
            </h3>
            <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light mt-2">
              Konut bütçenizi, peşinat oranınızı ve vade sürenizi belirleyin; 0 faizli şirket bünyesi senet planınızı anında görün.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Preset Budget Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fffff1]/80 mb-2 font-medium">
                  Konut / Bütçe Seçimi
                </label>
                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  {budgetPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setSelectedBudget(preset.value)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedBudget === preset.value
                          ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] font-semibold shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/80 border-[#fffff1]/15 text-xs'
                      }`}
                    >
                      <div className="text-[11px] sm:text-xs truncate opacity-90">{preset.label}</div>
                      <div className="text-xs sm:text-sm font-bold mt-0.5 whitespace-nowrap">
                        {(preset.value / 1000000).toFixed(2).replace('.00', '')}M ₺
                      </div>
                    </button>
                  ))}
                </div>

                {/* Range Slider for Budget */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-[#fffff1]/60 font-mono">
                    <span>3.250.000 ₺ (Min)</span>
                    <span className="text-[#fffff1] font-semibold text-sm">{calculation.formattedBudget} ₺</span>
                    <span>7.500.000 ₺</span>
                  </div>
                  <input
                    type="range"
                    min="3250000"
                    max="7500000"
                    step="50000"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#fffff1]"
                  />
                </div>

                {/* Important Price Variance Notice */}
                <div className="mt-3 flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-[#fffff1]/15 text-[11px] sm:text-xs text-[#fffff1]/80 leading-relaxed">
                  <Info size={15} className="text-amber-300 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[#fffff1] font-semibold">Önemli Bilgilendirme:</strong> Belirtilen fiyatlar baz hesaplama değerleridir. Bağımsız bölümün havuz veya peyzaj cephesine, bulunduğu kata ve şerefiye kriterlerine bağlı olarak nihai fiyatlar daha düşük veya daha yüksek olabilmektedir.
                  </span>
                </div>
              </div>

              {/* Down Payment Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#fffff1]/80 font-medium">
                    Peşinat Oranı (%25 Min - %36 Maks)
                  </label>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    %{downPaymentRatio} Peşinat ({calculation.formattedDownPayment} ₺)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2.5">
                  {[25, 28, 32, 36].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setDownPaymentRatio(ratio)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        downPaymentRatio === ratio
                          ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] font-semibold shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/80 border-[#fffff1]/15 text-xs'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold">%{ratio}</span>
                      <span className="block text-[10px] opacity-75">
                        {ratio === 25 ? 'Min' : ratio === 36 ? 'Maks' : 'Öneri'}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#fffff1]/60 font-mono">
                    <span>%25 Min</span>
                    <span>%36 Maks</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="36"
                    step="1"
                    value={downPaymentRatio}
                    onChange={(e) => setDownPaymentRatio(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#fffff1]"
                  />
                </div>
              </div>

              {/* Term (Months) Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fffff1]/80 mb-2 font-medium">
                  Elden Senet Vade Süresi (40 Aya Kadar)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 40].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setTermMonths(months)}
                      className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        termMonths === months
                          ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] font-semibold shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/80 border-[#fffff1]/15 text-xs'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold">{months} Ay</span>
                      {months === 40 && (
                        <span className="block text-[10px] text-emerald-400 font-semibold">Maks Vade</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/40 border border-[#fffff1]/20 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#fffff1]/10">
                <span className="text-xs tracking-wider uppercase text-[#fffff1]/70 font-medium">
                  Ödeme Planı Özeti
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  0 Faiz — Kredisiz
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">Toplam Konut Değeri:</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedBudget} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">Peşinat Tutarı (%{downPaymentRatio}):</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedDownPayment} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">Kalan Senet Bakiyesi:</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedRemaining} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">Vade Sayısı:</span>
                  <span className="text-[#fffff1] font-semibold">{termMonths} Ay Eşit Senet</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-emerald-400">
                  <span className="font-light">Banka Faiz & Dosya Masrafı:</span>
                  <span className="font-bold">0 ₺ (Muaf)</span>
                </div>
              </div>

              {/* Big Monthly Installment Highlight */}
              <div className="p-4 rounded-xl bg-white/[0.08] border border-[#fffff1]/20 text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#fffff1]/75 block font-medium">
                  Aylık Senet Taksiti
                </span>
                <div className="font-theSeasons text-3xl sm:text-4xl font-bold text-[#fffff1] mt-1">
                  {calculation.formattedMonthly} <span className="text-xl font-normal">₺</span>
                </div>
                <span className="text-[11px] text-[#fffff1]/60 block mt-1">
                  *Doğrudan Demirtürk İnşaat garantili elden senet modeli
                </span>
              </div>

              {/* WhatsApp Call to Action */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  `Merhaba Demirtürk İnşaat, web sitenizdeki Ödeme Modelleri hesaplayıcısı üzerinden şu planı inceledim:\n\n• Konut Tutarı: ${calculation.formattedBudget} ₺\n• Peşinat (%${downPaymentRatio}): ${calculation.formattedDownPayment} ₺\n• Kalan Vade: ${termMonths} Ay\n• Aylık Senet: ${calculation.formattedMonthly} ₺\n\nBu ödeme planına uygun güncel projeleriniz ve rezervasyon hakkında detaylı bilgi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg hover:shadow-emerald-900/30"
              >
                <MessageSquare size={16} />
                <span>Bu Plan İçin WhatsApp'tan Teklif Al</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Dual Modules: Legal Guarantees & Free Tour Reservation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module 1: Elden Senet Modeli Güvenceleri (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-[#fffff1]/15 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1] flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
                  Elden Senetli Satış Modeli İlkelerimiz
                </h3>
                <p className="text-sm text-[#fffff1]/70 font-light">
                  Şeffaf, güvenilir ve doğrudan üretici garantili gayrimenkul edinimi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <FileCheck size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Banka ve Kredi Yok</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Kredi notu sorgulaması, dosya masrafı, banka komisyonu veya kefil zorunluluğu bulunmaz.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Layers size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Esnek Vade</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Gelir durumunuza ve bütçenize göre esnek, proje bazlı kişiselleştirilmiş vade planı sunulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Award size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Doğrudan Üreticiden</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Senetleriniz 3. parti finans kurumlarına devredilmez, doğrudan Demirtürk İnşaat bünyesinde tutulur.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <ShieldCheck size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">Kurumsal Sözleşme Güvencesi</span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  Tüm satış, teslim ve teknik taahhüt süreçleri şeffaf kurumsal sözleşme ve şartnamelerle güvence altına alınır.
                </p>
              </div>
            </div>

            {/* Direct Consult CTA */}
            <div className="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                  KİŞİYE ÖZEL ÖDEME PLANI
                </span>
                <span className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] mt-1 block">
                  Size Özel Vade Planını Konuşalım
                </span>
                <span className="text-xs text-[#fffff1]/65 block mt-1 font-light">
                  Satış danışmanlarımız projelere özel alternatif ödeme planlarını sizin için hazırlasın.
                </span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba,%20elden%20senetli%20%C3%B6deme%20planlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="glass-blur-box px-5 py-2.5 sm:px-6 sm:py-3 text-[#fffff1] font-normal text-xs sm:text-sm uppercase tracking-wider rounded-2xl text-center whitespace-nowrap transition-all shadow-md hover:border-[#fffff1]/40 cursor-pointer flex-shrink-0"
              >
                Bilgi Alın
              </a>
            </div>
          </div>

          {/* Module 2: Free Karasu Tour Booking (5 Cols) */}
          <div id="tanitim-turu" className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-[#fffff1]/15 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#fffff1]/10">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 text-[#fffff1] flex items-center justify-center font-bold flex-shrink-0">
                <Bus size={20} />
              </div>
              <div>
                <span className="text-xs tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                  ÜCRETSİZ MİSAFİRİMİZ OLUN
                </span>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  Karasu Tanıtım Turu
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
              Her Pazar günü İstanbul, Kocaeli ve Sakarya’dan kalkan özel VIP transfer aracımızla ya da kendi aracınızla gelin; havuzlu sitelerimizi, sahil şeridini ve örnek dairelerimizi yerinde canlı olarak görün.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#fffff1]/90">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>İstanbul, Kocaeli ve Sakarya’dan Pazar günleri VIP transfer</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Örnek daire, peyzaj ve havuz alanlarının gezilmesi</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Karasu sahil bandı ve bölge gelişimi hakkında brifing</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>Öğle yemeği ve ikramlar dahil — tamamen ücretsiz</span>
              </div>
            </div>

            {/* Quick Reservation Form */}
            {tourSubmitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-sm text-emerald-200 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-emerald-100">Rezervasyon Talebiniz Alındı!</h4>
                    <p className="text-xs text-emerald-300/80">Kayıt başarıyla Portföy CRM sistemimize iletildi.</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#fffff1]/80 leading-relaxed font-light">
                  Müşteri temsilcimiz transfer detayları ve hareket noktası teyidi için sizi en kısa sürede arayacaktır. Dilerseniz başvurunuzu WhatsApp üzerinden de paylaşabilirsiniz:
                </p>

                <div className="bg-black/25 rounded-xl p-3 text-xs text-[#fffff1]/80 border border-[#fffff1]/10 space-y-1">
                  <div><span className="text-[#fffff1]/50">Ad Soyad:</span> {tourName || 'Belirtilmedi'}</div>
                  <div><span className="text-[#fffff1]/50">Telefon:</span> {tourPhone}</div>
                  <div><span className="text-[#fffff1]/50">Kalkış Şehri:</span> {tourCity}</div>
                  <div><span className="text-[#fffff1]/50">Katılım & Ulaşım:</span> {tourTransportChoice}</div>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                    `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için web sitenizden rezervasyon başvurumu ilettim:\n\n• İsim: ${tourName || 'Belirtilmedi'}\n• Telefon: ${tourPhone}\n• Kalkış Şehri: ${tourCity}\n• Katılım & Ulaşım: ${tourTransportChoice}\n\nTur ve rezervasyon detaylarını teyit etmek istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 hover:border-emerald-500/60 text-emerald-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare size={16} className="text-emerald-400" />
                  <span>WhatsApp’ta Paylaş / Onayla</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                    Telefon <span className="text-[#fffff1]/70">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={tourPhone}
                    onChange={(e) => setTourPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      Kalkış Şehri
                    </label>
                    <select
                      value={tourCity}
                      onChange={(e) => setTourCity(e.target.value)}
                      className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                    >
                      <option value="İstanbul">İstanbul</option>
                      <option value="Kocaeli">Kocaeli / Gebze</option>
                      <option value="Sakarya">Sakarya / Adapazarı</option>
                      <option value="Diğer Şehir">Diğer Şehir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      Ulaşım Şekli
                    </label>
                    <select
                      value={tourTransportChoice}
                      onChange={(e) => setTourTransportChoice(e.target.value)}
                      className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                    >
                      <option value="Pazar Günü (VIP Servis)">Pazar VIP Transfer</option>
                      <option value="Kendi Aracımla Geleceğim">Kendi Aracımla</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#fffff1] text-[#252c33] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all hover:bg-white active:scale-[0.99] cursor-pointer shadow-lg mt-2 flex items-center justify-center space-x-2"
                >
                  <span>Ücretsiz Tura Kayıt Ol</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
