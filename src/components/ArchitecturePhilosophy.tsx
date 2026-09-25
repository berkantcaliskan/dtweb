import React from 'react'
import { COMPANY_INFO, COMPANY_STATS } from '../data/websiteData'
import { ShieldCheck, Compass, Sparkles, Building2 } from 'lucide-react'

export const ArchitecturePhilosophy: React.FC = () => {
  return (
    <section id="mimari-yaklasim" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
            <span>MİMARİ YAKLAŞIM & KURUMSAL FELSEFE</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-tight">
            Bağlam, Doğa ve 20+ Yıllık Sarsılmaz Mühendislik Birikimi
          </h2>
          <p className="mt-6 text-base text-[#fffff1]/70 font-light leading-relaxed">
            Demirtürk İnşaat olarak 2003 yılından bu yana Sakarya Karasu’nun eşsiz sahil bandında sadece yapılar değil; nesilden nesile aktarılacak yaşam kültürleri inşa ediyoruz. Emre Arolat mimarisinin bağlamsal yaklaşımını referans alarak; arazinin topografyasına, Karadeniz’in rüzgarına ve yeşilin dinginliğine saygı duyan projeler tasarlıyoruz.
          </p>
        </div>

        {/* Company Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-8 rounded-2xl bg-[#313941]/50 backdrop-blur-sm border border-[#fffff1]/10">
          {COMPANY_STATS.map((stat, i) => (
            <div key={i} className="text-center md:text-left border-r last:border-r-0 border-[#fffff1]/10 pr-4">
              <span className="font-theSeasons text-4xl sm:text-5xl font-bold text-[#fffff1] block">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#fffff1]/90 mt-1 block">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#fffff1]/50 block mt-0.5">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Pillars of Demirtürk Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 space-y-4 hover:border-[#fffff1]/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#252c33] border border-[#fffff1]/15 flex items-center justify-center text-[#fffff1]">
              <Compass size={22} />
            </div>
            <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
              Bağlamsal Tasarım & Manzara
            </h3>
            <p className="text-xs text-[#fffff1]/70 leading-relaxed font-light">
              Her projemiz Karasu’nun sahil şeridi, orman dokusu ve gün ışığı açılarına göre özel olarak konumlandırılır. Teraslar ve geniş cam cepheler iç mekanı dış çevreyle bütünleştirir.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 space-y-4 hover:border-[#fffff1]/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#252c33] border border-[#fffff1]/15 flex items-center justify-center text-[#fffff1]">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
              Temelden Çatıya Malzeme Gücü
            </h3>
            <p className="text-xs text-[#fffff1]/70 leading-relaxed font-light">
              Demirtürk, aynı zamanda bölgenin önde gelen yapı malzemeleri tedarikçisidir. Kendi sertifikalı nervürlü demirimiz ve C35 betonumuzla ödün vermeyen deprem güvenliği sağlarız.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 space-y-4 hover:border-[#fffff1]/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#252c33] border border-[#fffff1]/15 flex items-center justify-center text-[#fffff1]">
              <Sparkles size={22} />
            </div>
            <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1]">
              Kredisiz & Güvene Dayalı Finansman
            </h3>
            <p className="text-xs text-[#fffff1]/70 leading-relaxed font-light">
              Banka faizlerine veya kefil şartlarına takılmadan, doğrudan Demirtürk bünyesinde elden senet ve esnek vade modeliyle ev sahibi olma sürecini şeffaf ve kolay kılıyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
