import React from 'react'
import Countdown from './Countdown'

export default function App() {
  // Note: month is 0-based in JS Date, so August is 7
  const target = new Date(2026, 7, 27, 0, 0, 0)

  return (
    <div className="app">
      <h1>Countdown to 27/08/2026</h1>
      <Countdown targetDate={target} />
    </div>
  )
}
