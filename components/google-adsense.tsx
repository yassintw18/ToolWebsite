/**
 * Google AdSense Integration Component
 *
 * This component handles Google AdSense ad display and management.
 * It only displays ads when in production and when ADSENSE_ID is configured.
 */

"use client"

import { useEffect, useState } from 'react'
import { brandConfig } from '@/lib/brand'

interface AdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  className?: string
}

export function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = ""
}: AdSenseProps) {
  const [isReady, setIsReady] = useState(false)
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    // Only load AdSense in production
    if (process.env.NODE_ENV === 'production' && adSenseId) {
      setIsReady(true)

      // Load AdSense script
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`
      script.async = true
      script.crossOrigin = "anonymous"

      script.onload = () => {
        // Push ads when script is loaded
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (error) {
          console.error('AdSense error:', error)
        }
      }

      document.head.appendChild(script)

      return () => {
        // Cleanup script on unmount
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [adSenseId])

  // Don't render anything in development or if ADSENSE_ID is not set
  if (process.env.NODE_ENV !== 'production' || !adSenseId) {
    return null
  }

  if (!isReady) {
    return null
  }

  return (
    <div className={`google-adsense ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={adSenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// Ad Unit Configuration
export const adUnits = {
  'top-banner': '1234567890', // Replace with actual AdSense ad slot ID
  'bottom-banner': '0987654321', // Replace with actual AdSense ad slot ID
  'sidebar': '1122334455', // Replace with actual AdSense ad slot ID
  'in-article': '5566778899', // Replace with actual AdSense ad slot ID
}

// AdSense Layout Component for different positions
export function AdSenseLayout() {
  return (
    <>
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center my-4">
        <GoogleAdSense
          adSlot={adUnits['top-banner']}
          adFormat="horizontal"
          className="max-w-4xl"
        />
      </div>

      {/* Content can go here */}

      {/* Bottom Banner Ad */}
      <div className="w-full flex justify-center my-4">
        <GoogleAdSense
          adSlot={adUnits['bottom-banner']}
          adFormat="horizontal"
          className="max-w-4xl"
        />
      </div>
    </>
  )
}

// AdSense Initialization Script (for app/layout.tsx)
export function AdSenseScript() {
  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  if (process.env.NODE_ENV !== 'production' || !adSenseId) {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
      crossOrigin="anonymous"
    />
  )
}
