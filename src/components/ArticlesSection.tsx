import React from 'react'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'

export interface ArticleSection {
  heading?: string // rendered as <h2> in article body
  paragraphs: string[]
  listItems?: string[]
}

export interface ArticleItem {
  id: string
  slug: string
  url: string
  title: string
  seoTitle?: string
  subtitle: string
  category: string
  readTime: string
  date: string
  image: string
  summary: string
  sections: ArticleSection[]
  paragraphs: string[]
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'karasuda-daire-sahibi-olmak',
    slug: 'karasuda-daire-sahibi-olmak',
    url: '/makaleler/karasuda-daire-sahibi-olmak/',
    seoTitle: 'Karasu’da Daire Sahibi Olmak ve Yaşam | Demirtürk İnşaat',
    title: 'Karasu’da Daire Sahibi Olmak: Yazlık ve Yıl Boyu Yaşam Rehberi',
    subtitle: 'Karasu’da yazlık veya sürekli yaşam için daire seçerken konum, daire planı, sosyal alanlar ve ödeme seçenekleri rehberi.',
    category: 'Rehber & Yaşam',
    readTime: '6 dk okuma',
    date: '4 Ekim 2026',
    image: '/images/yenisehirforweb.jpeg',
    summary:
      'Karasu’da yazlık veya sürekli yaşayacağınız bir daire seçerken hangi özellikleri önceliklendirmelisiniz? Konumdan sosyal alanlara, daire planından ödeme seçeneklerine kadar kararınızı kolaylaştıracak noktaları bir araya getirdik.',
    paragraphs: [
      'Karasu’da daire sahibi olmak, bazıları için yaz aylarında kendi evinde tatil yapmak, bazıları içinse denize yakın bir yerde yeni bir yaşam kurmak anlamına geliyor. Sakarya’nın Karadeniz kıyısındaki ilçesi Karasu’yu değerlendirirken yalnızca evin görüntüsüne değil, günlük hayatınıza ne kadar uyduğuna da bakmak gerekiyor.',
      'Peki, Karasu’da yazlık veya sürekli yaşayacağınız bir daire seçerken hangi özellikleri önceliklendirmelisiniz? Konumdan sosyal alanlara, daire planından ödeme seçeneklerine kadar kararınızı kolaylaştıracak noktaları bir araya getirdik.'
    ],
    sections: [
      {
        paragraphs: [
          'Karasu’da daire sahibi olmak, bazıları için yaz aylarında kendi evinde tatil yapmak, bazıları içinse denize yakın bir yerde yeni bir yaşam kurmak anlamına geliyor. Sakarya’nın Karadeniz kıyısındaki ilçesi Karasu’yu değerlendirirken yalnızca evin görüntüsüne değil, günlük hayatınıza ne kadar uyduğuna da bakmak gerekiyor.',
          'Peki, Karasu’da yazlık veya sürekli yaşayacağınız bir daire seçerken hangi özellikleri önceliklendirmelisiniz? Konumdan sosyal alanlara, daire planından ödeme seçeneklerine kadar kararınızı kolaylaştıracak noktaları bir araya getirdik.'
        ]
      },
      {
        heading: 'Karasu’da yaşam: Deniz ve doğayla zaman geçirmek',
        paragraphs: [
          'Deniz kenarında yürüyüş yapmak, hafta sonlarını açık havada geçirmek ve tatil dönemlerinde kendi evinizin rahatlığını yaşamak istiyorsanız Karasu değerlendirebileceğiniz seçeneklerden biri.',
          'Bölgenin doğayla ilişkisi sahille sınırlı değil. Karasu ve Kaynarca arasında bulunan Acarlar Longozu da çevreyi keşfetmek isteyenler için farklı bir gezi seçeneği sunuyor.',
          'Ancak yaşam tercihinizi yalnızca bir yaz ziyaretine göre yapmamak önemli. Daire düşündüğünüz çevreyi farklı gün ve saatlerde görmek; ulaşımı, çevredeki işletmeleri ve mahallenin günlük düzenini incelemek daha bilinçli bir seçim yapmanıza yardımcı olur.'
        ]
      },
      {
        heading: 'Yazlık kullanım mı, yıl boyunca yaşam mı?',
        paragraphs: [
          'Karasu’da ev aramaya başlamadan önce yanıtlanması gereken ilk soru, daireyi nasıl kullanacağınızdır.',
          'Yazlık olarak kullanacağınız bir evde sahile erişim, balkon, havuz ve siz yokken binanın nasıl yönetildiği ön plana çıkabilir. Hafta sonları gelmeyi düşünüyorsanız bulunduğunuz şehirden ulaşımı ve otopark imkânını da değerlendirmelisiniz.',
          'Yıl boyunca yaşayacağınız bir dairede ise markete, sağlık hizmetlerine, okula ve günlük ulaşım noktalarına erişim daha belirleyici olabilir. Isınma sistemi, yalıtım, depolama alanları ve internet altyapısı da evi gezerken sorulması gereken konular arasındadır.',
          'En uygun daire, kullanım alışkanlıklarınıza ve bütçenize birlikte cevap veren dairedir.'
        ]
      },
      {
        heading: 'Karasu’da 1+1 mi, 2+1 daire mi tercih edilmeli?',
        paragraphs: [
          'Karasu’da 1+1 daire seçenekleri, daha kompakt bir yaşam alanı isteyenler veya dönemsel kullanım planlayanlar için değerlendirilebilir. Bununla birlikte oda sayısının yanında salonun kullanımı, mutfak yerleşimi ve depolama imkânları da önemlidir.',
          '2+1 daireler ise çocuk odasına, çalışma alanına veya misafir odasına ihtiyaç duyanlar için daha uygun olabilir. Özellikle uzun süreli konaklamalarda ayrı bir odanın sağlayacağı esnekliği düşünmek faydalıdır.',
          'İki daireyi karşılaştırırken yalnızca brüt metrekareye bakmayın. Net kullanım alanını, odaların yerleşimini, gün ışığını ve balkonun günlük yaşamınıza katkısını birlikte değerlendirin.'
        ]
      },
      {
        heading: 'Bahçe, havuz ve sosyal alanlar neden önemli?',
        paragraphs: [
          'Bir konut projesinin sunduğu ortak alanlar, evde geçirdiğiniz zamanın niteliğini etkileyebilir. Havuz, spor salonu, çocuk oyun alanı ve kafeterya gibi imkânları değerlendirirken bunlardan hangilerini gerçekten kullanacağınızı düşünün.',
          'Bahçeli bir giriş katı arıyorsanız bahçenin büyüklüğü kadar mahremiyetini, bakım ihtiyacını ve kullanım koşullarını da sorun. Ortak alanların çalışma dönemlerini, bakım düzenini ve aidata etkisini öğrenin.',
          'Demirtürk İnşaat’ın Yenişehir 3. Etap projesinde modern ve zamansız mimariye; iki havuz, spor salonu, kapalı çocuk oyun alanı ve kafeterya eşlik ediyor. Giriş katlarındaki müstakil bahçe seçeneklerinin yanında hidrofor sistemi, güneş enerjisi ve araç şarj istasyonu da projenin özellikleri arasında yer alıyor.',
          'İlgilendiğiniz daireye ait özellikleri, projenin mevcut durumunu ve teslim kapsamını ekibimizden öğrenebilirsiniz.'
        ]
      },
      {
        heading: 'Karasu’da daire fiyatlarını karşılaştırırken nelere bakılmalı?',
        paragraphs: [
          'Karasu’da satılık daire araştırırken fiyatları aynı özelliklere sahip konutlar üzerinden karşılaştırmak daha anlamlıdır. Konum, net alan, kat, cephe, yapı özellikleri, teslim durumu ve sosyal olanaklar değerlendirmeyi etkileyebilir.',
          'Aynı oda sayısına sahip iki dairenin kullanım alanları ve sunduğu imkânlar farklı olabilir. Bu nedenle fiyat bilgisi alırken dairenin planını ve satış kapsamını da istemek gerekir.',
          'Peşinat ve aylık taksitlerin yanında toplam satış bedelini, varsa ara ödemeleri ve ek giderleri birlikte değerlendirin. Böylece ilk bakışta uygun görünen bir ödeme planının bütçenize uzun vadede de uyup uymadığını daha rahat görebilirsiniz.'
        ]
      },
      {
        heading: 'Size uygun ödeme planını nasıl değerlendirebilirsiniz?',
        paragraphs: [
          'Daire seçimi kadar ödeme planının sürdürülebilir olması da önemlidir. Ayırabileceğiniz peşinatı ve düzenli olarak karşılayabileceğiniz aylık ödemeyi belirlemek, seçenekleri daraltmanızı kolaylaştırır.',
          'Görüşme sırasında şu bilgileri birlikte isteyin:'
        ],
        listItems: [
          'İlgilendiğiniz dairenin toplam satış bedeli.',
          'Peşinat tutarı ve ödeme tarihleri.',
          'Aylık taksitler, vade ve varsa ara ödemeler.',
          'Teslim takvimi ve satış bedeline dahil olan özellikler.'
        ]
      },
      {
        paragraphs: [
          'Ödeme seçenekleri daireye ve güncel kampanya koşullarına göre değişebilir. Bu nedenle kararınızı size özel hazırlanmış, ayrıntıları açık bir plan üzerinden vermeniz faydalıdır.'
        ]
      },
      {
        heading: 'Karasu’daki daire seçeneklerini yerinde inceleyin',
        paragraphs: [
          'Fotoğraflar ve proje görselleri ilk değerlendirmeyi kolaylaştırır. Yerinde ziyaret ise odaların kullanımını, çevreyi ve projenin günlük yaşamınıza uygunluğunu daha iyi anlamanızı sağlar.',
          'Demirtürk İnşaat olarak Karasu’daki projelerimizi tanımanız, daire seçeneklerini karşılaştırmanız ve bütçenize uygun ödeme planını değerlendirmeniz için sizi ofisimize bekliyoruz.',
          'Güncel daire seçenekleri ve ödeme koşulları hakkında bilgi almak için bizimle iletişime geçin.'
        ]
      }
    ]
  }
]

export interface ArticlesSectionProps {
  onSelectArticle?: (article: ArticleItem) => void
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="makaleler" className="py-24 bg-transparent text-[#fffff1] border-t border-[#fffff1]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[104px]">
        {/* Section Header */}
        <div className="mb-14 pb-8 border-b border-[#fffff1]/10 max-w-3xl">
          <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-normal tracking-[0.2em] text-[#fffff1] uppercase mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fffff1] flex-shrink-0" />
            <span>YAYINLAR & DÜŞÜNCELER / ARTICLES</span>
          </div>
          <h2 className="font-theSeasons text-3xl sm:text-5xl font-bold tracking-tight text-[#fffff1]">
            Mimari ve Mühendislik Makaleleri
          </h2>
          <p className="mt-4 text-base text-[#fffff1]/80 font-light leading-relaxed">
            Karasu’da daire sahibi olma rehberi, konut alırken dikkat edilmesi gerekenler ve sayfiye yaşamının geleceğine dair uzman yazılarımız.
          </p>
        </div>

        {/* Featured Flagship Article Card */}
        <div className="max-w-4xl">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle && onSelectArticle(article)}
              className="group cursor-pointer bg-transparent backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row shadow-xl hover:shadow-2xl"
            >
              <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto min-h-[260px] overflow-hidden bg-black/40 flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252c33]/90 via-transparent to-transparent md:hidden" />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/10 rounded">
                  {article.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-[#fffff1]/60 mb-3">
                    <span className="flex items-center">
                      <Calendar size={13} className="mr-1 text-[#fffff1]/80" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock size={13} className="mr-1 text-[#fffff1]/80" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-theSeasons text-2xl sm:text-3xl font-semibold text-[#fffff1] group-hover:text-white transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#fffff1]/80 line-clamp-4 font-light leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#fffff1]/10 flex items-center justify-between text-sm text-[#fffff1] font-medium">
                  <span className="uppercase tracking-wider text-xs">Rehberi Oku</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
