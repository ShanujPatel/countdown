import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Drop your track at public/audio/theme.mp3 (BASE_URL keeps it working under the /countdown/ base path).
const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/theme.mp3`

const MusicPlayer = forwardRef(function MusicPlayer(_props, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  // Called synchronously from the cover's Enter click — a real user gesture, which
  // is the only thing mobile browsers accept to unlock sound-on playback.
  useImperativeHandle(ref, () => ({
    start() {
      const audio = audioRef.current
      if (!audio) return
      audio.muted = false
      audio.volume = 0.35
      audio.play().catch(() => {})
    },
  }), [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.35

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
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
})

export default MusicPlayer
