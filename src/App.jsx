import React from 'react'
import Countdown from './Countdown'

export default function App() {
  const start = new Date(2026, 4, 19, 0, 0, 0)
  const target = new Date(2026, 7, 27, 0, 0, 0)

  return (
    <div className="app">
      <h1>Countdown to 27/08/2026</h1>
      <Countdown startDate={start} targetDate={target} />
    </div>
  )
}
