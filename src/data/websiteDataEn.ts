import { ProjectItem, MaterialCategory, CompanyStat } from '../types'

export const COMPANY_STATS_EN: CompanyStat[] = [
  { value: '20+', label: 'Years of Heritage', sublabel: 'Trusted in Karasu since 2003' },
  { value: '35+', label: 'Delivered Projects', sublabel: 'Flawless construction & title deeds' },
  { value: '1.200+', label: 'Happy Families', sublabel: 'Four-season secure living' },
  { value: '100%', label: 'In-House Guarantee', sublabel: 'Zero bank interest, zero co-signers' }
]

export const MATERIAL_CATEGORIES_EN: MaterialCategory[] = [
  {
    id: 'demir-celik',
    title: 'Certified Rebar & Structural Steel',
    description: 'High-strength ribbed rebar (B420C/B500C) fully certified under CE & Turkish TSE seismic standards for uncompromised foundation resilience.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    items: ['Ø8 - Ø32 Ribbed Steel Rebar', 'Welded Steel Mesh (Q & R Types)', 'Structural Steel Profiles & HEB Beams', 'Tie Wire & Reinforcement Accessories']
  },
  {
    id: 'cimento-beton',
    title: 'C35/40 Ready-Mixed Concrete & Cement',
    description: 'Laboratory-monitored high-grade ready-mixed concrete formulated specifically to withstand humid coastal saline conditions and ground pressure.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    items: ['C30/37 & C35/45 Ready Concrete', 'Bagged & Bulk Portland Cement', 'Sulfate-Resistant Marine Concrete', 'Chemical Concrete Admixtures']
  },
  {
    id: 'tugla-bims',
    title: 'Thermal Insulated Bims & Blocks',
    description: 'Lightweight pumice volcanic bims blocks and perforated bricks engineered for superior natural acoustic and thermal barrier efficiency.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    items: ['19x39x19 cm Insulated Bims Blocks', 'Horizontal & Vertical Perforated Bricks', 'Autoclaved Aerated Concrete (Ytong)', 'Lintels & Partition Masonry Units']
  },
  {
    id: 'yalitim-cati',
    title: 'Rock Wool, Waterproofing & Roofing',
    description: 'Complete moisture, vapor, and acoustic shielding using premium high-density rock wool, bitumen membranes, and multi-layer roofing systems.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    items: ['150 kg/m³ High-Density Rock Wool', '4mm Elastomeric Bituminous Membrane', 'Shingle & Metal Tile Roofing Systems', 'Liquid Facade Moisture Barriers']
  },
  {
    id: 'seramik-vitrifiye',
    title: 'Porcelain Ceramics & Sanitaryware',
    description: 'First-class anti-slip porcelain ceramics, modern bathroom furniture, and concealed reservoir systems chosen for elegance and durability.',
    icon: 'Award',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    items: ['60x120 cm Polished Porcelain Tiles', 'Anti-Slip Terrace & Balcony Ceramics', 'Concealed Water Cisterns & Fixtures', 'Tempered Glass Shower Enclosures']
  }
]

export const PROJECTS_DATA_EN: ProjectItem[] = [
  {
    id: 'yenisehir-rezidans',
    slug: 'yenisehir-rezidans',
    title: 'Yeni Şehir Phases',
    seriesInfo: '3 Phases',
    subtitle: '3-Phase Prestigious Coastal Residence Concept in Yalı District, Karasu',
    slideDescription: 'Underfloor-heated luxury homes with private gardens, semi-Olympic aqua pool, and 3 distinct phases located 800m from the sea in Yalı District.',
    category: 'ongoing',
    categoryLabel: 'Active Development',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: '800 Metres',
    year: '2025 - 2028',
    status: 'Satışta, Devam Ediyor',
    totalArea: '14.000 m²',
    totalUnits: '246 Residences',
    unitTypes: ['1+1 Residences', '2+1 Residences'],
    description:
      'Yeni Şehir Phases brings together contemporary residential architecture with private ground-floor gardens, vast landscaped zones, a semi-Olympic aqua pool, and underfloor-heated comfort in the rapidly ascending Yalı District of Karasu, 800 meters from the coastline. With completed and actively progressing stages spanning 3 phases in total, it offers families a secure, serene, and prestigious year-round gated community lifestyle.',
    architecturalPhilosophy:
      'A serene community living concept that respects the coastal breeze and natural topography, blending human-scale low-rise blocks with generous green landscapes.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/yenisehirforweb.jpeg',
      mobileSrc: '/images/yenisehirforweb.jpeg',
      poster: '/images/yenisehirforweb.jpeg',
      alt: 'Yeni Şehir Phases Karasu'
    },
    gallery: [
      {
        url: '/images/yenisehirforweb.jpeg',
        title: 'Yeni Şehir Phases - Architectural Perspective',
        aspect: '16:9'
      }
    ],
    featureDetails: [
      {
        icon: 'Sun',
        title: 'Solar Energy Infrastructure',
        description: 'Equipped with renewable solar panel systems providing communal energy conservation and eco-friendly infrastructure.'
      },
      {
        icon: 'Trees',
        title: 'Private Ground-Floor Gardens',
        description: 'Dedicated private garden access for ground-floor residences, blending home comfort with nature.'
      },
      {
        icon: 'Waves',
        title: 'Aqua Pool & Swimming Areas',
        description: 'Resort-style aquatic facilities featuring adult pools and safe splash areas for children.'
      },
      {
        icon: 'Smile',
        title: 'Children’s Playground',
        description: 'Dedicated, cushioned playgrounds where children can safely play inside the gated perimeter.'
      },
      {
        icon: 'Zap',
        title: 'EV Charging Station',
        description: 'Modern on-site electric vehicle charging stations ready for clean, sustainable mobility.'
      },
      {
        icon: 'Home',
        title: '1+1 & 2+1 Layout Options',
        description: 'Functional, high-ceiling layouts optimized for both seasonal retreat and high-yield year-round rental investment.'
      }
    ],
    features: [
      '3-Phase Prestigious Gated Residence Concept',
      'Yalı District – 800 Metres to the Beach',
      '1+1 & 2+1 Layout Options',
      'Private Landscaped Garden Ground Floor Options',
      'Energy-Efficient Underfloor Heating in Every Unit',
      'Semi-Olympic Swimming Pool & Aqua Concept',
      'Solar Panel Renewable Energy Infrastructure',
      'On-Site EV Charging Stations',
      '24/7 Monitored Child Play Parks & Green Zones'
    ],
    stages: [
      {
        id: 'yenisehir-etap-1',
        stageNumber: 1,
        title: 'Yeni Şehir Phase 1',
        subtitle: 'Completed and delivered premier phase in Yalı District',
        status: 'Tamamlandı',
        year: '2025',
        deliveryDate: '2025',
        location: 'Yalı Mah., Karasu',
        distanceToSea: '800 Metres',
        totalUnits: '48 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'The inaugural milestone of the Yeni Şehir vision, Phase 1 was fully completed and delivered to title deed holders with private gardens, pool facilities, and underfloor heating.',
        features: [
          'Completed & Turnkey Delivered',
          'Yalı District, Karasu',
          '800 Metres to the Sea',
          '48 Units (1+1 and 2+1 Options)',
          'Private Garden Verandas',
          'Underfloor Heating System',
          'Outdoor Swimming Pool',
          'Landscaped Greenery & Parking',
          'Gated Security'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '4.200 m²'
      },
      {
        id: 'yenisehir-etap-2',
        stageNumber: 2,
        title: 'Yeni Şehir Phase 2',
        subtitle: 'Modern swimming pool and green living complex',
        status: 'Tamamlandı',
        year: '2026',
        deliveryDate: '2026',
        location: 'Yalı Mah., Karasu',
        distanceToSea: '800 Metres',
        totalUnits: '48 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'Phase 2 delivers expansive sunbathing terraces, an outdoor swimming pool, and pristine family living spaces in the heart of Karasu Yalı District.',
        features: [
          'Completed & Delivered',
          'Yalı District, Karasu',
          '800 Metres to the Beach',
          '48 Units (1+1 and 2+1 Options)',
          'Underfloor Heating in All Units',
          'Large Swimming Pool',
          'Dedicated Open Parking',
          'Children’s Playground'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '4.800 m²'
      },
      {
        id: 'yenisehir-etap-3',
        stageNumber: 3,
        title: 'Yeni Şehir Phase 3',
        subtitle: 'Latest phase featuring aqua pool, underfloor heating & solar power',
        status: 'Satışta, Devam Ediyor',
        year: '2028',
        deliveryDate: '2028',
        location: 'Yalı Mah., Karasu',
        distanceToSea: '800 Metres',
        totalUnits: '150 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'The flagship development of the series, Phase 3 features solar panels, electric vehicle charging stations, semi-Olympic aqua pool, and private garden units with flexible in-house payment options.',
        features: [
          'Estimated Delivery: 2028 (Under Construction & On Sale)',
          'Yalı District – 800 Metres to the Beach',
          '150 Units (1+1 and 2+1 Residences)',
          'Underfloor Heated Coastal Homes',
          'Semi-Olympic Aqua Pool',
          'Solar Power Infrastructure',
          'EV Fast Charging Stations',
          'Landscaped Gardens & Playground',
          'Tailored In-House Payment Model'
        ],
        image: '/images/yenisehirforweb.jpeg',
        totalArea: '5.000 m²'
      }
    ],
    floorPlans: [
      {
        name: '2+1 Wide Terrace Residence',
        area: '88 m² Gross / 74 m² Net',
        rooms: '2 Bedrooms, Living Room, Island Kitchen, Terrace Balcony, Bathroom',
        description: 'Airy open-concept interior receiving abundant natural daylight with direct access to an expansive terrace balcony.'
      },
      {
        name: '1+1 Garden & Balcony Residence',
        area: '58 m² Gross / 49 m² Net',
        rooms: '1 Bedroom, Living Room & Kitchen, Wide Balcony, Bathroom',
        description: 'Compact, energy-efficient modern residence ideal for seaside retreats and continuous high rental returns.'
      }
    ],
    installmentMonths: 40,
    isFeatured: true
  },
  {
    id: 'asel-doga-evleri',
    slug: 'asel-doga-evleri',
    title: 'Asel Doğa Evleri',
    subtitle: 'Boutique Coastal Residences Intertwined with Nature in Aziziye District',
    slideDescription: 'Underfloor-heated boutique residences with adult and children pools, located walking distance from the beach in Aziziye District.',
    category: 'ongoing',
    categoryLabel: 'Active Development',
    location: 'Aziziye Mah., Karasu / Sakarya',
    distanceToSea: '850 Metres',
    year: '2026 - 2027',
    status: 'Satışta, Devam Ediyor',
    totalArea: '4.500 m²',
    totalUnits: '24 Residences',
    unitTypes: ['1+1 and 2+1 Residences'],
    seriesInfo: '2 projects • 3rd and 4th coming soon',
    description:
      'Asel Doğa Residences harmonizes the calm sea breeze of Karasu with modern aesthetics. Situated within walking distance to the beach, this boutique community combines open-air swimming pools, ground-floor garden privileges, and underfloor-heated interiors.',
    architecturalPhilosophy:
      'Human-centric architecture prioritizing wide private balconies, natural sunlight exposure, and robust structural earthquake engineering.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/aselforweb.jpeg',
      mobileSrc: '/images/aselforweb.jpeg',
      poster: '/images/aselforweb.jpeg',
      alt: 'Asel Doğa Evleri Karasu'
    },
    gallery: [
      {
        url: '/images/aselforweb.jpeg',
        title: 'Asel Doğa Evleri - Architectural Perspective',
        aspect: '16:9'
      }
    ],
    features: [
      'Large Outdoor Swimming Pool & Kids Pool',
      '24/7 Security & CCTV Perimeter System',
      'Underfloor Heating & First-Class Thermal Insulation',
      'Walking Distance to Beach & Seaside Promenade',
      'Dedicated Outdoor Parking & EV Charging Station',
      'Landscaped Gardens, Pergolas & Play Areas'
    ],
    floorPlans: [
      {
        name: '2+1 Wide Terrace Residence',
        area: '88 m² Gross / 74 m² Net',
        rooms: '2 Bedrooms, Living Room, Open Kitchen, Terrace Balcony, Bathroom',
        description: 'Functional layout inviting the fresh coastal air inside through a wide facade and sunlit balcony.'
      },
      {
        name: '1+1 Garden Veranda Residence',
        area: '56 m² Gross / 48 m² Net',
        rooms: '1 Bedroom, Living Room & Kitchen, Garden Veranda',
        description: 'Optimized for summer retreats and high rental yields with compact, refined architectural details.'
      }
    ],
    installmentMonths: 40,
    isFeatured: true,
    stages: [
      {
        id: 'asel-doga-1',
        stageNumber: 1,
        title: 'Asel Doğa Evleri 1',
        subtitle: 'Completed flagship project with active family life',
        status: 'Tamamlandı',
        year: '2026',
        deliveryDate: '2026',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: '850 Metres',
        totalUnits: '12 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'Completed and delivered on schedule, Asel Doğa 1 offers a tranquil lifestyle with its swimming pool and landscaped gardens.',
        features: [
          'Turnkey Delivered & Inhabited',
          'Aziziye District, Karasu',
          '850 Metres to the Coast',
          'Outdoor Swimming Pool',
          'Underfloor Heating Infrastructure',
          'Boutique Family Community'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '1.800 m²'
      },
      {
        id: 'asel-doga-2',
        stageNumber: 2,
        title: 'Asel Doğa Evleri 2',
        subtitle: 'Actively progressing sister project in Aziziye District',
        status: 'Satışta, Devam Ediyor',
        year: '2027',
        deliveryDate: '2027',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: '850 Metres',
        totalUnits: '12 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'Asel Doğa 2 is currently under active construction, featuring underfloor-heated residences, outdoor swimming pool, and direct company installment options.',
        features: [
          'On Sale & Under Construction (Delivery: 2027)',
          'Aziziye District – Surrounded by Greenery',
          '12 Residences (1+1 & 2+1 Layouts)',
          'Large Outdoor Pool & Kids Swimming Area',
          'Underfloor Heated Luxury Standard',
          'Tailored Flexible In-House Payment Model'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '1.200 m²'
      },
      {
        id: 'asel-doga-3',
        stageNumber: 3,
        title: 'Asel Doğa Evleri 3',
        subtitle: 'Upcoming project planned in nature-rich Aziziye District',
        status: 'Yakında',
        year: 'Yakında',
        deliveryDate: 'Yakında',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: '600 Metres',
        totalUnits: 'Ön Talep',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'The third chapter of the Asel Doğa family, planned 600m from the beach with modern architectural touches.',
        features: [
          'Pre-Registration Active',
          '600 Metres to the Beach',
          'Underfloor Heating & Pool Facility',
          'Generous Balconies and Green Spaces'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '2.000 m²'
      },
      {
        id: 'asel-doga-4',
        stageNumber: 4,
        title: 'Asel Doğa Evleri 4',
        subtitle: 'Upcoming fourth phase in prestigious coastal zone',
        status: 'Yakında',
        year: 'Yakında',
        deliveryDate: 'Yakında',
        location: 'Aziziye Mah., Karasu',
        distanceToSea: '700 Metres',
        totalUnits: 'Ön Talep',
        unitTypes: ['1+1 ve 2+1 Daireler'],
        description: 'The fourth ring of the concept, featuring high construction standards and flexible payment terms.',
        features: [
          'Pre-Registration Active',
          'Boutique Site Layout',
          'Underfloor Heating & Pool',
          'Tailored Payment Terms'
        ],
        image: '/images/aselforweb.jpeg',
        totalArea: '2.200 m²'
      }
    ]
  },
  {
    id: 'almina-evleri',
    slug: 'almina-evleri',
    title: 'Almina Evleri',
    seriesInfo: '2 Projects (Almina 1 Delivered • Almina 2 on Sale)',
    subtitle: 'Coastal living steps away from the beach, commercial avenue, and schools in Yalı District',
    slideDescription: 'Centrally located coastal homes adjacent to public transit, town avenue, kindergarten and markets, 850m from the beach.',
    category: 'ongoing',
    categoryLabel: 'Active Development',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: '850 Metres',
    year: '2023 - 2026',
    status: 'Satışta, Devam Ediyor',
    totalArea: '6.000 m²',
    totalUnits: '33 Residences',
    unitTypes: ['1+1 and 2+1 Residences'],
    description:
      'Almina Residences sits at the crossroads of beachside bliss and everyday convenience in Karasu Yalı District. Located on Plaj Avenue within easy walking distance to markets, kindergartens, and public transit, it features an outdoor pool, underfloor heating, and direct company financing.',
    architecturalPhilosophy:
      'Contemporary architecture framing open sea views and natural sunlight with stepped balconies and wide glazed surfaces ensuring family privacy.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/alminaforweb.jpeg',
      mobileSrc: '/images/alminaforweb.jpeg',
      poster: '/images/alminaforweb.jpeg',
      alt: 'Almina Evleri Karasu'
    },
    gallery: [
      {
        url: '/images/alminaforweb.jpeg',
        title: 'Almina Evleri - Architectural Perspective',
        aspect: '16:9'
      }
    ],
    features: [
      'Walking Distance to Beach & Seaside Promenade',
      'Outdoor Pool & Sunbathing Deck',
      'Adjacent to Plaj Avenue, Markets & Public Transit',
      'Directly Neighbouring Kindergarten & Schools',
      'High Rental Yield and Capital Appreciation',
      'Tailored In-House Payment Model'
    ],
    stages: [
      {
        id: 'almina-1',
        stageNumber: 1,
        title: 'Almina 1',
        subtitle: 'Completed and delivered premier project along the beach corridor',
        status: 'Tamamlandı',
        year: '2023',
        deliveryDate: '2023',
        location: 'Yalı Mah., Karasu',
        distanceToSea: '750 Metres',
        totalUnits: '24 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'Successfully completed in 2023, Almina 1 provides a vibrant community life with an outdoor pool and comfortable underfloor-heated apartments.',
        features: [
          'Turnkey Delivered & Inhabited',
          'Yalı District, Plaj Avenue',
          '750 Metres to the Beach',
          '24 Residences (1+1 & 2+1 Layouts)',
          'Outdoor Pool & Sunbathing Deck',
          'Central Location Close to Markets'
        ],
        image: '/images/alminaforweb.jpeg',
        totalArea: '3.500 m²'
      },
      {
        id: 'almina-2',
        stageNumber: 2,
        title: 'Almina 2',
        subtitle: 'Centrally located boutique site currently on sale in Yalı District',
        status: 'Satışta, Devam Ediyor',
        year: '2026',
        deliveryDate: '2026',
        location: 'Yalı Mah., Karasu',
        distanceToSea: '850 Metres',
        totalUnits: '9 Residences',
        unitTypes: ['1+1 and 2+1 Residences'],
        description: 'Almina 2 continues the legacy with 9 boutique residences, swimming pool, underfloor heating, and prime positioning on Karasu’s liveliest avenue.',
        features: [
          'On Sale & Actively Progressing',
          'Yalı District, Plaj Avenue',
          '850 Metres to the Beach',
          'Steps Away from Shopping and Transit',
          'Adjacent to Kindergarten & Primary School',
          'Outdoor Pool & Sunbathing Deck',
          'Tailored In-House Payment Model',
          '9 Boutique Residences (1+1 & 2+1 Layouts)'
        ],
        image: '/images/alminaforweb.jpeg',
        totalArea: '6.000 m²'
      }
    ],
    floorPlans: [
      {
        name: '2+1 Coastal Residence',
        area: '82 m² Gross / 68 m² Net',
        rooms: '2 Bedrooms, Living Room, American Kitchen, Bathroom, Balcony',
        description: 'Expansive balcony welcoming the Black Sea breeze into bright, contemporary living spaces.'
      }
    ],
    installmentMonths: 36,
    isFeatured: true
  },
  {
    id: 'seaside-house',
    slug: 'seaside-house',
    title: 'Seaside House',
    seriesInfo: 'Completed',
    cardSize: 'standard',
    subtitle: 'Where the river and the Black Sea converge in an iconic seafront setting',
    slideDescription: 'Where the river and the Black Sea converge in an iconic seafront setting',
    category: 'completed',
    categoryLabel: 'Completed Landmark',
    location: 'Yalı Mah. Sahil Caddesi, Karasu / Sakarya',
    distanceToSea: 'Seafront (0m)',
    year: '2021',
    status: 'Tamamlandı',
    totalArea: '9.500 m²',
    totalUnits: '12 Residences',
    unitTypes: ['1+1 and 2+1 Residences'],
    description:
      'Seaside House stands proudly as an iconic seafront landmark along Karasu’s coastline. Completed and turnkey delivered with an outdoor pool, landscaped park, and underfloor-heated residences.',
    architecturalPhilosophy:
      'Wide cantilevered balconies and resilient facade finishes engineered specifically to withstand coastal Black Sea climate conditions.',
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
        title: 'Completed Facade & Landscaping',
        aspect: '16:9'
      }
    ],
    features: [
      'Turnkey Delivered & Title Deeds In Hand',
      'Shared Outdoor Swimming Pool',
      'On-Site Children’s Playpark',
      '100 Metres to the Sandy Beach',
      'Underfloor Heated Interiors'
    ],
    floorPlans: [],
    isFeatured: true
  },
  {
    id: 'aziziye-sitesi',
    slug: 'aziziye-sitesi',
    title: 'Aziziye Sitesi',
    seriesInfo: 'Completed',
    cardSize: 'compact',
    subtitle: 'Safe and peaceful family living with spacious green landscaping',
    category: 'completed',
    categoryLabel: 'Completed Development',
    location: 'Aziziye Mah., Karasu / Sakarya',
    distanceToSea: '650 Metres',
    year: '2022',
    status: 'Tamamlandı',
    totalArea: '7.800 m²',
    totalUnits: '2+1 and 3+1 Residences',
    unitTypes: ['2+1 Residences', '3+1 Residences'],
    description:
      'Aziziye Sitesi is a completed family-focused residential community in Karasu Aziziye District, featuring spacious balconies, gated gardens, and full occupancy.',
    architecturalPhilosophy:
      'Spacious landscape planning combined with solid raft foundation engineering for serene, lifelong family comfort.',
    heroMedia: {
      type: 'image',
      desktopSrc: '/images/aselforweb.jpeg',
      mobileSrc: '/images/aselforweb.jpeg',
      poster: '/images/aselforweb.jpeg',
      alt: 'Aziziye Sitesi Karasu'
    },
    gallery: [
      {
        url: '/images/aselforweb.jpeg',
        title: 'Site Landscaping and Residence Blocks',
        aspect: '16:9'
      }
    ],
    features: [
      'Completed & Inhabited',
      'Karasu Aziziye District',
      'Wide Landscaping & Green Zones',
      'On-Site Open Parking',
      'Children Play Park & Pergolas',
      '24/7 Monitored CCTV Security'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  },
  {
    id: 'cagdas-evleri',
    slug: 'cagdas-evleri',
    title: 'Çağdaş Evleri',
    seriesInfo: 'Completed',
    cardSize: 'compact',
    subtitle: 'Boutique and comfortable residences completed with contemporary lines',
    category: 'completed',
    categoryLabel: 'Completed Development',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: '300 Metres',
    year: '2024',
    status: 'Tamamlandı',
    totalArea: '5.500 m²',
    totalUnits: '1+1 and 2+1 Residences',
    unitTypes: ['1+1 Residences', '2+1 Residences'],
    description:
      'Çağdaş Evleri was successfully delivered to owners with modern facade lines, an outdoor swimming pool, and high-quality materials along the Yalı coastline.',
    architecturalPhilosophy:
      'Clean architectural geometry, high-performance structural elements, and climate-resistant building specifications.',
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
        title: 'Çağdaş Evleri Facade View',
        aspect: '16:9'
      }
    ],
    features: [
      'Completed & Habitation Permit Approved',
      'Yalı District Beach Corridor',
      'Outdoor Swimming Pool',
      'Underfloor Heating Comfort',
      'Open Parking Lot'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  },
  {
    id: 'demirturk-yali',
    slug: 'demirturk-yali',
    title: 'Demirtürk Yalı',
    seriesInfo: 'Completed 2 Projects',
    cardSize: 'compact',
    subtitle: 'Two premier residential projects completed along the Karasu Yalı beach corridor',
    category: 'completed',
    categoryLabel: 'Completed Series',
    location: 'Yalı Mah., Karasu / Sakarya',
    distanceToSea: 'Beach Promenade & 150m to Coast',
    year: '2024 - 2025',
    status: 'Tamamlandı',
    totalArea: '9.800 m²',
    totalUnits: '1+1, 2+1 and 3+1 Residences',
    unitTypes: ['1+1 Residences', '2+1 Residences', '3+1 Residences'],
    description:
      'Demirtürk Yalı encompasses two prestigious phases constructed along the coastal boulevard, featuring swimming pools, stepped terraces, and prime walking distance to the seaside promenade.',
    architecturalPhilosophy:
      'Prime seaside positioning, stepped balcony architecture, and robust materials designed for aesthetic coastal living.',
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
        title: 'Demirtürk Yalı Facade & Pool',
        aspect: '16:9'
      }
    ],
    features: [
      '1st and 2nd Phases Completed',
      'Steps Away from Karasu Beach Promenade',
      'Outdoor Swimming Pool & Sun Deck',
      'Private Garden Verandas',
      'Underfloor Heating & Premium Facade'
    ],
    floorPlans: [],
    isFeatured: false,
    hidden: true
  }
]
