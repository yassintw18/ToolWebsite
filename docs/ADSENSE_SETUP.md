# Google AdSense 設置指南

本指南將幫助您為 GlobalUtils 網站設置 Google AdSense 廣告。

## 📋 前置要求

1. **Google AdSense 帳號**
   - 訪問 [https://www.google.com/adsense](https://www.google.com/adsense)
   - 使用 Google 帳號登入
   - 創建新 AdSense 帳號

2. **已部署的網站**
   - 網站必須已經部署並有實際域名
   - 網站需要有原創內容
   - 網站必須符合 AdSense 政策

## 🚀 設置步驟

### 1. 申請 AdSense 帳號

1. 訪問 [Google AdSense](https://www.google.com/adsense/start/)
2. 輸入網站 URL：`https://yourdomain.com`
3. 選擇語言和國家/地區
4. 填寫付款資訊（可稍後完成）

### 2. 驗證網站

Google 會要求您驗證網站所有權：

#### 方法 1: HTML 文件驗證
```html
<!-- 下載驗證文件並上傳到 public/ 目錄 -->
<!-- 例如：public/google123456789.html -->
```

#### 方法 2: DNS 驗證
```
TXT @ v=spf1 include:_spf.google.com ~all
```

#### 方法 3: Google Analytics 驗證
如果您已經設置 Google Analytics

### 3. 獲取 AdSense 代碼

1. 登入 AdSense 控制台
2. 前前往 **「廣告」** → **「概覽」**
3. 複製您的 **AdSense 代碼** (格式：`ca-pub-XXXXXXXXXXXXXXXX`)

### 4. 配置環境變數

在您的部署平台添加環境變數：

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

#### Vercel 設置：
1. 前往項目設置
2. 點擊 **「Environment Variables」**
3. 添加 `NEXT_PUBLIC_ADSENSE_ID`
4. 重新部署項目

#### 本地開發：
```bash
# .env.local
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### 5. 創建廣告單元

1. 在 AdSense 控制台，前往 **「廣告」** → **「依網站」**
2. 點擊 **「建立廣告單元」**
3. 選擇廣告類型：
   - **橫幅廣告** (Banner) - 適合頁首頁尾
   - **文章內廣告** - 適合內容中間
   - **側邊欄廣告** - 適合側邊欄

4. 自訂廣告樣式：
   - 尺寸：響應式
   - 顏色：配合您的品牌
   - 圓角：開啟

5. 複製 **廣告代碼** 中的 `data-ad-slot` 值

### 6. 更新廣告配置

編輯 `components/google-adsense.tsx`：

```tsx
export const adUnits = {
  'top-banner': '1234567890', // 替換為實際的 AdSense ad slot ID
  'bottom-banner': '0987654321',
  'sidebar': '1122334455',
  'in-article': '5566778899',
}
```

### 7. 添加廣告到頁面

在需要的頁面中添加廣告組件：

```tsx
import { GoogleAdSense } from '@/components/google-adsense'

export default function ToolPage() {
  return (
    <div>
      {/* 頂部廣告 */}
      <GoogleAdSense adSlot="1234567890" adFormat="horizontal" />

      {/* 工具內容 */}
      <YourTool />

      {/* 底部廣告 */}
      <GoogleAdSense adSlot="0987654321" adFormat="horizontal" />
    </div>
  )
}
```

## 📊 廣告位置建議

### 最佳廣告位置：
1. **頁首橫幅** (728x90) - 在工具上方
2. **側邊欄** (300x250) - 在導航欄下方
3. **頁尾橫幅** (728x90) - 在工具下方
4. **內容間** (自適應) - 在工具結果中間

### 避免的位置：
- ❌ 不要過度堆疊廣告
- ❌ 不要干擾工具使用
- ❌ 不要放在移動設備的固定位置

## 💰 收益優化

### 提高收益的方法：

1. **提升流量**
   - SEO 優化
   - 內容行銷
   - 社群媒體推廣

2. **改善用戶體驗**
   - 快速載入速度
   - 響應式設計
   - 高質量工具

3. **測試廣告位置**
   - A/B 測試
   - 熱力圖分析
   - 用戶行為追蹤

4. **遵守 AdSense 政策**
   - 不點擊自己的廣告
   - 不鼓勵他人點擊
   - 提供高質量內容

## 🔍 故障排除

### 廣告不顯示：

1. **檢查環境變數**
   ```bash
   echo $NEXT_PUBLIC_ADSENSE_ID
   ```

2. **檢查生產環境**
   - 廣告只在生產環境顯示
   - 本地開發不會顯示廣告

3. **檢查瀏覽器控制台**
   ```javascript
   // 查看是否有 AdSense 相關錯誤
   console.log(window.adsbygoogle)
   ```

4. **等待審核**
   - 新 AdSense 帳號需要 1-2 週審核
   - 審核期間可能不顯示廣告

### 常見錯誤：

**「找不到可投放的廣告」**
- 確認 AdSense 帳號已獲批准
- 等待 24-48 小時讓廣告庫建立

**「網站尚未審核」**
- 繼續添加高質量內容
- 確保網站符合 AdSense 政策
- 等待審核完成

## 📈 分析和報告

### 追蹤廣告表現：

1. **AdSense 控制台**
   - 每日收益
   - CPM (每千次展示成本)
   - CPC (每次點擊成本)
   - CTR (點擊率)

2. **Google Analytics**
   - 用戶行為
   - 頁面停留時間
   - 跳出率

### 目標指標：
- **CTR**: 1-3% (正常)
- **CPM**: $5-20 (根據地區和主題)
- **收益**: 根據流量和 CPM

## 🎯 合規性

### AdSense 政策要求：

✅ **允許的內容：**
- 原創工具和內容
- 教育和技術內容
- 有用的開發者工具

❌ **禁止的內容：**
- 侵權內容
- 危險內容
- 詐騙或欺詐
- 成人內容

### 隱私政策：
必須在網站上包含隱私政策，說明：
- 使用 cookies
- Google AdSense 使用
- 數據收集實踐

## 🔗 相關鏈接

- [AdSense 說明中心](https://support.google.com/adsense)
- [AdSense 政策](https://support.google.com/adsense/answer/48182)
- [最佳化指南](https://support.google.com/adsense/answer/17915)

---

**注意**: 設置 AdSense 後，請確保定期檢查您的收益和廣告表現，並根據需要調整策略。
