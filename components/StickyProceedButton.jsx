'use client'
import { useEffect, useRef, useState } from 'react'

export default function StickyProceedButton({ onClick, children, visible = true }) {
  const naturalRef = useRef(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    if (!visible) return
    const el = naturalRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  // Hide sticky when the button itself isn't meant to be shown yet
  const showSticky = visible && sticky

  return (
    <>
      {/* Natural position */}
      <div ref={naturalRef} style={{ visibility: visible ? 'visible' : 'hidden' }}>
        <button
          className="btn btn-primary"
          onClick={onClick}
          style={{ fontSize: '1rem', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
        >
          {children}
        </button>
      </div>

      {/* Sticky bottom bar — only when natural button has scrolled out of view */}
      {showSticky && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.75rem 1rem',
          background: '#1a1a1a',
          borderTop: '1px solid #333',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
          zIndex: 200,
        }}>
          <button
            className="btn btn-primary"
            onClick={onClick}
            style={{
              maxWidth: 540,
              margin: '0 auto',
              fontSize: '1rem',
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            {children}
          </button>
        </div>
      )}
    </>
  )
}
