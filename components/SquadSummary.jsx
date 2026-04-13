'use client'
import { useState } from 'react'
import { formatCurrency } from '../data/verticals'
import PageContainer from './PageContainer'
import ProgressArc from './ProgressArc'
import CartCard from './CartCard'
import ContributorsList from './ContributorsList'
import StickyProceedButton from './StickyProceedButton'

export default function SquadSummary({ vertical, squadName, anchorAmount, length, onAdvance, onRestart }) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `lafcsuites.com/join/${vertical.shareSlug}`
  const percent = Math.round((anchorAmount / vertical.total) * 100)
  const remaining = vertical.total - anchorAmount

  const deadlineLabel = 'Closes in 24 hours'

  const anchorContributor = [{ name: 'You', amount: anchorAmount, isAnchor: true }]

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = `Hey! I've started a Paysquad to split a suite for the LAFC game. Claim your spot here: https://${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <PageContainer merchantLogoText={vertical.merchant.logoText} onRestart={onRestart} large>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
        <style>{`@media(min-width:640px){.summary-grid{grid-template-columns:1fr 1fr !important}}`}</style>
        <div className="summary-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>

          {/* Left column */}
          <div>
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>{squadName}</h5>
                </div>

                <p style={{ marginBottom: '1rem' }}>
                  <span style={{
                    background: '#fdf6e3',
                    color: '#0d1117',
                    border: '1px solid #c9a84c',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}>
                    {deadlineLabel}
                  </span>
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <ProgressArc
                    percent={percent}
                    emoji={vertical.emoji}
                    label={squadName}
                    sublabel={`${Math.round(percent / 100 * vertical.ticketCount)}/${vertical.ticketCount} spots claimed`}
                    size={240}
                    segments={vertical.ticketCount ?? 0}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline-primary"
                    style={{ flex: 1, whiteSpace: 'nowrap' }}
                    onClick={() => setShowShareModal(true)}
                  >
                    <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#link-2" /></svg>
                    Share
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, whiteSpace: 'nowrap', opacity: 0.5, cursor: 'not-allowed' }}
                    disabled
                  >
                    <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#plus" /></svg>
                    Contribute
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <CartCard vertical={vertical} />
            <ContributorsList contributors={anchorContributor} currency={vertical.currency} startTime={Date.now()} />
          </div>
        </div>

        {/* FAQ */}
        <div className="card">
          <div className="card-body">
            <h6 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Frequently asked questions</h6>
            {[
              ['How does Paysquad work?', 'Share the link and your squad chips in. Once the total is reached, the suite is booked automatically.'],
              ['What if not everyone pays?', 'If the squad expires before the total is met, all contributions are automatically refunded.'],
            ].map(([q, a]) => (
              <details key={q} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <summary style={{ fontWeight: 600, cursor: 'pointer', padding: '0.35rem 0', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                  <span>{q}</span>
                  <svg className="feather faq-chevron" style={{ marginLeft: '0.5rem' }}><use href="/suitepro-demo/feather-sprite.svg#chevron-down" /></svg>
                </summary>
                <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: '0.35rem 0 0' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <StickyProceedButton onClick={onAdvance}>
          See what happens next
          <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#arrow-right" /></svg>
        </StickyProceedButton>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem',
        }}>
          <div className="card" style={{ maxWidth: 420, width: '100%' }}>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h5 style={{ fontWeight: 700, margin: 0 }}>Share your Paysquad</h5>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6c757d' }} onClick={() => setShowShareModal(false)}>
                  <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#x" /></svg>
                </button>
              </div>

              <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '0.65rem 0.75rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#0d1117' }}>
                In the real product, this link would be live and shareable. In this demo it is shown for illustration only.
              </div>

              <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.75rem' }}>
                Your squad would receive a unique link like this to claim their spot.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input className="form-control" readOnly value={shareUrl} style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: '#f8f9fa' }} />
                <button className="btn btn-outline-primary btn-sm" style={{ whiteSpace: 'nowrap', width: 'auto', padding: '0.4rem 0.8rem' }} onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <button
                onClick={handleWhatsApp}
                style={{
                  width: '100%', padding: '0.7rem', borderRadius: 8, border: 'none',
                  background: '#25D366', color: 'white', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                Share via WhatsApp
              </button>
              <p style={{ fontSize: '0.78rem', color: '#adb5bd', textAlign: 'center', margin: 0 }}>
                WhatsApp message is pre-filled and ready to send in the live product.
              </p>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
