'use client'
import { useState } from 'react'
import { formatCurrency } from '../data/verticals'

export default function MerchantCheckout({ vertical, onAdvance }) {
  const [loading, setLoading] = useState(false)

  const handlePaysquad = () => {
    setLoading(true)
    setTimeout(() => onAdvance(), 350)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', padding: '1.5rem 1.25rem' }}>
      {/* SuitePro-style nav */}
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.08em', color: '#fff' }}>
            {vertical.merchant.logoText}
          </span>
          <span style={{ color: '#adb5bd', fontSize: '0.85rem' }}>Secure Checkout</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: 680, margin: '0 auto' }}>
          <style>{`@media(min-width:640px){.checkout-grid{grid-template-columns:1fr 1fr !important}}`}</style>
          <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

            {/* Suite summary */}
            <div className="card">
              <div className="card-body">
                <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#6c757d', marginBottom: '0.75rem' }}>Suite Booking</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 72, height: 72,
                    background: '#1a1a2e',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.2rem', flexShrink: 0,
                  }}>
                    {vertical.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{vertical.product}</div>
                    <div style={{ color: '#6c757d', fontSize: '0.85rem' }}>{vertical.productSubtitle}</div>
                  </div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#6c757d' }}>
                  <span>Service fee</span>
                  <span>Included</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#6c757d' }}>
                  <span>Catering &amp; parking</span>
                  <span>Included</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem' }}>
                  <span>Total</span>
                  <span>{formatCurrency(vertical.total, vertical.currency)}</span>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="card">
              <div className="card-body">
                <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#6c757d', marginBottom: '0.75rem' }}>Pay with</p>

                {['Credit / Debit Card', 'PayPal', 'Klarna'].map((method) => (
                  <div
                    key={method}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: '2px solid #e8e8e8', borderRadius: 8, padding: '0.65rem 0.85rem',
                      marginBottom: '0.5rem', opacity: 0.45, cursor: 'not-allowed',
                      background: '#fafafa',
                    }}
                  >
                    <span style={{ fontWeight: 500, color: '#6c757d', fontSize: '0.95rem' }}>{method}</span>
                  </div>
                ))}
                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    className={`btn btn-primary${loading ? ' btn-loading' : ''}`}
                    onClick={handlePaysquad}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem' }}
                  >
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/suitepro-demo/logos/logo-color.svg" alt="" width={32} style={{ filter: 'brightness(10)' }} />
                        Split with Paysquad
                      </>
                    )}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#adb5bd', marginTop: '0.5rem' }}>
                    Split this suite with friends. Powered by Paysquad.
                  </p>
                </div>

                <div style={{ marginTop: '1rem', padding: '0.6rem', background: '#f8f9fa', borderRadius: 6, display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                  <svg className="feather" style={{ width: '0.85em', height: '0.85em', color: '#6c757d' }}><use href="/suitepro-demo/feather-sprite.svg#lock" /></svg>
                  <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>Secure checkout · 256-bit SSL</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
