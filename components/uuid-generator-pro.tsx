"use client"

import * as React from "react"
import { Copy, Plus, Trash2, Check, Sparkles, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function UuidGenerator() {
  const [uuids, setUuids] = React.useState<string[]>([])
  const [copied, setCopied] = React.useState<number | null>(null)

  const generateUuid = React.useCallback(() => {
    const uuid = crypto.randomUUID()
    setUuids(prev => [uuid, ...prev].slice(0, 10)) // Keep last 10
  }, [])

  const generateMultiple = React.useCallback((count: number) => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID())
    setUuids(prev => [...newUuids, ...prev].slice(0, 10))
  }, [])

  const copyToClipboard = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = async () => {
    const allUuids = uuids.join('\n')
    await navigator.clipboard.writeText(allUuids)
    setCopied(-1) // Special value for "copy all"
    setTimeout(() => setCopied(null), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  const removeUuid = (index: number) => {
    setUuids(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              UUID Generator
            </h1>
            <p className="text-sm text-muted-foreground">Generate unique identifiers for your applications</p>
          </div>
        </div>
      </div>

      {/* Generate Buttons */}
      <Card className="shadow-lg border-2">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateUuid} size="lg" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Generate UUID
            </Button>
            <Button onClick={() => generateMultiple(5)} variant="secondary" size="lg" className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate 5
            </Button>
            <Button onClick={() => generateMultiple(10)} variant="secondary" size="lg" className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate 10
            </Button>
            {uuids.length > 0 && (
              <>
                <Button onClick={copyAll} variant="outline" size="lg">
                  {copied === -1 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied All!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </>
                  )}
                </Button>
                <Button onClick={clearAll} variant="outline" size="lg">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* UUID List */}
      {uuids.length > 0 && (
        <Card className="shadow-lg border-2">
          <CardContent className="p-6">
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={uuid}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg border-2 hover:border-purple-500 transition-all group"
                >
                  <div className="flex-1 font-mono text-sm break-all">{uuid}</div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(uuid, index)}
                      variant="ghost"
                      size="icon-sm"
                    >
                      {copied === index ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => removeUuid(index)}
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 border-2 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold">UUID v4</h4>
          </div>
          <p className="text-sm text-muted-foreground">Generate standard UUID v4 identifiers</p>
        </Card>
        <Card className="p-4 border-2 hover:border-pink-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <h4 className="font-semibold">Batch Generate</h4>
          </div>
          <p className="text-sm text-muted-foreground">Create multiple UUIDs at once</p>
        </Card>
        <Card className="p-4 border-2 hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Copy className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold">One-Click Copy</h4>
          </div>
          <p className="text-sm text-muted-foreground">Quickly copy UUIDs to clipboard</p>
        </Card>
      </div>
    </div>
  )
}
