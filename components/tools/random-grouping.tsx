"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Copy, Trash2, Users, Sparkles } from "lucide-react"
import { useTranslations } from 'next-intl'

interface RandomGroupingProps {
  className?: string
}

interface Group {
  id: number
  members: string[]
}

export function RandomGrouping({ className }: RandomGroupingProps) {
  const t = useTranslations('tools.randomGrouping')
  const [input, setInput] = useState("")
  const [numberOfGroups, setNumberOfGroups] = useState(2)
  const [groups, setGroups] = useState<Group[]>([])
  const [hasGrouped, setHasGrouped] = useState(false)

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const createGroups = () => {
    const members = input
      .split("\n")
      .map(name => name.trim())
      .filter(name => name.length > 0)

    if (members.length === 0) return
    if (numberOfGroups < 1 || numberOfGroups > members.length) return

    // Shuffle members
    const shuffledMembers = shuffleArray(members)

    // Create groups
    const newGroups: Group[] = []
    const membersPerGroup = Math.floor(members.length / numberOfGroups)
    const remainder = members.length % numberOfGroups

    let currentIndex = 0
    for (let i = 0; i < numberOfGroups; i++) {
      const groupSize = membersPerGroup + (i < remainder ? 1 : 0)
      const groupMembers = shuffledMembers.slice(currentIndex, currentIndex + groupSize)
      newGroups.push({
        id: i + 1,
        members: groupMembers
      })
      currentIndex += groupSize
    }

    setGroups(newGroups)
    setHasGrouped(true)
  }

  const handleCopyGroups = async () => {
    const text = groups.map(group =>
      `${t('group')} ${group.id}:\n${group.members.map(member => `  • ${member}`).join('\n')}`
    ).join('\n\n')

    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleClear = () => {
    setInput("")
    setGroups([])
    setHasGrouped(false)
    setNumberOfGroups(2)
  }

  const loadSample = () => {
    const samples = [
      "Alice\nBob\nCharlie\nDiana\nEve\nFrank\nGrace\nHenry\nIvy\nJack",
      "張三\n李四\n王五\n趙六\n錢七\n孫八\n周九\n吳十\n鄭十一\n王十二",
      "田中\n佐藤\n鈴木\n高橋\n伊藤\n渡辺\n山本\n中村\n小林\n加藤"
    ]
    setInput(samples[Math.floor(Math.random() * samples.length)])
  }

  const groupColors = [
    "bg-red-100 dark:bg-red-900/20",
    "bg-blue-100 dark:bg-blue-900/20",
    "bg-green-100 dark:bg-green-900/20",
    "bg-yellow-100 dark:bg-yellow-900/20",
    "bg-purple-100 dark:bg-purple-900/20",
    "bg-pink-100 dark:bg-pink-900/20",
    "bg-indigo-100 dark:bg-indigo-900/20",
    "bg-orange-100 dark:bg-orange-900/20",
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="members">{t('membersList')}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadSample}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('sample')}
                </Button>
              </div>
              <Textarea
                id="members"
                placeholder={t('inputPlaceholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={10}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {t('memberCount', { count: input.split("\n").filter(line => line.trim()).length })}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="groups">{t('numberOfGroups')}</Label>
              <Input
                id="groups"
                type="number"
                min={1}
                max={20}
                value={numberOfGroups}
                onChange={(e) => setNumberOfGroups(parseInt(e.target.value) || 2)}
                className="text-center text-lg"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createGroups}
                disabled={input.split("\n").filter(line => line.trim()).length < numberOfGroups}
                className="flex-1"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                {t('createGroups')}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                disabled={!input && groups.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('clear')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('results')}</CardTitle>
            <CardDescription>
              {hasGrouped ? t('groupsCreated', { count: groups.length }) : t('noGroupsYet')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.length > 0 ? (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {groups.map((group, index) => (
                    <div
                      key={group.id}
                      className={`rounded-lg p-4 ${groupColors[index % groupColors.length]}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {t('group')} {group.id}
                        </h3>
                        <Badge variant="secondary">
                          {group.members.length} {t('members')}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {group.members.map((member, memberIndex) => (
                          <div
                            key={memberIndex}
                            className="text-sm pl-6 py-1 bg-white/50 dark:bg-black/20 rounded"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handleCopyGroups} className="w-full" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  {t('copyAll')}
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('enterNames')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Tips */}
      <Card>
        <CardHeader>
          <CardTitle>{t('usageTips')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{t('tip1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{t('tip2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{t('tip3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{t('tip4')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
