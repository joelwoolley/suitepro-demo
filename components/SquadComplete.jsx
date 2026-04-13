'use client'
import PageContainer from './PageContainer'

export default function SquadComplete({ vertical, anchorAmount, onRestart }) {
  const totalCustomers = vertical.contributors.length

  return (
    <PageContainer merchantLogoText={null} onRestart={onRestart} showBanner={false} showGetStarted={true}>
      <div style={{ paddingBottom: '3rem' }}>

        {/* Pivot heading */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏟️</div>
          <h2 style={{ fontWeight: 700, fontSize: '1.6rem', marginBottom: '0.5rem', lineHeight: 1.25, color: '#fff' }}>
            That&apos;s what fans will see.
          </h2>
          <p style={{ color: '#adb5bd', fontSize: '1rem', maxWidth: 420, margin: '0 auto' }}>
            Every Paysquad fills your premium inventory and introduces your brand to new fans.
          </p>
        </div>

        {/* Customer acquisition stat */}
        <div className="card" style={{ marginBottom: '1rem', border: '1px solid #f5e6c8', boxShadow: '0 4px 24px rgba(201,168,76,0.1)' }}>
          <div className="card-body" style={{ padding: '1.5rem' }}>
            <style>{`
              .stat-row { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
              .stat-connector { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
              @media (min-width: 480px) {
                .stat-row { flex-direction: row; justify-content: center; gap: 1rem; }
              }
            `}</style>
            <div className="stat-row">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>You started with</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#6c757d' }}>1 fan</div>
              </div>
              <div className="stat-connector">
                <img src="/suitepro-demo/logos/logo-color.svg" alt="Paysquad" style={{ height: 20, width: 'auto' }} />
                <svg className="stat-arrow" style={{ width: 28, height: 28, color: '#c9a84c' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#37b34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>You ended up with</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0d1117' }}>{totalCustomers} fans</div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6c757d', margin: '1rem 0 0' }}>
              Every contributor pays, experiences your brand, and becomes a fan you can reach again.
            </p>
          </div>
        </div>

        {/* Value props */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                icon: 'users',
                title: 'Fill premium inventory with group bookings',
                body: 'Suites are social by nature. Let fans organise their own groups and fill seats that might otherwise go unsold.',
              },
              {
                icon: 'user-plus',
                title: 'Reach new fans you\'d never have found',
                body: 'Contributors are brought to you by someone who already loves your venue. Every group sale is organic acquisition.',
              },
              {
                icon: 'zap',
                title: 'Seamless integration with your checkout',
                body: 'Works alongside your existing payment methods. We handle payments, coordination, and reminders.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: '#fdf6e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg className="feather" style={{ color: '#c9a84c' }}><use href={`/feather-sprite.svg#${icon}`} /></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6c757d', lineHeight: 1.5 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card" style={{ border: '1px solid #f5e6c8', boxShadow: '0 4px 24px rgba(201,168,76,0.12)' }}>
          <div className="card-body" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Ready to add Paysquad to your suites?</h4>
            <p style={{ color: '#6c757d', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Let fans split premium experiences. Fill more suites. Reach more people.
            </p>
            <a
              href="https://www.paysquad.co/get-started"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem', textDecoration: 'none', marginBottom: '0.65rem' }}
            >
              Add Paysquad to your suites
              <svg className="feather" style={{ marginLeft: '0.4rem' }}><use href="/suitepro-demo/feather-sprite.svg#arrow-right" /></svg>
            </a>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <a
                href="https://calendar.app.google/pxEKNRkmyBpQYxZLA"
                target="_blank"
                rel="noreferrer"
                className="btn btn-muted"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                <svg className="feather" style={{ marginRight: '0.4rem' }}><use href="/suitepro-demo/feather-sprite.svg#calendar" /></svg>
                Book a Call
              </a>
              <button className="btn btn-muted" onClick={onRestart} style={{ flex: 1, fontSize: '0.9rem' }}>
                Start again
              </button>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  )
}
