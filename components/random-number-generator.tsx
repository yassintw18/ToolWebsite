"use client"

import * as React from "react"
import { Copy, Check, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from 'next-intl'

export function RandomNumberGenerator() {
  const t = useTranslations('tools.randomNumber')
  const [min, setMin] = React.useState('1')
  const [max, setMax] = React.useState('100')
  const [count, setCount] = React.useState([1])
  const [results, setResults] = React.useState<number[]>([])
  const [copied, setCopied] = React.useState(false)
  const [isGenerating, setIsGenerating] = React.useState(false)

  const generateNumbers = React.useCallback(() => {
    const minVal = parseInt(min)
    const maxVal = parseInt(max)
    const countVal = count[0]

    if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
      return
    }

    setIsGenerating(true)

    // Add a small animation effect
    setTimeout(() => {
      const newResults: number[] = []
      for (let i = 0; i < countVal; i++) {
        const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
        newResults.push(randomNum)
      }
      setResults(newResults)
      setIsGenerating(false)
    }, 300)
  }, [min, max, count])

  const copyToClipboard = async () => {
    if (results.length === 0) return
    const textToCopy = results.join(', ')
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setResults([])
    setCopied(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min">{t('min')}</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max">{t('max')}</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="count">{t('count')}: {count[0]}</Label>
              </div>
              <Slider
                id="count"
                min={1}
                max={100}
                step={1}
                value={count}
                onValueChange={setCount}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Generate {count[0]} random number{count[0] !== 1 ? 's' : ''} between {min} and {max}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={generateNumbers}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    {t('generate')}
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                disabled={results.length === 0}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t('result')}</CardTitle>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                disabled={results.length === 0}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 size-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 size-4" />
                    {t('copy')}
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 size-8 opacity-50" />
                  <p className="text-sm">Click generate to create random numbers</p>
                </div>
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                <div className="grid grid-cols-5 gap-2">
                  {results.map((num, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-lg border bg-muted px-3 py-2 text-center"
                    >
                      <span className="font-mono text-sm font-semibold">{num}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Comma-separated:</p>
                  <p className="font-mono text-xs break-all">{results.join(', ')}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Sum</p>
                <p className="text-lg font-semibold">{results.reduce((a, b) => a + b, 0)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-lg font-semibold">
                  {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Min Value</p>
                <p className="text-lg font-semibold">{Math.min(...results)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Max Value</p>
                <p className="text-lg font-semibold">{Math.max(...results)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
