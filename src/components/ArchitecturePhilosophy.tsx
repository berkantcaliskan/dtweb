import React from 'react'
import { COMPANY_INFO, COMPANY_STATS } from '../data/websiteData'
import { ShieldCheck, Compass, Sparkles, Building2 } from 'lucide-react'

export const ArchitecturePhilosophy: React.FC = () => {
  return (
    <section id="mimari-yaklasim" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
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
      </div>
    </section>
  )
}
