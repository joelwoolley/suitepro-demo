import { formatCurrency } from '../data/verticals'

export default function CartCard({ vertical }) {
  if (!vertical) return null
  return (
    <div className="card" style={{ marginBottom: '0.75rem' }}>
      <div className="card-body">
        {/* Merchant logo / name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{
            background: '#1a1a2e',
            color: '#c9a84c',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            padding: '0.25rem 0.5rem',
            borderRadius: 6,
          }}>
            {vertical.merchant.logoText}
          </span>
        </div>

        <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#6c757d', marginBottom: '0.5rem' }}>What you&apos;re getting</p>

        {/* Product row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: 64,
            height: 64,
            background: '#1a1a2e',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            flexShrink: 0,
          }}>
            {vertical.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{vertical.product}</div>
            <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>{vertical.productSubtitle}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontWeight: 700, marginBottom: '0.5rem' }}>{formatCurrency(vertical.total, vertical.currency)}</div>

        <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '0.5rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>Total</span>
          <span>{formatCurrency(vertical.total, vertical.currency)}</span>
        </div>
      </div>
    </div>
  )
}
