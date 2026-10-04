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
  },
  {
    id: 'karasuda-gayrimenkul-yatirimi',
    slug: 'karasuda-gayrimenkul-yatirimi',
    url: '/makaleler/karasuda-gayrimenkul-yatirimi/',
    seoTitle: 'Karasu’da Gayrimenkul Yatırımı | Demirtürk İnşaat',
    title: 'Karasu’da Gayrimenkul Yatırımı: Bölge ve Daire Seçimi Rehberi',
    subtitle:
      'Karasu’da gayrimenkul yatırımı düşünüyorsanız bölge, daire, ödeme planı ve kira potansiyelini nasıl değerlendirebileceğinizi rehberimizde keşfedin.',
    category: 'Yatırım & Rehber',
    readTime: '7 dk okuma',
    date: '10 Mayıs 2026',
    image: '/images/aselforweb.jpeg',
    summary:
      'Karasu’da gayrimenkul yatırımı düşünüyorsanız bölge, daire, ödeme planı ve kira potansiyelini nasıl değerlendirebileceğinizi rehberimizde keşfedin.',
    paragraphs: [
      'Karasu’da gayrimenkul yatırımı yapmayı düşünüyorsanız ilk adım, satın alacağınız daireden ne beklediğinizi belirlemektir. Yazlık olarak kullanacağınız bir ev, sürekli yaşayacağınız bir daire ve kiraya vermeyi düşündüğünüz bir konut için öncelikler farklılaşır.',
      '[Karasu’da satılık daire](https://demirturkinsaat.com/) seçeneklerini incelerken konumu, yapının özelliklerini ve toplam maliyeti birlikte değerlendirmek gerekir. Yalnızca başlangıç fiyatına veya gelecekteki değer artışı beklentisine odaklanmak, seçenekler arasındaki önemli farkları gözden kaçırmanıza neden olabilir.'
    ],
    sections: [
      {
        paragraphs: [
          'Karasu’da gayrimenkul yatırımı yapmayı düşünüyorsanız ilk adım, satın alacağınız daireden ne beklediğinizi belirlemektir. Yazlık olarak kullanacağınız bir ev, sürekli yaşayacağınız bir daire ve kiraya vermeyi düşündüğünüz bir konut için öncelikler farklılaşır.',
          '[Karasu’da satılık daire](https://demirturkinsaat.com/) seçeneklerini incelerken konumu, yapının özelliklerini ve toplam maliyeti birlikte değerlendirmek gerekir. Yalnızca başlangıç fiyatına veya gelecekteki değer artışı beklentisine odaklanmak, seçenekler arasındaki önemli farkları gözden kaçırmanıza neden olabilir.'
        ]
      },
      {
        heading: 'Karasu’da bölge seçimi nasıl yapılmalı?',
        paragraphs: [
          'Karasu’da daire ararken Yalı, Aziziye ve Yenimahalle gibi bölgeleri kullanım amacınıza göre karşılaştırabilirsiniz. Ancak aynı mahalledeki iki dairenin bile ulaşımı, çevresi ve günlük kullanım avantajları farklı olabilir. Bu nedenle mahalle adının yanında taşınmazın tam konumunu incelemek önemlidir.'
        ]
      },
      {
        heading: 'Yalı Mahallesi’nde konumu değerlendirmek',
        paragraphs: [
          'Yalı Mahallesi’nde bir daire incelerken sahile gerçek yürüme mesafesini, plaja ulaşım güzergâhını ve günlük ihtiyaçlara erişimi kontrol edin. Yazlık kullanım düşünüyorsanız balkon, otopark ve bina yönetimi gibi ayrıntıları da karşılaştırmaya dahil edin.',
          '“Denize yakın” ifadesini harita ve yerinde ziyaretle değerlendirmek, beklentinizle dairenin konumu arasındaki uyumu görmenizi sağlar.'
        ]
      },
      {
        heading: 'Aziziye’de proje ve çevreyi birlikte incelemek',
        paragraphs: [
          'Aziziye’deki konut seçeneklerinde dairenin özelliklerinin yanında çevresindeki yerleşimi, ulaşımı ve mevcut hizmetleri değerlendirin. Yeni bir projeyle ilgileniyorsanız teslim takvimini, ortak alanların kapsamını ve çevrede devam eden inşaatları sorun.',
          'Henüz tamamlanmamış bir projenin görselleriyle mevcut durumunu birbirinden ayırarak değerlendirme yapmak, satın alacağınız konutu daha doğru anlamanıza yardımcı olur.'
        ]
      },
      {
        heading: 'Yenimahalle’de yaşam ve kullanım amacı',
        paragraphs: [
          'Yenimahalle, Sakarya Nehri’nin Karadeniz’e ulaştığı konumuyla öne çıkar. Nehir çevresi ve balık restoranları, bölgenin ziyaretçiler açısından dikkat çeken özellikleri arasındadır.',
          'Bu bölgede bir daire düşünüyorsanız manzara ve çevrenin yanında günlük ulaşımı, alışveriş noktalarına erişimi ve binanın teknik özelliklerini de inceleyin. Bölgeyi ziyaret etmekten hoşlanmanızla orada yıl boyunca yaşamak istemeniz farklı ihtiyaçlara dayanabilir.'
        ]
      },
      {
        heading: 'Karasu’da daire fiyatlarını karşılaştırırken nelere bakılmalı?',
        paragraphs: [
          'Sağlıklı bir fiyat karşılaştırması için benzer konumdaki ve benzer özelliklerdeki daireleri değerlendirin. Oda sayısı tek başına yeterli değildir; net kullanım alanı, kat, cephe, bina yaşı, teslim durumu ve sosyal alanlar da karşılaştırmanın parçası olmalıdır.',
          'İlan fiyatının gerçekleşmiş satış fiyatıyla aynı olmayabileceğini de göz önünde bulundurun. Güncel teklifleri incelemek ve satış kapsamını öğrenmek, daha gerçekçi bir bütçe oluşturmanızı sağlar.',
          'Karşılaştırma yaparken şu bilgileri not edebilirsiniz:'
        ],
        listItems: [
          'Dairenin net ve brüt alanı.',
          'Toplam satış bedeli ve ödeme koşulları.',
          'Teslim durumu ve daireye dahil özellikler.',
          'Aidat, bakım ve olası tadilat giderleri.',
          'Ulaşım, otopark ve günlük ihtiyaçlara erişim.'
        ]
      },
      {
        heading: 'Kira potansiyeli nasıl değerlendirilir?',
        paragraphs: [
          'Karasu’da kiraya vermek amacıyla daire almayı düşünüyorsanız yaz dönemiyle yıl boyunca kiralama seçeneklerini ayrı değerlendirin. Sezonluk kullanımda elde edilebilecek gelir ile düzenli kiralama koşulları aynı olmayabilir.',
          'Beklenen kira gelirini hesaplarken yalnızca ilanlarda görülen tutarları esas almayın. Evin boş kalabileceği dönemleri, aidatı, bakım giderlerini ve varsa yönetim masraflarını da hesaba katın. Kısa süreli kiralama düşünüyorsanız ilgili izin ve yükümlülükleri ayrıca araştırın.',
          'Bir dairenin kira potansiyeli; konumuna, durumuna, donanımına ve talebe bağlıdır. Bu nedenle tüm Karasu için tek bir gelir veya değer artışı oranı üzerinden karar vermek yerine, ilgilendiğiniz daireyi özel olarak değerlendirin.'
        ]
      },
      {
        heading: 'Ödeme planı yatırım kararını nasıl etkiler?',
        paragraphs: [
          'Peşinat ve vade seçenekleri, satın alma bütçenizi planlamanızı kolaylaştırabilir. Ancak uygun bir peşinat tutarı kadar, sonraki ödemelerin sürdürülebilir olması da önemlidir.',
          'Ödeme planında toplam satış bedelini, aylık taksitleri, varsa ara ödemeleri ve ödeme tarihlerini birlikte inceleyin. Peşin ve vadeli seçenekler sunuluyorsa toplam maliyetlerini karşılaştırın.',
          'Demirtürk İnşaat’ın [Karasu’daki konut projelerini](https://demirturkinsaat.com/projeler/) inceleyerek mevcut daireler ve güncel ödeme seçenekleri hakkında bilgi alabilirsiniz. Daireye ve kampanya dönemine göre değişen koşulları, size sunulan yazılı ödeme planı üzerinden değerlendirebilirsiniz.'
        ]
      },
      {
        heading: 'Proje seçerken hangi bilgiler istenmeli?',
        paragraphs: [
          'Proje seçimini yalnızca görseller veya fiyat üzerinden yapmayın. Firmanın tamamladığı projeleri inceleyin; ilgilendiğiniz dairenin tapu ve ruhsat durumunu, teslim kapsamını ve sözleşme koşullarını öğrenin.',
          'Havuz, bahçe, spor salonu veya otopark gibi alanlar sunuluyorsa kullanım koşullarını ve bakım giderlerini sorun. Satış görüşmesinde belirtilen özelliklerin ilgili belgelerde ve sözleşmede nasıl yer aldığını kontrol edin.',
          'Bu bilgiler, farklı projeleri aynı ölçütlerle karşılaştırmanıza ve kararınızı daha açık koşullar üzerinden vermenize yardımcı olur.'
        ]
      },
      {
        heading: 'Karasu’da size uygun daireyi birlikte değerlendirelim',
        paragraphs: [
          'Karasu’da gayrimenkul yatırımı için doğru seçim; kullanım amacınıza, bütçenize ve beklentilerinize uygun bir daire bulmakla başlar. Bölgeyi yerinde görmek, farklı daireleri karşılaştırmak ve ödeme koşullarını ayrıntılı öğrenmek bu süreci kolaylaştırır.',
          'Demirtürk İnşaat olarak projelerimizi tanımanız ve mevcut daire seçeneklerini incelemeniz için sizi ofisimize bekliyoruz. Güncel fiyatlar ve size uygun ödeme planı hakkında bilgi almak için bizimle iletişime geçebilirsiniz.'
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
            Karasu’da daire sahibi olma ve gayrimenkul yatırımı rehberi, bölge analizi ve sayfiye yaşamına dair uzman yazılarımız.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle && onSelectArticle(article)}
              className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm border border-[#fffff1]/15 hover:border-[#fffff1]/35 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40 flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252c33]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/10 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-[#fffff1]/60">
                    <span className="flex items-center">
                      <Calendar size={13} className="mr-1 text-[#fffff1]/80" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock size={13} className="mr-1 text-[#fffff1]/80" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-theSeasons text-2xl sm:text-3xl font-semibold text-[#fffff1] group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#fffff1]/80 line-clamp-3 font-light leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
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
