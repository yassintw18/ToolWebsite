"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Trash2, Plus, Play } from "lucide-react"
import { useTranslations } from 'next-intl'

interface DecisionWheelProps {
  className?: string
}

export function DecisionWheel({ className }: DecisionWheelProps) {
  const t = useTranslations('tools.decisionWheel')
  const [options, setOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ])
  const [inputText, setInputText] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw wheel
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (options.length === 0) {
      ctx.fillStyle = "#f1f5f9"
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fill()
      return
    }

    const sliceAngle = (2 * Math.PI) / options.length
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A",
      "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
      "#F8B739", "#52B788", "#E56B6F", "#6A4C93"
    ]

    options.forEach((option, index) => {
      const startAngle = index * sliceAngle + (rotation * Math.PI) / 180
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.fillStyle = colors[index % colors.length]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.shadowColor = "rgba(0,0,0,0.5)"
      ctx.shadowBlur = 4

      const text = option.length > 15 ? option.substring(0, 12) + "..." : option
      ctx.fillText(text, radius - 20, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI)
    ctx.fill()

    // Draw pointer
    ctx.fillStyle = "#1e293b"
    ctx.beginPath()
    ctx.moveTo(centerX + radius + 15, centerY)
    ctx.lineTo(centerX + radius - 5, centerY - 15)
    ctx.lineTo(centerX + radius - 5, centerY + 15)
    ctx.closePath()
    ctx.fill()
  }, [options, rotation])

  const spinWheel = () => {
    if (isSpinning || options.length === 0) return

    setIsSpinning(true)
    setResult(null)

    // Random spin between 1800 and 3600 degrees (5-10 full rotations)
    const spinRotation = Math.random() * 1800 + 1800
    const finalRotation = rotation + spinRotation

    let currentRotation = rotation
    const duration = 5000 // 5 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)

      currentRotation = rotation + spinRotation * easeOut
      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Calculate result
        const normalizedRotation = ((finalRotation % 360) + 360) % 360
        const sliceAngle = 360 / options.length
        const winningIndex = Math.floor(normalizedRotation / sliceAngle)
        setResult(options[winningIndex])
        setIsSpinning(false)
      }
    }

    animate()
  }

  const addOptions = () => {
    if (inputText.trim()) {
      const newOptions = inputText
        .split("\n")
        .map(opt => opt.trim())
        .filter(opt => opt.length > 0)

      setOptions([...options, ...newOptions])
      setInputText("")
      setResult(null)
    }
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
    setResult(null)
  }

  const clearAll = () => {
    setOptions([])
    setResult(null)
    setRotation(0)
  }

  const resetWheel = () => {
    setResult(null)
    setRotation(0)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Wheel Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="max-w-full h-auto"
              />
            </div>

            <Button
              onClick={spinWheel}
              disabled={isSpinning || options.length === 0}
              size="lg"
              className="w-full max-w-xs"
            >
              {isSpinning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  {t('spinning')}
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  {t('spin')}
                </>
              )}
            </Button>

            {result && (
              <div className="w-full max-w-xs p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center shadow-lg">
                <p className="text-sm opacity-90">{t('result')}</p>
                <p className="text-2xl font-bold mt-1">{result}</p>
              </div>
            )}

            {options.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {t('noOptions')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Options Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('optionsTitle')}</CardTitle>
            <CardDescription>
              {t('optionsCount', { count: options.length })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="options-input">{t('addOptions')}</Label>
              <Textarea
                id="options-input"
                placeholder={t('inputPlaceholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button onClick={addOptions} className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                {t('add')}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t('currentOptions')}</Label>
                <div className="flex gap-2">
                  <Button onClick={resetWheel} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    {t('reset')}
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    size="sm"
                    disabled={options.length === 0}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    {t('clearAll')}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {options.map((option, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer group"
                    onClick={() => removeOption(index)}
                  >
                    {option}
                    <span className="ml-2 opacity-0 group-hover:opacity-100">×</span>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
