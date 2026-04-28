// Brand Configuration for GlobalUtils
// Modify these values to customize your brand

export const brandConfig = {
  // Site Information
  siteName: 'GlobalUtils',
  siteTagline: 'Privacy-First Multi-Language Utility Toolbox',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Brand Colors
  colors: {
    primary: '#3B82F6',     // Main brand color (Blue)
    secondary: '#8B5CF6',   // Secondary brand color (Purple)
    accent: '#10B981',      // Accent color (Green)
    success: '#22C55E',     // Success messages
    warning: '#F59E0B',     // Warning messages
    error: '#EF4444',       // Error messages
  },

  // SEO & Social
  seo: {
    title: 'GlobalUtils - Privacy-First Developer Tools',
    description: 'Free online developer tools including JSON formatter, unit converters, and random number generators. No data storage, completely private.',
    keywords: ['developer tools', 'JSON formatter', 'unit converter', 'random numbers', 'privacy tools', 'online utilities'],
    author: 'GlobalUtils Team',
  },

  // Social Media Links
  social: {
    github: 'https://github.com/your-username/globalutils',
    twitter: 'https://twitter.com/globalutils',
    discord: 'https://discord.gg/globalutils',
  },

  // Analytics & Ads
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
    googleAdSenseId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',
  },

  // Feature Flags
  features: {
    enableAds: !!process.env.NEXT_PUBLIC_ADSENSE_ID,
    enableAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
    enableDarkMode: true,
    enableLanguageSwitcher: true,
  },

  // Supported Locales
  locales: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ],

  // Footer Information
  footer: {
    copyright: `© ${new Date().getFullYear()} GlobalUtils. All rights reserved.`,
    privacyPolicy: '/privacy',
    termsOfService: '/terms',
    contactEmail: 'contact@globalutils.com',
  },
}

// Type-safe export
export type BrandConfig = typeof brandConfig
