import React, { useState, useMemo, useEffect } from 'react'
import { FINANCING_ADVANTAGES, COMPANY_INFO } from '../data/websiteData'
import { Bus, CheckCircle2, ShieldCheck, FileCheck, Layers, Award, MessageCircle, Calculator, Percent, Calendar, ArrowRight, RefreshCw, Car, Banknote, Sparkles, Info } from 'lucide-react'
import { submitLeadToPortfoy } from '../services/leadService'
import { useLanguage } from '../context/LanguageContext'
import { TRANSLATIONS } from '../data/translations'

export const PaymentModelsSection: React.FC = () => {
  const { language, isEN } = useLanguage()
  const t = TRANSLATIONS[language].payment

  // Tour Booking State
  const [tourName, setTourName] = useState('')
  const [tourPhone, setTourPhone] = useState('')
  const [tourCity, setTourCity] = useState(isEN ? 'Istanbul' : 'İstanbul')
  const [tourTransportChoice, setTourTransportChoice] = useState(isEN ? 'Sunday (VIP Shuttle)' : 'Pazar Günü (VIP Servis)')
  const [tourSubmitted, setTourSubmitted] = useState(false)

  // Interactive Payment Calculator State
  const [selectedBudget, setSelectedBudget] = useState<number>(3250000)
  const [downPaymentRatio, setDownPaymentRatio] = useState<number>(25)
  const [customAmount, setCustomAmount] = useState<number | null>(null)
  const [customInputDisplay, setCustomInputDisplay] = useState<string>(() => {
    return Math.round((3250000 * 25) / 100).toLocaleString(isEN ? 'en-US' : 'tr-TR')
  })
  const [termMonths, setTermMonths] = useState<number>(40)

  const formatNumber = (num: number) => {
    return num.toLocaleString(isEN ? 'en-US' : 'tr-TR')
  }

  // Sync formatted display on language toggle
  useEffect(() => {
    const amt = customAmount !== null ? customAmount : Math.round((selectedBudget * downPaymentRatio) / 100)
    setCustomInputDisplay(amt > 0 ? formatNumber(amt) : '')
  }, [isEN])

  const handleBudgetChange = (newBudget: number) => {
    setSelectedBudget(newBudget)
    if (customAmount !== null && customAmount > 0) {
      const capped = Math.min(customAmount, newBudget)
      setCustomAmount(capped)
      setCustomInputDisplay(formatNumber(capped))
      setDownPaymentRatio(Math.max(1, Math.min(99, Math.round((capped / newBudget) * 100))))
    } else {
      const amt = Math.round((newBudget * downPaymentRatio) / 100)
      setCustomInputDisplay(formatNumber(amt))
    }
  }

  const handleSelectPresetRatio = (ratio: number) => {
    setCustomAmount(null)
    setDownPaymentRatio(ratio)
    const amt = Math.round((selectedBudget * ratio) / 100)
    setCustomInputDisplay(formatNumber(amt))
  }

  const handleSliderChange = (newRatio: number) => {
    setCustomAmount(null)
    setDownPaymentRatio(newRatio)
    const amt = Math.round((selectedBudget * newRatio) / 100)
    setCustomInputDisplay(formatNumber(amt))
  }

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      setCustomAmount(0)
      setCustomInputDisplay('')
      setDownPaymentRatio(0)
      return
    }
    const num = parseInt(raw, 10)
    const capped = Math.min(num, selectedBudget)
    setCustomAmount(capped)
    setCustomInputDisplay(formatNumber(capped))
    const ratio = Math.max(1, Math.min(99, Math.round((capped / selectedBudget) * 100)))
    setDownPaymentRatio(ratio)
  }

  // Preset Budget Options (1+1, 2+1, Bahçe Katı - En düşük 3.250.000 ₺)
  const budgetPresets = useMemo(() => [
    { label: isEN ? '1+1 Residence' : '1+1 Daire', value: 3250000 },
    { label: isEN ? '2+1 Residence' : '2+1 Daire', value: 4250000 },
    { label: isEN ? 'Garden Flat' : 'Bahçe Katı', value: 4950000 },
  ], [isEN])

  // Calculated Values
  const calculation = useMemo(() => {
    let downPaymentAmount: number
    if (customAmount !== null && customAmount > 0) {
      downPaymentAmount = customAmount
    } else {
      downPaymentAmount = Math.round((selectedBudget * downPaymentRatio) / 100)
    }
    const remainingAmount = Math.max(0, selectedBudget - downPaymentAmount)
    const monthlyInstallment = Math.round(remainingAmount / termMonths)

    const locale = isEN ? 'en-US' : 'tr-TR'
    return {
      downPaymentAmount,
      remainingAmount,
      monthlyInstallment,
      formattedBudget: selectedBudget.toLocaleString(locale),
      formattedDownPayment: downPaymentAmount.toLocaleString(locale),
      formattedRemaining: remainingAmount.toLocaleString(locale),
      formattedMonthly: monthlyInstallment.toLocaleString(locale),
    }
  }, [selectedBudget, downPaymentRatio, customAmount, termMonths, isEN])

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tourPhone.trim()) return

    submitLeadToPortfoy({
      fullName: tourName,
      phone: tourPhone,
      formName: 'Ücretsiz Tanıtım Turu',
      channel: isEN ? 'Web Sitesi / Ödeme Modelleri & Tanıtım Turu Bölümü (EN)' : 'Web Sitesi / Ödeme Modelleri & Tanıtım Turu Bölümü',
      preferredHousingType: 'Tanıtım Turu',
      notes: `Kalkış Şehri: ${tourCity} | Katılım Şekli: ${tourTransportChoice}`,
      tags: ['Web Sitesi', 'Ödeme Modelleri', 'Tanıtım Turu', tourCity, tourTransportChoice.includes('Aracı') || tourTransportChoice.includes('Own') ? 'Kendi Aracı' : 'Pazar VIP Servis'],
    })

    setTourSubmitted(true)
  }

  // Payment Models Data
  const paymentModels = useMemo(() => [
    {
      id: 'senet',
      title: t.card1Title,
      badge: t.mostPreferred,
      highlightColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      icon: Layers,
      summary: t.card1Summary,
      features: t.card1Features,
    },
    {
      id: 'pesin',
      title: t.card2Title,
      badge: t.cashDiscount,
      highlightColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      icon: Banknote,
      summary: t.card2Summary,
      features: t.card2Features,
    },
    {
      id: 'ara-odeme',
      title: t.card4Title,
      badge: t.flexibleModel,
      highlightColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      icon: Calendar,
      summary: t.card4Summary,
      features: t.card4Features,
    },
    {
      id: 'takas',
      title: t.card3Title,
      badge: t.tradeIn,
      highlightColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      icon: Car,
      summary: t.card3Summary,
      features: t.card3Features,
    },
  ], [t])


  return (
    <section id="odeme-modelleri" className="py-12 sm:py-20 md:py-28 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative">
      {/* Anchor for backward compatibility with #finansman */}
      <div id="finansman" className="absolute -top-24 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1] leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            {t.desc}
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
              <span>{isEN ? 'INTERACTIVE INSTALLMENT & PAYMENT CALCULATOR' : 'İNTERAKTİF SENET & TAKSİT HESAPLAYICI'}</span>
            </div>
            <h3 className="font-theSeasons text-2xl sm:text-4xl font-bold text-[#fffff1]">
              {t.calcTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light mt-2">
              {t.calcSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Preset Budget Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fffff1]/80 mb-2 font-medium">
                  {t.budgetSelect}
                </label>
                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  {budgetPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handleBudgetChange(preset.value)}
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
                    <span>3.250.000 ₺ ({isEN ? 'Min' : 'Min'})</span>
                    <span className="text-[#fffff1] font-semibold text-sm">{calculation.formattedBudget} ₺</span>
                    <span>7.500.000 ₺</span>
                  </div>
                  <input
                    type="range"
                    min="3250000"
                    max="7500000"
                    step="50000"
                    value={selectedBudget}
                    onChange={(e) => handleBudgetChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#fffff1]"
                  />
                </div>

                {/* Important Price Variance Notice */}
                <div className="mt-3 flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-[#fffff1]/15 text-[11px] sm:text-xs text-[#fffff1]/80 leading-relaxed">
                  <Info size={15} className="text-amber-300 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-[#fffff1] font-semibold">
                      {isEN ? 'Important Notice: ' : 'Önemli Bilgilendirme: '}
                    </strong>
                    {isEN
                      ? 'Stated figures represent baseline estimates. Final prices may adjust lower or higher according to floor level, facade orientation (pool or landscaped gardens), and architectural goodwill criteria.'
                      : 'Belirtilen fiyatlar baz hesaplama değerleridir. Bağımsız bölümün havuz veya peyzaj cephesine, bulunduğu kata ve şerefiye kriterlerine bağlı olarak nihai fiyatlar daha düşük veya daha yüksek olabilmektedir.'}
                  </span>
                </div>
              </div>

              {/* Down Payment Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#fffff1]/80 font-medium">
                    {t.downPaymentRatio}
                  </label>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    {isEN
                      ? `${downPaymentRatio}% Down Payment (${calculation.formattedDownPayment} ₺)`
                      : `%${downPaymentRatio} Peşinat (${calculation.formattedDownPayment} ₺)`}
                  </span>
                </div>

                {/* %25, %36 & Kendiniz belirleyin */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                  {/* %25 Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectPresetRatio(25)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      customAmount === null && downPaymentRatio === 25
                        ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] font-semibold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/80 border-[#fffff1]/15 text-xs'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{isEN ? '25%' : '%25'}</span>
                    <span className="block text-[10px] opacity-75">{isEN ? 'Min' : 'Min'}</span>
                  </button>

                  {/* %36 Button - 'Maks' ibaresi tamamen kaldırıldı */}
                  <button
                    type="button"
                    onClick={() => handleSelectPresetRatio(36)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                      customAmount === null && downPaymentRatio === 36
                        ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] font-semibold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-[#fffff1]/80 border-[#fffff1]/15 text-xs'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{isEN ? '36%' : '%36'}</span>
                  </button>

                  {/* Kendiniz belirleyin (Ziyaretçi kendi miktarını girebilir) */}
                  <div
                    className={`col-span-2 py-1.5 px-3 rounded-xl border transition-all flex flex-col justify-between ${
                      (customAmount !== null || (downPaymentRatio !== 25 && downPaymentRatio !== 36))
                        ? 'bg-white/10 border-[#fffff1] shadow-md ring-1 ring-[#fffff1]/30'
                        : 'bg-white/5 border-[#fffff1]/15 hover:border-[#fffff1]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#fffff1]/75 font-semibold block leading-tight">
                        {isEN ? 'Set your own' : 'Kendiniz belirleyin'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        %{downPaymentRatio}
                      </span>
                    </div>
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={customInputDisplay}
                        onChange={handleCustomInputChange}
                        onFocus={() => {
                          if (customAmount === null) {
                            setCustomAmount(Math.round((selectedBudget * downPaymentRatio) / 100))
                          }
                        }}
                        placeholder={isEN ? 'Enter amount...' : 'Miktar girin...'}
                        className="w-full bg-transparent text-[#fffff1] text-xs sm:text-sm font-bold font-mono placeholder-[#fffff1]/30 focus:outline-none pr-5"
                      />
                      <span className="absolute right-0 text-xs text-[#fffff1]/60 font-mono font-semibold pointer-events-none">
                        ₺
                      </span>
                    </div>
                  </div>
                </div>

                {/* Range Slider for Down Payment (%25 - %75 Esnek) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#fffff1]/60 font-mono">
                    <span>{isEN ? '25% Min' : '%25 Min'}</span>
                    <span>{isEN ? '75% Flexible' : '%75 Esnek'}</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="75"
                    step="1"
                    value={downPaymentRatio}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#fffff1]"
                  />
                  {downPaymentRatio < 25 && (
                    <p className="text-[11px] text-amber-300/90 pt-0.5 flex items-center gap-1 font-light">
                      <Info size={12} className="flex-shrink-0" />
                      <span>{isEN ? 'Standard minimum down payment is 25%. Tailored terms available.' : 'Standart asgari peşinat oranı %25\'tir. Özel ödeme koşulları için danışınız.'}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Term (Months) Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fffff1]/80 mb-2 font-medium">
                  {t.termMonths}
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
                      <span className="text-xs sm:text-sm font-bold">{months} {t.months}</span>
                      {months === 40 && (
                        <span className="block text-[10px] text-emerald-400 font-semibold">{isEN ? 'Max Term' : 'Maks Vade'}</span>
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
                  {isEN ? 'Payment Plan Summary' : 'Ödeme Planı Özeti'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isEN ? '0% Interest — In-House' : '0 Faiz — Kredisiz'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">{isEN ? 'Total Residence Value:' : 'Toplam Konut Değeri:'}</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedBudget} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">{t.downPaymentAmount} ({isEN ? `${downPaymentRatio}%` : `%${downPaymentRatio}`}):</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedDownPayment} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">{t.remainingAmount}:</span>
                  <span className="text-[#fffff1] font-semibold">{calculation.formattedRemaining} ₺</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#fffff1]/70 font-light">{isEN ? 'Installment Term:' : 'Vade Sayısı:'}</span>
                  <span className="text-[#fffff1] font-semibold">{termMonths} {t.months}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-emerald-400">
                  <span className="font-light">{isEN ? 'Bank Interest & Fees:' : 'Banka Faiz & Dosya Masrafı:'}</span>
                  <span className="font-bold">{isEN ? '0 ₺ (Exempt)' : '0 ₺ (Muaf)'}</span>
                </div>
              </div>

              {/* Big Monthly Installment Highlight */}
              <div className="p-4 rounded-xl bg-white/[0.08] border border-[#fffff1]/20 text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#fffff1]/75 block font-medium">
                  {t.monthlyInstallment}
                </span>
                <div className="font-theSeasons text-3xl sm:text-4xl font-bold text-[#fffff1] mt-1">
                  {calculation.formattedMonthly} <span className="text-xl font-normal">₺</span>
                </div>
                <span className="text-[11px] text-[#fffff1]/60 block mt-1">
                  {t.tailoredNote}
                </span>
              </div>

              {/* WhatsApp Call to Action */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  isEN
                    ? `Hello Demirtürk Construction, I reviewed this plan on your Payment Models calculator:\n\n• Unit Price: ${calculation.formattedBudget} ₺\n• Down Payment (${downPaymentRatio}%): ${calculation.formattedDownPayment} ₺\n• Term: ${termMonths} Months\n• Monthly: ${calculation.formattedMonthly} ₺\n\nI would like to receive detailed information on suitable projects and reservations.`
                    : `Merhaba Demirtürk İnşaat, web sitenizdeki Ödeme Modelleri hesaplayıcısı üzerinden şu planı inceledim:\n\n• Konut Tutarı: ${calculation.formattedBudget} ₺\n• Peşinat (%${downPaymentRatio}): ${calculation.formattedDownPayment} ₺\n• Kalan Vade: ${termMonths} Ay\n• Aylık Senet: ${calculation.formattedMonthly} ₺\n\nBu ödeme planına uygun güncel projeleriniz ve rezervasyon hakkında detaylı bilgi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-3 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] sm:text-xs xl:text-[13px] uppercase tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg hover:shadow-emerald-900/30 whitespace-nowrap"
              >
                <MessageCircle size={18} className="flex-shrink-0" />
                <span className="whitespace-nowrap">{isEN ? 'Get Offer on WhatsApp for This Plan' : "Bu Plan İçin WhatsApp'tan Teklif Al"}</span>
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
                  {t.principlesTitle}
                </h3>
                <p className="text-sm text-[#fffff1]/70 font-light">
                  {t.principlesSub}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <FileCheck size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">
                    {isEN ? 'No Bank or Credit' : 'Banka ve Kredi Yok'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  {isEN
                    ? 'No credit score checks, processing fees, bank commissions, or guarantor obligations.'
                    : 'Kredi notu sorgulaması, dosya masrafı, banka komisyonu veya kefil zorunluluğu bulunmaz.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Layers size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">
                    {isEN ? 'Flexible Terms' : 'Esnek Vade'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  {isEN
                    ? 'Personalized installment schedules structured to harmonize with your family budget.'
                    : 'Gelir durumunuza ve bütçenize göre esnek, proje bazlı kişiselleştirilmiş vade planı sunulur.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <Award size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">
                    {isEN ? 'Direct from Developer' : 'Doğrudan Üreticiden'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  {isEN
                    ? 'Promissory notes are kept in-house and never transferred to third-party lenders.'
                    : 'Senetleriniz 3. parti finans kurumlarına devredilmez, doğrudan Demirtürk İnşaat bünyesinde tutulur.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/30 transition-all space-y-2">
                <div className="flex items-center space-x-2 text-[#fffff1]">
                  <ShieldCheck size={18} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#fffff1]">
                    {isEN ? 'Corporate Contract Security' : 'Kurumsal Sözleşme Güvencesi'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#fffff1]/75 leading-relaxed font-light">
                  {isEN
                    ? 'All sales, delivery timelines, and technical commitments are secured under corporate contracts.'
                    : 'Tüm satış, teslim ve teknik taahhüt süreçleri şeffaf kurumsal sözleşme ve şartnamelerle güvence altına alınır.'}
                </p>
              </div>
            </div>

            {/* Direct Consult CTA */}
            <div className="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#fffff1]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#fffff1]/70 block font-medium">
                  {isEN ? 'TAILORED PAYMENT PLAN' : 'KİŞİYE ÖZEL ÖDEME PLANI'}
                </span>
                <span className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] mt-1 block">
                  {isEN ? 'Let Us Discuss Your Tailored Plan' : 'Size Özel Vade Planını Konuşalım'}
                </span>
                <span className="text-xs text-[#fffff1]/65 block mt-1 font-light">
                  {isEN
                    ? 'Our sales consultants will prepare custom alternative payment schedules suited to your budget.'
                    : 'Satış danışmanlarımız projelere özel alternatif ödeme planlarını sizin için hazırlasın.'}
                </span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  isEN
                    ? 'Hello, I would like to get information regarding your in-house installment plans.'
                    : 'Merhaba, elden senetli ödeme planları hakkında bilgi almak istiyorum.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="glass-blur-box px-5 py-2.5 sm:px-6 sm:py-3 text-[#fffff1] font-normal text-xs sm:text-sm uppercase tracking-wider rounded-xl text-center whitespace-nowrap transition-all shadow-md hover:border-[#fffff1]/40 cursor-pointer flex-shrink-0"
              >
                {isEN ? 'Get Information' : 'Bilgi Alın'}
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
                  {isEN ? 'BE OUR COMPLIMENTARY GUEST' : 'ÜCRETSİZ MİSAFİRİMİZ OLUN'}
                </span>
                <h3 className="font-theSeasons text-2xl font-bold text-[#fffff1]">
                  {t.tourTitle}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
              {t.tourDesc}
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#fffff1]/90">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>{isEN ? 'Sunday VIP shuttle from Istanbul, Kocaeli & Sakarya' : 'İstanbul, Kocaeli ve Sakarya’dan Pazar günleri VIP transfer'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>{isEN ? 'Guided tour of model flats and landscaped complexes' : 'Örnek daire, peyzaj ve havuz alanlarının gezilmesi'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>{isEN ? 'Regional overview of Karasu coastline development' : 'Karasu sahil bandı ve bölge gelişimi hakkında brifing'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-[#fffff1]/80 flex-shrink-0" />
                <span>{isEN ? 'Complimentary lunch hospitality — zero obligation' : 'Öğle yemeği ve ikramlar dahil — tamamen ücretsiz'}</span>
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
                    <h4 className="font-semibold text-base text-emerald-100">
                      {isEN ? 'Reservation Request Received!' : 'Rezervasyon Talebiniz Alındı!'}
                    </h4>
                    <p className="text-xs text-emerald-300/80">
                      {isEN ? 'Successfully registered in our Portföy CRM system.' : 'Kayıt başarıyla Portföy CRM sistemimize iletildi.'}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#fffff1]/80 leading-relaxed font-light">
                  {isEN
                    ? 'Our representative will contact you shortly to confirm VIP shuttle timings and pickup points. You may also confirm via WhatsApp:'
                    : 'Müşteri temsilcimiz transfer detayları ve hareket noktası teyidi için sizi en kısa sürede arayacaktır. Dilerseniz başvurunuzu WhatsApp üzerinden de paylaşabilirsiniz:'}
                </p>

                <div className="bg-black/25 rounded-xl p-3 text-xs text-[#fffff1]/80 border border-[#fffff1]/10 space-y-1">
                  <div><span className="text-[#fffff1]/50">{isEN ? 'Name:' : 'Ad Soyad:'}</span> {tourName || (isEN ? 'Not specified' : 'Belirtilmedi')}</div>
                  <div><span className="text-[#fffff1]/50">{isEN ? 'Phone:' : 'Telefon:'}</span> {tourPhone}</div>
                  <div><span className="text-[#fffff1]/50">{t.departureCity}:</span> {tourCity}</div>
                  <div><span className="text-[#fffff1]/50">{t.transportChoice}:</span> {tourTransportChoice}</div>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                    isEN
                      ? `Hello Demirtürk Construction, I submitted my reservation request for the Free Karasu VIP Tour:\n\n• Name: ${tourName || 'Not specified'}\n• Phone: ${tourPhone}\n• Departure: ${tourCity}\n• Transport: ${tourTransportChoice}\n\nI would like to confirm my reservation details.`
                      : `Merhaba Demirtürk İnşaat, Ücretsiz Karasu Tanıtım Turu için web sitenizden rezervasyon başvurumu ilettim:\n\n• İsim: ${tourName || 'Belirtilmedi'}\n• Telefon: ${tourPhone}\n• Kalkış Şehri: ${tourCity}\n• Katılım & Ulaşım: ${tourTransportChoice}\n\nTur ve rezervasyon detaylarını teyit etmek istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 hover:border-emerald-500/60 text-emerald-200 font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>{isEN ? 'Confirm via WhatsApp' : 'WhatsApp’ta Paylaş / Onayla'}</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                    {t.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                    {isEN ? 'Phone' : 'Telefon'} <span className="text-[#fffff1]/70">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={tourPhone}
                    onChange={(e) => setTourPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] placeholder-[#fffff1]/40 focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      {t.departureCity}
                    </label>
                    <select
                      value={tourCity}
                      onChange={(e) => setTourCity(e.target.value)}
                      className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                    >
                      <option value={isEN ? 'Istanbul' : 'İstanbul'}>{isEN ? 'Istanbul' : 'İstanbul'}</option>
                      <option value="Kocaeli">Kocaeli</option>
                      <option value="Sakarya">Sakarya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#fffff1]/70 mb-1">
                      {t.transportChoice}
                    </label>
                    <select
                      value={tourTransportChoice}
                      onChange={(e) => setTourTransportChoice(e.target.value)}
                      className="w-full px-4 py-3 bg-black/25 backdrop-blur-sm border border-[#fffff1]/15 rounded-xl text-sm text-[#fffff1] focus:border-[#fffff1]/40 focus:outline-none transition-colors"
                    >
                      <option value={t.vipSunday}>{t.vipSunday}</option>
                      <option value={t.ownCar}>{t.ownCar}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#fffff1] text-[#252c33] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all hover:bg-white active:scale-[0.99] cursor-pointer shadow-lg mt-2 flex items-center justify-center space-x-2"
                >
                  <span>{t.joinTourBtn}</span>
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

