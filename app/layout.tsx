import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

