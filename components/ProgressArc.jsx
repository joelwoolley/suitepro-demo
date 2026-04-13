'use client'
import { useState, useEffect, useRef } from 'react'

export default function ProgressArc({ percent = 0, emoji = '🏟️', label = '', sublabel = '', size = 260, segments = 0 }) {
  const [displayPercent, setDisplayPercent] = useState(percent)
  const animRef = useRef(null)
  const fromRef = useRef(percent)

  useEffect(() => {
    const from = fromRef.current
    const to = percent
    if (from === to) return

    const duration = 700
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const current = from + (to - from) * eased
      setDisplayPercent(current)
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [percent])

  const strokeWidth = Math.round(size * 0.12)
  const r = size / 2 - strokeWidth / 2
  const ctr = size / 2
  const circumference = 2 * Math.PI * r

  const pct = Math.min(Math.max(displayPercent, 0), 100)
  const dashOffset = circumference * (1 - pct / 100)

  const tipAngle = (pct / 100) * 2 * Math.PI
  const screenAngle = tipAngle - Math.PI / 2
  const tipX = ctr + r * Math.cos(screenAngle)
  const tipY = ctr + r * Math.sin(screenAngle)
  const dotR = Math.max(strokeWidth / 4 - 1, 3)
  const showDot = pct > 2 && pct < 99

  const dividerLineWidth = Math.max(Math.round(strokeWidth * 0.18), 2)
  const outerR = r + strokeWidth / 2
  const innerR = Math.max(r - strokeWidth / 2, 1)

  const innerSize = Math.round(size * 0.76)
  const offset = Math.round(size * 0.12)

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
        </defs>

        {segments > 0 ? (
          <>
            <circle
              cx={ctr} cy={ctr} r={r}
              fill="none"
              stroke="#e9ecef"
              strokeWidth={strokeWidth}
            />

            <circle
              cx={ctr} cy={ctr} r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${ctr} ${ctr})`}
            />

            {Array.from({ length: segments }, (_, i) => {
              const angle = -Math.PI / 2 + i * (2 * Math.PI / segments)
              return (
                <line
                  key={`div-${i}`}
                  x1={ctr + innerR * Math.cos(angle)}
                  y1={ctr + innerR * Math.sin(angle)}
                  x2={ctr + outerR * Math.cos(angle)}
                  y2={ctr + outerR * Math.sin(angle)}
                  stroke="white"
                  strokeWidth={dividerLineWidth}
                  strokeLinecap="butt"
                />
              )
            })}
          </>
        ) : (
          <>
            <circle
              cx={ctr} cy={ctr} r={r}
              fill="none"
              stroke="#e9ecef"
              strokeWidth={strokeWidth}
            />

            <circle
              cx={ctr} cy={ctr} r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${ctr} ${ctr})`}
            />

            {showDot && (
              <circle
                cx={tipX}
                cy={tipY}
                r={dotR}
                fill="white"
              />
            )}
          </>
        )}
      </svg>

      <div style={{
        position: 'absolute',
        top: offset,
        left: offset,
        width: innerSize,
        height: innerSize,
        borderRadius: '50%',
        background: '#fafaf8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0.5rem',
        gap: '0.15rem',
      }}>
        <div style={{ fontSize: '2rem', lineHeight: 1 }}>{emoji}</div>
        <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0d1117', lineHeight: 1.2, maxWidth: innerSize - 20 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0d1117' }}>{sublabel}</div>
      </div>
    </div>
  )
}
