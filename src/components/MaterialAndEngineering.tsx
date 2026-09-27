import React from 'react'
import { MATERIAL_CATEGORIES, COMPANY_INFO } from '../data/websiteData'
import { Check, ArrowUpRight, Phone, MessageSquare } from 'lucide-react'

export const MaterialAndEngineering: React.FC = () => {
  return (
    <section id="yapi-malzemeleri" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#fffff1] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fffff1]" />
              <span>YAPI MALZEMELERİ & TEDARİK GÜCÜ</span>
            </div>
            <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              Temelden Çatıya Sarsılmaz Malzeme Kalitesi
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base text-[#fffff1]/80 max-w-lg font-light leading-relaxed">
            Demirtürk İnşaat, bölgenin en büyük yapı malzemeleri tedarik ağlarından birine sahiptir. Kendi projelerimizde kullandığımız yüksek standartlı malzemeleri bölgedeki tüm şantiyelere de ulaştırıyoruz.
          </p>
        </div>

        {/* Material Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {MATERIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 rounded-xl overflow-hidden hover:border-[#fffff1]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#313941] via-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/10 rounded">
                    Sertifikalı Tedarik
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1] mb-2 group-hover:text-[#fffff1] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#fffff1]/80 font-light leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#fffff1]/5">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-[#fffff1]/90">
                        <Check size={15} className="text-[#fffff1] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20${encodeURIComponent(cat.title)}%20fiyat%20ve%20tedarik%20bilgisi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-white/5 hover:bg-[#313941] hover:text-[#fffff1] border border-[#fffff1]/10 rounded text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-between group-hover:border-[#fffff1]/30 cursor-pointer"
                >
                  <span>Fiyat Teklifi Al</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip */}
        <div className="p-8 rounded-2xl bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-widest text-[#fffff1] uppercase block font-medium">
              TOPTAN VE PERAKENDE İNŞAAT MALZEMESİ
            </span>
            <h3 className="font-theSeasons text-2xl sm:text-3xl font-semibold text-[#fffff1] mt-1">
              Şantiyeniz İçin Hızlı Fiyat ve Lojistik Teklifi
            </h3>
            <p className="text-sm sm:text-base text-[#fffff1]/75 font-light mt-1">
              Karasu, Kocaali, Ferizli ve Sakarya geneline doğrudan şantiye teslimi sevkiyat.
            </p>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-5 py-3 rounded bg-white/5 hover:bg-white/10 border border-[#fffff1]/15 text-xs sm:text-sm flex items-center space-x-2 text-[#fffff1]"
            >
              <Phone size={15} className="text-[#fffff1]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Merhaba%20in%C5%9Faat%20malzemeleri%20i%C3%A7in%20teklif%20almak%20istiyorum.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#fffff1] hover:bg-white text-[#252c33] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded transition-all shadow-md cursor-pointer"
            >
              WhatsApp Teklif
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
