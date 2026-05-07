/**
 * UUID/GUID Generator Tool
 * Generate random UUIDs using the native Web Crypto API
 * Privacy-first: All generation happens locally in your browser
 */

"use client"

import * as React from "react"
import { Copy, Check, RefreshCw, Download, Key, Sparkles, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from 'next-intl'

type UUIDVersion = 'v4' | 'v1'

export function UuidGenerator() {
  const t = useTranslations('tools.uuidGenerator')

  const [uuids, setUuids] = React.useState<string[]>([])
  const [version, setVersion] = React.useState<UUIDVersion>('v4')
  const [count, setCount] = React.useState([1])
  const [format, setFormat] = React.useState<'uppercase' | 'lowercase'>('uppercase')
  const [withHyphens, setWithHyphens] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  // Generate UUID using Web Crypto API
  const generateUUID = React.useCallback(() => {
    const newUUIDs: string[] = []

    for (let i = 0; i < count[0]; i++) {
      if (version === 'v4') {
        // Use crypto.randomUUID() for v4 (most common)
        let uuid = crypto.randomUUID()
        if (!withHyphens) {
          uuid = uuid.replace(/-/g, '')
        }
        if (format === 'lowercase') {
          uuid = uuid.toLowerCase()
        } else {
          uuid = uuid.toUpperCase()
        }
        newUUIDs.push(uuid)
      } else {
        // Fallback for v1 (simplified implementation)
        const timestamp = Date.now()
        const randomBytes = new Uint8Array(16)
        crypto.getRandomValues(randomBytes)

        let uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'
        uuid = uuid.replace(/[xy]/g, (char) => {
          const random = randomBytes[Math.floor(Math.random() * 16)]
          const value = char === 'x' ? random : (random & 0x3 | 0x8)
          return value.toString(16)
        })

        if (!withHyphens) {
          uuid = uuid.replace(/-/g, '')
        }
        if (format === 'lowercase') {
          uuid = uuid.toLowerCase()
        } else {
          uuid = uuid.toUpperCase()
        }
        newUUIDs.push(uuid)
      }
    }

    setUuids(newUUIDs)
  }, [version, count, format, withHyphens])

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (uuids.length === 0) return

    const textToCopy = uuids.join('\n')
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Copy single UUID
  const copySingleUUID = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  // Download as text file
  const downloadUUIDs = () => {
    if (uuids.length === 0) return

    const content = uuids.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `uuids-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Clear all
  const clearAll = () => {
    setUuids([])
    setCopied(false)
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Friendly Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200">
          <Key className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-medium text-violet-900">{t('title')}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          UUID Generator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Generate unique identifiers instantly. Perfect for databases, API keys, and more.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Panel */}
        <Card className="lg:col-span-1 border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl">
          <CardHeader className="py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
            <CardTitle className="text-base font-semibold text-violet-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t('settings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-4">
            <div className="space-y-2">
              <Label htmlFor="version" className="text-sm font-medium text-slate-700">{t('version')}</Label>
              <Select value={version} onValueChange={(value) => setVersion(value as UUIDVersion)}>
                <SelectTrigger id="version" className="rounded-xl border-2 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                  <SelectItem value="v1">UUID v1 (Time-based)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="count" className="text-sm font-medium text-slate-700">{t('count')}: <span className="text-violet-600 font-semibold">{count[0]}</span></Label>
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
                <Label className="text-sm font-medium text-slate-700">{t('format')}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={format === 'uppercase' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormat('uppercase')}
                    className={`flex-1 rounded-xl transition-all duration-200 ${
                      format === 'uppercase'
                        ? 'bg-violet-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ABCDEF
                  </Button>
                  <Button
                    variant={format === 'lowercase' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormat('lowercase')}
                    className={`flex-1 rounded-xl transition-all duration-200 ${
                      format === 'lowercase'
                        ? 'bg-violet-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    abcdef
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hyphens" className="text-sm font-medium text-slate-700">{t('hyphens')}</Label>
                <Button
                  variant={withHyphens ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWithHyphens(!withHyphens)}
                  id="hyphens"
                  className={`rounded-xl transition-all duration-200 ${
                    withHyphens
                      ? 'bg-violet-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {withHyphens ? 'XXX-XXX' : 'XXXXXX'}
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-violet-900 mb-1">{t('privacyNote')}</p>
                  <p className="text-xs text-violet-800 leading-relaxed">{t('privacyNoteText')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation and Results */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-base font-semibold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('generate')}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={generateUUID}
                    disabled={count[0] > 100}
                    size="default"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <RefreshCw className="mr-2 w-4 h-4" />
                    {t('generate')}
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="default"
                    disabled={uuids.length === 0}
                    className="rounded-xl border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 w-4 h-4 text-green-600" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 w-4 h-4" />
                        {t('copyAll')}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={downloadUUIDs}
                    variant="outline"
                    size="icon"
                    disabled={uuids.length === 0}
                    className="rounded-xl border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="ghost"
                    size="icon"
                    disabled={uuids.length === 0}
                    className="rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    {t('clear')}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {uuids.length === 0 ? (
                <div className="flex items-center justify-center h-80 text-slate-400">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                      <Key className="w-8 h-8 text-violet-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">{t('placeholder')}</p>
                    <p className="text-xs text-slate-500 mt-1">Click the generate button to create UUIDs</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {uuids.map((uuid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-violet-50 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <code className="text-sm font-mono flex-1 truncate mr-3 text-slate-700">
                        {uuid}
                      </code>
                      <Button
                        onClick={() => copySingleUUID(uuid)}
                        variant="ghost"
                        size="icon"
                        className="rounded-xl opacity-0 group-hover:opacity-100 hover:bg-violet-100 hover:text-violet-700 transition-all duration-200"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      {uuids.length > 0 && (
        <Card className="border-2 border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t('statistics')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-700 font-medium mb-1">{t('totalGenerated')}</p>
                <p className="text-2xl font-bold text-blue-900">{uuids.length}</p>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                <p className="text-xs text-violet-700 font-medium mb-1">{t('version')}</p>
                <p className="text-2xl font-bold text-violet-900">{version.toUpperCase()}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                <p className="text-xs text-amber-700 font-medium mb-1">{t('format')}</p>
                <p className="text-2xl font-bold text-amber-900">{format === 'uppercase' ? 'UPPER' : 'lower'}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-700 font-medium mb-1">{t('length')}</p>
                <p className="text-2xl font-bold text-emerald-900">{withHyphens ? '36' : '32'} chars</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-violet-900 mb-1">What are UUIDs?</h3>
            <p className="text-sm text-violet-800 leading-relaxed">
              UUIDs (Universally Unique Identifiers) are 128-bit numbers used to identify information in computer systems. Version 4 UUIDs are randomly generated and are perfect for creating unique IDs without coordination. Generate up to 100 UUIDs at once with complete privacy - all generation happens locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
