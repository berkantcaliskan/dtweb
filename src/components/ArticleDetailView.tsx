import React, { useEffect } from 'react'
import { ArrowLeft, Clock, Calendar, Share2, MessageSquare, Phone, X, ArrowUpRight, BookOpen, Check } from 'lucide-react'
import { ArticleItem } from './ArticlesSection'
import { COMPANY_INFO } from '../data/websiteData'

interface ArticleDetailViewProps {
  article: ArticleItem
  allArticles: ArticleItem[]
  onClose: () => void
  onSelectArticle: (article: ArticleItem) => void
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  allArticles,
  onClose,
  onSelectArticle,
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Scroll to top whenever article changes
  const containerRef = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [article])

  const otherArticles = allArticles.filter((a) => a.id !== article.id)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      alert('Makale bağlantısı panoya kopyalandı!')
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-[68px] sm:top-[72px] inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#252c33] text-[#fffff1] selection:bg-[#313941] selection:text-[#fffff1] w-full animate-modal-backdrop flex flex-col"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* 1. Top Sticky Architectural Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#1e242b]/95 backdrop-blur-xl border-b border-[#fffff1]/15 px-4 sm:px-6 lg:px-[104px] py-3.5 flex items-center justify-between shadow-lg">
        {/* Left: Back Button & Breadcrumbs */}
        <div className="flex items-center space-x-3 sm:space-x-5 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 shadow-sm cursor-pointer flex-shrink-0"
            aria-label="Makalelere geri dön"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1 text-[#fffff1]" />
            <span className="text-xs font-bold uppercase tracking-wider">Geri Dön</span>
          </button>

          <div className="h-6 w-[1px] bg-[#fffff1]/20 hidden sm:block flex-shrink-0" />

          <div className="min-w-0 truncate">
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-widest text-[#fffff1]/60 uppercase font-medium">
              <span>MAKALELER</span>
              <span>/</span>
              <span className="text-[#fffff1]/80 truncate">{article.category}</span>
            </div>
            <h2 className="font-theSeasons text-sm sm:text-base font-bold text-[#fffff1] truncate max-w-md hidden md:block">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Right: Share, WhatsApp CTA & Close Button */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={handleShare}
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] border border-[#fffff1]/20 text-[#fffff1] transition-all flex items-center space-x-1.5 cursor-pointer text-xs font-semibold uppercase tracking-wider"
            title="Makaleyi Paylaş"
            aria-label="Makaleyi Paylaş"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Paylaş</span>
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Merhaba Demirtürk İnşaat, "${article.title}" başlıklı makaleniz hakkında bilgi almak istiyorum.`)}`}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            <span>WhatsApp Danışma</span>
          </a>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* 2. Main Content Flow */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10 sm:space-y-14">
        {/* Article Header & Meta */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-[#fffff1]/20 text-[#fffff1] uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <div className="flex items-center space-x-1.5 text-[#fffff1]/70">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
            <span className="text-[#fffff1]/40">•</span>
            <div className="flex items-center space-x-1.5 text-[#fffff1]/70">
              <Calendar size={14} />
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="font-theSeasons text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fffff1] leading-[1.12]">
            {article.title}
          </h1>

          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border-l-4 border-[#fffff1]/70 border border-[#fffff1]/10">
            <p className="font-theSeasons text-lg sm:text-2xl text-[#fffff1]/95 font-light italic leading-relaxed">
              "{article.subtitle}"
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#fffff1]/60 pt-2 border-t border-[#fffff1]/10">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-[#fffff1]/20 flex items-center justify-center font-bold text-[#fffff1]">
              D
            </div>
            <div>
              <span className="text-[#fffff1] font-medium block">Demirtürk Mimarlık & Mühendislik Kurulu</span>
              <span className="text-[#fffff1]/50 text-xs">Karasu / Sakarya Şantiye Araştırma ve Tasarım Grubu</span>
            </div>
          </div>
        </div>

        {/* Panoramic Full-Bleed Article Hero Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#fffff1]/20 shadow-2xl bg-black/40">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Editorial Body Text */}
        <article className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-[#fffff1]/90 font-light leading-relaxed">
          {article.paragraphs.map((p, idx) => (
            <p key={idx} className="first-of-type:text-lg sm:first-of-type:text-2xl first-of-type:leading-relaxed first-of-type:text-[#fffff1]">
              {p}
            </p>
          ))}
        </article>

        {/* Interactive Architectural Assurance Callout Box */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-[#fffff1]/20 space-y-5 shadow-xl">
          <div className="flex items-center space-x-2.5 text-xs font-semibold tracking-widest text-[#fffff1] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#fffff1]" />
            <span>DEMİRTÜRK İNŞAAT MÜHENDİSLİK İLKELERİ</span>
          </div>
          <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
            Karasu’da Bilimsel Zemin ve Tavizsiz Kalite
          </h3>
          <p className="text-sm sm:text-base text-[#fffff1]/80 leading-relaxed font-light">
            Projelerimizin tamamında zemin etüdü, radye jeneral temel, C35 beton ve çift kat su-ısı yalıtımı standart olarak uygulanmaktadır. Sahada uyguladığımız tüm mühendislik detaylarını yerinde incelemek için ücretsiz tanıtım turumuza katılabilirsiniz.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Merhaba Demirtürk İnşaat, "${article.title}" makalenizi okudum. Projeleriniz hakkında bilgi almak istiyorum.`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-[#fffff1] hover:bg-white text-[#252c33] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <MessageSquare size={14} />
              <span>Satış Temsilcisine Sorun</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#fffff1] border border-[#fffff1]/20 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Makalelere Dön
            </button>
          </div>
        </div>

        {/* 3. Continue Reading / Other Articles Section */}
        {otherArticles.length > 0 && (
          <section className="pt-10 sm:pt-14 border-t border-[#fffff1]/15 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-widest text-[#fffff1]/70 uppercase font-semibold block mb-1">
                  MİMARİ PERSPEKTİF
                </span>
                <h3 className="font-theSeasons text-2xl sm:text-3xl font-bold text-[#fffff1]">
                  Diğer Mimari Makalelerimiz
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {otherArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="group bg-white/[0.02] hover:bg-white/[0.05] border border-[#fffff1]/15 hover:border-[#fffff1]/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 text-[11px] tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#fffff1] border border-[#fffff1]/15 rounded-md font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-3 text-xs text-[#fffff1]/50 mb-2">
                        <span className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {item.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {item.readTime}
                        </span>
                      </div>

                      <h4 className="font-theSeasons text-xl font-semibold text-[#fffff1] group-hover:text-white transition-colors mb-2.5 line-clamp-2 leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#fffff1]/75 font-light line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[#fffff1]/10 flex items-center justify-between text-xs font-semibold text-[#fffff1] uppercase tracking-wider">
                      <span>Makaleyi İncele</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Bottom Navigation Bar */}
        <footer className="pt-8 pb-12 border-t border-[#fffff1]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-2.5 px-6 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] text-[#fffff1] border border-[#fffff1]/20 hover:border-[#fffff1]/50 transition-all group active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-wider">Tüm Makalelere Geri Dön</span>
          </button>

          <div className="flex items-center space-x-6 text-xs text-[#fffff1]/60 font-light">
            <span>© Demirtürk İnşaat</span>
            <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors flex items-center space-x-1.5">
              <Phone size={12} />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
