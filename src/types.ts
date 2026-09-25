export interface ProjectMedia {
  type: 'image' | 'video'
  desktopSrc: string // 16:9 for desktop
  mobileSrc: string  // 9:16 for mobile
  poster?: string
  alt: string
}

export interface FloorPlan {
  name: string
  area: string
  rooms: string
  image: string
  description: string
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  subtitle: string
  category: 'all' | 'ongoing' | 'luxury-residence' | 'villa' | 'completed'
  categoryLabel: string
  location: string
  year: string
  status: 'Satışta' | 'Yapım Aşamasında' | 'Tamamlandı' | 'Ön Talep'
  totalArea: string
  totalUnits: string
  unitTypes: string[]
  description: string
  architecturalPhilosophy: string
  heroMedia: ProjectMedia
  gallery: {
    url: string
    title: string
    aspect?: '16:9' | '9:16' | '4:3' | '1:1'
  }[]
  features: string[]
  floorPlans: FloorPlan[]
  installmentMonths?: number
  isFeatured?: boolean
}

export interface MaterialCategory {
  id: string
  title: string
  description: string
  icon: string
  image: string
  items: string[]
}

export interface CompanyStat {
  value: string
  label: string
  sublabel: string
}
