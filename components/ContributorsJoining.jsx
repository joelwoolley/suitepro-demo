'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { formatCurrency } from '../data/verticals'
import PageContainer from './PageContainer'
import ProgressArc from './ProgressArc'
import CartCard from './CartCard'

export default function ContributorsJoining({ vertical, squadName, anchorAmount, length, onRestart }) {
  const [joined, setJoined] = useState([{ ...vertical.contributors[0], amount: anchorAmount }])
  const [isComplete, setIsComplete] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const startTimeRef = useRef(Date.now())
  const isCompleteRef = useRef(false)

  const deadlineLabel = 'Closes in 24 hours'

  const totalContributed = joined.reduce((s, c) => s + c.amount, 0)
  const percent = Math.round((totalContributed / vertical.total) * 100)
  const remaining = Math.max(0, vertical.total - totalContributed)

  useEffect(() => {
    setJoined([{ ...vertical.contributors[0], amount: anchorAmount }])
    setIsComplete(false)
    setShowResult(false)
    setShowFlash(false)
    startTimeRef.current = Date.now()
    isCompleteRef.current = false

    const others = vertical.contributors.slice(1)

    const timers = []

    others.forEach((contributor) => {
      const t = setTimeout(() => {
        if (isCompleteRef.current) return
        setJoined((prev) => {
          const next = [...prev, { ...contributor, joinedAt: Date.now() - startTimeRef.current }]
          const total = next.reduce((s, c) => s + c.amount, 0)
          const isNowComplete = total >= vertical.total

          if (isNowComplete && !isCompleteRef.current) {
            isCompleteRef.current = true
            setTimeout(() => {
              setIsComplete(true)
              setShowFlash(true)
              confetti({
                particleCount: 160,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#c9a84c', '#f5e6c8', '#d4af37', '#fff8e7'],
              })
              setTimeout(() => setShowFlash(false), 600)
              setTimeout(() => setShowResult(true), 1000)
            }, 300)
          }

          return next
        })
      }, contributor.delay)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contributorsWithTimestamps = joined.map((c) => ({
    ...c,
    joinedAt: c.isAnchor ? 0 : (c.joinedAt || 0),
  }))

  return (
    <PageContainer merchantLogoText={vertical.merchant.logoText} onRestart={onRestart} large>
      {/* Full-screen flash on completion */}
      {showFlash && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(201,168,76,0.15)',
          zIndex: 999, pointerEvents: 'none',
          animation: 'fadeOut 0.6s ease forwards',
        }} />
      )}
      <style>{`@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}`}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
        <style>{`@media(min-width:640px){.summary-grid{grid-template-columns:1fr 1fr !important}}`}</style>
        <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>

          {/* Left column */}
          <div>
            {isComplete && (
              <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#check-circle" /></svg>
                <div>
                  <h6 style={{ fontWeight: 700, margin: 0 }}>Suite Booked!</h6>
                  <span style={{ fontSize: '0.9rem' }}>This squad reached their goal!</span>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>{squadName}</h5>
                </div>

                {!isComplete && (
                  <p style={{ marginBottom: '1rem' }}>
                    <span style={{
                      background: '#fdf6e3', color: '#0d1117',
                      border: '1px solid #c9a84c', padding: '0.2rem 0.6rem',
                      borderRadius: 6, fontWeight: 700, fontSize: '0.875rem',
                    }}>
                      {deadlineLabel}
                    </span>
                  </p>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <ProgressArc
                    percent={percent}
                    emoji={vertical.emoji}
                    label={isComplete ? '100%' : squadName}
                    sublabel={
                      isComplete
                        ? '🏟️'
                        : `${Math.round(percent / 100 * vertical.ticketCount)}/${vertical.ticketCount} spots claimed`
                    }
                    size={240}
                    segments={vertical.ticketCount ?? 0}
                  />
                </div>

                {!isComplete && (
                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6c757d' }}>
                    Waiting for squad members...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <CartCard vertical={vertical} />
            <div className="card">
              <div className="card-body">
                <h6 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Your squad</h6>
                <div style={{ display: 'flex', flexDirection: 'column-reverse', maxHeight: 220, overflowY: 'auto', gap: '0.4rem' }}>
                  <AnimatePresence>
                    {contributorsWithTimestamps.map((c) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #f5f5f5' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          {c.isAnchor && <span>👑</span>}
                          <span style={{ fontWeight: c.isAnchor ? 700 : 400 }}>{c.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                          <span style={{ fontWeight: 600, color: '#0d1117' }}>{formatCurrency(c.amount, vertical.currency)}</span>
                          <span style={{ color: '#6c757d' }}>just now</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageContainer>
  )
}
