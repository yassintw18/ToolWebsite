"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { locales, type Locale } from "@/i18n"

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "zh-TW" as Locale, name: "繁體中文", flag: "🇹🇼" },
  { code: "ja" as Locale, name: "日本語", flag: "🇯🇵" },
]

export function LanguageDropdown() {
  const pathname = usePathname()
  const router = useRouter()

  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] as Locale || 'en'
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  const handleLanguageChange = (newLocale: Locale) => {
    // Replace the locale in the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPathname = segments.join('/')
    router.push(newPathname)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="size-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage.code === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
