"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { LanguageDropdown } from "@/components/language-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title = "Developer Tools" }: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <LanguageDropdown />
        <ThemeToggle />
      </div>
    </header>
  )
}
