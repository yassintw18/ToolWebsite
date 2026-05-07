"use client"

import * as React from "react"
import { Copy, Check, Sparkles, RefreshCw, BarChart3 } from "lucide-react"
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
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Friendly Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-900">{t('title')}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Random Number Generator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Generate random numbers with customizable range and quantity. Perfect for games, statistics, and more.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Settings Panel */}
        <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl">
          <CardHeader className="py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
            <CardTitle className="text-base font-semibold text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min" className="text-sm font-medium text-slate-700">Minimum</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="1"
                  className="rounded-xl border-2 border-slate-200 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max" className="text-sm font-medium text-slate-700">Maximum</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="100"
                  className="rounded-xl border-2 border-slate-200 focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="count" className="text-sm font-medium text-slate-700">
                  Count: <span className="text-emerald-600 font-semibold">{count[0]}</span>
                </Label>
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
              <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                Generate <span className="font-semibold text-emerald-600">{count[0]}</span> random number{count[0] !== 1 ? 's' : ''} between <span className="font-semibold">{min}</span> and <span className="font-semibold">{max}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={generateNumbers}
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-4 h-4" />
                    {t('generate')}
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                disabled={results.length === 0}
                className="rounded-xl border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t('result')}
              </CardTitle>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="default"
                disabled={results.length === 0}
                className="rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" />
                    {t('copy')}
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {results.length === 0 ? (
              <div className="flex min-h-[350px] items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Click generate to create random numbers</p>
                </div>
              </div>
            ) : (
              <div className="max-h-[350px] overflow-y-auto">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {results.map((num, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 px-3 py-3 text-center hover:shadow-md hover:scale-105 transition-all duration-200"
                    >
                      <span className="font-mono text-sm font-bold text-blue-900">{num}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-4">
                  <p className="text-xs text-blue-700 font-medium mb-2">Comma-separated:</p>
                  <p className="font-mono text-sm text-blue-900 break-all leading-relaxed">{results.join(', ')}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      {results.length > 0 && (
        <Card className="border-2 border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
            <CardTitle className="text-base font-semibold text-violet-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-700 font-medium mb-1">Sum</p>
                <p className="text-2xl font-bold text-blue-900">{results.reduce((a, b) => a + b, 0)}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-700 font-medium mb-1">Average</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                <p className="text-xs text-violet-700 font-medium mb-1">Min Value</p>
                <p className="text-2xl font-bold text-violet-900">{Math.min(...results)}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                <p className="text-xs text-amber-700 font-medium mb-1">Max Value</p>
                <p className="text-2xl font-bold text-amber-900">{Math.max(...results)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900 mb-1">Random Number Generator</h3>
            <p className="text-sm text-emerald-800 leading-relaxed">
              Generate random numbers within any range. Perfect for games, statistical sampling, lottery drawings, or any situation where you need truly random numbers. All generation happens locally in your browser with cryptographic randomness for security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
