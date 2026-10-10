import { ProjectItem, MaterialCategory, CompanyStat } from '../types'

export const COMPANY_INFO = {
  name: 'Demirtürk İnşaat',
  legalName: 'Demirtürk İnşaat & Yapı Malzemeleri San. Tic. Ltd. Şti.',
  sinceYear: 2003,
  tagline: 'Doğa, Deniz ve Çağdaş Mimarinin Karasu\'daki Prestijli Buluşması',
  subtagline: '20 yılı aşkın mühendislik birikimiyle temelden çatıya geleceğe değer katan yaşam alanları inşa ediyoruz.',
  address: 'Doğu Karadeniz Cd. No: 1, Aziziye, Karasu / Sakarya',
  phoneNumbers: [
    '+90 531 373 00 54',
    '+90 545 305 53 54',
    '0264 718 00 54',
    '+90 530 102 40 01'
  ],
  phone: '+90 531 373 00 54',
  landlinePhone: '0264 718 00 54',
  mobilePhone: '+90 531 373 00 54',
  secondaryPhone: '+90 530 102 40 01',
  materialsPhone: '+90 545 305 53 54',
  materialsWhatsapp: '905453055354',
  whatsapp: '905313730054',
  email: 'info@demirturkinsaat.com',
  workingHoursNote: 'Her gün açığız',
  workingHoursWeekday: 'Hafta içi 09:00 - 20:00',
  workingHoursWeekend: 'Hafta sonu 09:00 - 21:00',
  workingHours: 'Hafta içi 09:00 - 20:00 | Hafta sonu 09:00 - 21:00 (Her gün açığız)',
  mapCoordinates: {
    lat: 41.100494,
    lng: 30.718688,
    query: '41.100494,30.718688'
  },
  social: {
    instagram: 'https://www.instagram.com/demirturkinsaat',
    sahibinden: 'https://karasudemirturk.sahibinden.com/',
    hepsiemlak: 'https://www.hepsiemlak.com/emlak-ofisi/demirturk-yapi-insaat-sanayi-ve-ticaret-limited-si-159946'
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
    seriesInfo: '2 proje • 3. ve 4. projeler yakında',
    cardSize: 'standard',
    subtitle: 'Doğanın kalbinde, müstakil bahçeli ve havuzlu lüks yaşam',
    slideDescription: 'Şehir ve doğayı en sade çizgiyle ayıran yaşam alanı',
    category: 'ongoing',
    categoryLabel: 'Havuzlu yaşam kompleksi',
    location: 'Aziziye Mah., Karasu',
    distanceToSea: 'Denize ~850 Metre',
    year: '2026 - 2027',
    status: 'Satışta & Devam Ediyor',
    totalArea: '14.800 m²',
    totalUnits: '1+1 ve 2+1 Daireler',
    unitTypes: ['1+1 ve 2+1 Daireler'],
    description:
      'Asel Doğa Evleri; Karadeniz sahil çam ormanlarının ferahlatıcı oksijeni ile çağdaş mimarinin dingin çizgilerini bir araya getiriyor. Geniş yüzme havuzu, çocuk oyun alanları, peyzaj yürüyüş parkurları ve müstakil bahçe alanları ile dört mevsim tatil konforunda bir yaşam sunar.',
    architecturalPhilosophy:
      'Doğal peyzajla uyumlu modern mimari hatlar, ferah balkonlar ve geniş bahçe alanlarıyla Karasu’nun sahil dokusuna değer katan, dört mevsim konfor sunan fonksiyonel bir yaşam kurgusu.',
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
      'Denize ve Sahil Kordonuna Yakın Konum',
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
      }
    ],
    installmentMonths: 40,
    isFeatured: true,
    stages: [
      {
        id: 'asel-doga-1',
        stageNumber: 1,
        title: 'Asel Doğa 1',
        subtitle: 'Tamamlanan ve yaşamın başladığı ilk proje',
        status: 'Tamamlandı',
        year: '2026',
        deliveryDate: '2026',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: 'Denize ~750 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Asel Doğa serisinin ilk projesi; Aziziye Mahallesi’nde tamamlanmış, geniş bahçe ve havuz konseptiyle anahtar teslimi yapılmıştır.',
        features: [
          'Tamamlandı & Yaşam Başladı (2026)',
          'Aziziye Mahallesi, Karasu',
          'Denize ~750 Metre Mesafe',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yüzme Havuzu & Bahçe Alanları',
          'Yerden Isıtmalı Modern Konutlar'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '6.400 m²'
      },
      {
        id: 'asel-doga-2',
        stageNumber: 2,
        title: 'Asel Doğa 2',
        subtitle: 'Aziziye Mahallesi’nde inşası ve satışları hızla devam eden güncel proje',
        status: 'Satışta & Devam Ediyor',
        year: '2027',
        deliveryDate: '2027',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: 'Denize ~850 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Asel Doğa serisinin devam projesi olan Asel Doğa 2; açık olimpik yüzme havuzu, yerden ısıtmalı modern daireleri, zengin peyzajı ve müstakil bahçe alanları ile 2027 teslimi için satış ve yapım süreci devam etmektedir.',
        features: [
          'Satışta & Devam Ediyor (Teslim: 2027)',
          'Aziziye Mahallesi – Doğayla İç İçe',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Açık Olimpik Yüzme Havuzu & Çocuk Havuzu',
          'Yerden Isıtmalı Lüks Yaşam Standardı',
          'Elden Senetle Esnek Ödeme Modeli'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '8.400 m²'
      },
      {
        id: 'asel-doga-3',
        stageNumber: 3,
        title: 'Asel Doğa 3',
        subtitle: 'Aziziye Mahallesi’nde doğayla iç içe planlanan yeni proje',
        status: 'Yakında',
        year: 'Yakında',
        deliveryDate: 'Yakında',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: 'Denize ~900 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Aziziye Mahallesi’nde planlanan Asel Doğa 3; doğa ile iç içe huzurlu mimarisi, zengin sosyal donatıları ve modern mimari detaylarıyla çok yakında başlayacaktır.',
        features: [
          'Yakında Başlıyor (Ön Talep Aşaması)',
          'Aziziye Mahallesi Sakin ve Ferah Lokasyon',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Modern Mimari & Doğa Manzarası',
          'Yüzme Havuzu & Peyzaj Alanları',
          'Lansmana Özel Avantajlı Fiyatlar'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '7.200 m²'
      },
      {
        id: 'asel-doga-4',
        stageNumber: 4,
        title: 'Asel Doğa 4',
        subtitle: 'Asel Doğa yaşam konseptinin dördüncü halkası',
        status: 'Yakında',
        year: 'Yakında',
        deliveryDate: 'Yakında',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: 'Denize ~900 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Asel Doğa konseptinin dördüncü halkası; sakin ve prestijli sahil lokasyonunda, yüksek inşaat kalitesi ve esnek ödeme koşullarıyla çok yakında projelendirilecektir.',
        features: [
          'Yakında Projelendirilecek',
          'Aziziye Mahallesi Lokasyonu',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yüksek Malzeme Standardı & Yalıtım',
          'Özel Otopark & Sosyal Donatılar'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '6.800 m²'
      }
    ]
  },
  {
    id: 'yenisehir-rezidans',
    slug: 'yenisehir-rezidans',
    title: 'Yeni Şehir Etapları',
    seriesInfo: 'Tamamlanan 1. ve 2. etap • 3. etap devam ediyor',
    cardSize: 'standard',
    subtitle: 'Karasu Yalı Mahallesi’nde 1.000.000₺ peşinat ve 40 ay vadeyle 3 etaplı yaşam alanı',
    slideDescription: 'Doğal taşın ilhamıyla prestijli bir yaşam',
    category: 'luxury-residence',
    categoryLabel: 'Lüks rezidans kompleksi',
    location: 'Yalı Mah., Karasu',
    distanceToSea: 'Denize ~800 Metre (Aşağı Yukarı)',
    year: '2025 - 2028',
    status: 'Satışta & Devam Ediyor',
    totalArea: '17.400 m²',
    totalUnits: '1+1 ve 2+1 Daireler',
    unitTypes: ['1+1 ve 2+1 Daireler'],
    description:
      'Yeni Şehir Etapları; Karasu Yalı Mahallesi\'nin hızla gelişen ve değer kazanan bölgesinde, denize yaklaşık 800 metre mesafede çağdaş sahil mimarisini geniş peyzaj alanları, yarı olimpik aqua havuzu ve yerden ısıtmalı konforlu evlerle buluşturuyor. 1.000.000₺ peşinat, 40 ay vade ve araç takas imkânıyla 3 etap halinde hayata geçirilen güvenli ve prestijli bir yaşam projesi.',
    architecturalPhilosophy:
      'Güneş ışığını maksimum alan ferah teras kademelendirmeleri, modern cephe hatları ve enerji tasarruflu güneş paneli altyapısıyla çevre dostu, güvenli ve estetik sahil mimarisi.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/yenisehirforweb.jpeg',
      mobileSrc: '/images/yenisehirforweb.jpeg',
      poster: '/images/yenisehirforweb.jpeg',
      alt: 'Yeni Şehir Etapları Karasu'
    },
    gallery: [
      {
        url: '/images/yenisehirforweb.jpeg',
        title: 'Yeni Şehir Etapları - Modern Dış Cephe',
        aspect: '16:9'
      },
      {
        url: '/images/yenisehirforweb.jpeg',
        title: 'Özel Havuz Alanı ve Balkonlar',
        aspect: '16:9'
      },
      {
        url: '/images/yenisehirforweb.jpeg',
        title: 'Bahçe ve Yeşil Peyzaj',
        aspect: '16:9'
      }
    ],
    paymentHighlight: {
      downPayment: '1.000.000₺',
      installment: '40 Ay Vade',
      tradeIn: 'Araç Takası Kabul Edilir',
      badgeText: '1.000.000₺ Peşinat — 40 Ay Vade — Araç Takası'
    },
    featureDetails: [
      {
        icon: 'Sun',
        title: 'Güneş Paneli',
        description: 'Enerji tasarrufu sağlayan güneş paneli sistemi ile çevreci ve ekonomik bir yaşam altyapısı sunulmaktadır.'
      },
      {
        icon: 'Waves',
        title: 'Aqua Havuz & Yüzme Alanları',
        description: 'Aqua havuz konsepti ile tatil konforunda yaşam. Çocuk ve yetişkinler için ayrı yüzme alanları sayesinde ailece güvenli ve keyifli vakit geçirebilirsiniz.'
      },
      {
        icon: 'Smile',
        title: 'Çocuk Oyun Alanı',
        description: 'Güvenli oyun parkı sayesinde çocuklar eğlenirken siz de site içinde huzurlu bir yaşamın keyfini çıkarabilirsiniz.'
      },
      {
        icon: 'Zap',
        title: 'Araç Şarj İstasyonu',
        description: 'Elektrikli araç kullanıcıları için site içerisinde modern araç şarj altyapısı bulunmaktadır.'
      },
      {
        icon: 'Home',
        title: '1+1 & 2+1 Daire Seçenekleri',
        description: 'Yatırım ve oturum için ideal, modern mimariye sahip 1+1 ve 2+1 daire seçenekleriyle konforlu yaşam alanları sunulmaktadır.'
      },
      {
        icon: 'BadgePercent',
        title: 'Avantajlı Ödeme Fırsatları',
        description: '1.000.000₺ peşinat, 40 ay vade seçeneği ile kolay ödeme imkanı. Ayrıca peşinat yerine araç takası kabul edilerek yatırımınızı daha esnek hale getiriyoruz.'
      }
    ],
    features: [
      '1.000.000₺ Peşinat – 40 Ay Vade – Araç Takas',
      'Yalı Mahallesi – Denize ~800 Metre (Aşağı Yukarı)',
      '1+1 & 2+1 Daire Seçenekleri',
      'Havuzlu, Müstakil Bahçeli Lüks Yazlık Evler',
      'Yerden Isıtmalı Lüks Konsept',
      'Aqua Havuz & Yarı Olimpik Yüzme Alanı',
      'Güneş Paneli Enerji Altyapısı',
      'Elektrikli Araç Şarj İstasyonu',
      'Güvenli Çocuk Oyun Parkı'
    ],
    stages: [
      {
        id: 'yenisehir-etap-1',
        stageNumber: 1,
        title: 'Yeni Şehir 1. Etap',
        subtitle: 'Yalı Mahallesi’nde tamamlanan ve teslim edilen ilk etap',
        status: 'Tamamlandı',
        year: '2025',
        deliveryDate: '2025',
        location: 'Yalı Mah., Karasu',
        distanceToSea: 'Denize ~800 Metre (Aşağı Yukarı)',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Yeni Şehir vizyonunun ilk adımı olan 1. Etap; başarıyla tamamlanarak kat maliklerine eksiksiz teslim edilmiştir. Yüzme havuzu, yerden ısıtma ve kaliteli yapı malzemeleriyle güvenli bir site yaşamı sunar.',
        features: [
          'Tamamlandı & Teslim Edildi',
          'Yalı Mahallesi, Karasu',
          'Denize ~800 Metre (Aşağı Yukarı)',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yerden Isıtmalı Isınma Altyapısı',
          'Açık Yüzme Havuzu',
          'Site İçi Yeşil Alanlar ve Otopark',
          '24/7 Güvenlikli Giriş'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '4.200 m²'
      },
      {
        id: 'yenisehir-etap-2',
        stageNumber: 2,
        title: 'Yeni Şehir 2. Etap',
        subtitle: 'Yalı Mahallesi’nde satışta olan butik etap',
        status: 'Satışta',
        year: '2025',
        deliveryDate: '2025',
        location: 'Yalı Mah., Karasu',
        distanceToSea: 'Denize ~800 Metre (Aşağı Yukarı)',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Yeni Şehir 2. Etap; yerden ısıtmalı konforlu daireleri, açık yüzme havuzu, çocuk oyun alanları ve huzurlu site peyzajıyla satışta olan seçkin bir sahil sitesidir.',
        features: [
          'Satışta Olan Etap',
          'Yalı Mahallesi, Karasu',
          'Denize ~800 Metre (Aşağı Yukarı)',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yerden Isıtmalı Isınma Konforu',
          'Açık Yüzme Havuzu & Çocuk Havuzu',
          'Çocuk Oyun Parkı & Kamelyalar',
          'Güvenlik ve Kamera Altyapısı'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '4.800 m²'
      },
      {
        id: 'yenisehir-etap-3',
        stageNumber: 3,
        title: 'Yeni Şehir 3. Etap',
        subtitle: 'Yalı Mahallesi’nde en güncel, havuzlu, yerden ısıtmalı ve güneş panelli etap',
        status: 'Satışta & Devam Ediyor',
        year: '2028',
        deliveryDate: '2028',
        location: 'Yalı Mah., Karasu',
        distanceToSea: 'Denize ~800 Metre (Aşağı Yukarı)',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Yeni Şehir serisinin en güncel etabı olan 3. Etap; yerden ısıtmalı lüks yazlık evleri, yarı olimpik aqua havuzu, güneş paneli sistemi ve elektrikli araç şarj istasyonu ile 2028 teslimi için hızla yükselmektedir. 1.000.000₺ peşinat ve 40 ay elden senet imkânıyla satışları devam etmektedir.',
        features: [
          'Teslim Tarihi: 2028 (Satışta & Devam Ediyor)',
          'Yalı Mahallesi — Denize ~800 Metre (Aşağı Yukarı)',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yerden Isıtmalı Lüks Yazlık Evler',
          'Aqua Havuz & Yarı Olimpik Yüzme Alanları',
          'Güneş Paneli Enerji Sistemi',
          'Elektrikli Araç Şarj İstasyonu',
          'Güvenli Çocuk Oyun Parkı & Peyzaj',
          'Müstakil Bahçeli ve Teraslı Seçenekler'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '8.400 m²'
      }
    ],
    floorPlans: [
      {
        name: '2+1 Geniş Teraslı Daire',
        area: '88 m² Brüt / 74 m² Net',
        rooms: '2 Yatak Odası, Salon, Ada Mutfak, Teras Balkon, Banyo',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
        description: 'Yerden ısıtmalı, ferah iç mekan planı ve gün boyu doğal ışık alan geniş teras balkonu.'
      },
      {
        name: '1+1 Bahçe & Balkonlu Daire',
        area: '58 m² Brüt / 49 m² Net',
        rooms: '1 Yatak Odası, Salon & Mutfak, Geniş Balkon, Banyo',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        description: 'Yazlık kullanım ve yüksek kira getirisi için ideal kompakt, yerden ısıtmalı ve konforlu plan.'
      }
    ],
    installmentMonths: 40,
    isFeatured: true
  },
  {
    id: 'almina-evleri',
    slug: 'almina-evleri',
    title: 'Almina Evleri',
    seriesInfo: 'Tamamlanan 1 proje • 2. proje devam ediyor',
    cardSize: 'standard',
    subtitle: 'Karasu sahil şeridinde denize sıfır modern rezidans',
    slideDescription: 'Şehir hayatının hiçbir zaman aksamadığı bir yaşam alanı',
    category: 'luxury-residence',
    categoryLabel: 'Denize sıfır rezidans',
    location: 'Yalı Mah., Plaj Cd., Karasu',
    distanceToSea: 'Denize ~800 Metre',
    year: '2023 - 2025',
    status: 'Satışta & Devam Ediyor',
    totalArea: '11.200 m²',
    totalUnits: '1+1 ve 2+1 Daireler',
    unitTypes: ['1+1 ve 2+1 Daireler'],
    description:
      'Almina Evleri; Karasu kumsalına sadece yürüme mesafesinde, kesintisiz gün batımı manzarası ve modern sahil mimarisiyle yükseliyor. Geniş cam cepheleri, deniz havasını içeri alan ferah balkonları ve özel havuzu ile seçkin bir sahil yaşamı vadediyor.',
    architecturalPhilosophy:
      'Ufuk çizgisini ve deniz manzarasını yapının merkezine alan ferah ve modern mimari. Kademeli teraslar ve geniş cam açıklıklarıyla gün ışığını maksimum düzeyde içeri alan, her bağımsız bölüm için mahremiyet sağlayan çağdaş tasarım.',
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
      'Denize Yürüme Mesafesinde',
      'Açık Havuz & Güneşlenme Terası',
      'Fitness Salonu & Sosyal Tesis',
      'Yatırımcıya Yüksek Kira Garantisi',
      'Elden Senetle Esnek Vade Kolaylığı',
      'Merkezi Konum, Kafe ve Çarşılara Yakın'
    ],
    stages: [
      {
        id: 'almina-1',
        stageNumber: 1,
        title: 'Almina 1',
        subtitle: 'Sahil şeridinde tamamlanan ve teslim edilen ilk proje',
        status: 'Tamamlandı',
        year: '2023',
        deliveryDate: '2023',
        location: 'Yalı Mah., Karasu',
        distanceToSea: 'Denize ~750 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Almina Evleri projesinin ilk etabı; Karasu sahil bölgesinde tamamlanmış, tüm daireleri kat maliklerine eksiksiz teslim edilmiştir.',
        features: [
          'Tamamlandı & Yaşam Başladı (2023)',
          'Yalı Mahallesi, Karasu',
          'Denize ~750 Metre Mesafe',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Yüzme Havuzu & Güneşlenme Terası',
          'Balkonlu ve Ferah Sahil Evleri'
        ],
        image: '/images/alminaforweb.jpeg',
        totalArea: '5.200 m²'
      },
      {
        id: 'almina-2',
        stageNumber: 2,
        title: 'Almina 2',
        subtitle: 'Plaj Caddesi’nde satışları ve yapımı devam eden güncel proje',
        status: 'Satışta & Devam Ediyor',
        year: '2024 - 2025',
        deliveryDate: '2025',
        location: 'Yalı Mah., Plaj Cd., Karasu',
        distanceToSea: 'Denize ~850 Metre',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'Almina serisinin devam projesi olan Almina 2; açık yüzme havuzu, yerden ısıtma konforu ve lüks sahil mimarisiyle satış ve yapım süreci devam etmektedir.',
        features: [
          'Satışta & Devam Ediyor',
          'Yalı Mahallesi, Plaj Caddesi',
          'Denize ~850 Metre Mesafe',
          '1+1 ve 2+1 Daire Seçenekleri',
          'Açık Havuz & Güneşlenme Terası',
          'Elden Senet Modeliyle Kolay Ödeme'
        ],
        image: '/images/alminaforweb.jpeg',
        totalArea: '6.000 m²'
      }
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
    id: 'seaside-house',
    slug: 'seaside-house',
    title: 'Seaside House',
    seriesInfo: 'Tamamlandı',
    cardSize: 'standard',
    subtitle: 'Karadeniz kıyısında dinamik ve dinlendirici sahil yaşamı',
    slideDescription: 'Nehir ve Karadeniz, muhteşem bir konumda bir araya geliyor.',
    category: 'completed',
    categoryLabel: 'Tamamlanan proje',
    location: 'Yeni Mahalle, Karasu',
    distanceToSea: 'Denize ~100 Metre',
    year: '2022 - 2023',
    status: 'Tamamlandı',
    totalArea: '9.500 m²',
    totalUnits: '1+1 ve 2+1 Daireler',
    unitTypes: ['1+1 ve 2+1 Daireler'],
    description:
      'Seaside House, Karasu sahil şeridinde başarıyla tamamlanıp tüm maliklerine eksiksiz teslim edilmiştir. Yüksek malzeme standardı, açık yüzme havuzu ve peyzajıyla Karasu sahil bölgesinin simge projelerinden biridir.',
    architecturalPhilosophy:
      'Geniş balkonlar ve dayanıklı dış cephe kaplamalarıyla Karadeniz iklimine tam uyumlu, konforlu sahil yaşamı.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/seasideforweb.jpeg',
      mobileSrc: '/images/seasideforweb.jpeg',
      poster: '/images/seasideforweb.jpeg',
      alt: 'Seaside House Karasu'
    },
    gallery: [
      {
        url: '/images/seasideforweb.jpeg',
        title: 'Tamamlanan Cephe ve Peyzaj',
        aspect: '16:9'
      }
    ],
    features: [
      'Eksiksiz Teslim Edilmiş ve İskanı Alınmış',
      'Ortak Açık Yüzme Havuzu',
      'Site İçi Çocuk Oyun Parkı',
      'Plaja 100 Metre Mesafe',
      'Yerden Isıtmalı Daireler'
    ],
    floorPlans: [],
    isFeatured: true
  },
  {
    id: 'aziziye-sitesi',
    slug: 'aziziye-sitesi',
    title: 'Aziziye Sitesi',
    seriesInfo: 'Tamamlandı',
    cardSize: 'compact',
    subtitle: 'Karasu Aziziye Mahallesi’nde tamamlanan güvenli ve huzurlu aile sitesi',
    category: 'completed',
    categoryLabel: 'Tamamlanan proje',
    location: 'Aziziye Mah., Karasu / Sakarya',
    year: '2023',
    status: 'Tamamlandı',
    totalArea: '6.200 m²',
    totalUnits: '2+1 ve 3+1 Daireler',
    unitTypes: ['2+1 Daireler', '3+1 Daireler'],
    description:
      'Aziziye Sitesi; Karasu Aziziye Mahallesi’nde aile odaklı plan şeması, ferah balkonları ve güvenli bahçe alanlarıyla tamamlanıp kat maliklerine eksiksiz teslim edilmiş seçkin bir projedir.',
    architecturalPhilosophy:
      'Geniş peyzaj alanları ve sağlam radye temel mühendisliğiyle huzurlu ve güvenli aile yaşamı.',
    heroMedia: {
      type: 'image',
      desktopSrc: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80',
      mobileSrc: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1080&q=80',
      poster: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80',
      alt: 'Aziziye Sitesi Karasu'
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80',
        title: 'Site Peyzajı ve Konut Blokları',
        aspect: '16:9'
      }
    ],
    features: [
      'Tamamlandı & Yaşam Başladı',
      'Karasu Aziziye Mahallesi',
      'Geniş Peyzaj & Yeşil Alanlar',
      'Site İçi Açık Otopark',
      'Çocuk Oyun Alanı & Kamelyalar',
      '24/7 Güvenlik & Kamera Sistemi'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  },
  {
    id: 'cagdas-evleri',
    slug: 'cagdas-evleri',
    title: 'Çağdaş Evleri',
    seriesInfo: 'Tamamlandı',
    cardSize: 'compact',
    subtitle: 'Karasu’da çağdaş çizgilerle tamamlanan butik ve konforlu konutlar',
    category: 'completed',
    categoryLabel: 'Tamamlanan proje',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: 'Denize ~300 Metre',
    year: '2024',
    status: 'Tamamlandı',
    totalArea: '5.500 m²',
    totalUnits: '1+1 ve 2+1 Daireler',
    unitTypes: ['1+1 Daireler', '2+1 Daireler'],
    description:
      'Çağdaş Evleri; modern dış cephe mimarisi, açık yüzme havuzu ve kaliteli yapı malzemeleriyle tamamlanarak kat maliklerine teslim edilmiştir. Yalı Mahallesi sahil bandında konforlu ve huzurlu bir yaşam sunar.',
    architecturalPhilosophy:
      'Yalın mimari hatlar, kaliteli yapı elemanları ve sahil iklimine tam uyumlu dayanıklı malzeme standartları.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/aselforweb.jpeg',
      mobileSrc: '/images/aselforweb.jpeg',
      poster: '/images/aselforweb.jpeg',
      alt: 'Çağdaş Evleri Karasu'
    },
    gallery: [
      {
        url: '/images/aselforweb.jpeg',
        title: 'Çağdaş Evleri Dış Cephe',
        aspect: '16:9'
      }
    ],
    features: [
      'Tamamlandı & İskanı Alınmış',
      'Yalı Mahallesi Sahil Bölgesi',
      'Açık Yüzme Havuzu',
      'Yerden Isıtmalı Isınma Konforu',
      'Açık Otopark Alanı'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  },
  {
    id: 'demirturk-yali',
    slug: 'demirturk-yali',
    title: 'Demirtürk Yalı',
    seriesInfo: 'Tamamlanan 2 proje',
    cardSize: 'compact',
    subtitle: 'Karasu Yalı sahil bandında tamamlanan 1. ve 2. prestijli konut projesi',
    category: 'completed',
    categoryLabel: 'Tamamlanan proje serisi',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: 'Kordon Boyu & Sahile 150m',
    year: '2024 - 2025',
    status: 'Tamamlandı',
    totalArea: '9.800 m²',
    totalUnits: '1+1, 2+1 ve 3+1 Daireler',
    unitTypes: ['1+1 Daireler', '2+1 Daireler', '3+1 Daireler'],
    description:
      'Demirtürk Yalı; Karasu sahilinde 1. ve 2. etaplarıyla inşa edilen, yüzme havuzları, geniş balkonları ve sahil kordonuna yürüme mesafesindeki konumuyla seçkin bir tatil ve yaşam projesidir.',
    architecturalPhilosophy:
      'Denize yakın konumu, kademeli balkon tasarımı ve güçlü malzeme altyapısıyla Karadeniz sahilinde estetik mimari.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/alminaforweb.jpeg',
      mobileSrc: '/images/alminaforweb.jpeg',
      poster: '/images/alminaforweb.jpeg',
      alt: 'Demirtürk Yalı Karasu'
    },
    gallery: [
      {
        url: '/images/alminaforweb.jpeg',
        title: 'Demirtürk Yalı Cephe & Havuz',
        aspect: '16:9'
      }
    ],
    features: [
      '1. ve 2. Proje Tamamlandı',
      'Karasu Yalı Sahil Kordonuna Yakın',
      'Açık Yüzme Havuzu & Güneşlenme Terası',
      'Yerden Isıtmalı Konutlar',
      'Peyzaj Alanları & Kamelyalar',
      'Site Güvenliği'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  }
]

export const VISIBLE_PROJECTS_DATA: ProjectItem[] = PROJECTS_DATA.filter((p) => !p.hidden)

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
