'use client'
import { useState } from 'react'
import { formatCurrency } from '../data/verticals'
import PageContainer from './PageContainer'

export default function AnchorContribute({ vertical, onAdvance, squadName, setSquadName, onRestart }) {
  const [ticketQty, setTicketQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [optMerchant, setOptMerchant] = useState(false)
  const [optPaysquad, setOptPaysquad] = useState(false)

  const activeAmount = ticketQty * (vertical.pricePerTicket || 0)
  const maxTickets = vertical.ticketCount - 1

  const handleSubmit = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => onAdvance({ squadName, length: vertical.duration, anchorAmount: activeAmount }), 1200)
  }

  return (
    <PageContainer merchantLogoText={vertical.merchant.logoText} onRestart={onRestart} plain>
      <div style={{ padding: '0 0 1.5rem' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.35rem' }}>
          Make the first contribution to kick things off.
        </h2>
        <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Want to find out more? FAQs are at the bottom of this page.
        </p>

        {/* Merchant card */}
        <div className="card" style={{ marginBottom: '1rem' }}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, letterSpacing: '0.06em', color: '#0d1117' }}>{vertical.merchant.logoText}</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{formatCurrency(vertical.total, vertical.currency)}</div>
            </div>
          </div>
          <div style={{ padding: '0 1rem 0.75rem', fontSize: '0.85rem', color: '#6c757d' }}>
            {vertical.productSubtitle}
          </div>
        </div>

        {/* Main form card */}
        <div className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name your Paysquad */}
            <div>
              <h6 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Name your Paysquad</h6>
              <div className="form-floating">
                <input
                  className="form-control"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  placeholder=" "
                  id="squadName"
                />
                <label htmlFor="squadName">Paysquad name</label>
              </div>
            </div>

            {/* Duration notice */}
            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '0.65rem 0.85rem', fontSize: '0.9rem', color: '#6c757d' }}>
              <svg className="feather" style={{ width: '0.85em', height: '0.85em', marginRight: '0.3rem', verticalAlign: '-0.1em' }}><use href="/suitepro-demo/feather-sprite.svg#clock" /></svg>
              LAFC Suites can hold this price for <strong style={{ color: '#0d1117' }}>24 hours</strong>
            </div>

            <hr className="tw-my-5" />

            {/* Spot quantity picker */}
            <div>
              <h6 style={{ fontWeight: 700, marginBottom: '0.65rem' }}>How many spots do you want to claim?</h6>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {Array.from({ length: maxTickets }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setTicketQty(n)}
                    style={{
                      flex: 1,
                      border: ticketQty === n ? '2px solid #c9a84c' : '2px solid #dee2e6',
                      borderRadius: 8,
                      padding: '0.6rem',
                      background: ticketQty === n ? '#fdf6e3' : 'white',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      color: '#0d1117',
                      transition: 'all 0.15s',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '0.65rem 0.85rem', fontSize: '0.9rem', color: '#6c757d' }}>
                {ticketQty} spot{ticketQty > 1 ? 's' : ''} &times; {formatCurrency(vertical.pricePerTicket, vertical.currency)} = <strong style={{ color: '#0d1117' }}>{formatCurrency(activeAmount, vertical.currency)}</strong>
              </div>
            </div>

            {/* Apple Pay / Google Pay (demo) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                style={{
                  width: '100%', padding: '0.85rem', borderRadius: 8, border: 'none',
                  background: '#000', color: 'white', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                }}
                onClick={handleSubmit}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Pay
              </button>
              <button
                style={{
                  width: '100%', padding: '0.85rem', borderRadius: 8, border: '2px solid #dee2e6',
                  background: 'white', color: '#0d1117', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                }}
                onClick={handleSubmit}
              >
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Pay
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6c757d', marginTop: '-0.25rem' }}>
              — or pay by card —
            </div>

            {/* Fake Stripe card form */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <h6 style={{ fontWeight: 700, margin: 0 }}>Card details</h6>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <svg className="feather" style={{ width: '0.8em', height: '0.8em', color: '#6c757d' }}><use href="/suitepro-demo/feather-sprite.svg#lock" /></svg>
                  <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>Secured by Stripe</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input className="form-control" readOnly value="•••• •••• •••• 4242" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input className="form-control" readOnly value="12 / 27" />
                  <input className="form-control" readOnly value="•••" />
                </div>
              </div>
            </div>

            <hr className="tw-my-5" />

            {/* Marketing opt-ins */}
            <div>
              <label className="form-check">
                <input type="checkbox" className="form-check-input" checked={optMerchant} onChange={(e) => setOptMerchant(e.target.checked)} />
                <span className="form-check-label">Yes, I&apos;d like to stay up to date with {vertical.merchant.name}</span>
              </label>
              <label className="form-check">
                <input type="checkbox" className="form-check-input" checked={optPaysquad} onChange={(e) => setOptPaysquad(e.target.checked)} />
                <span className="form-check-label">Yes, I&apos;d like to stay up to date with Paysquad</span>
              </label>
            </div>

            {/* Submit */}
            <button
              className={`btn btn-primary${loading || !squadName.trim() ? ' btn-loading' : ''}`}
              onClick={handleSubmit}
              disabled={!squadName.trim()}
              style={{ fontSize: '1rem', padding: '0.85rem' }}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Pay &amp; Start Paysquad
                  <svg className="feather"><use href="/suitepro-demo/feather-sprite.svg#arrow-right" /></svg>
                </>
              )}
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6c757d', marginTop: '0.75rem' }}>
          By continuing you accept our{' '}
          <a href="https://www.paysquad.co/terms" target="_blank" rel="noreferrer" style={{ color: '#0d1117' }}>
            terms &amp; privacy policy
          </a>{' '}
          and to receive important updates.
        </p>

        {/* FAQ */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-body">
            <h6 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Frequently asked questions</h6>
            {[
              ['How does Paysquad work?', 'You contribute first to start the squad. Share the link and others chip in their share. Once everyone has paid, the suite is booked.'],
              ['What if the squad doesn\'t reach the total?', 'No worries! If the squad expires before the total is met, all contributions are automatically refunded.'],
              ['Is my payment secure?', 'Yes. All payments are processed securely via Stripe. Paysquad never stores your card details.'],
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
    </PageContainer>
  )
}
