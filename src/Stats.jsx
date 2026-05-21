import {
  Heart, MessageCircle, Sparkles, HeartCrack, Inbox, Percent,
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

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats__group">
        <h2 className="stats__heading">Hinge Stats</h2>
        <div className="stats__grid">
          <StatCard label="Likes Sent" value="5,618" sub="outgoing likes" icon={Heart} color="#fb4c68" />
          <StatCard label="Likes Ignored" value="5,501" sub="no match recorded" icon={HeartCrack} color="#8385a9" />
          <StatCard label="Likes Received" value="144" sub="incoming likes" icon={Inbox} color="#60a5fa" />
          <StatCard label="Matches" value="129" sub="likes sent and received" icon={Sparkles} color="#f59e0b" />
          <StatCard label="Like Success Rate" value="2.08%" sub="match conversion" icon={Percent} color="#34d399" />
          <StatCard label="Average Messages per Match" value="6.7" sub="messages per match" icon={MessageCircle} color="#a78bfa" />
        </div>
        <figure className="stats__quote">
          <blockquote>We are so cooked?</blockquote>
          <img
            src="https://i.kym-cdn.com/entries/icons/original/000/052/772/dog_closing_eyes_meme_cover.jpg"
            alt="Dog closing eyes meme"
          />
        </figure>
      </div>
    </section>
  )
}
