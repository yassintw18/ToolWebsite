# 🌐 Cloudflare Pages 部署指南

## 🚀 **為什麼選擇 Cloudflare Pages？**

### **優勢**
✅ **完全免費** - 無限制流量和請求
✅ **全球 CDN** - 200+ 城市節點（包括台灣、香港、日本）
✅ **速度快** - 邊緣計算，亞洲地區極速
✅ **自動 HTTPS** - 免費 SSL 證書
✅ **自動部署** - Git 推送自動更新
✅ **DDoS 防護** - Cloudflare 知名的安全防護

### **比較 Vercel vs Cloudflare**

| 功能 | Vercel 免費 | Cloudflare Pages 免費 |
|------|------------|---------------------|
| 每月流量 | 100GB | 無限制 |
| 請求次數 | 100K | 無限制 |
| 亞洲節點 | 有限 | 豐富（含台灣） |
| 帶寬費用 | 超過付費 | 完全免費 |
| 多區域 | ❌ 付費功能 | ✅ 免費內建 |

---

## 📋 **部署步驟**

### **步驟 1: 註冊 Cloudflare 帳號** (3 分鐘)

1. 前往: https://dash.cloudflare.com/sign-up
2. 使用 Email 註冊
3. 驗證 Email

### **步驟 2: 連接 GitHub** (2 分鐘)

1. 登入 Cloudflare Dashboard
2. 點擊 "Workers & Pages"
3. 點擊 "Create application"
4. 選擇 "Pages" 標籤
5. 點擊 "Connect to Git"

### **步驟 3: 選擇 GitHub 專案** (1 分鐘)

1. 選擇你的 GitHub 帳號
2. 找到 `ToolWebsite` 專案
3. 點擊 "Begin setup"

### **步驟 4: 設定構建配置** (2 分鐘)

在 "Build settings" 填入:

```
Project name: ToolWebsite (或自訂)
Production branch: main
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: dist
```

### **步驟 5: 環境變數** (可選)

如果你要使用 Google Analytics:

1. 點擊 "Environment variables"
2. 添加:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   ```
3. 點擊 "Save"

### **步驟 6: 部署** (1 分鐘)

1. 點擊 "Save and Deploy"
2. 等待 2-3 分鐘
3. 🎉 完成！

---

## 🔧 **專案已完成的設定**

✅ **Next.js 靜態導出配置**
- `next.config.mjs` 已設定為靜態導出
- `output: 'export'` 已啟用
- `trailingSlash: true` 確保路由正確

✅ **Cloudflare Headers**
- `public/_headers` 已設定安全標頭
- XSS 保護、Frame 選項等

✅ **Cloudflare Redirects**
- `public/_redirects` 處理語言路由
- 支援 /en, /zh-TW, /ja

---

## 🌐 **部署後**

### **獲得網站 URL**

Cloudflare 會提供:
- **臨時域名**: `https://toolwebsite.pages.dev`
- **或自訂**: `https://your-project-name.pages.dev`

### **測試網站**

```bash
# 主頁
https://your-project.pages.dev

# 英文工具
https://your-project.pages.dev/en/tools/json-formatter

# 中文工具
https://your-project.pages.dev/zh-TW/tools/json-formatter
```

---

## 🎯 **設置自訂域名** (可選)

### **方法 1: 使用 Cloudflare 託管域名**

1. 在 Cloudflare 買入域名
2. 在 Pages 專案點擊 "Custom domains"
3. 添加域名: `globalutils.com`
4. 自動 DNS 設定完成 ✅

### **方法 2: 使用外部域名**

1. 在 Pages 專案點擊 "Custom domains"
2. 添加你的域名
3. Cloudflare 提供DNS記錄
4. 在你的域名註冊商添加DNS

---

## 📊 **監控和分析**

### **Cloudflare Analytics**

1. 進入你的 Pages 專案
2. 點擊 "Analytics" 標籤
3. 查看:
   - 訪問量
   - 地理分佈
   - 效能指標

### **Google Analytics**

如果設置了 NEXT_PUBLIC_GA_ID:
1. 等待 24-48 小時
2. 在 Google Analytics 查看數據
3. 追蹤用戶行為

---

## 🚀 **自動部署**

部署完成後，每次推送程式碼到 GitHub:

```bash
git add .
git commit -m "Add new feature"
git push
```

Cloudflare 會自動:
1. 檢測到更新
2. 構建新版本
3. 部署到全球 CDN
4. 更新所有節點

**時間**: 1-2 分鐘 ⚡

---

## ✅ **檢查清單**

### **部署前**
- [ ] 程式碼已推送到 GitHub
- [ ] GitHub 專案為公開
- [ ] 本地構建成功

### **部署後**
- [ ] 網站可以訪問
- [ ] 所有工具正常運作
- [ ] 三種語言正常
- [ ] 手機版正常顯示
- [ ] 效能快速

---

## 🎁 **額外功能**

### **1. Preview 部署**

每次创建 PR 或推送到其他分支:
- Cloudflare 自動建立預覽網站
- 測試新功能
- 不影響正式站

### **2. 回滾**

如果不滿意更新:
1. 進入 Pages 專案
2. 點擊 "Deployments"
3. 選擇之前的版本
4. 點擊 "Rollback"

### **3. 分支部署**

```
main 分支 → 生產環境
dev 分支  → 開發環境
feature/*  → 預覽環境
```

---

## 💡 **常見問題**

### **Q: 構建失敗怎麼辦?**
A: 檢查:
1. 構建命令是否正確
2. 輸出目錄是否為 `dist`
3. GitHub 構建日誌

### **Q: 如何更新網站?**
A: 只需推送到 GitHub:
```bash
git add .
git commit -m "Update"
git push
```

### **Q: 流量限制?**
A: **完全無限制**！這就是 Cloudflare 的優勢。

### **Q: 可以免費嗎?**
A: **永遠免費**，無隱藏費用。

---

## 🎉 **準備好了嗎？**

### **立即開始:**

1. **前往**: https://dash.cloudflare.com/sign-up
2. **連接**: 你的 GitHub
3. **部署**: ToolWebsite 專案
4. **上線**: 5 分鐘內完成！

---

**需要幫助嗎？** 隨時問我！🚀
