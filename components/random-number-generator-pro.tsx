"use client"

import * as React from "react"
import { Copy, Check, Sparkles, RefreshCw, TrendingUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function RandomNumberGenerator() {
  const [min, setMin] = React.useState('1')
  const [max, setMax] = React.useState('100')
  const [count, setCount] = React.useState([1])
  const [results, setResults] = React.useState<number[]>([])
  const [copied, setCopied] = React.useState(false)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [stats, setStats] = React.useState({ min: 0, max: 0, avg: 0, sum: 0 })

  const generateNumbers = React.useCallback(() => {
    const minVal = parseInt(min)
    const maxVal = parseInt(max)
    const countVal = count[0]

    if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const newResults: number[] = []
      for (let i = 0; i < countVal; i++) {
        const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
        newResults.push(randomNum)
      }
      setResults(newResults)

      // Calculate statistics
      const statsMin = Math.min(...newResults)
      const statsMax = Math.max(...newResults)
      const statsSum = newResults.reduce((a, b) => a + b, 0)
      const statsAvg = statsSum / newResults.length
      setStats({ min: statsMin, max: statsMax, avg: statsAvg, sum: statsSum })

      setIsGenerating(false)
    }, 500)
  }, [min, max, count])

  const copyToClipboard = async () => {
    if (results.length === 0) return
    const textToCopy = results.join(', ')
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadResults = () => {
    if (results.length === 0) return
    const text = results.join('\n')
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "random-numbers.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearResults = () => {
    setResults([])
    setStats({ min: 0, max: 0, avg: 0, sum: 0 })
  }

  const quickGenerate = (quickMin: number, quickMax: number) => {
    setMin(quickMin.toString())
    setMax(quickMax.toString())
    setCount([1])
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * (quickMax - quickMin + 1)) + quickMin
      setResults([randomNum])
      setStats({ min: randomNum, max: randomNum, avg: randomNum, sum: randomNum })
    }, 200)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Random Number Generator
            </h1>
            <p className="text-sm text-muted-foreground">Generate random numbers within custom ranges</p>
          </div>
        </div>
        <Button
          onClick={generateNumbers}
          disabled={isGenerating}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Numbers
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings */}
        <Card className="shadow-lg border-2">
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <h3 className="font-semibold">Settings</h3>
          </div>
          <CardContent className="p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="min">Minimum Value</Label>
              <Input
                id="min"
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Count: {count[0]}</Label>
              <Slider
                id="count"
                min={1}
                max={100}
                step={1}
                value={count}
                onValueChange={setCount}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => quickGenerate(1, 10)} variant="outline" size="sm">
                  1-10
                </Button>
                <Button onClick={() => quickGenerate(1, 100)} variant="outline" size="sm">
                  1-100
                </Button>
                <Button onClick={() => quickGenerate(1, 1000)} variant="outline" size="sm">
                  1-1K
                </Button>
                <Button onClick={() => quickGenerate(1, 6)} variant="outline" size="sm">
                  Dice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-lg border-2 lg:col-span-2">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Results</h3>
              <div className="flex gap-2">
                {results.length > 0 && (
                  <>
                    <Button onClick={copyToClipboard} variant="ghost" size="sm">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button onClick={downloadResults} variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button onClick={clearResults} variant="ghost" size="sm">
                      Clear
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            {results.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center text-center text-muted-foreground">
                <div className="space-y-2">
                  <Sparkles className="w-12 h-12 mx-auto opacity-50" />
                  <p>Click "Generate Numbers" to create random numbers</p>
                  <p className="text-sm">Choose your range and count, then generate</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {results.map((num, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg border-2 border-blue-500 font-mono text-lg font-semibold"
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {results.length > 1 && (
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Statistics
                      </h4>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Min</p>
                          <p className="text-xl font-bold text-green-600">{stats.min}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Max</p>
                          <p className="text-xl font-bold text-blue-600">{stats.max}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average</p>
                          <p className="text-xl font-bold text-purple-600">{stats.avg.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Sum</p>
                          <p className="text-xl font-bold text-pink-600">{stats.sum}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-2 hover:border-green-500 transition-colors text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-semibold text-sm">Custom Range</h4>
        </Card>
        <Card className="p-4 border-2 hover:border-blue-500 transition-colors text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-semibold text-sm">Batch Generate</h4>
        </Card>
        <Card className="p-4 border-2 hover:border-purple-500 transition-colors text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <h4 className="font-semibold text-sm">Statistics</h4>
        </Card>
        <Card className="p-4 border-2 hover:border-pink-500 transition-colors text-center">
          <Copy className="w-8 h-8 mx-auto mb-2 text-pink-600" />
          <h4 className="font-semibold text-sm">Easy Copy</h4>
        </Card>
      </div>
    </div>
  )
}
