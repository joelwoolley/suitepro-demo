import { formatCurrency } from '../data/verticals'

function timeAgo(ms) {
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} minute${min === 1 ? '' : 's'} ago`
  return `${Math.floor(min / 60)} hour${Math.floor(min / 60) === 1 ? '' : 's'} ago`
}

export default function ContributorsList({ contributors = [], currency = 'NZD', startTime }) {
  return (
    <div className="card">
      <div className="card-body">
        <h6 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Your squad</h6>
        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          maxHeight: 180,
          overflowY: 'auto',
          gap: '0.4rem',
        }}>
          {contributors.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {c.isAnchor && <span>👑</span>}
                <span style={{ fontWeight: c.isAnchor ? 700 : 400 }}>{c.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6c757d', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#2C2D37' }}>{formatCurrency(c.amount, currency)}</span>
                <span>{startTime ? timeAgo(Date.now() - (startTime + (c.joinedAt || 0))) : 'just now'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
