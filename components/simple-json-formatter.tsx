"use client"

import * as React from "react"
import { Copy, Eraser, FileJson, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SimpleJsonFormatter() {
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

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            JSON Formatter & Validator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={formatJson} variant="default">
              Format
            </Button>
            <Button onClick={minifyJson} variant="outline">
              Minify
            </Button>
            <Button onClick={clearAll} variant="outline">
              <Eraser className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm">Indent:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input JSON:</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Output:</label>
                {output && (
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                    className="h-8"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="min-h-[300px] border rounded p-3 font-mono text-sm bg-muted/30 overflow-auto">
                {error ? (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap break-all">{output || "Formatted output will appear here..."}</pre>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
