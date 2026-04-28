/**
 * UUID/GUID Generator Tool
 * Generate random UUIDs using the native Web Crypto API
 * Privacy-first: All generation happens locally in your browser
 */

"use client"

import * as React from "react"
import { Copy, Check, RefreshCw, Download, Key } from "lucide-react"
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
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Key className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Settings Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version">{t('version')}</Label>
              <Select value={version} onValueChange={(value) => setVersion(value as UUIDVersion)}>
                <SelectTrigger id="version">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                  <SelectItem value="v1">UUID v1 (Time-based)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="count">{t('count')}: {count[0]}</Label>
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
                <Label>{t('format')}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={format === 'uppercase' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormat('uppercase')}
                    className="flex-1"
                  >
                    ABCDEF
                  </Button>
                  <Button
                    variant={format === 'lowercase' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormat('lowercase')}
                    className="flex-1"
                  >
                    abcdef
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hyphens">{t('hyphens')}</Label>
                <Button
                  variant={withHyphens ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWithHyphens(!withHyphens)}
                  id="hyphens"
                >
                  {withHyphens ? 'XXX-XXX' : 'XXXXXX'}
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              <p className="font-semibold mb-1">⚡ {t('privacyNote')}</p>
              <p>{t('privacyNoteText')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Generation and Results */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{t('generate')}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={generateUUID}
                    disabled={count[0] > 100}
                    size="sm"
                  >
                    <RefreshCw className="mr-2 size-4" />
                    {t('generate')}
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    disabled={uuids.length === 0}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 size-4" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 size-4" />
                        {t('copyAll')}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={downloadUUIDs}
                    variant="outline"
                    size="sm"
                    disabled={uuids.length === 0}
                  >
                    <Download className="size-4" />
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="ghost"
                    size="sm"
                    disabled={uuids.length === 0}
                  >
                    {t('clear')}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {uuids.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Key className="mx-auto mb-2 size-12 opacity-50" />
                    <p className="text-sm">{t('placeholder')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {uuids.map((uuid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <code className="text-sm font-mono flex-1 truncate mr-2">
                        {uuid}
                      </code>
                      <Button
                        onClick={() => copySingleUUID(uuid)}
                        variant="ghost"
                        size="icon-sm"
                      >
                        {copied ? (
                          <Check className="size-3 text-green-500" />
                        ) : (
                          <Copy className="size-3" />
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
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{t('statistics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">{t('totalGenerated')}</p>
                <p className="text-lg font-semibold">{uuids.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('version')}</p>
                <p className="text-lg font-semibold">{version.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('format')}</p>
                <p className="text-lg font-semibold">{format === 'uppercase' ? 'UPPER' : 'lower'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('length')}</p>
                <p className="text-lg font-semibold">{withHyphens ? '36' : '32'} chars</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
