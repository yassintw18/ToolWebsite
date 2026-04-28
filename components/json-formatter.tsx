"use client"

import * as React from "react"
import { Copy, Download, Eraser, FileJson, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

export function JsonFormatter() {
  const t = useTranslations('tools.jsonFormatter')
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [indentSize, setIndentSize] = React.useState(2)

  const formatJson = React.useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      setError(null)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
      setOutput("")
    }
  }, [input, indentSize])

  const minifyJson = React.useCallback(() => {
    if (!input.trim()) {
      setOutput("")
      setError(null)
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
      setOutput("")
    }
  }, [input])

  const copyToClipboard = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJson = () => {
    if (!output) return
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="size-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="indent" className="text-sm text-muted-foreground">
            {t('format')}:
          </label>
          <select
            id="indent"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>Tab</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input Panel */}
        <Card className="flex flex-col">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">{t('input')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3 pt-0">
            <Textarea
              placeholder={t('input')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "min-h-[300px] flex-1 resize-none font-mono text-sm lg:min-h-[400px]",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={formatJson} size="sm">
                {t('format')}
              </Button>
              <Button onClick={minifyJson} variant="secondary" size="sm">
                {t('minify')}
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
                <Eraser className="mr-1 size-3" />
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
              <div className="flex gap-1">
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="icon-sm"
                  disabled={!output}
                  title={t('copy')}
                >
                  {copied ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
                <Button
                  onClick={downloadJson}
                  variant="ghost"
                  size="icon-sm"
                  disabled={!output}
                  title="Download JSON"
                >
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col pt-0">
            {error ? (
              <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-md border border-destructive/50 bg-destructive/5 lg:min-h-[400px]">
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <AlertCircle className="size-8 text-destructive" />
                  <p className="text-sm font-medium text-destructive">{t('invalid')}</p>
                  <p className="max-w-sm text-xs text-muted-foreground">{error}</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={output}
                readOnly
                placeholder={t('output')}
                className="min-h-[300px] flex-1 resize-none font-mono text-sm lg:min-h-[400px]"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
