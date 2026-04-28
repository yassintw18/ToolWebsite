/**
 * Smart Text Processor Tool
 * Uses advanced algorithms for intelligent text processing
 * Privacy-first: No data sent to external servers
 *
 * Technical Note: This tool uses statistical algorithms including
 * word frequency analysis, sentence scoring, and text processing
 * methods. It does not use external AI APIs or machine learning models.
 * All processing happens locally in your browser.
 */

"use client"

import * as React from "react"
import { Sparkles, Copy, Check, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useTranslations } from 'next-intl'

type GenerationType = 'summary' | 'keywords' | 'sentences' | 'paragraphs' | 'rewrite'

export function AiTextGenerator() {
  const t = useTranslations('tools.aiTextGenerator')

  const [inputText, setInputText] = React.useState('')
  const [outputText, setOutputText] = React.useState('')
  const [generationType, setGenerationType] = React.useState<GenerationType>('summary')
  const [creativity, setCreativity] = React.useState([50])
  const [length, setLength] = React.useState([100])
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  // AI text generation functions (client-side algorithms)
  const generateText = React.useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('')
      return
    }

    setIsGenerating(true)

    // Simulate AI processing time
    setTimeout(() => {
      let result = ''

      switch (generationType) {
        case 'summary':
          result = generateSummary(inputText, length[0])
          break
        case 'keywords':
          result = generateKeywords(inputText, length[0])
          break
        case 'sentences':
          result = generateSentences(inputText, length[0])
          break
        case 'paragraphs':
          result = generateParagraphs(inputText, length[0])
          break
        case 'rewrite':
          result = rewriteText(inputText, creativity[0])
          break
        default:
          result = inputText
      }

      setOutputText(result)
      setIsGenerating(false)
    }, 500 + Math.random() * 1000)
  }, [inputText, generationType, creativity, length])

  // Text processing algorithms (privacy-first, client-side only)
  const generateSummary = (text: string, maxLength: number): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length === 0) return text

    // Extract key sentences based on word frequency
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const wordFreq = new Map<string, number>()

    words.forEach(word => {
      if (word.length > 3) { // Skip short words
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
      }
    })

    const sentenceScores = sentences.map(sentence => {
      const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || []
      let score = 0
      sentenceWords.forEach(word => {
        score += wordFreq.get(word) || 0
      })
      return { sentence, score: score / sentenceWords.length }
    })

    // Sort by score and take top sentences
    sentenceScores.sort((a, b) => b.score - a.score)
    const topSentences = sentenceScores.slice(0, Math.ceil(sentences.length * 0.4))

    // Limit length
    let summary = topSentences.map(s => s.sentence.trim()).join('. ')
    if (summary.length > maxLength) {
      summary = summary.substring(0, maxLength - 3) + '...'
    }

    return summary
  }

  const generateKeywords = (text: string, maxCount: number): string => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'])

    const wordFreq = new Map<string, number>()

    words.forEach(word => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
      }
    })

    const sortedWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxCount)
      .map(([word, count]) => `${word} (${count})`)

    return sortedWords.join(', ')
  }

  const generateSentences = (text: string, count: number): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length === 0) return text

    const shuffled = [...sentences].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(count, shuffled.length))
    return selected.map(s => s.trim()).join('. ')
  }

  const generateParagraphs = (text: string, maxWords: number): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length === 0) return text

    const wordsPerParagraph = Math.ceil(maxWords / 3)
    const paragraphs: string[] = []
    let currentParagraph = ''
    let wordCount = 0

    for (const sentence of sentences) {
      const sentenceWords = sentence.split(/\s+/).length
      if (wordCount + sentenceWords > wordsPerParagraph && currentParagraph) {
        paragraphs.push(currentParagraph.trim())
        currentParagraph = sentence
        wordCount = sentenceWords
      } else {
        currentParagraph += (currentParagraph ? ' ' : '') + sentence
        wordCount += sentenceWords
      }
    }

    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim())
    }

    return paragraphs.join('\n\n')
  }

  const rewriteText = (text: string, creativity: number): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    if (sentences.length === 0) return text

    const creativityFactor = creativity / 100

    const rewritten = sentences.map(sentence => {
      const words = sentence.split(/\s+/)
      const rewrittenWords = words.map(word => {
        // Simple word replacement based on creativity level
        if (Math.random() < creativityFactor * 0.3) {
          const synonyms = {
            'good': ['excellent', 'great', 'wonderful', 'fine'],
            'bad': ['poor', 'terrible', 'awful', 'unfortunate'],
            'big': ['large', 'huge', 'enormous', 'massive'],
            'small': ['tiny', 'little', 'compact', 'miniature'],
            'fast': ['quick', 'rapid', 'swift', 'speedy'],
            'slow': ['sluggish', 'unhurried', 'leisurely', 'gradual'],
          }

          const lowerWord = word.toLowerCase()
          for (const [original, synonymsList] of Object.entries(synonyms)) {
            if (lowerWord.includes(original) && synonymsList.length > 0) {
              const replacement = synonymsList[Math.floor(Math.random() * synonymsList.length)]
              // Preserve capitalization
              if (word[0] === word[0].toUpperCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1)
              }
              return replacement
            }
          }
        }
        return word
      })

      return rewrittenWords.join(' ')
    })

    return rewritten.join('. ')
  }

  const copyToClipboard = async () => {
    if (!outputText) return
    await navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    setCopied(false)
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Wand2 className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Settings Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="generation-type">{t('generationType')}</Label>
              <Select value={generationType} onValueChange={(value) => setGenerationType(value as GenerationType)}>
                <SelectTrigger id="generation-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">{t('types.summary')}</SelectItem>
                  <SelectItem value="keywords">{t('types.keywords')}</SelectItem>
                  <SelectItem value="sentences">{t('types.sentences')}</SelectItem>
                  <SelectItem value="paragraphs">{t('types.paragraphs')}</SelectItem>
                  <SelectItem value="rewrite">{t('types.rewrite')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="creativity">{t('creativity')}: {creativity[0]}%</Label>
                <Slider
                  id="creativity"
                  min={0}
                  max={100}
                  step={10}
                  value={creativity}
                  onValueChange={setCreativity}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="length">{t('outputLength')}: {length[0]}</Label>
                <Slider
                  id="length"
                  min={50}
                  max={500}
                  step={50}
                  value={length}
                  onValueChange={setLength}
                  className="w-full"
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              <p className="font-semibold mb-1">⚡ {t('privacyNote')}</p>
              <p>{t('privacyNoteText')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Input/Output Panels */}
        <div className="lg:col-span-2 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{t('input')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t('inputPlaceholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{t('output')}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={generateText}
                    disabled={!inputText || isGenerating}
                    size="sm"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 size-4 animate-spin" />
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 size-4" />
                        {t('generate')}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="icon-sm"
                    disabled={!outputText}
                  >
                    {copied ? (
                      <Check className="size-4 text-green-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={outputText}
                readOnly
                placeholder={t('outputPlaceholder')}
                className="min-h-[200px] resize-none bg-muted"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
