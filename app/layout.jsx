import './globals.css'

export const metadata = {
  title: 'SuitePro x Paysquad | Split a Suite Demo',
  description: 'See how Paysquad lets fans split premium suites and corporate boxes. Interactive demo for SuitePro venues.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/suitepro-demo/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/suitepro-demo/apple-touch-icon.png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
