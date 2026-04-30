"use client"

import { ColorConverter } from "@/components/color-converter-pro"

export default function EnglishColorConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-pink-900 dark:to-orange-900">
      <div className="container mx-auto py-8">
        <ColorConverter />
      </div>
    </div>
  )
}
