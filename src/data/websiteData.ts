import { ProjectItem, MaterialCategory, CompanyStat } from '../types'

export const COMPANY_INFO = {
  name: 'Demirtürk İnşaat',
  legalName: 'Demirtürk İnşaat & Yapı Malzemeleri San. Tic. Ltd. Şti.',
  sinceYear: 2003,
  tagline: 'Doğa, Deniz ve Çağdaş Mimarinin Karasu\'daki Prestijli Buluşması',
  subtagline: '20 yılı aşkın mühendislik birikimiyle temelden çatıya geleceğe değer katan yaşam alanları inşa ediyoruz.',
  address: 'Doğu Karadeniz Cd., Ata Sahil Sitesi No: 1, Karasu / Sakarya',
  phone: '0264 718 18 54',
  mobilePhone: '0530 102 40 01',
  whatsapp: '905301024001',
  email: 'info@demirturkinsaat.com',
  workingHours: 'Pazartesi - Pazar: 09:00 - 19:30',
  mapCoordinates: {
    lat: 41.1032,
    lng: 30.6865,
    query: 'Ata+Sahil+Sitesi+Doğu+Karadeniz+Caddesi+Karasu+Sakarya'
  }
}

export const COMPANY_STATS: CompanyStat[] = [
  { value: '2003', label: 'Kuruluş Yılı', sublabel: '20+ Yıllık Tecrübe' },
  { value: '1.650+', label: 'Teslim Edilen Konut', sublabel: 'Mutlu Aile & Yatırımcı' },
  { value: '28+', label: 'Tamamlanan Proje', sublabel: 'Karasu ve Çevresinde' },
  { value: 'Esnek', label: 'Elden Senet Modeli', sublabel: 'Kredisiz & Kefilsiz' },
]

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'asel-doga-evleri',
    slug: 'asel-doga-evleri',
    title: 'Asel Doğa Evleri',
    subtitle: 'Doğanın Kalbinde, Müstakil Bahçeli ve Havuzlu Lüks Yaşam',
    category: 'ongoing',
    categoryLabel: 'Havuzlu Yaşam Kompleksi',
    location: 'Yalı Mah. Doğu Karadeniz Cad., Karasu / Sakarya',
    year: '2024 - 2025',
    status: 'Satışta',
    totalArea: '14.800 m²',
    totalUnits: '96 Bağımsız Bölüm',
    unitTypes: ['1+1 Bahçe Katı', '2+1 Geniş Teraslı', '3+1 Dubleks'],
    description:
      'Asel Doğa Evleri; Karadeniz sahil çam ormanlarının ferahlatıcı oksijeni ile çağdaş mimarinin dingin çizgilerini bir araya getiriyor. Geniş yüzme havuzu, çocuk oyun alanları, peyzaj yürüyüş parkurları ve müstakil bahçe alanları ile dört mevsim tatil konforunda bir yaşam sunar.',
    architecturalPhilosophy:
      'Proje, Emre Arolat mimarisinin bağlamsal yaklaşımını benimseyerek doğal peyzajla homojen bir bütünlük kurar. Ahşap dokulu kompozit güneş kırıcılar, brüt beton ve traverten kaplamalar yapıyı Karasu\'nun sahil dokusuyla organik olarak kaynaştırır.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/aselforweb.jpeg',
      mobileSrc: '/images/aselforweb.jpeg',
      poster: '/images/aselforweb.jpeg',
      alt: 'Asel Doğa Evleri - Demirtürk İnşaat Karasu'
    },
    gallery: [
      {
        url: '/images/aselforweb.jpeg',
        title: 'Ön Cephe Mimarisi & Özel Balkonlar',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        title: 'Özel Yüzme Havuzu ve Güneşlenme Terasları',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        title: 'Cephe Mimarisi ve Doğal Çam Peyzajı',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        title: 'Geniş Balkonlar ve Bahçe Katı Ayrıcalığı',
        aspect: '9:16'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
        title: 'İç Mekan: Yüksek Tavan ve Doğal Gün Işığı',
        aspect: '16:9'
      }
    ],
    features: [
      'Açık Olimpik Yüzme Havuzu & Çocuk Havuzu',
      '24/7 Güvenlik & Kapalı Devre Kamera Sistemi',
      'Yerden Isıtma & Birinci Sınıf Isı Yalıtımı',
      'Denize ve Sahil Kordonuna 150 Metre Mesafe',
      'Özel Açık Otopark & Elektrikli Şarj İstasyonu',
      'Peyzaj Alanları & Kamelyalar, Çocuk Parkı'
    ],
    floorPlans: [
      {
        name: '2+1 Geniş Teraslı Daire',
        area: '88 m² Brüt / 74 m² Net',
        rooms: '2 Yatak Odası, Salon, Açık Mutfak, Teras Balkon, Banyo',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        description: 'Geniş cepheli salon ve ferah teras balkonuyla Karadeniz meltemini içeri davet eden fonksiyonel plan şeması.'
      },
      {
        name: '1+1 Bahçe Teraslı Daire',
        area: '56 m² Brüt / 48 m² Net',
        rooms: '1 Yatak Odası, Salon & Mutfak, Bahçe Verandası',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        description: 'Yazlık kullanım ve yüksek kira getirisi için optimize edilmiş kompakt, şık ve lüks detaylar.'
      },
      {
        name: '3+1 Çatı Dubleksi',
        area: '135 m² Brüt / 115 m² Net',
        rooms: '3 Yatak Odası, Geniş Salon, 2 Banyo, Panoramik Teras',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        description: 'Çift terasıyla deniz ve doğa manzarasını kesintisiz sunan seçkin aile yaşam alanı.'
      }
    ],
    installmentMonths: 40,
    isFeatured: true
  },
  {
    id: 'almina-evleri',
    slug: 'almina-evleri',
    title: 'Almina Evleri',
    subtitle: 'Karasu Sahil Şeridinde Denize Sıfır Modern Rezidans',
    category: 'luxury-residence',
    categoryLabel: 'Denize Sıfır Rezidans',
    location: 'Sahil Caddesi, Karasu / Sakarya',
    year: '2023 - 2024',
    status: 'Satışta',
    totalArea: '11.200 m²',
    totalUnits: '72 Daire',
    unitTypes: ['1+1', '2+1', '3+1 Penthouse'],
    description:
      'Almina Evleri; Karasu kumsalına sadece 50 metre mesafede, kesintisiz gün batımı manzarası ve modern sahil mimarisiyle yükseliyor. Geniş cam cepheleri, deniz havasını içeri alan ferah balkonları ve özel havuzu ile seçkin bir sahil yaşamı vadediyor.',
    architecturalPhilosophy:
      'Ufuk çizgisini ve deniz manzarasını yapının merkezine alan şeffaf mimari yaklaşım. Emre Arolat tarzı gölge oyunları ve teras kademelendirmeleriyle rüzgar yükü dengelenmiş ve her bağımsız bölüm için mahremiyet sağlanmıştır.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/alminaforweb.jpeg',
      mobileSrc: '/images/alminaforweb.jpeg',
      poster: '/images/alminaforweb.jpeg',
      alt: 'Almina Evleri - Karasu Sahil Şeridi'
    },
    gallery: [
      {
        url: '/images/alminaforweb.jpeg',
        title: 'Gece Mimarisi ve Dış Cephe Aydınlatması',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        title: 'Geniş Açık Havuz ve Dinlenme Alanı',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        title: 'Modern Sahil Mimarisi Cephesi',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        title: 'Ferah İç Mekan Tasarımı',
        aspect: '9:16'
      }
    ],
    features: [
      'Denize Yürüme Mesafesinde (50 Metre)',
      'Açık Havuz & Güneşlenme Terası',
      'Fitness Salonu & Sosyal Tesis',
      'Yatırımcıya Yüksek Kira Garantisi',
      'Elden Senetle Esnek Vade Kolaylığı',
      'Merkezi Konum, Kafe ve Çarşılara Yakın'
    ],
    floorPlans: [
      {
        name: '2+1 Sahil Dairesi',
        area: '82 m² Brüt / 68 m² Net',
        rooms: '2 Oda, Salon, Amerikan Mutfak, Banyo, Balkon',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        description: 'Deniz rüzgarını içeri alan geniş balkon ve aydınlık yaşam alanı.'
      }
    ],
    installmentMonths: 36,
    isFeatured: true
  },
  {
    id: 'demirturk-suite',
    slug: 'demirturk-suite',
    title: 'Demirtürk Suite Karasu',
    subtitle: 'Şehir Merkezinde Butik ve Konforlu Şehir Yaşamı',
    category: 'ongoing',
    categoryLabel: 'Butik Rezidans',
    location: 'İnönü Cad. Karasu Merkez, Sakarya',
    year: '2024 - 2025',
    status: 'Yapım Aşamasında',
    totalArea: '6.400 m²',
    totalUnits: '44 Rezidans + 6 Ticari Alan',
    unitTypes: ['1+1', '2+1', 'Ofis & Ticari'],
    description:
      'Demirtürk Suite; Karasu ilçe merkezinde resmi kurumlara, bankalara, hastaneye ve alışveriş noktalarına yürüme mesafesinde butik bir rezidans projesidir. Zemin kattaki seçkin ticari alanları ve üst katlardaki akıllı daireleriyle hem iş hem yaşam için idealdir.',
    architecturalPhilosophy:
      'Kentsel dokuda brütalist ve minimalist unsurların modern cam yüzeylerle dengelendiği kentsel bir nirengi noktası.',
    heroMedia: {
      type: 'image',
      desktopSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
      mobileSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1080&q=80',
      poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
      alt: 'Demirtürk Suite Karasu Merkez'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
        title: 'Modern Şehir Mimarisi',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        title: 'Butik Rezidans Lobi & Giriş',
        aspect: '16:9'
      }
    ],
    features: [
      'Kapalı Otopark Alanı',
      'Akıllı Ev Altyapısı',
      'Cadde Cepheli Ticari Dükkanlar',
      'Asansör & Jeneratör Altyapısı',
      'Deprem Yönetmeliğine %100 Uyumlu C35 Beton'
    ],
    floorPlans: [
      {
        name: '1+1 Şehir Suiti',
        area: '52 m²',
        rooms: '1+1',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        description: 'Merkezi konumda minimal ve konforlu şehir evi.'
      }
    ],
    installmentMonths: 40,
    isFeatured: false
  },
  {
    id: 'yenisehir-rezidans',
    slug: 'yenisehir-rezidans',
    title: 'Yeni Şehir Rezidans',
    subtitle: 'Karasu Yenişehir\'de Prestijli, Modern ve Havuzlu Rezidans Yaşamı',
    category: 'luxury-residence',
    categoryLabel: 'Lüks Rezidans',
    location: 'Yenişehir Mah., Karasu / Sakarya',
    year: '2024 - 2025',
    status: 'Satışta',
    totalArea: '16.500 m²',
    totalUnits: '84 Bağımsız Bölüm',
    unitTypes: ['1+1 Bahçe Katı', '2+1 Geniş Teraslı', '3+1 Dubleks'],
    description:
      'Yeni Şehir Rezidans; Karasu\'nun hızla gelişen ve değer kazanan Yenişehir bölgesinde, çağdaş mimariyi geniş peyzaj alanları ve açık yüzme havuzuyla buluşturuyor. Deprem yönetmeliğine tam uyumlu radye temel mühendisliği ve elden senetli esnek ödeme kolaylığıyla güvenli ve prestijli bir yaşam sunar.',
    architecturalPhilosophy:
      'Güneş ışığını maksimum alan geniş cam açıklıkları, ferah teras kademelendirmeleri ve brütalist cephe çizgileriyle modern şehir konforunu doğayla buluşturan yalın mimari dil.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/yenisehirforweb.jpeg',
      mobileSrc: '/images/yenisehirforweb.jpeg',
      poster: '/images/yenisehirforweb.jpeg',
      alt: 'Yeni Şehir Rezidans Karasu'
    },
    gallery: [
      {
        url: '/images/yenisehirforweb.jpeg',
        title: 'Doğal Taş Kaplama & Geniş Balkonlar',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
        title: 'Özel Yüzme Havuzu & Peyzaj',
        aspect: '16:9'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
        title: 'Ferah Teras Balkonları & Yaşam Alanı',
        aspect: '16:9'
      }
    ],
    features: [
      'Geniş Açık Yüzme Havuzu ve Çocuk Havuzu',
      'Yerden Isıtma & Birinci Sınıf Ses/Isı Yalıtımı',
      'Kapalı ve Açık Otopark Alanları',
      '7/24 Güvenlik ve Kamera Altyapısı',
      'Elden Senetle 36 Aya Varan Vade Kolaylığı'
    ],
    floorPlans: [
      {
        name: '2+1 Geniş Teraslı Rezidans',
        area: '88 m² Brüt / 74 m² Net',
        rooms: '2 Yatak Odası, Salon, Ada Mutfak, Teras Balkon, Banyo',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        description: 'Ferah iç mekan planı ve gün boyu doğal ışık alan geniş teras balkonu.'
      }
    ],
    installmentMonths: 36,
    isFeatured: true
  },
  {
    id: 'seaside-house',
    slug: 'seaside-house',
    title: 'Seaside House Karasu',
    subtitle: 'Karadeniz Kıyısında Dinamik ve Dinlendirici Tatil Evi',
    category: 'completed',
    categoryLabel: 'Tamamlanan Proje',
    location: 'Doğu Karadeniz Cad., Karasu / Sakarya',
    year: '2022 - 2023',
    status: 'Tamamlandı',
    totalArea: '9.500 m²',
    totalUnits: '60 Daire',
    unitTypes: ['1+1', '2+1', 'Bahçe Dubleksi'],
    description:
      'Seaside House, 2023 yılında başarıyla tamamlanıp tüm maliklerine eksiksiz teslim edilmiştir. Yüksek malzeme standardı ve peyzajıyla Karasu sahil bölgesinin simge projelerinden biridir.',
    architecturalPhilosophy:
      'Dalgaların ritmini yansıtan akışkan balkon korkulukları ve dayanıklı marin tipi dış cephe kaplamalarıyla Karadeniz iklimine tam uyum.',
    heroMedia: {
      type: 'image',
      desktopSrc: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      mobileSrc: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1080&q=80',
      poster: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      alt: 'Seaside House Karasu'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
        title: 'Tamamlanan Cephe ve Peyzaj',
        aspect: '16:9'
      }
    ],
    features: [
      'Eksiksiz Teslim Edilmiş ve İskanı Alınmış',
      'Ortak Yüzme Havuzu',
      'Site İçi Çocuk Oyun Parkı',
      'Plaja 100 Metre Mesafe'
    ],
    floorPlans: [],
    isFeatured: false
  },
  {
    id: 'yenisehir-konaklari',
    slug: 'yenisehir-konaklari',
    title: 'Yenişehir Konakları',
    subtitle: 'Geniş Aileler İçin Ferah ve Güvenli Yaşam Alanı',
    category: 'completed',
    categoryLabel: 'Tamamlanan Proje',
    location: 'Yenişehir Mah., Karasu / Sakarya',
    year: '2021 - 2022',
    status: 'Tamamlandı',
    totalArea: '8.200 m²',
    totalUnits: '48 Daire',
    unitTypes: ['2+1', '3+1'],
    description:
      'Geniş balkonları, çocuk oyun alanları ve ferah oda planları ile aile konseptine uygun olarak geliştirilen ve yaşamın başladığı prestijli projemiz.',
    architecturalPhilosophy:
      'Geleneksel mahalle sıcaklığını çağdaş site konforu ve güvenlik standartlarıyla buluşturan mimari kurgu.',
    heroMedia: {
      type: 'image',
      desktopSrc: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80',
      mobileSrc: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1080&q=80',
      poster: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80',
      alt: 'Yenişehir Konakları Karasu'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80',
        title: 'Site Peyzajı ve Bloklar',
        aspect: '16:9'
      }
    ],
    features: [
      'Yaşam Başladı, İskanlı ve Kat Mülkiyetli',
      'Geniş Yeşil Alanlar ve Kamelyalar',
      'Açık Otopark',
      'Güvenlik ve Giriş Kontrolü'
    ],
    floorPlans: [],
    isFeatured: false
  }
]

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'demir-celik',
    title: 'Nervürlü İnşaat Demiri',
    description: 'Bölgenin en güçlü demir stoğu ile deprem yönetmeliğine uygun, sertifikalı nervürlü demir tedariki.',
    icon: 'Hammer',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    items: ['BÇ III / S420 Nervürlü Çelik', 'Ø8 - Ø32 mm Tüm Ebatlar', 'TSE ve CE Belgeli', 'Şantiye Teslimi Lojistik']
  },
  {
    id: 'cimento-beton',
    title: 'Hazır Beton & Çimento',
    description: 'Yüksek mukavemetli C25, C30, C35 hazır beton ve torbalı çimento çözümleri.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    items: ['C30/37 ve C35/45 Hazır Beton', 'Portland Çimento', 'Karasu ve Çevre İlçelere Pompa Hizmeti']
  },
  {
    id: 'tugla-bims',
    title: 'Tuğla, Gazbeton & Bims',
    description: 'Yüksek ısı ve ses yalıtımlı blok yapı elemanları, çevre dostu ve uzun ömürlü malzemeler.',
    icon: 'Box',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    items: ['İzotuğla & Standart Tuğla', 'Ytong Gazbeton Bloklar', 'Bims Yalıtım Blokları', 'Baca ve Asmolen']
  },
  {
    id: 'yalitim-cati',
    title: 'Yalıtım & Çatı Sistemleri',
    description: 'Su ve ısı yalıtım membranları, taşyünü, XPS ve modern çatı kiremit sistemleri.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    items: ['Taşyünü & EPS Mantolama', 'Bitümlü Su Membranı', 'Shingle ve Kiremit', 'Onduline Çatı Levhaları']
  },
  {
    id: 'seramik-vitrifiye',
    title: 'Seramik & İnce Yapı',
    description: 'Lüks konut ve ticari yapılar için porselen seramikler, banyo bataryaları ve yapı kimyasalları.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    items: ['60x120 Granit Porselen', 'Yapıştırıcı & Derz Dolguları', 'Lüks Vitrifiye ve Armatürler']
  }
]

export const FINANCING_ADVANTAGES = [
  {
    title: 'Kredisiz & Kefilsiz Elden Senet',
    description: 'Banka faizlerine veya dosya masraflarına katlanmadan, doğrudan Demirtürk İnşaat güvencesiyle elden senetli ödeme kolaylığı.',
    highlight: 'Esnek Vade'
  },
  {
    title: 'Ücretsiz Karasu Proje Turu',
    description: 'İstanbul ve çevre illerden Karasu\'ya özel transfer aracımızla gelin, projelerimizi ve örnek dairelerimizi yerinde canlı olarak inceleyin.',
    highlight: 'VIP Transfer & Misafirlik'
  },
  {
    title: 'Esnek Peşinat & Ara Ödeme',
    description: 'Bütçenize göre belirlenebilen peşinat oranları ve hasat / ikramiye dönemlerine uygun esnek ara ödeme planı.',
    highlight: 'Esnek Peşinat'
  },
  {
    title: 'Araç & Gayrimenkul Takası',
    description: 'Mevcut aracınızı veya gayrimenkulünüzü değerinde takas seçeneği ile değerlendirerek yeni konutunuza hemen sahip olun.',
    highlight: 'Değerinde Takas İmkanı'
  }
]
