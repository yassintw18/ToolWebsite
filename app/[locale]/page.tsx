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
  Globe,
  Code2,
  Cpu,
  Terminal
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
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10 border-cyan-500/20",
      stats: "10K+ users"
    },
    {
      id: "unit-converter",
      icon: Ruler,
      title: t('tools.unitConverter.title'),
      description: t('tools.unitConverter.description'),
      color: "text-green-400",
      bgColor: "bg-green-500/10 border-green-500/20",
      stats: "50+ units"
    },
    {
      id: "random-number",
      icon: Sparkles,
      title: t('tools.randomNumber.title'),
      description: t('tools.randomNumber.description'),
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
      stats: "Statistics"
    },
    {
      id: "uuid-generator",
      icon: Key,
      title: t('tools.uuidGenerator.title'),
      description: t('tools.uuidGenerator.description'),
      color: "text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20",
      stats: "Multiple formats"
    },
    {
      id: "timestamp-converter",
      icon: Clock,
      title: t('tools.timestampConverter.title'),
      description: t('tools.timestampConverter.description'),
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      stats: "Real-time"
    },
    {
      id: "color-converter",
      icon: Palette,
      title: t('tools.colorConverter.title'),
      description: t('tools.colorConverter.description'),
      color: "text-pink-400",
      bgColor: "bg-pink-500/10 border-pink-500/20",
      stats: "All formats"
    },
    {
      id: "decision-wheel",
      icon: CircleDashed,
      title: t('tools.decisionWheel.title'),
      description: t('tools.decisionWheel.description'),
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10 border-yellow-500/20",
      stats: "Interactive"
    },
    {
      id: "whitespace-converter",
      icon: Type,
      title: t('tools.whitespaceConverter.title'),
      description: t('tools.whitespaceConverter.description'),
      color: "text-teal-400",
      bgColor: "bg-teal-500/10 border-teal-500/20",
      stats: "Clean code"
    },
    {
      id: "random-grouping",
      icon: Users,
      title: t('tools.randomGrouping.title'),
      description: t('tools.randomGrouping.description'),
      color: "text-violet-400",
      bgColor: "bg-violet-500/10 border-violet-500/20",
      stats: "Team builder"
    },
    {
      id: "pomodoro-timer",
      icon: Timer,
      title: t('tools.pomodoroTimer.title'),
      description: t('tools.pomodoroTimer.description'),
      color: "text-red-400",
      bgColor: "bg-red-500/10 border-red-500/20",
      stats: "Productivity"
    },
  ]

  const stats = [
    { value: "10+", label: "Professional Tools", icon: Zap, color: "text-cyan-400" },
    { value: "100%", label: "Privacy First", icon: Shield, color: "text-green-400" },
    { value: "2", label: "Languages", icon: Globe, color: "text-purple-400" },
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
              {/* Industrial Tech Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-10">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_100%)]" />

                {/* Glowing orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
              </div>

              <div className="flex flex-col gap-12 p-6 md:p-12">
                {/* Hero Section */}
                <div className="text-center space-y-8 max-w-5xl mx-auto pt-8">
                  {/* Technical Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-mono text-cyan-400">Developer-First Tools</span>
                  </div>

                  {/* Main Title - Industrial Tech Style */}
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                      <span className="block text-white mb-2">{t('appName').split(' ')[0]}</span>
                      <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {t('appName').split(' ').slice(1).join(' ')}
                      </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                      {t('tagline')}
                    </p>
                  </div>

                  {/* CTA Buttons - Technical Style */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button
                      size="lg"
                      onClick={() => router.push(`/${locale}/tools/json-formatter`)}
                      className="group relative px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 className="w-5 h-5" />
                        Start Building
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => router.push(`/${locale}/tools`)}
                      className="px-8 py-6 border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-300 hover:text-cyan-400 font-semibold text-lg transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <Cpu className="w-5 h-5" />
                        Explore Tools
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Stats Section - Technical Dashboard Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="group relative p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-200"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="relative flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-4xl font-bold text-white tracking-tight">{stat.value}</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools Grid - Technical Card Style */}
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Professional Tools</h2>
                    <p className="text-lg text-slate-500">Built for developers, optimized for productivity</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {allTools.map((tool) => (
                      <Card
                        key={tool.id}
                        className="group relative overflow-hidden border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
                        onClick={() => handleToolClick(tool.id)}
                      >
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${tool.color.replace('text-', 'from-').replace('-400', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

                        <CardHeader className="space-y-4 relative">
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 ${tool.color} group-hover:scale-110 transition-transform duration-200`}>
                              <tool.icon className="size-6" />
                            </div>
                            <Badge variant="secondary" className="text-xs font-mono border-slate-700 bg-slate-950 text-slate-400">
                              {tool.stats}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors duration-200">
                            {tool.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-slate-500 leading-relaxed">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                          <Button
                            variant="ghost"
                            className="w-full group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-200 border border-slate-800"
                          >
                            <span className="flex items-center gap-2">
                              <Terminal className="w-4 h-4" />
                              Launch Tool
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Section - Technical Command Center Style */}
                <div className="text-center pt-8 pb-8">
                  <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl border border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm space-y-6 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[96px]" />

                    <div className="relative space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs font-mono text-cyan-400">READY TO DEPLOY</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Boost Your Development Workflow
                      </h3>

                      <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Join thousands of developers who use our professional tools to ship faster,
                        code better, and stay in the flow.
                      </p>

                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => router.push(`/${locale}/tools/json-formatter`)}
                        className="group px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                      >
                        <span className="flex items-center gap-2">
                          <Code2 className="w-5 h-5" />
                          Get Started Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
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
