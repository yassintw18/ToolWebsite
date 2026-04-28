/**
 * Color Converter Tool
 * Convert between different color formats: HEX, RGB, HSL, CMYK
 * Privacy-first: All conversion happens locally in your browser
 */

"use client"

import * as React from "react"
import { Palette, Copy, Check, Eye, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from 'next-intl'

interface ColorState {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  cmyk: { c: number; m: number; y: number; k: number }
}

export function ColorConverter() {
  const t = useTranslations('tools.colorConverter')

  const [color, setColor] = React.useState<ColorState>({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    cmyk: { c: 76, m: 47, y: 0, k: 4 }
  })

  const [copied, setCopied] = React.useState<string | null>(null)

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    const c = 1 - (r / 255)
    const m = 1 - (g / 255)
    const y = 1 - (b / 255)
    const k = Math.min(c, Math.min(m, y))

    return {
      c: Math.round((c - k) / (1 - k) * 100) || 0,
      m: Math.round((m - k) / (1 - k) * 100) || 0,
      y: Math.round((y - k) / (1 - k) * 100) || 0,
      k: Math.round(k * 100)
    }
  }

  // Update color from HEX input
  const updateFromHex = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
      setColor({ hex, rgb, hsl, cmyk })
    }
  }

  // Update color from RGB sliders
  const updateFromRgb = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...color.rgb, [channel]: value }
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    const hsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
    const cmyk = rgbToCmyk(newRgb.r, newRgb.g, newRgb.b)
    setColor({ hex, rgb: newRgb, hsl, cmyk })
  }

  // Copy to clipboard
  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  // Random color
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    updateFromRgb('r', r)
    updateFromRgb('g', g)
    updateFromRgb('b', b)
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Palette className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      {/* Color preview */}
      <Card className="bg-gradient-to-br from-primary/20 to-secondary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div
              className="w-32 h-32 rounded-xl shadow-2xl border-4 border-background"
              style={{ backgroundColor: color.hex }}
            />
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{t('currentColor')}</p>
              <p className="text-2xl font-bold font-mono">{color.hex}</p>
              <Button
                onClick={randomColor}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <RefreshCw className="mr-2 size-4" />
                {t('random')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* HEX input */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">HEX</CardTitle>
              <Button
                onClick={() => copyToClipboard(color.hex, 'hex')}
                variant="ghost"
                size="icon-sm"
              >
                {copied === 'hex' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              value={color.hex}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
          </CardContent>
        </Card>

        {/* RGB input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">RGB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>R</Label>
                <span className="font-mono text-sm">{color.rgb.r}</span>
              </div>
              <Slider
                value={[color.rgb.r]}
                onValueChange={(value) => updateFromRgb('r', value[0])}
                max={255}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>G</Label>
                <span className="font-mono text-sm">{color.rgb.g}</span>
              </div>
              <Slider
                value={[color.rgb.g]}
                onValueChange={(value) => updateFromRgb('g', value[0])}
                max={255}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>B</Label>
                <span className="font-mono text-sm">{color.rgb.b}</span>
              </div>
              <Slider
                value={[color.rgb.b]}
                onValueChange={(value) => updateFromRgb('b', value[0])}
                max={255}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Input
                value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'rgb')}
                variant="outline"
                size="sm"
              >
                {copied === 'rgb' ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* HSL display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">HSL</CardTitle>
              <Button
                onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'hsl')}
                variant="ghost"
                size="icon-sm"
              >
                {copied === 'hsl' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded">
                <p className="text-xs text-muted-foreground mb-1">HSL</p>
                <p className="font-mono text-sm">hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">H</p>
                  <p className="font-semibold">{color.hsl.h}°</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">S</p>
                  <p className="font-semibold">{color.hsl.s}%</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">L</p>
                  <p className="font-semibold">{color.hsl.l}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CMYK display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">CMYK</CardTitle>
              <Button
                onClick={() => copyToClipboard(`cmyk(${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k})`, 'cmyk')}
                variant="ghost"
                size="icon-sm"
              >
                {copied === 'cmyk' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded">
                <p className="text-xs text-muted-foreground mb-1">CMYK</p>
                <p className="font-mono text-sm">cmyk({color.cmyk.c}%, {color.cmyk.m}%, {color.cmyk.y}%, {color.cmyk.k}%)</p>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">C</p>
                  <p className="font-semibold">{color.cmyk.c}%</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">M</p>
                  <p className="font-semibold">{color.cmyk.m}%</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">Y</p>
                  <p className="font-semibold">{color.cmyk.y}%</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-center">
                  <p className="text-muted-foreground text-xs">K</p>
                  <p className="font-semibold">{color.cmyk.k}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
        <p className="font-semibold mb-1">⚡ {t('privacyNote')}</p>
        <p>{t('privacyNoteText')}</p>
      </div>
    </div>
  )
}
