"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, Wand2 } from "lucide-react"
import { useTranslations } from 'next-intl'

interface WhitespaceConverterProps {
  className?: string
}

// Zero-width characters
const ZERO_WIDTH_SPACE = '​'
const ZERO_WIDTH_NON_JOINER = '‌'
const ZERO_WIDTH_JOINER = '‍'
const ZERO_WIDTH_NO_BREAK_SPACE = '﻿'

export function WhitespaceConverter({ className }: WhitespaceConverterProps) {
  const t = useTranslations('tools.whitespaceConverter')
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<'spaces' | 'newlines' | 'both'>('spaces')

  const convertText = (text: string, conversionMode: 'spaces' | 'newlines' | 'both') => {
    let result = text

    if (conversionMode === 'spaces' || conversionMode === 'both') {
      // Replace spaces with zero-width spaces
      result = result.replace(/ /g, ZERO_WIDTH_SPACE)
    }

    if (conversionMode === 'newlines' || conversionMode === 'both') {
      // Replace newlines with zero-width characters
      result = result.replace(/\n/g, `\n${ZERO_WIDTH_NON_JOINER}`)
    }

    return result
  }

  const handleConvert = () => {
    const converted = convertText(input, mode)
    setOutput(converted)
  }

  const handleCopy = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output)
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
  }

  const handleSampleText = () => {
    const samples = {
      spaces: "Hello     World\nThis     has     multiple     spaces",
      newlines: "Line 1\n\n\n\nLine 2\n\nLine 3",
      both: "Hello     World\n\nLine 2\n\nThis     has     both"
    }
    setInput(samples[mode])
    handleConvert()
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="spaces">{t('modeSpaces')}</TabsTrigger>
              <TabsTrigger value="newlines">{t('modeNewlines')}</TabsTrigger>
              <TabsTrigger value="both">{t('modeBoth')}</TabsTrigger>
            </TabsList>

            <TabsContent value="spaces" className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">{t('spacesExplanation')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('spacesExample')}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="newlines" className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">{t('newlinesExplanation')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('newlinesExample')}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="both" className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">{t('bothExplanation')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('bothExample')}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="input-text">{t('inputText')}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSampleText}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  {t('sampleText')}
                </Button>
              </div>
              <Textarea
                id="input-text"
                placeholder={t('inputPlaceholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                className="font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleConvert}
                disabled={!input.trim()}
                className="flex-1"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {t('convert')}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                disabled={!input && !output}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('clear')}
              </Button>
            </div>

            {output && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="output-text">{t('outputText')}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t('copy')}
                  </Button>
                </div>
                <Textarea
                  id="output-text"
                  value={output}
                  readOnly
                  rows={6}
                  className="font-mono bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  {t('outputNote')}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-muted bg-muted/50 p-4">
            <h4 className="font-medium mb-2">{t('useCaseTitle')}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t('useCase1')}</li>
              <li>• {t('useCase2')}</li>
              <li>• {t('useCase3')}</li>
              <li>• {t('useCase4')}</li>
            </ul>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 p-4">
            <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
              {t('privacyNote')}
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {t('privacyNoteText')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
