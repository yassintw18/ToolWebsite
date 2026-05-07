"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileJson,
  Hash,
  Sparkles,
  ArrowRight,
  Ruler,
  Key,
  Clock,
  Palette,
  CircleDashed,
  Type,
  Users,
  Timer,
  Heart,
  Shield,
  Globe,
  CheckCircle2,
} from "lucide-react"
import { useRouter } from 'next/navigation'

export default function EnglishHomePage() {
  const router = useRouter()

  const allTools = [
    {
      id: "json-formatter",
      icon: FileJson,
      title: "JSON Formatter",
      description: "Format, validate, and beautify JSON data with syntax highlighting",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "unit-converter",
      icon: Ruler,
      title: "Unit Converter",
      description: "Convert length, weight, and temperature measurements",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "random-number",
      icon: Sparkles,
      title: "Random Number Generator",
      description: "Generate random numbers with statistics and batch generation",
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "uuid-generator",
      icon: Key,
      title: "UUID Generator",
      description: "Generate unique UUIDs for your applications instantly",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "timestamp-converter",
      icon: Clock,
      title: "Timestamp Converter",
      description: "Convert Unix timestamps to human-readable dates and vice versa",
      color: "from-sky-500 to-blue-500",
    },
    {
      id: "color-converter",
      icon: Palette,
      title: "Color Converter",
      description: "Convert colors between HEX, RGB, HSL formats with live preview",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "decision-wheel",
      icon: CircleDashed,
      title: "Decision Wheel",
      description: "Make decisions fun with our interactive spinning wheel",
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "whitespace-converter",
      icon: Type,
      title: "Whitespace Converter",
      description: "Clean and normalize whitespace in your text",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "random-grouping",
      icon: Users,
      title: "Random Grouping",
      description: "Randomly divide people into groups for teams or activities",
      color: "from-indigo-500 to-violet-500",
    },
    {
      id: "pomodoro-timer",
      icon: Timer,
      title: "Pomodoro Timer",
      description: "Boost productivity with the Pomodoro technique timer",
      color: "from-red-500 to-pink-500",
    },
  ]

  const features = [
    {
      icon: CheckCircle2,
      title: "Easy to Use",
      description: "Simple and intuitive interface",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays with you",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in 2 languages",
    },
    {
      icon: Heart,
      title: "Made with Care",
      description: "Crafted for developers",
    },
  ]

  const handleToolClick = (toolId: string) => {
    router.push(`/en/tools/${toolId}`)
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="relative min-h-screen">
          {/* Warm, inviting background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 -z-10">
            {/* Soft, organic shapes */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="flex flex-col gap-16 p-6 md:p-12 max-w-7xl mx-auto">
            {/* Hero Section - Warm and welcoming */}
            <div className="text-center space-y-8 pt-12 pb-8">
              {/* Friendly badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span className="text-sm font-medium text-slate-700">Tools that make you smile</span>
              </div>

              {/* Main title - Friendly and approachable */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
                  GlobalUtils
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Privacy-first online utilities for developers. Fast, free, and secure.
                </p>
              </div>

              {/* CTA buttons - Friendly and inviting */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  onClick={() => router.push('/en/tools/json-formatter')}
                  className="group px-8 py-6 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/en/tools')}
                  className="px-8 py-6 border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  Explore All Tools
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/zh-TW')}
                  className="px-8 py-6 border-2 border-slate-300 hover:border-violet-400 hover:bg-violet-50 text-slate-700 hover:text-violet-700 font-semibold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  中文版本
                </Button>
              </div>
            </div>

            {/* Features section - Clear benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white/60 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tools grid - Clean and card-based */}
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  Our Tools
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Simple, powerful tools designed to make your work easier
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allTools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="group border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer hover:-translate-y-1 overflow-hidden"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <CardHeader className="space-y-4">
                      {/* Icon with gradient background */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>

                      <div className="space-y-2">
                        <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-base text-slate-600 leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Button
                        variant="ghost"
                        className={`w-full group-hover:bg-gradient-to-r group-hover:${tool.color} text-slate-700 group-hover:text-white font-medium transition-all duration-300 rounded-xl border-2 border-slate-200 group-hover:border-0`}
                      >
                        <span className="flex items-center gap-2">
                          Try it now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA section - Warm and inviting */}
            <div className="text-center pt-8 pb-12">
              <Card className="border-0 bg-gradient-to-br from-blue-500 to-violet-500 shadow-2xl shadow-blue-500/25 rounded-3xl overflow-hidden">
                <CardContent className="p-12 md:p-16 text-center space-y-6 relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />

                  <div className="relative space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Heart className="w-4 h-4 text-white fill-white" />
                      <span className="text-sm font-medium text-white">Made with love</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      Ready to boost your productivity?
                    </h3>

                    <p className="text-lg text-blue-50 leading-relaxed max-w-2xl mx-auto">
                      Join thousands of developers who use our tools every day to work smarter, not harder.
                    </p>

                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => router.push('/en/tools/json-formatter')}
                      className="group px-8 py-6 bg-white hover:bg-blue-50 text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className="flex items-center gap-2">
                        Start Using Tools
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
