import React from 'react'
import { COMPANY_INFO, COMPANY_STATS } from '../data/websiteData'
import { ShieldCheck, Compass, Sparkles, Building2 } from 'lucide-react'

export const ArchitecturePhilosophy: React.FC = () => {
  return (
    <section id="mimari-yaklasim" className="py-10 sm:py-16 md:py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>MİMARİ YAKLAŞIM & KURUMSAL FELSEFE</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-tight">
            Doğa, Konfor ve 20+ Yıllık Sarsılmaz Mühendislik Birikimi
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#fffff1]/80 font-light leading-relaxed">
            Demirtürk İnşaat olarak 2003 yılından bu yana Sakarya Karasu’nun eşsiz sahil bandında sadece yapılar değil; nesilden nesile aktarılacak güvenli ve konforlu yaşam alanları inşa ediyoruz. Karadeniz’in doğasına, temiz havasına ve sahil dokusuna saygı duyan, modern ve sağlam projeler üretiyoruz.
          </p>
        </div>

        {/* Company Stats Grid (Transparent contour-only container) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 sm:mb-20 p-6 sm:p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15">
          {COMPANY_STATS.map((stat, i) => (
            <div key={i} className="text-center md:text-left border-r last:border-r-0 border-[#fffff1]/10 pr-4">
              <span className="font-theSeasons text-4xl sm:text-5xl font-bold text-[#fffff1] block">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-wider text-[#fffff1]/90 mt-1.5 block font-medium">
                {stat.label}
              </span>
              <span className="text-xs text-[#fffff1]/60 block mt-0.5">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Pillars of Demirtürk Architecture (Interactive on hover: scales, elevates, and brightens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/40 hover:bg-white/[0.06] hover:scale-[1.02] sm:hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out cursor-default">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1] flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#fffff1]/50 group-hover:bg-white/10 transition-all duration-300">
                <Compass size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-theSeasons text-xl sm:text-2xl font-semibold text-[#fffff1] group-hover:text-white leading-snug mb-3 transition-colors">
                  Doğal Uyum & Sahil Manzarası
                </h3>
                <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
                  Her projemiz Karasu’nun sahil şeridi, orman dokusu ve gün ışığı açılarına göre özel olarak konumlandırılır. Teraslar ve geniş cam cepheler iç mekanı dış çevreyle bütünleştirir.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/40 hover:bg-white/[0.06] hover:scale-[1.02] sm:hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out cursor-default">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1] flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#fffff1]/50 group-hover:bg-white/10 transition-all duration-300">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-theSeasons text-xl sm:text-2xl font-semibold text-[#fffff1] group-hover:text-white leading-snug mb-3 transition-colors">
                  Temelden Çatıya Malzeme Gücü
                </h3>
                <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
                  Demirtürk, aynı zamanda bölgenin önde gelen yapı malzemeleri tedarikçisidir. Kendi sertifikalı nervürlü demirimiz ve C35 betonumuzla ödün vermeyen deprem güvenliği sağlarız.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/40 hover:bg-white/[0.06] hover:scale-[1.02] sm:hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out cursor-default">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-lg border border-[#fffff1]/20 flex items-center justify-center text-[#fffff1] flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#fffff1]/50 group-hover:bg-white/10 transition-all duration-300">
                <Sparkles size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-theSeasons text-xl sm:text-2xl font-semibold text-[#fffff1] group-hover:text-white leading-snug mb-3 transition-colors">
                  Kredisiz & Güvene Dayalı Finansman
                </h3>
                <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
                  Banka faizlerine veya kefil şartlarına takılmadan, doğrudan Demirtürk bünyesinde elden senet ve esnek vade modeliyle ev sahibi olma sürecini şeffaf ve kolay kılıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MERGED: STREAMLINED INŞA SÜREÇLERİ (MÜHENDİSLİK DİSİPLİNİ)     */}
        {/* ============================================================== */}
        <div id="insa-surecleri" className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#fffff1]/10">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1] flex-shrink-0" />
              <span>MÜHENDİSLİK DİSİPLİNİ & ŞANTİYE PROTOKOLÜ</span>
            </div>
            <h3 className="font-theSeasons text-2xl sm:text-4xl font-bold tracking-tight text-[#fffff1]">
              Temelden Anahtar Teslimine İnşa Süreçleri
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#fffff1]/80 font-light leading-relaxed">
              20+ yıllık saha birikimimizle hayata geçirdiğimiz 5 aşamalı tavizsiz kalite kontrol ve şantiye denetim standardı.
            </p>
          </div>

          <ConstructionMilestonesViewer />
        </div>
      </div>
    </section>
  )
}

interface ProcessMilestone {
  step: string
  title: string
  highlight: string
  summary: string
  standards: string[]
  image: string
}

const CONSTRUCTION_MILESTONES: ProcessMilestone[] = [
  {
    step: '01',
    title: 'Zemin Etüdü & Sismik Modelleme',
    highlight: 'Karasu sahil zemininin jeolojik haritalandırılması.',
    summary: 'Sahil zemin dinamiklerine uygun çok noktalı jeolojik sondaj, rezistivite ve sıvılaşma risk analizleri yapılarak temel tipi bilimsel verilerle projelendirilir.',
    standards: ['Bakanlık Onaylı Zemin Etüt Raporu', 'Sıvılaşma Riski ve Sismik Kırılma Analizi'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '02',
    title: 'Radye Jeneral Temel & Tam Bohçalama',
    highlight: 'Deprem yükünü dağıtan monoblok temel ve nem bariyeri.',
    summary: 'Nokta temeller yerine tüm yapıyı monoblok rijit gövdeye dönüştüren yüksek kalınlıkta radye temel dökülür; çift kat marin bitümlü membran ile zemin neme karşı mühürlenir.',
    standards: ['C35 Su Geçirimsiz Katkılı Beton', 'Çift Sıra Ø14-Ø25 mm Donatı Ağı', 'SBS Modifiyeli Marin Membran'],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '03',
    title: 'Taşıyıcı Karkas & Laboratuvar Denetimi',
    highlight: 'TSE belgeli BÇ III çelik ve bağımsız dayanım testleri.',
    summary: 'Kendi stoklarımızdaki nervürlü çelik ve C35 betonla yükselen kolon ve perdeler; her katta akredite yapı denetim laboratuvarlarınca 7 ve 28 günlük basınç testlerinden geçirilir.',
    standards: ['Akredite Laboratuvar Kırım Raporları', 'Deprem Öncelikli Perde-Kolon Oranı'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '04',
    title: 'Dış Cephe Mantolama & Marin Çatı İzolasyonu',
    highlight: 'Dört mevsim A sınıfı ısı konforu ve fırtına dayanımı.',
    summary: 'Daireler arası ses bariyerli bims bloklar, taşyünü dış cephe mantolaması ve Karadeniz iklimine tam dayanıklı UV dirençli elastomerik marin çatı kaplaması uygulanır.',
    standards: ['150 kg/m³ Taşyünü Mantolama', 'Akustik Bölme Duvarlar', 'Gizli Drenajlı Marin Çatı'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '05',
    title: 'İnce İşçilik, Peyzaj & Kat Mülkiyeti İskanı',
    highlight: 'Kusursuz anahtar teslimi ve yasal güvenceli tapu.',
    summary: 'Yerden ısıtma, 1. sınıf granit ve peyzaj imalatları tamamlanır; resmi iskan ve yapı kullanma izinleri eksiksiz alınarak bağımsız bölüm tapuları kat maliklerine teslim edilir.',
    standards: ['Eksiksiz Kat Mülkiyeti İskanı', 'Yerden Isıtma & 1. Sınıf Malzeme', '2 Yıl Şantiye İşçilik Garantisi'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
]

const ConstructionMilestonesViewer: React.FC = () => {
  const [activeIdx, setActiveIdx] = React.useState(0)
  const current = CONSTRUCTION_MILESTONES[activeIdx]

  return (
    <div>
      {/* Step Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {CONSTRUCTION_MILESTONES.map((m, idx) => (
          <button
            key={m.step}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeIdx === idx
                ? 'bg-white/10 text-[#fffff1] border-[#fffff1] shadow-md font-medium'
                : 'bg-transparent text-[#fffff1]/65 border-[#fffff1]/15 hover:border-[#fffff1]/35 hover:text-[#fffff1]'
            }`}
          >
            <span className="text-[9px] sm:text-[10px] block opacity-75 mb-0.5 font-medium">AŞAMA {m.step}</span>
            <span className="text-xs sm:text-sm font-medium line-clamp-1 block leading-tight">{m.title.split('&')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Step Open Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center rounded-2xl bg-white/[0.02] border border-[#fffff1]/15 p-5 sm:p-8">
        <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#fffff1]/15 bg-black/40 shadow-lg flex-shrink-0">
          <img
            key={current.step}
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover animate-in fade-in duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 text-[11px] tracking-widest uppercase bg-black/80 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/20 rounded-md font-medium">
            AŞAMA {current.step} / 05
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] tracking-widest text-[#fffff1]/60 uppercase block mb-1 font-medium">
              ŞANTİYE & MÜHENDİSLİK STANDARDI
            </span>
            <h4 className="font-theSeasons text-xl sm:text-2xl font-bold text-[#fffff1] leading-tight">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#fffff1]/85 font-light mt-1.5 leading-relaxed">
              {current.highlight}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light leading-relaxed">
            {current.summary}
          </p>

          <div className="pt-3 border-t border-[#fffff1]/10 space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#fffff1]/50 block font-medium">
              UYGULANAN KRİTİK STANDARTLAR
            </span>
            <div className="space-y-1.5">
              {current.standards.map((std, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-[#fffff1]/90 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1] flex-shrink-0" />
                  <span>{std}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next controls */}
          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 text-xs uppercase tracking-wider rounded-lg border border-[#fffff1]/15 hover:border-[#fffff1]/35 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all text-[#fffff1] cursor-pointer"
            >
              ← Önceki
            </button>
            <span className="text-xs text-[#fffff1]/50 font-mono">
              {activeIdx + 1} / {CONSTRUCTION_MILESTONES.length}
            </span>
            <button
              type="button"
              disabled={activeIdx === CONSTRUCTION_MILESTONES.length - 1}
              onClick={() => setActiveIdx((prev) => Math.min(CONSTRUCTION_MILESTONES.length - 1, prev + 1))}
              className="px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-lg bg-white/10 hover:bg-white/15 border border-[#fffff1]/20 text-[#fffff1] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
