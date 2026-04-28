"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AdBanner } from "@/components/ad-banner"
import { RandomGrouping } from "@/components/tools/random-grouping"
import { useTranslations } from 'next-intl'

export default function RandomGroupingPage() {
  const t = useTranslations('tools.randomGrouping')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={t('title')} />
        <div className="flex flex-1 flex-col">
          <AdBanner position="top" />
          <main className="flex-1 overflow-auto">
            <RandomGrouping />
          </main>
          <AdBanner position="bottom" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
