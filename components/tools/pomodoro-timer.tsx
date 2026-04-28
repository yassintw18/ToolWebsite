"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, SkipForward, Clock } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Slider } from "@/components/ui/slider"

interface PomodoroTimerProps {
  className?: string
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

interface TimerSettings {
  work: number      // 25 minutes
  shortBreak: number // 5 minutes
  longBreak: number  // 15 minutes
}

export function PomodoroTimer({ className }: PomodoroTimerProps) {
  const t = useTranslations('tools.pomodoroTimer')
  const [mode, setMode] = useState<TimerMode>('work')
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [sessions, setSessions] = useState(0)
  const [totalWorkTime, setTotalWorkTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const settings: TimerSettings = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
  }

  // Get current duration based on mode
  const getCurrentDuration = () => {
    return settings[mode] * 60
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Get mode display text
  const getModeText = () => {
    switch (mode) {
      case 'work': return t('work')
      case 'shortBreak': return t('shortBreak')
      case 'longBreak': return t('longBreak')
    }
  }

  // Get mode color
  const getModeColor = () => {
    switch (mode) {
      case 'work': return 'from-red-500 to-orange-500'
      case 'shortBreak': return 'from-green-500 to-emerald-500'
      case 'longBreak': return 'from-blue-500 to-cyan-500'
    }
  }

  // Calculate progress percentage
  const getProgress = () => {
    const total = getCurrentDuration()
    return ((total - timeLeft) / total) * 100
  }

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft - 1)

        // Track work time
        if (mode === 'work') {
          setTotalWorkTime(prev => prev + 1)
        }
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      // Timer completed
      handleTimerComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, mode])

  const handleTimerComplete = () => {
    setIsActive(false)

    // Play notification sound (browser beep)
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.value = 0.3

      oscillator.start()
      setTimeout(() => oscillator.stop(), 200)
    } catch (err) {
      console.log('Audio not supported')
    }

    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = mode === 'work' ? t('workComplete') : t('breakComplete')
      new Notification(title, {
        body: mode === 'work' ? t('takeBreak') : t('backToWork'),
        icon: '/favicon.svg'
      })
    }

    // Auto-switch to next mode
    if (mode === 'work') {
      const newSessions = sessions + 1
      setSessions(newSessions)

      // Every 4 work sessions, take a long break
      if (newSessions % 4 === 0) {
        setMode('longBreak')
      } else {
        setMode('shortBreak')
      }
    } else {
      setMode('work')
    }

    setTimeLeft(getCurrentDuration())
  }

  const toggleTimer = () => {
    // Request notification permission on first interaction
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(getCurrentDuration())
  }

  const skipToNext = () => {
    setIsActive(false)

    if (mode === 'work') {
      const newSessions = sessions + 1
      setSessions(newSessions)

      if (newSessions % 4 === 0) {
        setMode('longBreak')
      } else {
        setMode('shortBreak')
      }
    } else {
      setMode('work')
    }

    setTimeLeft(getCurrentDuration())
  }

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode)
    setIsActive(false)
    setTimeLeft(settings[newMode] * 60)
  }

  const formatTotalWorkTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Timer Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selector */}
            <div className="flex gap-2">
              <Button
                variant={mode === 'work' ? 'default' : 'outline'}
                onClick={() => handleModeChange('work')}
                className="flex-1"
              >
                {t('work')}
              </Button>
              <Button
                variant={mode === 'shortBreak' ? 'default' : 'outline'}
                onClick={() => handleModeChange('shortBreak')}
                className="flex-1"
              >
                {t('shortBreak')}
              </Button>
              <Button
                variant={mode === 'longBreak' ? 'default' : 'outline'}
                onClick={() => handleModeChange('longBreak')}
                className="flex-1"
              >
                {t('longBreak')}
              </Button>
            </div>

            {/* Timer Display */}
            <div className="relative">
              <div className={`bg-gradient-to-br ${getModeColor()} rounded-lg p-8 text-center text-white`}>
                <div className="text-6xl font-bold mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm opacity-90">
                  {getModeText()}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 bg-black/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-white/80 transition-all duration-1000"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                onClick={toggleTimer}
                size="lg"
                className="flex-1"
              >
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    {t('pause')}
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    {t('start')}
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button
                onClick={skipToNext}
                variant="outline"
                size="lg"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('statistics')}</CardTitle>
            <CardDescription>{t('todayProgress')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sessions */}
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('completedSessions')}</p>
                  <p className="text-3xl font-bold">{sessions}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>

            {/* Total Work Time */}
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalWorkTime')}</p>
                  <p className="text-3xl font-bold">
                    {formatTotalWorkTime(totalWorkTime)}
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {t('today')}
                </Badge>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-lg border border-muted bg-muted/50 p-4">
              <h4 className="font-medium mb-2">{t('pomodoroTechnique')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('tip1')}</li>
                <li>• {t('tip2')}</li>
                <li>• {t('tip3')}</li>
                <li>• {t('tip4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
