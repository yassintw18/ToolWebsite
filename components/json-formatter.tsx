"use client"

import * as React from "react"
import { Copy, Download, Eraser, FileJson, Check, AlertCircle, Sparkles } from "lucide-react"
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
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Friendly Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
          <FileJson className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">{t('title')}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          JSON Formatter
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Beautiful, valid JSON in seconds. Paste your JSON and we'll make it perfect.
        </p>
      </div>

      {/* Settings Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Indent Size:</span>
          </div>
          <div className="flex gap-2">
            {[2, 4].map((size) => (
              <button
                key={size}
                onClick={() => setIndentSize(size)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  indentSize === size
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {size} spaces
              </button>
            ))}
            <button
              onClick={() => setIndentSize(1)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                indentSize === 1
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Tab
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Panel */}
        <Card className="flex flex-col border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
              <FileJson className="w-5 h-5" />
              {t('input')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 p-4">
            <Textarea
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "min-h-[350px] flex-1 resize-none font-mono text-sm lg:min-h-[450px] rounded-xl border-2",
                error ? "border-red-300 focus:border-red-400 focus:ring-red-400" : "border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              )}
            />
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={formatJson}
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t('format')}
              </Button>
              <Button
                onClick={minifyJson}
                variant="secondary"
                size="lg"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200"
              >
                {t('minify')}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                <Eraser className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-emerald-900 flex items-center gap-2">
                <FileJson className="w-5 h-5" />
                {t('output')}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="icon"
                  disabled={!output}
                  title={t('copy')}
                  className="rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  onClick={downloadJson}
                  variant="ghost"
                  size="icon"
                  disabled={!output}
                  title="Download JSON"
                  className="rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-4">
            {error ? (
              <div className="flex min-h-[350px] flex-1 items-center justify-center rounded-xl border-2 border-red-200 bg-red-50 lg:min-h-[450px]">
                <div className="flex flex-col items-center gap-3 p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                  <p className="text-lg font-semibold text-red-900">{t('invalid')}</p>
                  <p className="max-w-sm text-sm text-red-700 leading-relaxed">{error}</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={output}
                readOnly
                placeholder="Your formatted JSON will appear here..."
                className="min-h-[350px] flex-1 resize-none font-mono text-sm lg:min-h-[450px] rounded-xl border-2 border-slate-200 bg-slate-50"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <FileJson className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">What can this tool do?</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              This JSON formatter can validate, beautify, and minify your JSON data. It supports different indentation sizes and helps you spot syntax errors instantly. Perfect for developers working with APIs, configuration files, or data exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
