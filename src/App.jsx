import React, { useEffect } from 'react'
import Countdown from './Countdown'
import Stats from './Stats'

const faviconUrl = 'https://cdn-icons-png.flaticon.com/512/4222/4222979.png'

function randomBetween(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

function randomPositionPair() {
  return `${randomBetween(0, 260)}px ${randomBetween(0, 180)}px, ${randomBetween(80, 360)}px ${randomBetween(20, 260)}px`
}

function randomBackgroundSize() {
  return `${randomBetween(160, 240)}px ${randomBetween(140, 220)}px, ${randomBetween(240, 360)}px ${randomBetween(200, 320)}px`
}

function useRandomStars() {
  useEffect(() => {
    const root = document.documentElement
    const starVars = {
      '--stars-a-start': randomPositionPair(),
      '--stars-a-mid': randomPositionPair(),
      '--stars-a-late': randomPositionPair(),
      '--stars-a-size': randomBackgroundSize(),
      '--stars-a-duration': `${randomBetween(12, 18)}s`,
      '--stars-b-start': randomPositionPair(),
      '--stars-b-mid': randomPositionPair(),
      '--stars-b-late': randomPositionPair(),
      '--stars-b-size': randomBackgroundSize(),
      '--stars-b-duration': `${randomBetween(14, 22)}s`,
      '--stars-b-delay': `${(Math.random() * 2).toFixed(1)}s`,
    }

    Object.entries(starVars).forEach(([name, value]) => {
      root.style.setProperty(name, value)
    })

    return () => {
      Object.keys(starVars).forEach((name) => {
        root.style.removeProperty(name)
      })
    }
  }, [])
}

function fallbackFaviconFrames() {
  return [0, 1, 2, 1].map((step) => {
    const scale = 1 + step * 0.08
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="16" fill="#1a1a2e"/>
        <g transform="translate(32 32) scale(${scale}) translate(-32 -32)">
          <circle cx="32" cy="32" r="22" fill="#fb4c68"/>
          <path d="M32 17v15l10 7" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    `

    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  })
}

function useAnimatedFavicon() {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']")
    if (!link) return undefined

    const originalHref = link.href
    let intervalId
    let isCancelled = false

    function startAnimation(frames) {
      let frame = 0

      intervalId = window.setInterval(() => {
        link.href = frames[frame]
        frame = (frame + 1) % frames.length
      }, 420)
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (isCancelled) return

      const canvas = document.createElement('canvas')
      const size = 64
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      try {
        const frames = [0.86, 0.96, 1.04, 0.96].map((scale) => {
          ctx.clearRect(0, 0, size, size)
          const drawSize = size * scale
          const offset = (size - drawSize) / 2
          ctx.drawImage(img, offset, offset, drawSize, drawSize)
          return canvas.toDataURL('image/png')
        })

        startAnimation(frames)
      } catch {
        startAnimation(fallbackFaviconFrames())
      }
    }
    img.onerror = () => {
      if (!isCancelled) startAnimation(fallbackFaviconFrames())
    }
    img.src = faviconUrl

    return () => {
      isCancelled = true
      window.clearInterval(intervalId)
      link.href = originalHref
    }
  }, [])
}

export default function App() {
  useAnimatedFavicon()
  useRandomStars()

  const start  = new Date(2026, 4, 19, 0, 0, 0)
  const target = new Date(2026, 7, 27, 0, 0, 0)

  return (
    <div className="app">
      <div className="comet" aria-hidden="true" />
      <section className="hero">
        <h1>Countdown to 27/08/2026</h1>
        <Countdown startDate={start} targetDate={target} />
      </section>
      <Stats startDate={start} targetDate={target} />
    </div>
  )
}
