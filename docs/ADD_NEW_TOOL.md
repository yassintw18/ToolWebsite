# 添加新工具指南

本指南將幫助您為 GlobalUtils 添加新工具。

## 🚀 快速開始

### 1. 建立工具組件

在 `components/tools/` 目錄中創建新文件：

```bash
# 例如：添加 QR 碼生成器
components/tools/qr-code-generator.tsx
```

### 2. 使用基礎模板

複製 `components/tools/base-tool.tsx` 作為起點：

```tsx
"use client"

import * as React from "react"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function YourNewTool() {
  const t = useTranslations('tools.yourNewTool')

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <h2 className="text-xl font-semibold">{t('title')}</h2>
      {/* 您的工具內容 */}
    </div>
  )
}
```

### 3. 添加翻譯

在所有語言文件中添加翻譯：

**messages/en.json**:
```json
{
  "tools": {
    "yourNewTool": {
      "title": "Your New Tool",
      "description": "Description of your tool",
      "input": "Input",
      "output": "Output"
    }
  }
}
```

**messages/zh-TW.json**:
```json
{
  "tools": {
    "yourNewTool": {
      "title": "您的新工具",
      "description": "工具描述",
      "input": "輸入",
      "output": "輸出"
    }
  }
}
```

**messages/ja.json**:
```json
{
  "tools": {
    "yourNewTool": {
      "title": "新しいツール",
      "description": "ツールの説明",
      "input": "入力",
      "output": "出力"
    }
  }
}
```

### 4. 創建頁面路由

創建對應的頁面文件：

```bash
app/[locale]/tools/your-new-tool/page.tsx
```

```tsx
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AdBanner } from "@/components/ad-banner"
import { YourNewTool } from "@/components/tools/your-new-tool"
import { useTranslations } from 'next-intl'

export default function YourNewToolPage() {
  const t = useTranslations('tools.yourNewTool')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title={t('title')} />
        <div className="flex flex-1 flex-col">
          <AdBanner position="top" />
          <main className="flex-1 overflow-auto">
            <YourNewTool />
          </main>
          <AdBanner position="bottom" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### 5. 更新側邊欄

編輯 `components/app-sidebar.tsx`：

```tsx
const tools = [
  { id: "json-formatter", icon: FileJson, translationKey: "tools.jsonFormatter.title" },
  { id: "unit-converter", icon: Ruler, translationKey: "tools.unitConverter.title" },
  { id: "random-number", icon: Sparkles, translationKey: "tools.randomNumber.title" },
  // 添加您的工具
  { id: "your-new-tool", icon: Settings, translationKey: "tools.yourNewTool.title" },
]
```

### 6. 更新 Sitemap

編輯 `app/[locale]/sitemap.ts`：

```tsx
const toolRoutes = locales.flatMap((locale) => [
  // 現有工具...
  {
    url: `${baseUrl}/${locale}/tools/your-new-tool`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
])
```

## 📋 工具類型範例

### 文字處理工具
- Base64 編碼器/解碼器
- URL 編碼器/解碼器
- 文字計數器
- 大小寫轉換器

### 格式化工具
- JSON 格式化器 ✅ (已實現)
- XML 格式化器
- SQL 格式化器
- HTML 美化器

### 轉換器工具
- 單位轉換器 ✅ (已實現)
- 時間戳轉換器
- 顏色轉換器
- 圖片格式轉換器

### 生成器工具
- 隨機數生成器 ✅ (已實現)
- UUID 生成器
- QR 碼生成器
- 密碼生成器

## 🎨 設計指南

### UI 原則
1. **一致性**: 使用相同的佈局模式
2. **響應式**: 確保在所有設備上正常工作
3. **可訪問性**: 使用適當的 ARIA 標籤
4. **錯誤處理**: 提供清晰的錯誤訊息

### 功能要求
1. **客戶端處理**: 所有邏輯必須在瀏覽器中執行
2. **即時反饋**: 提供即時處理結果
3. **複製功能**: 允許用戶複製結果
4. **清除功能**: 提供重置選項

## 🧪 測試清單

- [ ] 工具在所有語言下正常工作
- [ ] 響應式設計在手機上正常
- [ ] 錯誤處理正確顯示
- [ ] 複製功能正常工作
- [ ] 清除功能重置所有狀態
- [ ] 鍵盤導航支援
- [ ] 深色模式兼容

## 📚 相關文件

- [Next.js 文檔](https://nextjs.org/docs)
- [Shadcn/ui 組件](https://ui.shadcn.com/)
- [next-intl 文檔](https://next-intl-docs.vercel.app/)
- [Lucide 圖示](https://lucide.dev/)

## 🆘 需要幫助？

如果您在添加新工具時遇到問題：

1. 檢查現有工具的實現
2. 確保翻譯在所有語言文件中都存在
3. 驗證路由和頁面結構
4. 測試響應式設計

---

**提示**: 從簡單的工具開始，逐步增加複雜性！
