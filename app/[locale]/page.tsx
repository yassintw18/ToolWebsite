"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AdBanner } from "@/components/ad-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Ruler, Sparkles, ArrowRight } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Home() {
  const t = useTranslations('common')
  const router = useRouter()
  const locale = useLocale()

  const tools = [
    {
      id: "json-formatter",
      icon: FileJson,
      title: t('tools.jsonFormatter.title'),
      description: t('tools.jsonFormatter.description'),
      color: "text-blue-500"
    },
    {
      id: "unit-converter",
      icon: Ruler,
      title: t('tools.unitConverter.title'),
      description: t('tools.unitConverter.description'),
      color: "text-green-500"
    },
    {
      id: "random-number",
      icon: Sparkles,
      title: t('tools.randomNumber.title'),
      description: t('tools.randomNumber.description'),
      color: "text-purple-500"
    },
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
            <div className="flex flex-col gap-6 p-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground mb-2">{t('appName')}</h1>
                <p className="text-lg text-muted-foreground">{t('tagline')}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-muted ${tool.color}`}>
                          <tool.icon className="size-6" />
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Open Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
          <AdBanner position="bottom" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
