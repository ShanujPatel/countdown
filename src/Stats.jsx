import { useMemo } from 'react'
import {
  Heart, MessageCircle, Sparkles, HeartCrack, Inbox, Percent, Reply, Send, Users, ThumbsDown, UserCheck,
} from 'lucide-react'

const quoteImages = [
  {
    src: 'https://i.kym-cdn.com/entries/icons/original/000/052/772/dog_closing_eyes_meme_cover.jpg',
    alt: 'Dog closing eyes meme',
  },
  {
    src: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhmMGk1eDlkdGN6NHo4ZjlhdWVpbW5xbWUyZ21tcjN0cHhhYjBvZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W0c3xcZ3F1d0EYYb0f/giphy.gif',
    alt: 'Animated reaction GIF',
  },
  {
    src: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTd5OWJraXQxMDhnZnpvNmV0MGZ6ZG5oNjVmcHRka2c3OXBnb2ZnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VJBd91kUU5FJtcDUvL/giphy.gif',
    alt: 'Animated reaction GIF',
  },
  {
    src: 'https://media.tenor.com/c_YU3p6py2AAAAAM/meme-crying.gif',
    alt: 'Crying meme GIF',
  },
  {
    src: 'https://www.audiosciencereview.com/forum/index.php?attachments/330903/',
    alt: 'Reaction meme',
  },
  {
    src: 'https://media.tenor.com/kMUhWQeutnkAAAAM/true.gif',
    alt: 'True reaction GIF',
  },
  {
    src: 'https://media.tenor.com/V7-gVNsD2EAAAAAM/michael-scott-the-office.gif',
    alt: 'Michael Scott reaction GIF',
  },
]

function formatMonth(date) {
  const [year, month] = date.split('-')
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${names[Number(month) - 1]} ${year}`
}

function Sparkline({ history, color, format }) {
  const width = 260
  const height = 90
  const pad = 10
  const values = history.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = (width - pad * 2) / Math.max(history.length - 1, 1)

  const coords = history.map((point, index) => {
    const x = history.length === 1 ? width / 2 : pad + index * stepX
    const y = height - pad - ((point.value - min) / range) * (height - pad * 2)
    return { x, y, point }
  })

  const line = coords
    .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ')
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)} ${height - pad} L${coords[0].x.toFixed(1)} ${height - pad} Z`
  const last = coords[coords.length - 1]

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Trend over time"
      preserveAspectRatio="none"
    >
      <path className="sparkline__area" d={area} fill={color} />
      <path className="sparkline__line" d={line} stroke={color} />
      {coords.map(({ x, y }, index) => (
        <circle key={index} cx={x} cy={y} r={index === coords.length - 1 ? 3.5 : 2} fill={color} />
      ))}
      <circle className="sparkline__pulse" cx={last.x} cy={last.y} r={5} stroke={color} />
    </svg>
  )
}

function StatChart({ label, history, color, format }) {
  const first = history[0]
  const last = history[history.length - 1]
  const delta = last.value - first.value
  const sign = delta > 0 ? '+' : ''
  const fmt = format || ((value) => value.toLocaleString())

  return (
    <div className="stat-card__chart" role="tooltip">
      <div className="stat-card__chart-head">
        <span>{label} over time</span>
        {history.length > 1 && (
          <span className={`stat-card__delta ${delta >= 0 ? 'is-up' : 'is-down'}`}>
            {sign}{fmt(delta)}
          </span>
        )}
      </div>
      {history.length > 1 ? (
        <Sparkline history={history} color={color} format={fmt} />
      ) : (
        <p className="stat-card__chart-empty">Only one snapshot so far — trend appears once more are logged.</p>
      )}
      <div className="stat-card__chart-foot">
        <span>{formatMonth(first.date)}</span>
        <span>{formatMonth(last.date)}</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, icon: Icon, color, history, format }) {
  const trackable = Array.isArray(history) && history.length > 0
  return (
    <div className={`stat-card${trackable ? ' stat-card--trackable' : ''}`}>
      <div className="stat-card__header">
        <span className="stat-card__label">{label}</span>
        <Icon size={22} color={color} strokeWidth={1.5} />
      </div>
      <div className="stat-card__value">{value}</div>
      {sub && <p className="stat-card__sub">{sub}</p>}
      {trackable && <StatChart label={label} history={history} color={color} format={format} />}
    </div>
  )
}

function LikesFlow() {
  return (
    <div className="likes-flow" aria-label="Likes sent flow to ignored likes and matches">
      <div className="likes-flow__node likes-flow__node--sent">
        <Heart size={20} color="#fb4c68" strokeWidth={1.7} />
        <span>6,211 sent</span>
      </div>
      <div className="likes-flow__lines" aria-hidden="true">
        <span className="likes-flow__line likes-flow__line--ignored" />
        <span className="likes-flow__line likes-flow__line--matches" />
      </div>
      <div className="likes-flow__outcomes">
        <div className="likes-flow__node likes-flow__node--ignored">
          <HeartCrack size={20} color="#8385a9" strokeWidth={1.7} />
          <span>6,085 ignored</span>
        </div>
        <div className="likes-flow__node likes-flow__node--matches">
          <Sparkles size={20} color="#f59e0b" strokeWidth={1.7} />
          <span>138 matches</span>
        </div>
      </div>
    </div>
  )
}

function DmFlow() {
  return (
    <div className="dm-flow" aria-label="Instagram DM flow from individuals messaged to stories liked and DMs sent to replies">
      <div className="likes-flow__node">
        <Users size={20} color="#60a5fa" strokeWidth={1.7} />
        <span>1 individual</span>
      </div>
      <span className="dm-flow__line dm-flow__line--fork" aria-hidden="true" />
      <div className="dm-flow__middle">
        <div className="likes-flow__node">
          <Heart size={20} color="#fb4c68" strokeWidth={1.7} />
          <span>10 stories liked</span>
        </div>
        <div className="likes-flow__node">
          <Send size={20} color="#a78bfa" strokeWidth={1.7} />
          <span>2 DMs sent</span>
        </div>
      </div>
      <span className="dm-flow__line dm-flow__line--straight" aria-hidden="true" />
      <div className="likes-flow__node likes-flow__node--ignored">
        <Reply size={20} color="#8385a9" strokeWidth={1.7} />
        <span>0 replies</span>
      </div>
    </div>
  )
}

function HingeLogo() {
  return (
    <img
      className="stats__logo"
      src="https://static.vecteezy.com/system/resources/thumbnails/068/706/030/small/hinge-circle-logo-editable-hinge-app-free-png.png"
      alt="Hinge"
    />
  )
}

function InstagramLogo() {
  return (
    <img
      className="stats__logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1280px-Instagram_logo_2016.svg.png"
      alt="Instagram"
    />
  )
}

function BumbleLogo() {
  return (
    <img
      className="stats__logo stats__logo--bumble"
      src="https://miro.medium.com/v2/resize:fit:400/1*Y2B1BqOaSBRv-XC5B5RquQ.png"
      alt="Bumble"
    />
  )
}

function ShaadiLogo() {
  return (
    <img
      className="stats__logo stats__logo--shaadi"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/New_logo_of_Shaadi.svg/500px-New_logo_of_Shaadi.svg.png"
      alt="Shaadi.com"
    />
  )
}

function DillLogo() {
  return (
    <img
      className="stats__logo stats__logo--dill"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7Nv2H8eOhagCb5z8dNPQl3ArzDBUcEr1Wg&s"
      alt="Dill"
    />
  )
}

// Each stat keeps a `history` of dated snapshots so the hover graph can plot the trend.
// To add a data point, append { date: 'YYYY-MM', value: <number> } — keep them in chronological order.
const percent = (value) => `${value.toFixed(2)}%`
const decimal = (value) => value.toFixed(1)

const hingeStats = [
  {
    label: 'Likes Sent', value: '6,211', sub: 'outgoing likes', icon: Heart, color: '#fb4c68',
    history: [
      { date: '2026-05', value: 5618 },
      { date: '2026-07', value: 6211 },
    ],
  },
  {
    label: 'Likes Ignored', value: '6,085', sub: 'no match recorded', icon: HeartCrack, color: '#8385a9',
    history: [
      { date: '2026-05', value: 5501 },
      { date: '2026-07', value: 6085 },
    ],
  },
  {
    label: 'Likes Received', value: '149', sub: 'incoming likes', icon: Inbox, color: '#60a5fa',
    history: [
      { date: '2026-05', value: 144 },
      { date: '2026-07', value: 149 },
    ],
  },
  {
    label: 'Matches', value: '138', sub: 'likes sent and received', icon: Sparkles, color: '#f59e0b',
    history: [
      { date: '2026-05', value: 129 },
      { date: '2026-07', value: 138 },
    ],
  },
  {
    label: 'Like Success Rate', value: '2.05%', sub: 'match conversion', icon: Percent, color: '#34d399',
    format: percent,
    history: [
      { date: '2026-05', value: 2.08 },
      { date: '2026-07', value: 2.05 },
    ],
  },
  {
    label: 'Average Messages per Match', value: '6.6', sub: 'messages per match', icon: MessageCircle, color: '#a78bfa',
    format: decimal,
    history: [
      { date: '2026-05', value: 6.7 },
      { date: '2026-07', value: 6.6 },
    ],
  },
]

export default function Stats() {
  const quoteImage = useMemo(
    () => quoteImages[Math.floor(Math.random() * quoteImages.length)],
    [],
  )

  return (
    <section className="stats">
      <div className="stats__group">
        <nav className="stats__nav" aria-label="Stats sections">
          <a href="#hinge-stats">
            <HingeLogo />
            <span>Hinge Stats</span>
          </a>
          <a href="#bumble-stats">
            <BumbleLogo />
            <span>Bumble Stats</span>
          </a>
          <a href="#instagram-dm-stats">
            <InstagramLogo />
            <span>Instagram DM Stats</span>
          </a>
          <a href="#shaadi-stats">
            <ShaadiLogo />
            <span>Shaadi.com Stats</span>
          </a>
          <a href="#coming-soon-stats">
            <DillLogo />
            <span>Coming Soon</span>
          </a>
        </nav>
        <h2 className="stats__heading" id="hinge-stats">
          <HingeLogo />
          <span>Hinge Stats <em className="stats__heading-accent">(since April 2022)</em></span>
        </h2>
        <div className="stats__grid">
          {hingeStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <LikesFlow />
        <div className="stats__divider" aria-hidden="true" />
        <h2 className="stats__heading" id="bumble-stats">
          <BumbleLogo />
          <span>Bumble Stats <em className="stats__heading-accent">(since February 2021)</em></span>
        </h2>
        <div className="stats__grid">
          <StatCard label="Likes Sent" value="4,796" sub="outgoing likes" icon={Heart} color="#fb4c68" />
          <StatCard label="Likes Received" value="166" sub="incoming likes" icon={Inbox} color="#60a5fa" />
          <StatCard label="Incoming No's" value="23,792" sub="swiped left on you" icon={ThumbsDown} color="#8385a9" />
        </div>
        <div className="stats__divider" aria-hidden="true" />
        <h2 className="stats__heading" id="instagram-dm-stats">
          <InstagramLogo />
          <span>Instagram DM stats</span>
        </h2>
        <div className="stats__grid">
          <StatCard label="Individuals Messaged" value="1" sub="people contacted" icon={Users} color="#60a5fa" />
          <StatCard label="Liked Stories" value="10" sub="stories liked" icon={Heart} color="#fb4c68" />
          <StatCard label="DMs Sent" value="2" sub="including replies to stories" icon={Send} color="#a78bfa" />
          <StatCard label="Replies" value="0" sub="messages received" icon={Reply} color="#8385a9" />
        </div>
        <DmFlow />
        <div className="stats__divider" aria-hidden="true" />
        <h2 className="stats__heading" id="shaadi-stats">
          <ShaadiLogo />
          <span>Shaadi.com Stats</span>
        </h2>
        <div className="stats__grid">
          <StatCard label="Interests Sent" value="—" sub="outgoing interests" icon={Send} color="#a78bfa" />
          <StatCard label="Interests Received" value="—" sub="incoming interests" icon={Inbox} color="#60a5fa" />
          <StatCard label="Accepted" value="—" sub="mutual interests" icon={UserCheck} color="#34d399" />
          <StatCard label="Matches" value="—" sub="connections made" icon={Sparkles} color="#f59e0b" />
        </div>
        <div className="stats__divider" aria-hidden="true" />
        <div className="chat-quotes chat-quotes--hidden">
          <h2 className="stats__heading">Best Quotes from Hinge Chats</h2>
          <blockquote className="chat-quotes__quote">"Were you born in the UK btw"</blockquote>
        </div>
        <h2 className="stats__heading" id="coming-soon-stats">
          <span>Coming Soon....</span>
          <span className="stats__heading-inline">
            <DillLogo />
            <span>Dill Mill Stats</span>
          </span>
        </h2>
        <div className="stats__divider" aria-hidden="true" />
        <figure className="stats__quote">
          <blockquote>"We are so cooked"</blockquote>
          <img
            src={quoteImage.src}
            alt={quoteImage.alt}
          />
        </figure>
      </div>
    </section>
  )
}
