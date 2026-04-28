# 🎯 快速開始指南 - 30 分鐘上線

## 📝 **您現在需要的資料**

### **✅ 立即準備 (5 分鐘)**

1. **Google 帳號** (免費)
   - 如果沒有: https://accounts.google.com

2. **GitHub 帳號** (免費，強烈建議)
   - 如果沒有: https://github.com

3. **Email 地址**
   - 用於註冊服務

### **❌ 暫時不需要**
- ❌ 信用卡 (Vercel 免費方案不需要)
- ❌ 域名 (先免費部署，之後再買)
- ❌ 伺服器 (Vercel 提供託管)
- ❌ 付費服務

---

## 🚀 **三步驟上線**

### **步驟 1: Google Analytics** (10 分鐘)

1. **前往**: https://analytics.google.com
2. **登入**: 使用您的 Google 帳號
3. **建立帳號**:
   - 帳號名稱: `GlobalUtils`
   - 資源名稱: `GlobalUtils Website`
   - 網站 URL: `https://globalutils.vercel.app` (暫時)
   - 時區: `台灣` (或您的時區)
4. **獲取 ID**: 複製您的 **GA_ID** (格式: `G-XXXXXXXXXX`)

### **步驟 2: 更新 .env.local** (2 分鐘)

打開 `.env.local` 文件，填入您的 GA_ID:

```env
# Google Analytics ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 其他保持不變
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### **步驟 3: Vercel 部署** (15 分鐘)

#### **3.1 註冊 Vercel**
1. 前往: https://vercel.com
2. 點擊 "Sign Up"
3. 使用 **GitHub** 登入 (推薦)

#### **3.2 匯入專案**

**選項 A: 專案已在 GitHub** (最簡單)
1. Vercel 點擊 "Add New" → "Project"
2. 選擇 "Import Git Repository"
3. 找到 `ToolWebsite` 專案
4. 點擊 "Import"

**選項 B: 專案尚未在 GitHub** (需要先推送)
```bash
# 在專案目錄執行
cd ToolWebsite

# 初始化 Git (如果還沒有)
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
# 1. 在 GitHub 創建新專案: https://github.com/new
# 2. 然後執行:
git remote add origin https://github.com/YOUR_USERNAME/ToolWebsite.git
git branch -M main
git push -u origin main
```

然後回到「選項 A」步驟 2。

#### **3.3 設定環境變數**

在 Vercel 專案設定頁面:
1. 點擊 "Settings" → "Environment Variables"
2. 添加以下變數:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX (您的 GA ID)
   ```
3. 選擇環境: Production, Preview, Development
4. 點擊 "Save"

#### **3.4 部署**
1. 點擊 "Deploy" 按鈕
2. 等待 2-3 分鐘
3. 🎉 完成！您的網站已上線

#### **3.5 獲得網站 URL**

Vercel 會提供:
- **臨時域名**: `https://globalutils.vercel.app`
- **或自訂域名**: `https://your-project-name.vercel.app`

---

## ✅ **立即測試**

部署完成後，測試您的網站:

1. **主頁**: `https://your-domain.vercel.app`
2. **英文工具**: `https://your-domain.vercel.app/en/tools/json-formatter`
3. **中文工具**: `https://your-domain.vercel.app/zh-TW/tools/json-formatter`
4. **日文工具**: `https://your-domain.vercel.app/ja/tools/json-formatter`

---

## 🎯 **上線後立即做的事** (10 分鐘)

### **1. 更新 .env.local**
```env
# 改為實際的 Vercel 域名
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### **2. 設置 Google Search Console**
1. 前往: https://search.google.com/search-console
2. 添加網站: `https://your-domain.vercel.app`
3. 選擇「Google Analytics」驗證
4. 提交 sitemap: `https://your-domain.vercel.app/sitemap.xml`

### **3. 分享您的網站**
- Twitter/X: "我剛發布了一個多語言工具箱網站！"
- Facebook: 分享給朋友
- LinkedIn: 專業網絡

---

## 📊 **檢查部署狀態**

### **測試清單**
- [ ] 網站可以訪問
- [ ] 所有 10 個工具正常運作
- [ ] 三種語言都可以切換
- [ ] 手機版正常顯示
- [ ] Google Analytics 顯示訪客

### **快速測試連結**
```
主頁: /en
工具列表: /en/tools
JSON 格式化: /en/tools/json-formatter
單位轉換: /en/tools/unit-converter
隨機數生成: /en/tools/random-number
UUID 生成: /en/tools/uuid-generator
時間戳轉換: /en/tools/timestamp-converter
顏色轉換: /en/tools/color-converter
決策輪盤: /en/tools/decision-wheel
空白轉換: /en/tools/whitespace-converter
隨機分組: /en/tools/random-grouping
番茄鐘: /en/tools/pomodoro-timer
```

---

## 🎁 **常見問題速解**

### **Q: 部署失敗怎麼辦?**
A: 檢查:
1. GitHub 專案是否公開
2. package.json 是否正確
3. 是否有語法錯誤

### **Q: 網站打不開?**
A: 等待 1-2 分鐘讓 Vercel 完成 CDN 分發

### **Q: Google Analytics 沒數據?**
A: 正常，需要等待 24-48 小時才有數據

### **Q: 可以更改域名嗎?**
A: 可以！隨時在 Vercel 設置中添加自訂域名

### **Q: 需要多少錢?**
A: 目前 **$0**！Vercel 免費方案完全夠用。

---

## 🚀 **下一步?**

選擇一個:

**A. 立即開始部署** 👍
   - 按照「步驟 1-3」執行
   - 30 分鐘內上線

**B. 先了解更多**
   - 閱讀完整指南: [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)

**C. 需要幫助**
   - 詢問任何問題

---

**準備好開始了嗎？** 🎉

**選擇「步驟 1」開始您的部署之旅！**
