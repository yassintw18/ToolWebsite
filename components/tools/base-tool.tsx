/**
 * Base Tool Template
 * Use this template to create new tools for GlobalUtils
 *
 * Usage:
 * 1. Copy this file to components/your-new-tool.tsx
 * 2. Replace "YourNewTool" with your tool name
 * 3. Add translations to messages/*.json files
 * 4. Create page in app/[locale]/tools/your-new-tool/page.tsx
 */

"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

export function YourNewTool() {
  const t = useTranslations('tools.yourNewTool')
  const [inputValue, setInputValue] = React.useState('')
  const [result, setResult] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  // Main tool functionality
  const processInput = React.useCallback(() => {
    if (!inputValue.trim()) {
      setResult('')
      return
    }

    try {
      // Add your tool logic here
      const processedResult = inputValue // Replace with actual processing
      setResult(processedResult)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }, [inputValue])

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Clear all functionality
  const clearAll = () => {
    setInputValue('')
    setResult('')
    setCopied(false)
  }

  // Auto-process when input changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      processInput()
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue, processInput])

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input Panel */}
        <Card className="flex flex-col">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">{t('input')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3 pt-0">
            <textarea
              placeholder={t('inputPlaceholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-h-[300px] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:min-h-[400px]"
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={processInput} size="sm">
                {t('process')}
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
                {t('clear')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t('output')}</CardTitle>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="icon-sm"
                disabled={!result}
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 pt-0">
            <textarea
              value={result}
              readOnly
              placeholder={t('outputPlaceholder')}
              className="min-h-[300px] flex-1 resize-none rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none lg:min-h-[400px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// TypeScript interface for the tool props (if needed)
export interface YourNewToolProps {
  // Add props here if your tool needs any
  initialValue?: string
}

// Example tool metadata (for documentation)
export const toolMetadata = {
  id: 'your-new-tool',
  name: 'Your New Tool',
  description: 'Description of what this tool does',
  category: 'utility', // 'formatter', 'converter', 'generator', etc.
  icon: 'Settings', // Lucide icon name
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  useCases: [
    'Use case 1',
    'Use case 2'
  ]
}
