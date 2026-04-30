"use client"

import { UuidGenerator } from "@/components/uuid-generator-pro"

export default function EnglishUuidGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="container mx-auto py-8">
        <UuidGenerator />
      </div>
    </div>
  )
}
