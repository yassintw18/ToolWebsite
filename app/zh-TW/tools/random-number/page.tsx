"use client"

import { RandomNumberGenerator } from "@/components/random-number-generator-pro"

export default function ChineseRandomNumberPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <div className="container mx-auto py-8">
        <RandomNumberGenerator />
      </div>
    </div>
  )
}
