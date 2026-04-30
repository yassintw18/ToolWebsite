"use client"

import { UnitConverter } from "@/components/unit-converter-pro"

export default function EnglishUnitConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
      <div className="container mx-auto py-8">
        <UnitConverter />
      </div>
    </div>
  )
}
