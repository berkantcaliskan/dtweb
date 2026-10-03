import React, { useState } from 'react'
import { CheckCircle2, Shield, Layers, HardHat, Compass, FileCheck } from 'lucide-react'

interface ProcessStep {
  step: string
  title: string
  subtitle: string
  description: string
  standards: string[]
  image: string
}

const CONSTRUCTION_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Zemin Etüdü & Jeolojik Sondaj',
    subtitle: 'Arazinin sismik ve mekanik haritasının çıkarılması.',
    description:
      'Karasu’nun sahil zemin dinamiklerine uygun olarak, her parselimizde çok noktalı jeolojik sondaj ve sismik kırılma analizleri yapılır. Zemin taşıma gücü ve yeraltı su seviyesi modellenerek temel tipi bilimsel verilerle kesinleştirilir.',
    standards: ['T.C. Çevre ve Şehircilik Bakanlığı Zemin Standartları', 'Sismik Hız ve Rezistivite Ölçümleri', 'Sıvılaşma Riski Analiz Raporu'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '02',
    title: 'Radye Jeneral Temel & Temel Bohçalama',
    subtitle: 'Deprem enerjisini zemine yayan monoblok temel kurgusu.',
    description:
      'Tüm projelerimizde nokta temeller yerine, deprem anında yapının tek bir rijit gövde olarak hareket etmesini sağlayan yüksek kalınlıkta radye jeneral temel uygulanır. Temel altı ve perdeler, çift kat marin bitümlü membran ile tam bohçalama yapılarak neme karşı mühürlenir.',
    standards: ['C35 Su Geçirimsiz Katkılı Beton', 'Ø14 - Ø25 mm Çift Sıra Donatı Ağı', 'SBS Modifiyeli Su Yalıtım Membranı'],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '03',
    title: 'Taşıyıcı Karkas & Laboratuvar Testleri',
    subtitle: 'Sertifikalı nervürlü demir ile sarsılmaz betonarme iskelet.',
    description:
      'Kendi tedarik stoklarımızdaki TSE belgeli BÇ III nervürlü çelik ve C35 beton ile dökülen kolon ve perdeler, her katta bağımsız yapı denetim laboratuvarlarınca 7 ve 28 günlük basınç dayanımı testlerine tabi tutulur. Standart altı hiçbir malzeme şantiyeye sokulmaz.',
    standards: ['Bağımsız Akredite Laboratuvar Raporları', 'Ultrasonik ve Schmidt Çekiç Testleri', 'Perde-Kolon Oranında Deprem Önceliği'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '04',
    title: 'Duvar Örgüsü & Isı-Ses İzolasyonu',
    subtitle: 'A sınıfı enerji verimliliği sağlayan nefes alan cepheler.',
    description:
      'Daireler arası ses geçişini engelleyen özel çift kat yalıtımlı bims bloklar ve dış cephede taşyünü mantolama ile dört mevsim yüksek ısı konforu temin edilir. Kışın ısı kaybı, yazın ise nem ve aşırı sıcak iç mekanlardan uzak tutulur.',
    standards: ['150 kg/m³ Yüksek Yoğunluklu Taşyünü', 'Akustik Ses Bariyerli Bölme Duvarlar', 'Buhar Dengeleyici Dış Cephe Katmanları'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '05',
    title: 'Marin Çatı & Teras İzolasyonu',
    subtitle: 'Karadeniz fırtına ve tuz serpintilerine dayanıklı çatı mühendisliği.',
    description:
      'Çatılarımızda ve açık güneşlenme teraslarımızda UV dayanımlı, elastomerik su yalıtımı ve gizli dere drenaj sistemleri kullanılır. Su tahliyesi çift emniyetli tahliye kanallarıyla binadan uzaklaştırılır.',
    standards: ['UV Işınlarına Dayanıklı Marin Kaplama', 'Gizli Yağmur İniş Boruları', 'Isı Yalıtımlı Teras Kademeleri'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    step: '06',
    title: 'İnce İşçilik, Peyzaj & Eksiksiz İskan',
    subtitle: 'Anahtar tesliminde sıfır kusur ve tapuda kat mülkiyeti.',
    description:
      'Yerden ısıtma, 1. sınıf granit seramikler, lake kapılar ve modern armatür montajlarının ardından sitemizin peyzajı ve yüzme havuzu faaliyete geçirilir. Resmi kurum denetimleri tamamlanıp kat mülkiyeti iskanı alınmış olarak tapu teslim edilir.',
    standards: ['Kat Mülkiyeti & Yapı Kullanma İzin Belgesi', '2 Yıl Şantiye ve İnce İşçilik Garantisi', '7/24 Teknik Destek & Site Yönetimi'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
]

export const ConstructionProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const current = CONSTRUCTION_STEPS[activeStep]

  return (
    <section id="insa-surecleri" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#fffff1] uppercase mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
              <span>MÜHENDİSLİK DİSİPLİNİ / CONSTRUCTION PROCESS</span>
            </div>
            <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              Temelden Anahtar Teslimine İnşa Süreçleri
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base text-[#fffff1]/80 max-w-lg font-light leading-relaxed">
            Demirtürk İnşaat’ın 20+ yıllık saha tecrübesiyle uyguladığı 6 aşamalı tavizsiz şantiye ve kalite kontrol protokolü.
          </p>
        </div>

        {/* Horizontal Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {CONSTRUCTION_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#fffff1] text-[#252c33] border-[#fffff1] shadow-lg font-semibold'
                  : 'bg-[#313941]/90 backdrop-blur-md text-[#fffff1]/70 border-[#fffff1]/10 hover:border-[#fffff1]/40 hover:text-[#fffff1]'
              }`}
            >
              <span className="text-[10px] block opacity-80 mb-0.5">AŞAMA {s.step}</span>
              <span className="text-xs sm:text-sm font-medium line-clamp-1 block">{s.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Step Feature Box */}
        <div className="bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Step Media (5 Cols) */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[300px] bg-black/40">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#313941] via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 px-3 py-1.5 text-xs tracking-widest uppercase bg-black/75 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/10 rounded">
              AŞAMA {current.step} / 06
            </div>
          </div>

          {/* Step Details (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#fffff1]/80 uppercase block mb-1 font-medium">
                  ŞANTİYE VE DENETİM STANDARDI
                </span>
                <h3 className="font-theSeasons text-3xl font-semibold text-[#fffff1]">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-[#fffff1]/85 font-light mt-1">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#fffff1]/90 font-light leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#fffff1]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#fffff1]/50 block">
                  BU AŞAMADA UYGULANAN STANDARTLAR
                </span>
                <div className="space-y-2.5">
                  {current.standards.map((std, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-sm text-[#fffff1]/95">
                      <CheckCircle2 size={16} className="text-[#fffff1] flex-shrink-0" />
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="pt-6 border-t border-[#fffff1]/10 flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 text-xs sm:text-sm uppercase tracking-wider rounded border border-[#fffff1]/10 hover:border-[#fffff1]/40 disabled:opacity-30 disabled:pointer-events-none transition-all text-[#fffff1] cursor-pointer"
              >
                ← Önceki Aşama
              </button>

              <span className="text-xs sm:text-sm text-[#fffff1]/50">
                {activeStep + 1} / {CONSTRUCTION_STEPS.length}
              </span>

              <button
                disabled={activeStep === CONSTRUCTION_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(CONSTRUCTION_STEPS.length - 1, prev + 1))}
                className="px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider rounded bg-[#fffff1] text-[#252c33] font-semibold hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md cursor-pointer"
              >
                Sonraki Aşama →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
