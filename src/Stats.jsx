import { useMemo } from 'react'
import {
  Heart, MessageCircle, Sparkles, HeartCrack, Inbox, Percent,
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

function HingeLogo() {
  return (
    <img
      className="stats__logo"
      src="https://static.vecteezy.com/system/resources/thumbnails/068/706/030/small/hinge-circle-logo-editable-hinge-app-free-png.png"
      alt="Hinge"
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

function DillLogo() {
  return (
    <img
      className="stats__logo stats__logo--dill"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7Nv2H8eOhagCb5z8dNPQl3ArzDBUcEr1Wg&s"
      alt="Dill"
    />
  )
}

export default function Stats() {
  const quoteImage = useMemo(
    () => quoteImages[Math.floor(Math.random() * quoteImages.length)],
    [],
  )

  return (
    <section className="stats">
      <div className="stats__group">
        <h2 className="stats__heading">
          <HingeLogo />
          <span>Hinge Stats <em className="stats__heading-accent">(since April 2022)</em></span>
        </h2>
        <div className="stats__grid">
          <StatCard label="Likes Sent" value="5,618" sub="outgoing likes" icon={Heart} color="#fb4c68" />
          <StatCard label="Likes Ignored" value="5,501" sub="no match recorded" icon={HeartCrack} color="#8385a9" />
          <StatCard label="Likes Received" value="144" sub="incoming likes" icon={Inbox} color="#60a5fa" />
          <StatCard label="Matches" value="129" sub="likes sent and received" icon={Sparkles} color="#f59e0b" />
          <StatCard label="Like Success Rate" value="2.08%" sub="match conversion" icon={Percent} color="#34d399" />
          <StatCard label="Average Messages per Match" value="6.7" sub="messages per match" icon={MessageCircle} color="#a78bfa" />
        </div>
        <div className="chat-quotes chat-quotes--hidden">
          <h2 className="stats__heading">Best Quotes from Hinge Chats</h2>
          <blockquote className="chat-quotes__quote">"Were you born in the UK btw"</blockquote>
        </div>
        <h2 className="stats__heading">
          <span>Coming Soon....</span>
          <span className="stats__heading-inline">
            <BumbleLogo />
            <span>Bumble</span>
          </span>
          <span>and</span>
          <span className="stats__heading-inline">
            <DillLogo />
            <span>Dill</span>
          </span>
          <span>Mill Stats</span>
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
