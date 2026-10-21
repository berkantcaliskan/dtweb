import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
  color: string
}

export const LanguageDustParticles: React.FC = () => {
  const { isLangTransitioning, langTransitionPhase } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (!isLangTransitioning) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      particlesRef.current = []
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Palette: Demirtürk Ivory, warm champagne gold, ethereal light
    const colors = [
      '255, 255, 241', // Ivory (#fffff1)
      '245, 230, 200', // Champagne Gold
      '255, 248, 220', // Cornsilk
      '230, 235, 240', // Soft Silver
    ]

    // Create 70-90 delicate micro dust motes
    const count = Math.min(Math.floor(width / 16), 85)
    const newParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const maxLife = 26 + Math.floor(Math.random() * 12) // ~500-600ms total
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.9 + height * 0.05,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -0.6 - Math.random() * 2.2, // drifting upwards
        size: 0.9 + Math.random() * 2.2,
        alpha: 0,
        maxAlpha: 0.45 + Math.random() * 0.5,
        life: 0,
        maxLife,
        color,
      })
    }

    particlesRef.current = newParticles

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      let stillAlive = false

      particlesRef.current.forEach((p) => {
        p.life++
        if (p.life < p.maxLife) {
          stillAlive = true
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.985
          p.vy *= 0.985

          // Smooth rise and dissolution curve
          const progress = p.life / p.maxLife
          if (progress < 0.25) {
            p.alpha = (progress / 0.25) * p.maxAlpha
          } else {
            p.alpha = (1 - (progress - 0.25) / 0.75) * p.maxAlpha
          }

          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, p.alpha)})`
          
          // Subtle soft aura around larger particles
          if (p.size > 1.8) {
            ctx.shadowColor = `rgba(${p.color}, 0.7)`
            ctx.shadowBlur = 6
          }
          
          ctx.fill()
          ctx.restore()
        }
      })

      if (stillAlive) {
        animFrameRef.current = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }
  }, [isLangTransitioning, langTransitionPhase])

  if (!isLangTransitioning) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  )
}
