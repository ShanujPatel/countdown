import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Drop your track at public/audio/theme.mp3 (BASE_URL keeps it working under the /countdown/ base path).
const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/theme.mp3`

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.35

    let removeInteractionStart = () => {}

    // Once anything actually starts playback, stop listening for the first gesture
    // (otherwise a later tap could restart music the user deliberately muted).
    const onPlay = () => {
      setPlaying(true)
      removeInteractionStart()
    }
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    // Mobile & most desktop browsers block sound-on autoplay until a user gesture.
    // Try once; if blocked, start on the first interaction that ISN'T the toggle
    // button — the button starts playback through its own onClick, and letting the
    // global listener also fire would immediately pause it again.
    audio.play().catch(() => {
      const start = (event) => {
        if (event?.target?.closest?.('.music-toggle')) return
        audio.play().catch(() => {})
      }
      window.addEventListener('pointerdown', start)
      window.addEventListener('keydown', start)
      removeInteractionStart = () => {
        window.removeEventListener('pointerdown', start)
        window.removeEventListener('keydown', start)
        removeInteractionStart = () => {}
      }
    })

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      removeInteractionStart()
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      {available && (
        <button
          type="button"
          className="music-toggle"
          onClick={toggle}
          aria-label={playing ? 'Mute music' : 'Play music'}
          aria-pressed={playing}
        >
          {playing ? <Volume2 size={20} strokeWidth={1.8} /> : <VolumeX size={20} strokeWidth={1.8} />}
        </button>
      )}
    </>
  )
}
