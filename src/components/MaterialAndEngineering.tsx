import React from 'react'
import { MATERIAL_CATEGORIES, COMPANY_INFO } from '../data/websiteData'
import { ArrowUpRight, Phone } from 'lucide-react'

export const MaterialAndEngineering: React.FC = () => {
  return (
    <section id="yapi-malzemeleri" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header: Description placed directly below title */}
        <div className="mb-14 pb-8 border-b border-[#fffff1]/10 max-w-3xl">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>YAPI MALZEMELERİ & TEDARİK GÜCÜ</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
            Temelden Çatıya Sarsılmaz Malzeme Kalitesi
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            Demirtürk İnşaat, bölgenin en büyük yapı malzemeleri tedarik ağlarından birine sahiptir. Kendi projelerimizde kullandığımız yüksek standartlı malzemeleri bölgedeki tüm şantiyelere de ulaştırıyoruz.
          </p>
        </div>

        {/* Material Categories: 3-column compact rectangular cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {MATERIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group bg-transparent backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Panoramic Rectangular Image Banner */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-black/40">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2329]/80 via-transparent to-black/30" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/15 rounded-md font-medium">
                    Sertifikalı Tedarik
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-theSeasons text-xl font-semibold text-[#fffff1] mb-1.5 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>

                  {/* 2-Column Compact Specifications */}
                  <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 pt-2.5 border-t border-[#fffff1]/10 text-xs text-[#fffff1]/85">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]/50 flex-shrink-0" />
                        <span className="truncate text-[11px] sm:text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20${encodeURIComponent(cat.title)}%20fiyat%20ve%20tedarik%20bilgisi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-[#fffff1]/15 hover:border-[#fffff1]/35 rounded-2xl text-xs tracking-wider uppercase transition-all flex items-center justify-between text-[#fffff1] cursor-pointer"
                >
                  <span>Fiyat Teklifi Al</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip: Contour only, transparent */}
        <div className="p-6 sm:p-8 rounded-2xl bg-transparent backdrop-blur-sm border border-[#fffff1]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs tracking-widest text-[#fffff1]/70 uppercase block font-medium">
              TOPTAN VE PERAKENDE İNŞAAT MALZEMESİ
            </span>
            <h3 className="font-theSeasons text-2xl sm:text-3xl font-semibold text-[#fffff1] mt-1">
              Şantiyeniz İçin Hızlı Fiyat ve Lojistik Teklifi
            </h3>
            <p className="text-sm sm:text-base text-[#fffff1]/75 font-light mt-1">
              Karasu, Kocaali, Ferizli ve Sakarya geneline doğrudan şantiye teslimi sevkiyat.
            </p>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-transparent hover:bg-white/5 border border-[#fffff1]/20 text-xs sm:text-sm flex items-center space-x-2 text-[#fffff1] transition-all"
            >
              <Phone size={14} className="text-[#fffff1]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20in%C5%9Faat%20malzemeleri%20i%C3%A7in%20teklif%20almak%20istiyorum.`}
              target="_blank"
              rel="noreferrer"
              className="glass-blur-box px-5 py-2.5 sm:px-6 sm:py-3 text-[#fffff1] font-normal text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md hover:border-[#fffff1]/40 cursor-pointer"
            >
              WhatsApp Teklif
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
