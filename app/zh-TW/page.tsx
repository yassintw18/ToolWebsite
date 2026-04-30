"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Hash, Sparkles, ArrowRight, Globe, Zap, Shield, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function ChineseHomePage() {
  const router = useRouter()

  const tools = [
    {
      id: "json-formatter",
      title: "JSON 格式化工具",
      description: "格式化、驗證和美化 JSON 數據，支持語法高亮",
      icon: FileJson,
      path: "/zh-TW/tools/json-formatter",
      color: "from-blue-500 to-purple-600",
      badge: "可用"
    },
    {
      id: "uuid-generator",
      title: "UUID 生成器",
      description: "為您的應用程序即時生成唯一的 UUID",
      icon: Hash,
      path: "/zh-TW/tools/uuid-generator",
      color: "from-purple-500 to-pink-600",
      badge: "可用"
    },
    {
      id: "random-number",
      title: "隨機數生成器",
      description: "在自定義範圍內生成隨機數字",
      icon: Sparkles,
      path: "/zh-TW/tools/random-number",
      color: "from-green-500 to-blue-600",
      badge: "即將推出"
    }
  ]

  const features = [
    {
      icon: Globe,
      title: "多語言支持",
      description: "提供英文和中文版本"
    },
    {
      icon: Zap,
      title: "極速體驗",
      description: "所有工具都在瀏覽器本地運行"
    },
    {
      icon: Shield,
      title: "隱私優先",
      description: "不收集任何數據，完全私密"
    },
    {
      icon: TrendingUp,
      title: "專業工具",
      description: "為開發者提供高品質實用工具"
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
              10 個專業開發者工具
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              GlobalUtils
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              隱私優先的在線開發者實用工具。快速、免費、安全。
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => router.push('/zh-TW/tools')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                探索所有工具 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => router.push('/en')}
                size="lg"
                variant="outline"
              >
                English Version
              </Button>
            </div>
          </div>

          {/* Featured Tools */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-2xl font-bold">精選工具</h2>
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
                        tool.badge === "可用"
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
                      打開工具 <ArrowRight className="ml-2 h-4 w-4" />
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
              <h2 className="text-2xl font-bold mb-2">準備提升您的工作效率了嗎？</h2>
              <p className="text-blue-50 mb-4">所有工具都是免費的、快速的，並且可以離線使用。</p>
              <Button
                onClick={() => router.push('/zh-TW/tools')}
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                開始使用 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
