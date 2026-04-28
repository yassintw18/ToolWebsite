"use client"

import * as React from "react"
import {
  FileJson,
  Ruler,
  Sparkles,
  Wrench,
  Key,
  Clock,
  Palette,
  CircleDashed,
  Type,
  Users,
  Timer,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations, useLocale } from 'next-intl'
import { brandConfig } from '@/lib/brand'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

const tools = [
  { id: "json-formatter", icon: FileJson, translationKey: "tools.jsonFormatter.title" },
  { id: "unit-converter", icon: Ruler, translationKey: "tools.unitConverter.title" },
  { id: "random-number", icon: Sparkles, translationKey: "tools.randomNumber.title" },
  { id: "uuid-generator", icon: Key, translationKey: "tools.uuidGenerator.title" },
  { id: "timestamp-converter", icon: Clock, translationKey: "tools.timestampConverter.title" },
  { id: "color-converter", icon: Palette, translationKey: "tools.colorConverter.title" },
  { id: "decision-wheel", icon: CircleDashed, translationKey: "tools.decisionWheel.title" },
  { id: "whitespace-converter", icon: Type, translationKey: "tools.whitespaceConverter.title" },
  { id: "random-grouping", icon: Users, translationKey: "tools.randomGrouping.title" },
  { id: "pomodoro-timer", icon: Timer, translationKey: "tools.pomodoroTimer.title" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('common')

  // Get current tool from pathname
  const getCurrentTool = () => {
    const segments = pathname.split('/')
    const toolSegment = segments[segments.length - 1]
    return toolSegment === '' || toolSegment === locale ? 'json-formatter' : toolSegment
  }

  const currentTool = getCurrentTool()

  const handleToolClick = (toolId: string) => {
    router.push(`/${locale}/tools/${toolId}`)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-4" />
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            {brandConfig.siteName}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('tools')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((tool) => {
                const toolName = tool.translationKey.split('.').pop()
                return (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton
                      isActive={currentTool === tool.id}
                      tooltip={toolName}
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <tool.icon />
                      <span>{toolName}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          {brandConfig.footer.copyright}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
