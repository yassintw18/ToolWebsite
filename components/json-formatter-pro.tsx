"use client"

import * as React from "react"
import { Copy, Download, Eraser, FileJson, Check, AlertCircle, Wand2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function JsonFormatter() {
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

  const loadSample = () => {
    const sample = {
      "project": "GlobalUtils",
      "version": "1.0.0",
      "tools": ["JSON Formatter", "Unit Converter", "UUID Generator"],
      "features": {
        "privacy": true,
        "offline": true,
        "opensource": true
      },
      "stats": {
        "users": 10000,
        "countries": ["US", "TW", "JP", "UK"]
      }
    }
    setInput(JSON.stringify(sample))
    setOutput("")
    setError(null)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <FileJson className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JSON Formatter & Validator
            </h1>
            <p className="text-sm text-muted-foreground">Format, validate, and beautify your JSON data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={loadSample} variant="outline" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Load Sample
          </Button>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Minified</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Panel */}
        <Card className="shadow-lg border-2 hover:border-blue-500 transition-colors">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-blue-600" />
                Input JSON
              </h3>
              <span className="text-xs text-muted-foreground">{input.length} characters</span>
            </div>
          </div>
          <CardContent className="p-4 space-y-4">
            <Textarea
              placeholder='Paste your JSON here or click "Load Sample" to try...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`min-h-[350px] font-mono text-sm resize-none ${
                error ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={formatJson} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Wand2 className="w-4 h-4 mr-2" />
                Format
              </Button>
              <Button onClick={minifyJson} variant="secondary" className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Minify
              </Button>
              <Button onClick={clearAll} variant="outline">
                <Eraser className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="shadow-lg border-2 hover:border-green-500 transition-colors">
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Output
              </h3>
              <div className="flex gap-1">
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="icon-sm"
                  disabled={!output}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={downloadJson}
                  variant="ghost"
                  size="icon-sm"
                  disabled={!output}
                  title="Download JSON"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            {error ? (
              <div className="flex min-h-[350px] items-center justify-center rounded-lg border-2 border-destructive/50 bg-destructive/5">
                <div className="flex flex-col items-center gap-3 p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                  <div>
                    <p className="font-semibold text-destructive">Invalid JSON</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="min-h-[350px] font-mono text-sm resize-none"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 border-2 hover:border-blue-500 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Check className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold">Validate</h4>
      </div>
      <p className="text-sm text-muted-foreground">Check JSON syntax and find errors instantly</p>
    </Card>
    <Card className="p-4 border-2 hover:border-purple-500 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Wand2 className="w-5 h-5 text-purple-600" />
        <h4 className="font-semibold">Format</h4>
      </div>
      <p className="text-sm text-muted-foreground">Beautify JSON with custom indentation</p>
    </Card>
    <Card className="p-4 border-2 hover:border-pink-500 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-pink-600" />
        <h4 className="font-semibold">Minify</h4>
      </div>
      <p className="text-sm text-muted-foreground">Compress JSON to reduce file size</p>
    </Card>
      </div>
    </div>
  )
}
