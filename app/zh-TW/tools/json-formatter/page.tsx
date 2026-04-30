"use client"

import { JsonFormatter } from "@/components/json-formatter-pro"

export default function ChineseJsonFormatterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto py-8">
        <JsonFormatter />
      </div>
    </div>
  )
}
