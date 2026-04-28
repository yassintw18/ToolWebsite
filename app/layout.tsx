import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GlobalUtils Test',
  description: 'Test page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

