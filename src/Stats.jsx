import { useMemo } from 'react'
import {
  Heart, MessageCircle, Sparkles, HeartCrack, Inbox, Percent, Reply, Send, Users, ThumbsDown,
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

function LikesFlow() {
  return (
    <div className="likes-flow" aria-label="Likes sent flow to ignored likes and matches">
      <div className="likes-flow__node likes-flow__node--sent">
        <Heart size={20} color="#fb4c68" strokeWidth={1.7} />
        <span>5,618 sent</span>
      </div>
      <div className="likes-flow__lines" aria-hidden="true">
        <span className="likes-flow__line likes-flow__line--ignored" />
        <span className="likes-flow__line likes-flow__line--matches" />
      </div>
      <div className="likes-flow__outcomes">
        <div className="likes-flow__node likes-flow__node--ignored">
          <HeartCrack size={20} color="#8385a9" strokeWidth={1.7} />
          <span>5,501 ignored</span>
        </div>
        <div className="likes-flow__node likes-flow__node--matches">
          <Sparkles size={20} color="#f59e0b" strokeWidth={1.7} />
          <span>129 matches</span>
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
          <StatCard label="Likes Sent" value="6,211" sub="outgoing likes" icon={Heart} color="#fb4c68" />
          <StatCard label="Likes Ignored" value="6,085" sub="no match recorded" icon={HeartCrack} color="#8385a9" />
          <StatCard label="Likes Received" value="149" sub="incoming likes" icon={Inbox} color="#60a5fa" />
          <StatCard label="Matches" value="138" sub="likes sent and received" icon={Sparkles} color="#f59e0b" />
          <StatCard label="Like Success Rate" value="2.05%" sub="match conversion" icon={Percent} color="#34d399" />
          <StatCard label="Average Messages per Match" value="6.6" sub="messages per match" icon={MessageCircle} color="#a78bfa" />
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
