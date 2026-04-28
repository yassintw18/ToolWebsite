import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import '../globals.css'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'common' })

  return {
    title: {
      default: t('appName'),
      template: `%s | ${t('appName')}`,
    },
    description: t('tagline'),
    generator: 'v0.app',
    keywords: ['developer tools', 'JSON formatter', 'unit converter', 'random number generator', 'privacy-first', 'multi-language'],
    authors: [{ name: 'GlobalUtils' }],
    openGraph: {
      title: t('appName'),
      description: t('tagline'),
      type: 'website',
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('appName'),
      description: t('tagline'),
    },
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className="bg-background">
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
