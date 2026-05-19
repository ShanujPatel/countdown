import React, { useEffect, useState } from 'react'

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

export default function Countdown({ startDate, targetDate }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = targetDate - now
  if (diff <= 0) {
    return <div className="countdown done">Time's up!</div>
  }

  const { days, hours, minutes, seconds } = formatParts(diff)
  const total = targetDate - startDate
  const elapsed = now - startDate
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100))

  return (
    <div className="countdown-wrapper">
      <div className="countdown">
        <div className="tile">
          <div className="value">{days}</div>
          <div className="label">Days</div>
        </div>
        <div className="tile">
          <div className="value">{hours.toString().padStart(2, '0')}</div>
          <div className="label">Hours</div>
        </div>
        <div className="tile">
          <div className="value">{minutes.toString().padStart(2, '0')}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="tile">
          <div className="value">{seconds.toString().padStart(2, '0')}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">{progress.toFixed(1)}% of the way there</div>
    </div>
  )
}
