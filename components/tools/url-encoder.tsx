"use client"

import * as React from "react"
import { Copy, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'

export function UrlEncoder() {
  const t = useTranslations('tools.urlEncoder')
  const [encodeInput, setEncodeInput] = React.useState('')
  const [encodeOutput, setEncodeOutput] = React.useState('')
  const [decodeInput, setDecodeInput] = React.useState('')
  const [decodeOutput, setDecodeOutput] = React.useState('')
  const [copied, setCopied] = React.useState<'encode' | 'decode' | null>(null)

  // URL Encode
  const encodeUrl = React.useCallback(() => {
    if (!encodeInput) {
      setEncodeOutput('')
      return
    }
    try {
      const encoded = encodeURIComponent(encodeInput)
      setEncodeOutput(encoded)
    } catch (error) {
      setEncodeOutput(`Error: ${error instanceof Error ? error.message : 'Encoding failed'}`)
    }
  }, [encodeInput])

  // URL Decode
  const decodeUrl = React.useCallback(() => {
    if (!decodeInput) {
      setDecodeOutput('')
      return
    }
    try {
      const decoded = decodeURIComponent(decodeInput)
      setDecodeOutput(decoded)
    } catch (error) {
      setDecodeOutput(`Error: Invalid URL encoded string`)
    }
  }, [decodeInput])

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: 'encode' | 'decode') => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Auto-process on input change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      encodeUrl()
    }, 300)
    return () => clearTimeout(timer)
  }, [encodeInput, encodeUrl])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      decodeUrl()
    }, 300)
    return () => clearTimeout(timer)
  }, [decodeInput, decodeUrl])

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Globe className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">{t('encode')}</TabsTrigger>
          <TabsTrigger value="decode">{t('decode')}</TabsTrigger>
        </TabsList>

        {/* Encode Tab */}
        <TabsContent value="encode" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('input')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t('encodePlaceholder')}
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{t('output')}</CardTitle>
                  <Button
                    onClick={() => copyToClipboard(encodeOutput, 'encode')}
                    variant="ghost"
                    size="icon-sm"
                    disabled={!encodeOutput}
                  >
                    {copied === 'encode' ? (
                      <Check className="size-4 text-green-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={encodeOutput}
                  readOnly
                  placeholder={t('outputPlaceholder')}
                  className="min-h-[200px] resize-none bg-muted"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Decode Tab */}
        <TabsContent value="decode" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{t('input')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t('decodePlaceholder')}
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{t('output')}</CardTitle>
                  <Button
                    onClick={() => copyToClipboard(decodeOutput, 'decode')}
                    variant="ghost"
                    size="icon-sm"
                    disabled={!decodeOutput}
                  >
                    {copied === 'decode' ? (
                      <Check className="size-4 text-green-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={decodeOutput}
                  readOnly
                  placeholder={t('outputPlaceholder')}
                  className="min-h-[200px] resize-none bg-muted"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
