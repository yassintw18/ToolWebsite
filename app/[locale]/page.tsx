"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AdBanner } from "@/components/ad-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileJson,
  Ruler,
  Sparkles,
  ArrowRight,
  Key,
  Clock,
  Palette,
  CircleDashed,
  Type,
  Users,
  Timer,
  Zap,
  Shield,
  Globe
} from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Home() {
  const t = useTranslations('common')
  const router = useRouter()
  const locale = useLocale()

  const allTools = [
    {
      id: "json-formatter",
      icon: FileJson,
      title: t('tools.jsonFormatter.title'),
      description: t('tools.jsonFormatter.description'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      stats: "10K+ users"
    },
    {
      id: "unit-converter",
      icon: Ruler,
      title: t('tools.unitConverter.title'),
      description: t('tools.unitConverter.description'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      stats: "50+ units"
    },
    {
      id: "random-number",
      icon: Sparkles,
      title: t('tools.randomNumber.title'),
      description: t('tools.randomNumber.description'),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      stats: "Statistics"
    },
    {
      id: "uuid-generator",
      icon: Key,
      title: t('tools.uuidGenerator.title'),
      description: t('tools.uuidGenerator.description'),
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      stats: "Multiple formats"
    },
    {
      id: "timestamp-converter",
      icon: Clock,
      title: t('tools.timestampConverter.title'),
      description: t('tools.timestampConverter.description'),
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      stats: "Real-time"
    },
    {
      id: "color-converter",
      icon: Palette,
      title: t('tools.colorConverter.title'),
      description: t('tools.colorConverter.description'),
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      stats: "All formats"
    },
    {
      id: "decision-wheel",
      icon: CircleDashed,
      title: t('tools.decisionWheel.title'),
      description: t('tools.decisionWheel.description'),
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      stats: "Interactive"
    },
    {
      id: "whitespace-converter",
      icon: Type,
      title: t('tools.whitespaceConverter.title'),
      description: t('tools.whitespaceConverter.description'),
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-500/10",
      stats: "Clean code"
    },
    {
      id: "random-grouping",
      icon: Users,
      title: t('tools.randomGrouping.title'),
      description: t('tools.randomGrouping.description'),
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      stats: "Team builder"
    },
    {
      id: "pomodoro-timer",
      icon: Timer,
      title: t('tools.pomodoroTimer.title'),
      description: t('tools.pomodoroTimer.description'),
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      stats: "Productivity"
    },
  ]

  const stats = [
    { value: "10+", label: "Professional Tools", icon: Zap },
    { value: "100%", label: "Privacy First", icon: Shield },
    { value: "2", label: "Languages", icon: Globe },
  ]

  const handleToolClick = (toolId: string) => {
    router.push(`/${locale}/tools/${toolId}`)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={t('appName')} />
        <div className="flex flex-1 flex-col">
          <AdBanner position="top" />
          <main className="flex-1 overflow-auto">
            <div className="relative">
              {/* Hero Section with Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 -z-10" />

              <div className="flex flex-col gap-8 p-6 md:p-12">
                {/* Hero Content */}
                <div className="text-center space-y-4 max-w-4xl mx-auto">
                  <Badge variant="secondary" className="mb-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    New & Improved Tools
                  </Badge>
                  <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-6 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                    {t('appName')}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('tagline')}
                  </p>
                  <div className="flex gap-3 justify-center pt-4">
                    <Button size="lg" onClick={() => router.push(`/${locale}/tools/json-formatter`)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => router.push(`/${locale}/tools`)}>
                      Browse All Tools
                    </Button>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tools Grid */}
                <div className="pt-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Professional Developer Tools</h2>
                    <p className="text-muted-foreground">Everything you need, all in one place</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {allTools.map((tool) => (
                      <Card
                        key={tool.id}
                        className="group cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 overflow-hidden"
                        onClick={() => handleToolClick(tool.id)}
                      >
                        <CardHeader className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg`}>
                              <tool.icon className="size-6" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {tool.stats}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                          <CardDescription className="text-sm">{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            Open Tool
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="text-center pt-12 pb-8">
                  <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white space-y-4 shadow-2xl">
                    <h3 className="text-2xl font-bold">Ready to boost your productivity?</h3>
                    <p className="text-blue-100">
                      Join thousands of developers who use our tools every day to work faster and smarter.
                    </p>
                    <Button size="lg" variant="secondary" onClick={() => router.push(`/${locale}/tools/json-formatter`)} className="mt-4">
                      Start Using Tools
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <AdBanner position="bottom" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
