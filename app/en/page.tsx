"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Ruler, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function EnglishHomePage() {
  const router = useRouter()

  const tools = [
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Format and validate JSON data with syntax highlighting",
      icon: FileJson,
      path: "/en/tools/json-formatter"
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between different units of measurement",
      icon: Ruler,
      path: "/en/tools/unit-converter"
    },
    {
      id: "random-number",
      title: "Random Number Generator",
      description: "Generate random numbers within custom ranges",
      icon: Sparkles,
      path: "/en/tools/random-number"
    }
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Developer Tools
            </h1>
            <p className="text-muted-foreground">
              Privacy-first online utilities for developers
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
                    Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>All Tools</CardTitle>
              <CardDescription>
                Browse our complete collection of developer utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/en/tools')}>
                View All 10 Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
