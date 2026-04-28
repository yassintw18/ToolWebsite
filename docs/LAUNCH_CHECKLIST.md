# 🚀 GlobalUtils 上線準備指南

## 📋 **需要準備的帳號和資料**

### **✅ 立即需要 (免費服務)**

#### 1. **Vercel 帳號** (部署平台)
- **網址**: https://vercel.com
- **費用**: 免費方案 (Hobby plan)
- **需要**: 
  - Email 帳號 (Google/GitHub 推薦)
  - 信用卡 (免費方案不需要，但建議準備)
- **用途**: 託管您的網站
- **設定時間**: 5 分鐘

#### 2. **Google Analytics 帳號** (流量分析)
- **網址**: https://analytics.google.com
- **費用**: 完全免費
- **需要**:
  - Google 帳號
- **用途**: 追蹤網站流量和用戶行為
- **設定時間**: 10 分鐘
- **獲取代碼**: 
  1. 登入 Google Analytics
  2. 建立「資源」(Property)
  3. 選擇「網站」
  4. 獲取 GA_ID (格式: G-XXXXXXXXXX)

#### 3. **Google Search Console** (SEO 監控)
- **網址**: https://search.google.com/search-console
- **費用**: 完全免費
- **需要**:
  - Google 帳號
- **用途**: 監控搜尋排名和 SEO 表現
- **設定時間**: 5 分鐘

---

### **⏳ 後續需要 (可選)**

#### 4. **域名 (Domain Name)** (可選但強烈建議)
- **推薦註冊商**:
  - GoDaddy (https://godaddy.com)
  - Namecheap (https://namecheap.com)
  - Cloudflare (https://cloudflare.com)
- **費用**: $10-15 USD/年
- **建議域名**:
  - `globalutils.com`
  - `globalutils.io`
  - `globalutils.tools`
- **用途**: 專業品牌形象

#### 5. **Google AdSense** (廣告收益)
- **網址**: https://adsense.google.com
- **費用**: 免費申請
- **需要**:
  - Google 帳號
  - 網站已上線並有內容
  - 銀行帳戶 (收款用)
- **用途**: 賺取廣告收益
- **申請時間**: 網站上線後 1-2 週

---

## 🔧 **環境變數設定 (.env.local)**

### **步驟 1: 建立 .env.local 文件**

在專案根目錄創建 `.env.local` 文件：

```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

### **步驟 2: 編輯 .env.local**

```env
# =====================================
# 必須設定 (上線前必須填寫)
# =====================================

# 網站 URL (部署後替換為實際域名)
NEXT_PUBLIC_SITE_URL=https://globalutils.vercel.app

# 環境模式
NODE_ENV=production

# =====================================
# 強烈建議 (流量分析)
# =====================================

# Google Analytics ID (從 Google Analytics 獲取)
# 格式: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# =====================================
# 可選設定 (上線後再設定)
# =====================================

# Google AdSense ID (從 AdSense 獲取)
# 格式: ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=
```

### **步驟 3: 獲取 Google Analytics ID**

1. 訪問 https://analytics.google.com
2. 使用 Google 帳號登入
3. 點擊「開始測量」
4. 建立帳號名稱: "GlobalUtils"
5. 建立資源名稱: "GlobalUtils Website"
6. 選擇業別: "科技"
7. 選擇時區: "台灣" 或您的時區
8. 點擊「建立」並接受條款
9. 選擇平台: 「網站」
10. 輸入網站 URL: `https://globalutils.vercel.app`
11. 複製您的 **GA_ID** (格式: G-XXXXXXXXXX)

---

## 🚀 **部署步驟**

### **階段 1: Vercel 部署** (30 分鐘)

#### **1. 註冊 Vercel**
1. 訪問 https://vercel.com
2. 點擊 "Sign Up"
3. 使用 GitHub 帳號登入 (推薦) 或 Email
4. 驗證 Email

#### **2. 匯入專案**
1. 登入 Vercel 後台
2. 點擊 "Add New Project"
3. 選擇 "Import Git Repository"
4. 如果專案在 GitHub:
   - 選擇您的 GitHub 帳號
   - 找到 ToolWebsite 專案
   - 點擊 "Import"
5. 如果專案不在 GitHub:
   - 先推送到 GitHub
   - 再回到步驟 2

#### **3. 設定環境變數**
在 Vercel 專案設定頁面:
1. 點擊 "Settings" → "Environment Variables"
2. 添加以下變數:
   ```
   NEXT_PUBLIC_SITE_URL = https://globalutils.vercel.app
   NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX (從 Google Analytics 獲取)
   NODE_ENV = production
   ```
3. 點擊 "Save"

#### **4. 部署**
1. 點擊 "Deploy" 按鈕
2. 等待部署完成 (通常 2-3 分鐘)
3. 獲得您的網站 URL: `https://globalutils.vercel.app`

#### **5. 驗證部署**
訪問您的網站並測試:
- 首頁: `https://globalutils.vercel.app`
- 英文版: `https://globalutils.vercel.app/en`
- 中文版: `https://globalutils.vercel.app/zh-TW`
- 日文版: `https://globalutils.vercel.app/ja`

---

### **階段 2: 設置網域名稱** (可選)

如果您購買了域名:

#### **1. 在 Vercel 添加域名**
1. Vercel 專案 → "Settings" → "Domains"
2. 點擊 "Add Domain"
3. 輸入您的域名: `globalutils.com`
4. 選擇 "www.globalutils.com" 重定向到 `globalutils.com`

#### **2. 設置 DNS**
Vercel 會提供 DNS 設置:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

在您的域名註冊商 (GoDaddy/Namecheap) 添加這些 DNS 記錄

#### **3. 更新 .env.local**
```env
NEXT_PUBLIC_SITE_URL=https://globalutils.com
```

---

### **階段 3: 設置 Google Search Console**

1. 訪問 https://search.google.com/search-console
2. 使用 Google 帳號登入
3. 選擇「網址字首」
4. 輸入您的網站 URL: `https://globalutils.vercel.app`
5. 點擊「繼續」

#### **驗證網站所有權**

**方法 1: HTML 標籤** (推薦)
1. 複製 Google 提供的 meta 標籤
2. 在您的 Next.js 專案中添加:
   - 文件位置: `app/layout.tsx`
   - 在 `<head>` 中添加 meta 標籤

**方法 2: Google Analytics** (最簡單)
1. 如果您已設置 Google Analytics
2. 選擇「Google Analytics 驗證」
3. 點擊「驗證」

#### **提交 Sitemap**
1. 在 Search Console 左側選單
2. 點擊「網站地圖」
3. 添加以下 URL:
   - `https://globalutils.vercel.app/sitemap.xml`
   - `https://globalutils.vercel.app/en/sitemap.xml`
   - `https://globalutils.vercel.app/zh-TW/sitemap.xml`
   - `https://globalutils.vercel.app/ja/sitemap.xml`

---

## ✅ **上線檢查清單**

### **上線前檢查** (必須完成)

- [ ] **所有工具功能正常**
  - [ ] JSON Formatter
  - [ ] Unit Converter
  - [ ] Random Number Generator
  - [ ] UUID Generator
  - [ ] Timestamp Converter
  - [ ] Color Converter
  - [ ] Decision Wheel
  - [ ] Whitespace Converter
  - [ ] Random Grouping
  - [ ] Pomodoro Timer

- [ ] **多語言測試**
  - [ ] 英文版正常
  - [ ] 中文版正常
  - [ ] 日文版正常
  - [ ] 語言切換功能正常

- [ ] **響應式設計**
  - [ ] 手機版正常 (320px+)
  - [ ] 平板版正常 (768px+)
  - [ ] 桌面版正常 (1024px+)

- [ ] **深色模式**
  - [ ] 切換功能正常
  - [ ] 所有工具在深色模式下正常

- [ ] **效能測試**
  - [ ] Lighthouse 分數 > 90
  - [ ] 首頁載入 < 2 秒
  - [ ] 工具載入 < 1 秒

- [ ] **SEO 檢查**
  - [ ] 所有頁面有 title
  - [ ] 所有頁面有 description
  - [ ] Sitemap 可訪問
  - [ ] robots.txt 可訪問

---

### **上線後檢查** (部署後立即檢查)

- [ ] **基礎功能**
  - [ ] 網站可訪問
  - [ ] 所有連結正常
  - [ ] 沒有 404 錯誤
  - [ ] 沒有 Console 錯誤

- [ ] **Analytics 設置**
  - [ ] Google Analytics 正常運作
  - [ ] 可以看到即時用戶
  - [ ] 事件追蹤正常

- [ ] **SEO 設置**
  - [ ] Search Console 驗證成功
  - [ ] Sitemap 已提交
  - [ ] robots.txt 可訪問

---

## 📊 **監控和維護**

### **每週檢查**
- Google Analytics 流量報告
- Search Console 效能報告
- 錯誤日誌檢查

### **每月任務**
- 更新 1-2 個新工具
- 優化 SEO
- 分析用戶反饋

### **每季度任務**
- 依賴套件更新
- 安全性檢查
- 效能優化

---

## 💰 **成本預估**

### **初期成本** (第一個月)
- **Vercel**: 免費 (Hobby plan)
- **域名**: $10-15 USD (可選)
- **總計**: **$0-15 USD**

### **每月成本**
- **Vercel**: 免費 (Hobby plan: 100GB bandwidth/month)
- **域名**: $1-2 USD/月 (如果購買)
- **總計**: **$0-2 USD/月**

### **何時需要付費方案?**
Vercel Hobby 限制:
- 100GB 帶寬/月
- 無限部署
- 無邊緣函數限制

升級 Pro ($20/月) 當:
- 月流量 > 100GB
- 需要更多邊緣函數執行時間

---

## 🎯 **建議時間表**

### **Day 1** (今天 - 2 小時)
1. ✅ 註冊 Vercel 帳號
2. ✅ 註冊 Google Analytics
3. ✅ 設置 .env.local
4. ✅ 部署到 Vercel
5. ✅ 基礎測試

### **Day 2** (明天 - 1 小時)
1. ✅ 設置 Google Search Console
2. ✅ 全面功能測試
3. ✅ 效能優化
4. ✅ SEO 驗證

### **Day 3-7** (本週)
1. ✅ 修復任何 bug
2. ✅ 準備行銷內容
3. ✅ 社交媒體設置
4. ✅ 收集早期用戶反饋

### **Week 2-4**
1. ⏳ 申請 Google AdSense
2. ⏳ 添加 2-3 個新工具
3. ⏳ SEO 優化
4. ⏳ 內容行銷

---

## ❓ **常見問題**

### **Q: 需要信用卡嗎?**
A: 
- Vercel 免費方案: 不需要
- 購買域名: 需要
- Google 服務: 不需要

### **Q: 可以先免費部署嗎?**
A: 可以！Vercel 免費方案完全夠用。

### **Q: 需要自己的伺服器嗎?**
A: 不需要。Vercel 提供託管服務。

### **Q: 如何知道網站成功了?**
A: 
1. 可以訪問網站 URL
2. Google Analytics 顯示訪客
3. Search Console 顯示索引狀態

### **Q: 可以隨時更新嗎?**
A: 可以！每次 GitHub 推送會自動部署。

---

## 🎁 **額外建議**

### **可選但推薦**
1. **購買域名** - 更專業
2. **設置 Email** - `contact@globalutils.com`
3. **社交媒體** - Twitter/X, Facebook
4. **隱私政策頁面** - 法律要求

### **行銷推廣**
1. **Product Hunt** - 發布產品
2. **Hacker News** - 技術社群
3. **Reddit** - r/webdev, r/InternetIsBeautiful
4. **Twitter/X** - 分享工具

---

**準備好了嗎？讓我們開始部署吧！** 🚀
