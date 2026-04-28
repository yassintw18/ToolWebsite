/**
 * Smart Image Analyzer Tool
 * Uses advanced image processing algorithms for client-side analysis
 * Privacy-first: No images uploaded to external servers
 *
 * Technical Note: This tool uses pixel-level analysis, color quantization,
 * and statistical methods for image processing. It does not use external
 * AI APIs or machine learning models. All processing happens locally in your browser.
 */

"use client"

import * as React from "react"
import { Upload, Image as ImageIcon, Palette, FileImage, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from 'next-intl'

interface ImageAnalysis {
  colors: string[]
  dimensions: { width: number; height: number }
  format: string
  size: number
  dominantColors: string[]
  brightness: number
  contrast: number
}

export function AiImageAnalyzer() {
  const t = useTranslations('tools.aiImageAnalyzer')

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string>('')
  const [analysis, setAnalysis] = React.useState<ImageAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        analyzeImage(reader.result as string, file)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = (imageDataUrl: string, file: File) => {
    setIsAnalyzing(true)

    const img = new Image()
    img.onload = () => {
      // Create canvas for image analysis
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Analyze colors
      const colorMap = new Map<string, number>()
      let totalBrightness = 0
      const pixelColors: string[] = []

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        totalBrightness += brightness

        // Quantize colors
        const quantizedR = Math.round(r / 32) * 32
        const quantizedG = Math.round(g / 32) * 32
        const quantizedB = Math.round(b / 32) * 32
        const colorKey = `rgb(${quantizedR},${quantizedG},${quantizedB})`

        colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
        pixelColors.push(colorKey)
      }

      // Get dominant colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([color]) => color)

      // Calculate average brightness
      const avgBrightness = totalBrightness / (data.length / 4)

      // Calculate contrast (simplified)
      const brightnessValues = pixelColors.map(color => {
        const match = color.match(/\d+/g)
        if (!match) return 128
        const [r, g, b] = match.map(Number)
        return (r * 299 + g * 587 + b * 114) / 1000
      })

      const minBrightness = Math.min(...brightnessValues)
      const maxBrightness = Math.max(...brightnessValues)
      const contrast = maxBrightness - minBrightness

      setAnalysis({
        colors: sortedColors,
        dimensions: {
          width: img.width,
          height: img.height
        },
        format: file.type,
        size: file.size,
        dominantColors: sortedColors.slice(0, 5),
        brightness: Math.round(avgBrightness),
        contrast: Math.round(contrast)
      })

      setIsAnalyzing(false)
    }

    img.src = imageDataUrl
  }

  const getColorName = (rgbString: string): string => {
    const match = rgbString.match(/\d+/g)
    if (!match) return rgbString

    const [r, g, b] = match.map(Number)

    // Simple color naming
    if (r > 200 && g > 200 && b > 200) return 'White'
    if (r < 50 && g < 50 && b < 50) return 'Black'
    if (r > g && r > b) return g > 100 ? 'Orange' : 'Red'
    if (g > r && g > b) return b > 100 ? 'Cyan' : 'Green'
    if (b > r && b > g) return r > 100 ? 'Purple' : 'Blue'
    if (r > 150 && g > 150 && b < 100) return 'Yellow'
    if (r > 150 && b > 150 && g < 100) return 'Magenta'

    return rgbString
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <FileImage className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('uploadImage')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!imagePreview ? (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto size-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">{t('dragDrop')}</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" asChild>
                    <span>{t('selectFile')}</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedFile(null)
                      setImagePreview('')
                      setAnalysis(null)
                    }}
                  >
                    {t('remove')}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('analysis')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!analysis ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <ImageIcon className="mx-auto size-12 mb-2 opacity-50" />
                  <p className="text-sm">{t('uploadToAnalyze')}</p>
                </div>
              </div>
            ) : isAnalyzing ? (
              <div className="flex items-center justify-center h-64">
                <Sparkles className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">{t('info')}</TabsTrigger>
                  <TabsTrigger value="colors">{t('colors')}</TabsTrigger>
                  <TabsTrigger value="quality">{t('quality')}</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-3 rounded">
                      <p className="text-xs text-muted-foreground">{t('dimensions')}</p>
                      <p className="font-semibold">{analysis.dimensions.width} × {analysis.dimensions.height}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <p className="text-xs text-muted-foreground">{t('format')}</p>
                      <p className="font-semibold">{analysis.format.split('/')[1].toUpperCase()}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <p className="text-xs text-muted-foreground">{t('fileSize')}</p>
                      <p className="font-semibold">{formatFileSize(analysis.size)}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded">
                      <p className="text-xs text-muted-foreground">{t('aspectRatio')}</p>
                      <p className="font-semibold">{(analysis.dimensions.width / analysis.dimensions.height).toFixed(2)}:1</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-3 mt-4">
                  <div>
                    <p className="text-sm font-medium mb-2">{t('dominantColors')}</p>
                    <div className="grid grid-cols-5 gap-2">
                      {analysis.dominantColors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-full aspect-square rounded border-2 border-border"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-xs mt-1">{getColorName(color)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">{t('colorPalette')}</p>
                    <div className="flex gap-1 flex-wrap">
                      {analysis.colors.slice(0, 20).map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded border border-border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quality" className="space-y-3 mt-4">
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('brightness')}</span>
                      <span className="font-semibold">{analysis.brightness}/255</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(analysis.brightness / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('contrast')}</span>
                      <span className="font-semibold">{analysis.contrast}/255</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2 mt-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{ width: `${(analysis.contrast / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
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
