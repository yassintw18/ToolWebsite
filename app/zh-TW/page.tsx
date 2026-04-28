"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Ruler, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function ChineseHomePage() {
  const router = useRouter()

  const tools = [
    {
      id: "json-formatter",
      title: "JSON 格式化工具",
      description: "格式化和驗證 JSON 數據，支持語法高亮",
      icon: FileJson,
      path: "/zh-TW/tools/json-formatter"
    },
    {
      id: "unit-converter",
      title: "單位轉換器",
      description: "在不同測量單位之間進行轉換",
      icon: Ruler,
      path: "/zh-TW/tools/unit-converter"
    },
    {
      id: "random-number",
      title: "隨機數生成器",
      description: "在自定義範圍內生成隨機數字",
      icon: Sparkles,
      path: "/zh-TW/tools/random-number"
    }
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              開發者工具
            </h1>
            <p className="text-muted-foreground">
              隱私優先的在線開發者實用工具
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <tool.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => router.push(tool.path)}
                    className="w-full"
                  >
                    打開工具 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>所有工具</CardTitle>
              <CardDescription>
                瀏覽我們完整的開發者實用工具集合
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/zh-TW/tools')}>
                查看全部 10 個工具 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
