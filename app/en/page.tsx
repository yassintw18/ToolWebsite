"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Hash, Sparkles, ArrowRight, Globe, Zap, Shield, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function EnglishHomePage() {
  const router = useRouter()

  const tools = [
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Format, validate, and beautify JSON data with syntax highlighting",
      icon: FileJson,
      path: "/en/tools/json-formatter",
      color: "from-blue-500 to-purple-600",
      badge: "Working"
    },
    {
      id: "uuid-generator",
      title: "UUID Generator",
      description: "Generate unique UUIDs for your applications instantly",
      icon: Hash,
      path: "/en/tools/uuid-generator",
      color: "from-purple-500 to-pink-600",
      badge: "Working"
    },
    {
      id: "random-number",
      title: "Random Number Generator",
      description: "Generate random numbers with statistics and batch generation",
      icon: Sparkles,
      path: "/en/tools/random-number",
      color: "from-green-500 to-blue-600",
      badge: "Working"
    },
    {
      id: "color-converter",
      title: "Color Converter",
      description: "Convert colors between HEX, RGB, HSL formats with live preview",
      icon: Globe,
      path: "/en/tools/color-converter",
      color: "from-pink-500 to-orange-600",
      badge: "Working"
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert length, weight, and temperature measurements",
      icon: Ruler,
      path: "/en/tools/unit-converter",
      color: "from-orange-500 to-red-600",
      badge: "Working"
    }
  ]

  const features = [
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in English and Chinese"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools run locally in your browser"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "No data collection, completely private"
    },
    {
      icon: TrendingUp,
      title: "Professional Tools",
      description: "High-quality utilities for developers"
    }
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col gap-8 p-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              10 Professional Developer Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              GlobalUtils
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Privacy-first online utilities for developers. Fast, free, and secure.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => router.push('/en/tools')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => router.push('/zh-TW')}
                size="lg"
                variant="outline"
              >
                中文版本
              </Button>
            </div>
          </div>

          {/* Featured Tools */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-2xl font-bold">Featured Tools</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 bg-gradient-to-br ${tool.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tool.badge === "Working"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}>
                        {tool.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{tool.title}</CardTitle>
                    <CardDescription className="text-base">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => router.push(tool.path)}
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-600 transition-all"
                    >
                      Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-blue-500">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to Boost Your Productivity?</h2>
              <p className="text-blue-50 mb-4">All tools are free, fast, and work offline.</p>
              <Button
                onClick={() => router.push('/en/tools')}
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
