import { useEffect, useRef, useState } from 'react'

function formatParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)
  return { days, hours, minutes, seconds }
}

function Tile({ value, label }) {
  const [current, setCurrent] = useState(value)
  const [prev, setPrev] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (value === current) return
    clearTimeout(timer.current)
    setPrev(current)
    setFlipping(true)
    timer.current = setTimeout(() => {
      setCurrent(value)
      setFlipping(false)
    }, 300)
    return () => clearTimeout(timer.current)
  }, [value])

  return (
    <div className="tile">
      <div className="tile__body">
        {/* Top half — immediately shows incoming value */}
        <div className="tile__half tile__half--top">
          <span className="tile__num">{flipping ? value : current}</span>
        </div>
        {/* Bottom half — holds old value until flip completes */}
        <div className="tile__half tile__half--bottom">
          <span className="tile__num">{current}</span>
        </div>
        {/* Animated flap sweeps the old value away */}
        {flipping && (
          <div className="tile__flap">
            <span className="tile__num">{prev}</span>
          </div>
        )}
        <div className="tile__notch tile__notch--l" />
        <div className="tile__notch tile__notch--r" />
      </div>
      <span className="tile__label">{label}</span>
    </div>
  )
}

export default function Countdown({ startDate, targetDate }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = targetDate - now
  if (diff <= 0) return <p className="done">We're here!</p>

  const { days, hours, minutes, seconds } = formatParts(diff)
  const total = targetDate - startDate
  const elapsed = now - startDate
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100))

  return (
    <>
      <div className="countdown">
        <Tile value={String(days).padStart(2, '0')} label="days" />
        <Tile value={String(hours).padStart(2, '0')} label="hours" />
        <Tile value={String(minutes).padStart(2, '0')} label="minutes" />
        <Tile value={String(seconds).padStart(2, '0')} label="seconds" />
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-label">{progress.toFixed(1)}% of the way there to an arranged marriage</p>
    </>
  )
}
