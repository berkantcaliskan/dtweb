import React, { useState } from 'react'
import { ArrowUpRight, Clock, Calendar, BookOpen, X, ChevronRight, Share2 } from 'lucide-react'

export interface ArticleItem {
  id: string
  title: string
  subtitle: string
  category: string
  readTime: string
  date: string
  image: string
  summary: string
  paragraphs: string[]
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'dogal-sahil-mimarisi',
    title: 'Karasu Kıyı Şeridinde Doğal Mimari: Rüzgar, Dalga ve Gün Işığı',
    subtitle: 'Deniz ikliminin dinamiklerini mimari avantaja dönüştüren tasarım kriterleri.',
    category: 'Mimari & Tasarım',
    readTime: '4 dk okuma',
    date: '14 Şubat 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    summary:
      'Doğayla uyumlu sahil konutlarımız, Karadeniz’in güçlü poyraz rüzgarlarını ve tuzlu deniz havasını yapı fiziğine uygun dayanıklı malzemelerle karşılıyor.',
    paragraphs: [
      'Karasu’nun sahil şeridinde bir yapı tasarlamak, yalnızca dört duvar örmek değil; doğayla uyum sağlayan ferah yaşam alanları oluşturmaktır. Kıyı şeridinde inşa edilen yapılarda rüzgar yönü, cephe yerleşimi ve güneş ışığı açıları tasarımın temel belirleyicileridir.',
      'Demirtürk projelerinde, binaların kütle yerleşimi rüzgarı bloke etmek yerine yönlendiren dengeli formlarla kurgulanır. Kademeli balkonlar ve güneş kırıcılar, hem doğal havalandırmayı sağlar hem de iç mekanlarda mahremiyet oluşturur.',
      'Geniş cam yüzeyler, ufuk çizgisini ve gün batımını yaşayan mekanların merkezine taşırken; çift katmanlı ısı yalıtımı ve marin tipi cephe boyaları yapının yıllarca ilk günkü estetiğini korumasını temin eder.'
    ]
  },
  {
    id: 'deprem-guvenligi-c35-beton',
    title: 'Deprem Kuşağında Sarsılmaz Güven: C35 Beton ve Nervürlü Çelik Standartları',
    subtitle: 'Zemin etüdünden radye temele, tavizsiz yapı güvenliğinin mühendislik anatomisi.',
    category: 'Mühendislik & Statik',
    readTime: '5 dk okuma',
    date: '28 Ocak 2025',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    summary:
      'Deprem güvenliği bir seçenek değil, Demirtürk İnşaat’ın 2003’ten bu yana vazgeçilmez temel ilkesidir. Kendi tedarik ağımızdaki sertifikalı demir ve C35 beton kullanımı bu güvencenin belkemiğidir.',
    paragraphs: [
      'Sakarya ve çevresi, 1999 yılından bu yana zemin mekaniği ve deprem bilincinin en yüksek olduğu bölgelerden biridir. Demirtürk olarak, temel tasarımında zemin etüdünün öngördüğü en üst parametreleri baz alıyoruz.',
      'Projelerimizde standart C25 yerine C35 sınıfı yüksek dayanımlı hazır beton ve laboratuvar onaylı BÇ III nervürlü inşaat çeliği kullanıyoruz. Su geçirimsiz katkılı radye jeneral temel sistemi ile zemin sıvılaşma riskini sıfıra indiriyoruz.',
      'Kaba inşaat aşamasında her dökümden alınan numuneler bağımsız yapı denetim kuruluşlarınca kırılma testine tabi tutulur ve sonuçlar dijital şantiye arşivimizde saklanır.'
    ]
  },
  {
    id: 'sayfiye-yasamindan-surdurulebilir-eve',
    title: 'Sayfiye Yaşamının Evrimi: Dört Mevsim Sürdürülebilir Havuzlu Siteler',
    subtitle: 'Karasu’da yazlık konseptinin yıl boyu yaşanabilir modern rezidanslara dönüşümü.',
    category: 'Yaşam & Trendler',
    readTime: '3 dk okuma',
    date: '12 Aralık 2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    summary:
      'Artık sahil evleri yalnızca 3 aylık tatil mekanları değil; uzaktan çalışan, doğayla iç içe huzurlu bir yaşam arayan şehir insanının 365 günlük birincil yaşam adresi haline geliyor.',
    paragraphs: [
      'Son yıllarda Kuzey Marmara Otoyolu’nun Karasu bağlantısı sayesinde İstanbul ile Karasu arasındaki mesafe 1.5 saate inmiştir. Bu ulaşım devrimi, sahil kasabası yaşamını metropol çalışanları için kalıcı bir alternatife dönüştürdü.',
      'Demirtürk havuzlu sitelerinde yerden ısıtma sistemleri, fiber optik internet altyapısı, 24/7 güvenlik ve akıllı ev otomasyonu gibi donatıları standart hale getirdik. Böylece kışın da sıcak, konforlu ve güvenli bir yaşam sunuyoruz.',
      'Site sakinlerimiz sabah sahil yürüyüşünü yapıp çam ormanı kokusuyla gününe başlayabiliyor; işlerini evinden yürütüp akşam şömine ve havuz başında vakit geçirebiliyor.'
    ]
  },
  {
    id: 'malzeme-tedarikinde-ozkaynak-gucu',
    title: 'İnşaatta Özkaynak Gücü: Kendi Malzememizle Kesintisiz Şantiye Disiplini',
    subtitle: 'Tedarik krizlerine takılmadan, zamanında ve taahhüt edilen kalitede teslimat.',
    category: 'Sektörel Vizyon',
    readTime: '4 dk okuma',
    date: '18 Kasım 2024',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    summary:
      'Demirtürk İnşaat’ın en büyük rekabet avantajlarından biri, bölgenin önde gelen yapı market ve hammadde tedarikçisi olmasıdır. Bu sayede maliyet ve takvim kontrolü daima elimizdedir.',
    paragraphs: [
      'İnşaat sektöründe yaşanan teslimat gecikmelerinin en büyük sebebi malzeme tedarik zincirindeki aksamalar ve kontrolsüz fiyat dalgalanmalarıdır.',
      'Demirtürk, temelden çatıya demir, çimento, tuğla ve yalıtım malzemelerinin doğrudan toptancısı ve stokçusudur. Bu sayede projelerimiz hiçbir malzeme darboğazına uğramadan planlanan takvimde ilerler.',
      'Kendi malzememizle inşa etmek; girdi kalitesini doğrudan denetleme ve aracı karını ortadan kaldırarak yatırımcılarımıza elden senetli esnek vade imkanı sunma gücümüzün de ana kaynağıdır.'
    ]
  }
]

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)

  return (
    <section id="makaleler" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-[#fffff1]/10">
          <div>
            <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#fffff1] uppercase mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
              <span>YAYINLAR & DÜŞÜNCELER / ARTICLES</span>
            </div>
            <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
              Mimari ve Mühendislik Makaleleri
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base text-[#fffff1]/80 max-w-lg font-light leading-relaxed">
            Karasu kıyı mimarisi, deprem mühendisliği, malzeme bilimi ve sayfiye yaşamının geleceğine dair uzman yazılarımız.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-[#313941]/90 backdrop-blur-md border border-[#fffff1]/10 rounded-xl overflow-hidden hover:border-[#fffff1]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#313941] via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/10 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-[#fffff1]/60 mb-2">
                    <span className="flex items-center">
                      <Calendar size={13} className="mr-1 text-[#fffff1]/80" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock size={13} className="mr-1 text-[#fffff1]/80" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-theSeasons text-2xl font-semibold text-[#fffff1] group-hover:text-white transition-colors mb-2.5 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#fffff1]/80 line-clamp-3 font-light leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#fffff1]/5 flex items-center justify-between text-sm text-[#fffff1] font-medium">
                  <span>Makaleyi Oku</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-sm flex justify-center p-4 sm:p-6 lg:p-10 animate-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null)
          }}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#1e242b]/75 backdrop-blur-2xl border border-[#fffff1]/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col text-[#fffff1] my-auto animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#1e242b]/65 backdrop-blur-xl border-b border-[#fffff1]/15">
              <span className="text-[10px] tracking-widest text-[#fffff1]/80 uppercase font-medium">
                {selectedArticle.category} — {selectedArticle.readTime}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#313941] text-[#fffff1] flex items-center justify-center transition-colors"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[80vh] p-6 sm:p-10 space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#fffff1]/10">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center space-x-3 text-xs text-[#fffff1]/50">
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>Demirtürk Mimarlık & Mühendislik Kurulu</span>
              </div>

              <h2 className="font-theSeasons text-3xl sm:text-4xl font-bold text-[#fffff1] leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="text-base sm:text-lg text-[#fffff1]/90 font-light italic leading-relaxed border-l-2 border-[#fffff1]/60 pl-4">
                "{selectedArticle.subtitle}"
              </p>

              <div className="space-y-5 text-base sm:text-lg text-[#fffff1]/85 font-light leading-relaxed pt-5 border-t border-[#fffff1]/10">
                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#fffff1]/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-[#313941] hover:bg-[#3a444e] border border-[#fffff1]/20 text-xs sm:text-sm uppercase tracking-wider rounded transition-colors text-[#fffff1] cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
