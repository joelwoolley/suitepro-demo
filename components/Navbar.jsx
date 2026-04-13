'use client'

export default function Navbar({ merchantLogoText, onRestart }) {
  return (
    <nav style={{ background: '#111', borderBottom: '1px solid #222' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/suitepro-demo/logos/logo-color.svg" alt="Paysquad" style={{ height: 24, width: 'auto', display: 'block' }} />
          {merchantLogoText && (
            <>
              <span style={{ color: '#dee2e6', fontWeight: 300 }}>|</span>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', color: '#fff' }}>
                {merchantLogoText}
              </span>
            </>
          )}
        </div>
        <button
          onClick={onRestart}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d', fontSize: '0.85rem' }}
        >
          Start over
        </button>
      </div>
    </nav>
  )
}
