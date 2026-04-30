"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileJson, Ruler, Sparkles, Hash, Palette, HelpCircle, ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function EnglishToolsPage() {
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
    },
    {
      id: "uuid-generator",
      title: "UUID Generator",
      description: "Generate unique UUIDs for your applications",
      icon: Hash,
      path: "/en/tools/uuid-generator"
    },
    {
      id: "timestamp-converter",
      title: "Timestamp Converter",
      description: "Convert Unix timestamps to human-readable dates",
      icon: Hash,
      path: "/en/tools/timestamp-converter"
    },
    {
      id: "color-converter",
      title: "Color Converter",
      description: "Convert colors between HEX, RGB, HSL formats",
      icon: Palette,
      path: "/en/tools/color-converter"
    }
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col gap-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              All Developer Tools
            </h1>
            <p className="text-muted-foreground">
              Complete collection of privacy-first online utilities
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
              <CardTitle>More Tools Coming Soon</CardTitle>
              <CardDescription>
                We're constantly adding new developer utilities. Stay tuned for more!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
