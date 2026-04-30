"use client"

import * as React from "react"
import { Copy, Check, Palette, Eye, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface ColorValue {
  hex: string
  rgb: string
  hsl: string
}

export function ColorConverter() {
  const [hexInput, setHexInput] = React.useState("#3B82F6")
  const [rgbInput, setRgbInput] = React.useState("rgb(59, 130, 246)")
  const [hslInput, setHslInput] = React.useState("hsl(217, 91%, 60%)")
  const [copied, setCopied] = React.useState<string | null>(null)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join("")
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0

    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100

    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
    }

    return {
      r: f(0),
      g: f(8),
      b: f(4)
    }
  }

  const handleHexChange = (value: string) => {
    setHexInput(value)
    const rgb = hexToRgb(value)
    if (rgb) {
      const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b)
      setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      setHslInput(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
    }
  }

  const handleRgbChange = (value: string) => {
    setRgbInput(value)
    const match = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (match) {
      const r = parseInt(match[1])
      const g = parseInt(match[2])
      const b = parseInt(match[3])
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        const hexValue = rgbToHex(r, g, b)
        setHexInput(hexValue.toUpperCase())
        const hsl = rgbToHsl(r, g, b)
        setHslInput(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
      }
    }
  }

  const handleHslChange = (value: string) => {
    setHslInput(value)
    const match = value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (match) {
      const h = parseInt(match[1])
      const s = parseInt(match[2])
      const l = parseInt(match[3])
      const rgb = hslToRgb(h, s, l)
      const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b)
      setHexInput(hexValue.toUpperCase())
      setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
    }
  }

  const copyToClipboard = async (type: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const hexValue = rgbToHex(r, g, b).toUpperCase()
    setHexInput(hexValue)
    setRgbInput(`rgb(${r}, ${g}, ${b})`)
    const hsl = rgbToHsl(r, g, b)
    setHslInput(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
  }

  const currentColor = hexToRgb(hexInput)

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-orange-600 rounded-lg">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Color Converter
            </h1>
            <p className="text-sm text-muted-foreground">Convert colors between HEX, RGB, and HSL formats</p>
          </div>
        </div>
        <Button
          onClick={generateRandomColor}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Random Color
        </Button>
      </div>

      {/* Color Preview */}
      <Card className="shadow-lg border-2">
        <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950">
          <h3 className="font-semibold mb-3">Color Preview</h3>
        </div>
        <CardContent className="p-6">
          <div
            className="w-full h-40 rounded-xl border-4 shadow-inner transition-all duration-300"
            style={{ backgroundColor: hexInput }}
          />
          <div className="mt-4 text-center font-mono text-sm">
            {hexInput}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Inputs */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* HEX Input */}
        <Card className="shadow-lg border-2 hover:border-pink-500 transition-colors">
          <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950 dark:to-orange-950">
            <h3 className="font-semibold">HEX</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            <Input
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#3B82F6"
              className="font-mono text-lg"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard('hex', hexInput)}
                variant="outline"
                className="flex-1"
              >
                {copied === 'hex' ? (
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
            </div>
          </CardContent>
        </Card>

        {/* RGB Input */}
        <Card className="shadow-lg border-2 hover:border-blue-500 transition-colors">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <h3 className="font-semibold">RGB</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            <Input
              value={rgbInput}
              onChange={(e) => handleRgbChange(e.target.value)}
              placeholder="rgb(59, 130, 246)"
              className="font-mono text-sm"
            />
            <div className="text-xs text-muted-foreground">
              Format: rgb(r, g, b) - 0-255
            </div>
            <Button
              onClick={() => copyToClipboard('rgb', rgbInput)}
              variant="outline"
              className="w-full"
            >
              {copied === 'rgb' ? (
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
          </CardContent>
        </Card>

        {/* HSL Input */}
        <Card className="shadow-lg border-2 hover:border-green-500 transition-colors">
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <h3 className="font-semibold">HSL</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            <Input
              value={hslInput}
              onChange={(e) => handleHslChange(e.target.value)}
              placeholder="hsl(217, 91%, 60%)"
              className="font-mono text-sm"
            />
            <div className="text-xs text-muted-foreground">
              Format: hsl(h, s%, l%) - 0-360, 0-100, 0-100
            </div>
            <Button
              onClick={() => copyToClipboard('hsl', hslInput)}
              variant="outline"
              className="w-full"
            >
              {copied === 'hsl' ? (
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
          </CardContent>
        </Card>
      </div>

      {/* Quick Presets */}
      <Card className="shadow-lg border-2">
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <h3 className="font-semibold">Popular Colors</h3>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            {[
              '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
              '#10B981', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',
              '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#78716C'
            ].map((color) => (
              <button
                key={color}
                onClick={() => handleHexChange(color)}
                className="w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform shadow-md"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-2 hover:border-pink-500 transition-colors text-center">
          <Palette className="w-8 h-8 mx-auto mb-2 text-pink-600" />
          <h4 className="font-semibold text-sm">HEX</h4>
          <p className="text-xs text-muted-foreground">Web standard format</p>
        </Card>
        <Card className="p-4 border-2 hover:border-blue-500 transition-colors text-center">
          <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-semibold text-sm">RGB</h4>
          <p className="text-xs text-muted-foreground">Screen display</p>
        </Card>
        <Card className="p-4 border-2 hover:border-green-500 transition-colors text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-semibold text-sm">HSL</h4>
          <p className="text-xs text-muted-foreground">Design & art</p>
        </Card>
        <Card className="p-4 border-2 hover:border-orange-500 transition-colors text-center">
          <Copy className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <h4 className="font-semibold text-sm">Quick Copy</h4>
          <p className="text-xs text-muted-foreground">One-click copy</p>
        </Card>
      </div>
    </div>
  )
}
