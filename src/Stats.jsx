import { useEffect, useState } from 'react'
import {
  Calendar, Clock, Hash, Timer,
  CalendarDays, Zap, TrendingUp, Target, CalendarCheck,
} from 'lucide-react'

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__label">{label}</span>
        <Icon size={22} color={color} strokeWidth={1.5} />
      </div>
      <div className="stat-card__value">{value}</div>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  )
}

export default function Stats({ startDate, targetDate }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff    = Math.max(0, targetDate - now)
  const elapsed = Math.max(0, now - startDate)
  const total   = targetDate - startDate

  const daysLeft    = Math.floor(diff / 86_400_000)
  const hoursLeft   = Math.floor(diff / 3_600_000)
  const minutesLeft = Math.floor(diff / 60_000)
  const secondsLeft = Math.floor(diff / 1_000)
  const weeksLeft   = Math.floor(daysLeft / 7)
  const extraDays   = daysLeft % 7
  const monthsLeft  = (diff / (30.44 * 86_400_000)).toFixed(1)

  const daysElapsed = Math.floor(elapsed / 86_400_000)
  const totalDays   = Math.round(total / 86_400_000)
  const pctElapsed  = ((elapsed / total) * 100).toFixed(1)

  return (
    <section className="stats">
      <div className="stats__group">
        <h2 className="stats__heading">Overview</h2>
        <div className="stats__grid">
          <StatCard label="Days Remaining"    value={daysLeft.toLocaleString()}    sub="until 27 Aug 2026"            icon={Calendar}     color="#fb4c68" />
          <StatCard label="Hours Remaining"   value={hoursLeft.toLocaleString()}   sub="total hours left"             icon={Clock}        color="#60a5fa" />
          <StatCard label="Weeks Remaining"   value={weeksLeft}                    sub={`+ ${extraDays} extra days`}  icon={Hash}         color="#34d399" />
          <StatCard label="Minutes Remaining" value={minutesLeft.toLocaleString()} sub="total minutes left"           icon={Timer}        color="#f59e0b" />
          <StatCard label="Months Remaining"  value={monthsLeft}                   sub="approx. calendar months"      icon={CalendarDays} color="#a78bfa" />
          <StatCard label="Seconds Remaining" value={secondsLeft.toLocaleString()} sub="and counting…"                icon={Zap}          color="#fb923c" />
        </div>
      </div>

      <div className="stats__group">
        <h2 className="stats__heading">Progress Details</h2>
        <div className="stats__grid">
          <StatCard label="Days Elapsed"       value={daysElapsed}          sub="since 19 May 2026"            icon={TrendingUp}    color="#34d399" />
          <StatCard label="Progress"           value={`${pctElapsed}%`}    sub={`of ${totalDays} total days`}  icon={Target}        color="#fb923c" />
          <StatCard label="Countdown Duration" value={`${totalDays} days`}  sub="total length"                 icon={CalendarCheck} color="#a78bfa" />
        </div>
      </div>
    </section>
  )
}
