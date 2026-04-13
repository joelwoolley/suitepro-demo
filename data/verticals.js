export const VERTICAL = {
  id: 'suites',
  label: 'Suites',
  merchant: { name: 'LAFC Suites', logoText: 'LAFC SUITES' },
  product: 'Founders Suite — LAFC vs San Jose Earthquakes',
  productSubtitle: 'Sun, Apr 19 · 4:00pm · BMO Stadium · Up to 20 guests',
  emoji: '🏟️',
  total: 1300,
  currency: 'USD',
  shareSlug: 'lafc-founders',
  defaultSquadName: 'LAFC Game Day',
  pricePerTicket: 325,
  ticketCount: 4,
  duration: '24 Hours',
  contributors: [
    { name: 'You',    amount: 325, isAnchor: true },
    { name: 'Marcus', amount: 325, isAnchor: false, delay: 2000 },
    { name: 'Priya',  amount: 325, isAnchor: false, delay: 4000 },
    { name: 'Jake',   amount: 325, isAnchor: false, delay: 6000 },
  ],
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
