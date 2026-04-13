export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div style={{ background: '#080808', borderTop: '1px solid #222', padding: '1.5rem 1.25rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ color: '#adb5bd', fontSize: '0.9rem' }}>Powered by</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/suitepro-demo/logos/logo-text-light.svg" alt="Paysquad" style={{ height: 16, width: 'auto', display: 'block' }} />
        <span style={{ color: '#adb5bd', fontSize: '0.9rem' }}>and</span>
        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>SuitePro</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <a href="https://paysquad.co" target="_blank" rel="noreferrer" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '0.9rem' }}>Paysquad.co</a>
        <a href="https://www.suitepro.com" target="_blank" rel="noreferrer" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '0.9rem' }}>SuitePro.com</a>
        <a href="https://www.paysquad.co/privacy" target="_blank" rel="noreferrer" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
      </div>
      <div style={{ color: '#6c757d', fontSize: '0.85rem' }}>&copy; {year}</div>
    </div>
  )
}
