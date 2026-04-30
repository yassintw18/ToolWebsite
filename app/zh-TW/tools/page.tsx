"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Ruler, Sparkles, Hash, Palette, HelpCircle, ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function ChineseToolsPage() {
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
    },
    {
      id: "uuid-generator",
      title: "UUID 生成器",
      description: "為您的應用程序生成唯一的 UUID",
      icon: Hash,
      path: "/zh-TW/tools/uuid-generator"
    },
    {
      id: "timestamp-converter",
      title: "時間戳轉換器",
      description: "將 Unix 時間戳轉換為人類可讀的日期",
      icon: Hash,
      path: "/zh-TW/tools/timestamp-converter"
    },
    {
      id: "color-converter",
      title: "顏色轉換器",
      description: "在 HEX、RGB、HSL 格式之間轉換顏色",
      icon: Palette,
      path: "/zh-TW/tools/color-converter"
    }
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              所有開發者工具
            </h1>
            <p className="text-muted-foreground">
              隱私優先的在線實用工具完整集合
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
              <CardTitle>更多工具即將推出</CardTitle>
              <CardDescription>
                我們不斷添加新的開發者實用工具。敬請期待！
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
