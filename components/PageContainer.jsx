import Navbar from './Navbar'
import Footer from './Footer'

export default function PageContainer({ children, merchantLogoText, showBanner = true, onRestart, large = false, plain = false }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: plain ? '#111' : '#0d0d0d' }}>
      {/* Merchant framing banner */}
      {showBanner && (
        <div style={{ background: '#080808', color: '#adb5bd', textAlign: 'center', padding: '0.5rem 1rem', fontSize: '0.85rem', borderBottom: '1px solid #222' }}>
          You&apos;re seeing the fan experience. Your customers see exactly this.
        </div>
      )}

      <Navbar merchantLogoText={merchantLogoText} onRestart={onRestart} showGetStarted={showGetStarted} />

      <main style={{ flex: 1, padding: '1.25rem', maxWidth: large ? 900 : 540, margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
