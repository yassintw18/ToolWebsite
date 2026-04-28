/**
 * Timestamp Converter Tool
 * Convert between Unix timestamps and human-readable dates
 * Privacy-first: All conversion happens locally in your browser
 */

"use client"

import * as React from "react"
import { Clock, ArrowRightLeft, Calendar, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useTranslations } from 'next-intl'

export function TimestampConverter() {
  const t = useTranslations('tools.timestampConverter')

  const [unixTimestamp, setUnixTimestamp] = React.useState('')
  const [dateTime, setDateTime] = React.useState('')
  const [timezone, setTimezone] = React.useState('local')
  const [currentTime, setCurrentTime] = React.useState(Date.now())
  const [copied, setCopied] = React.useState<'timestamp' | 'datetime' | null>(null)

  // Update current time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Convert Unix timestamp to datetime
  const convertTimestampToDateTime = React.useCallback(() => {
    if (!unixTimestamp) {
      setDateTime('')
      return
    }

    try {
      const timestamp = parseInt(unixTimestamp)
      if (isNaN(timestamp)) {
        setDateTime('Invalid timestamp')
        return
      }

      const date = new Date(timestamp * 1000) // Convert to milliseconds
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone === 'local' ? undefined : timezone,
        timeZoneName: 'short'
      }

      const formatter = new Intl.DateTimeFormat('en-US', options)
      setDateTime(formatter.format(date))
    } catch (error) {
      setDateTime('Conversion error')
    }
  }, [unixTimestamp, timezone])

  // Convert datetime to Unix timestamp
  const convertDateTimeToTimestamp = React.useCallback(() => {
    if (!dateTime) {
      setUnixTimestamp('')
      return
    }

    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) {
        setUnixTimestamp('Invalid date')
        return
      }

      setUnixTimestamp(Math.floor(date.getTime() / 1000).toString())
    } catch (error) {
      setUnixTimestamp('Conversion error')
    }
  }, [dateTime])

  // Auto-convert with debounce
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (unixTimestamp && !dateTime) {
        convertTimestampToDateTime()
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [unixTimestamp, dateTime, convertTimestampToDateTime])

  // Copy functions
  const copyTimestamp = async () => {
    await navigator.clipboard.writeText(unixTimestamp)
    setCopied('timestamp')
    setTimeout(() => setCopied(null), 2000)
  }

  const copyDateTime = async () => {
    await navigator.clipboard.writeText(dateTime)
    setCopied('datetime')
    setTimeout(() => setCopied(null), 2000)
  }

  // Set current timestamp
  const setCurrentTimestamp = () => {
    setUnixTimestamp(Math.floor(Date.now() / 1000).toString())
  }

  // Common time presets
  const timePresets = [
    { label: 'Now', value: Math.floor(Date.now() / 1000) },
    { label: '+1 hour', value: Math.floor((Date.now() + 3600000) / 1000) },
    { label: '+1 day', value: Math.floor((Date.now() + 86400000) / 1000) },
    { label: '+1 week', value: Math.floor((Date.now() + 604800000) / 1000) },
    { label: '-1 hour', value: Math.floor((Date.now() - 3600000) / 1000) },
    { label: '-1 day', value: Math.floor((Date.now() - 86400000) / 1000) },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Clock className="size-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
      </div>

      {/* Current time display */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('currentTime')}</p>
              <p className="text-2xl font-bold font-mono">
                {new Date(currentTime).toLocaleString()}
              </p>
              <p className="text-sm font-mono text-muted-foreground mt-1">
                Unix: {Math.floor(currentTime / 1000)}
              </p>
            </div>
            <Calendar className="size-12 text-primary/20" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Unix timestamp input */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t('unixTimestamp')}</CardTitle>
              <div className="flex gap-1">
                <Button
                  onClick={setCurrentTimestamp}
                  variant="outline"
                  size="sm"
                >
                  {t('now')}
                </Button>
                <Button
                  onClick={copyTimestamp}
                  variant="ghost"
                  size="icon-sm"
                  disabled={!unixTimestamp}
                >
                  {copied === 'timestamp' ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={unixTimestamp}
              onChange={(e) => setUnixTimestamp(e.target.value)}
              placeholder={t('enterTimestamp')}
              className="font-mono"
            />

            <div className="space-y-2">
              <Label>{t('presets')}</Label>
              <div className="flex flex-wrap gap-2">
                {timePresets.map((preset) => (
                  <Button
                    key={preset.label}
                    onClick={() => setUnixTimestamp(preset.value.toString())}
                    variant="outline"
                    size="sm"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">{t('timezone')}</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">New York (EST)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Los Angeles (PST)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                  <SelectItem value="Asia/Taipei">Taipei (TST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* DateTime input */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{t('dateTime')}</CardTitle>
              <Button
                onClick={copyDateTime}
                variant="ghost"
                size="icon-sm"
                disabled={!dateTime}
              >
                {copied === 'datetime' ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="font-mono"
            />

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">{t('result')}</p>
              {unixTimestamp && !isNaN(parseInt(unixTimestamp)) && (
                <>
                  <p className="font-mono text-sm break-all">
                    {dateTime}
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>ISO 8601: {new Date(parseInt(unixTimestamp) * 1000).toISOString()}</p>
                    <p>UTC: {new Date(parseInt(unixTimestamp) * 1000).toUTCString()}</p>
                    <p>Local: {new Date(parseInt(unixTimestamp) * 1000).toString()}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('quickReference')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-muted/50 p-3 rounded">
              <p className="font-medium">1 minute</p>
              <p className="font-mono text-xs">60 seconds</p>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <p className="font-medium">1 hour</p>
              <p className="font-mono text-xs">3600 seconds</p>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <p className="font-medium">1 day</p>
              <p className="font-mono text-xs">86400 seconds</p>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <p className="font-medium">1 year</p>
              <p className="font-mono text-xs">31536000 seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
        <p className="font-semibold mb-1">⚡ {t('privacyNote')}</p>
        <p>{t('privacyNoteText')}</p>
      </div>
    </div>
  )
}
