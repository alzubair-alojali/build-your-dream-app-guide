import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { slides } from './slides'

function App() {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const stageRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      setIndex(clamped)
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        go(index + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(index - 1)
      } else if (e.key === 'Home') {
        go(0)
      } else if (e.key === 'End') {
        go(total - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, total])

  useEffect(() => {
    // Scroll the slide content to top on change
    stageRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [index])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) {
      if (dx < 0) go(index + 1)
      else go(index - 1)
    }
    touchStartX.current = null
  }

  const Slide = slides[index].render
  const progress = ((index + 1) / total) * 100

  return (
    <div className="deck">
      <header className="deck__topbar" role="banner">
        <div className="brand">
          <img src="/images/gdg-logo.webp" alt="GDG" />
          <span>
            Build Your Dream App <small>· Workshop Guide</small>
          </span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Slide ${index + 1} of ${total}`}
        >
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="counter" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </header>

      <main
        ref={stageRef}
        className="stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
      >
        <section className="slide" key={index}>
          <Slide />
        </section>
      </main>

      <nav className="deck__nav" aria-label="Slide navigation">
        <button
          className="nav-btn"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">←</span> Back
        </button>

        <div className="dots" role="tablist" aria-label="Jump to slide">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`dot-btn${i === index ? ' active' : ''}`}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.title}`}
              title={`${i + 1}. ${s.title}`}
            />
          ))}
        </div>

        <button
          className="nav-btn primary"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label="Next slide"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>
    </div>
  )
}

export default App
