# Frontend Folder Structure

前端資料夾結構會因應專案的大小和需求而有所不同，但有一些元素是所有專案共通的。本文將針對這些通用的資料夾進行整理，說明各個資料夾的層級和內容，幫助讀者了解前端專案的開發流程。

歡迎隨時更新或補充內容。 

※ 資料夾及檔案的命名須遵循 [Naming Convention](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md)，使用 `lower_snake_case`。

<img width="254" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/ea56b01a-c4db-4e80-998a-5cf1886fb887">

## /public

執行 npx create-next-app 時就存在的資料夾，用於存放靜態檔案 (Static Assets)，如圖片、HTML 文件、sitemap.xml (站點地圖) 等，這些檔案不須經過特殊處理即可直接在瀏覽器中訪問。

需要注意的是，public 是 Next.js 提供靜態資源的唯一目錄，所以這個資料夾名稱**不可任意更改**。

**※ 放置於此的檔案和資料夾命名須使用 `lower_snake_case`**

## /integration-list

如果有規劃專案的自動化測試，可以將測試相關的文件放在這個資料夾。通常會包含測試案例 (Test cases)、測試腳本 (Test script) 、測試結果 (Test results) 或其他測試相關的設定檔。

關於自動化 e2e 測試可以參考 [Cypress](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/e2e-test/cypress.md) 和 [Playwright](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/e2e-test/playwright.md) ，這裡有更詳盡的介紹。

## /prisma

如果專案有使用到 SQLite 或其他嵌入式資料庫，可能就會有這個資料夾，用於存放 Prisma 的配置文件和模型定義。

Prisma 是一個以 Node.js 為基礎的 ORM 工具，讓開發人員可以透過 JavaScript 或 TypeScript 來操作和管理資料庫，減少開發時間並降低錯誤的發生。關於 Prisma 安裝和設置的詳細說明可以參考 [Using SQLite with Next.js](https://github.com/CAFECA-IO/KnowledgeManagement/blob/ace9fdbf32aa658ff1db11216f819d1cebfcd407/NextJs/sqlite_with_nextjs.md)。

## /src

這是存放專案主要程式碼的資料夾，以下介紹的都是包含在 /src 底下的子資料夾。

---

## /components

存放專案的 React components (元件)，所有和 UI 相關的元件都應該放在這個資料夾下。

為了方便管理，我們在建立新的元件檔案時，會多包一層與元件同名的資料夾。舉例來說， navbar 這個元件，應該放在 `/components/navbar/navbar.tsx` 這個位置。

**※ 檔案命名須使用 `lower_snake_case` ，元件須使用 `UpperCamelCase` 。**

## /constants

專案中所用到的靜態常數、常數物件和類型別名 (Type Aliases) 都會集中在此定義或宣告。這些常數將作為專案的配置，或是特定功能的參數或變量。

**※ 檔案命名須使用 `lower_snake_case` ，常數物件須使用 `UpperCamelCase` 。**

```tsx
// constants/form_animation.ts
export type IFormAnimation = 'loading' | 'success' | 'error';

export type IFormAnimationConstant = {
  LOADING: IFormAnimation;
  SUCCESS: IFormAnimation;
  ERROR: IFormAnimation;
};

export const FormAnimation: IFormAnimationConstant = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
```

至於靜態常數，我們會放在 `config.ts` 或 `display.ts` 這兩個檔案裡，和 UI 畫面有關的放在後者，其餘就放在前者。

**※ 靜態常數的命名使用** `UPPER_SNAKE_CASE`

```tsx
// constants/config.ts
export const COPYRIGHT = 'TideBit © 2016 - 2023';
export const CONTACT_EMAIL = 'contact@tidebit-defi.com';

export const DEFAULT_CRYPTO = 'ETH';
export const CFD_LIQUIDATION_TIME = 604800;
```

```tsx
// constants/display.ts
export const SKELETON_DISPLAY_TIME = 500;

export const LIGHT_GRAY_COLOR = '#8B8E91';

export const A4_SIZE = {
  WIDTH: 595,
  HEIGHT: 842,
};
```

## /contexts

前端開發時偶爾會遇到一個 value 需要在多層元件中傳遞的場景，然而使用 props 一層層傳遞的話，開發到最後會變得不好管理。此時就要用到 `useContext` 這個 React hook，簡單來說就是將 value 儲存在巢狀元件中的最頂層，讓其可以在整個專案中共享和訪問。

![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/6394fc68-0ce3-4762-bee8-47bab56e4cae)

以 TideBit-DeFi 舉例，這些 value 是按照功能分屬在不同檔案中，方便管理。

**※ 檔案命名須使用 `lower_snake_case` ，並以 `_context` 結尾**

## /interfaces

存放 TypeScript 定義的介面，以加強類型的安全性。開發過程中如果需要用到 dummyData ，也是在此定義。

**※ 檔案命名須使用 `lower_snake_case` ，介面命名規則為大寫 `I` + `UpperCamelCase` 。**

```tsx
// interfaces/badge.ts
export interface IBadge {
  badgeId: string;
  badgeName: string;
  userId: string;
  receiveTime: number; //0: not achieve yet
}

export const dummyReview: IReview[] = [
  {
    id: 'T93130200001',
    transactionId: '931302',
    chainId: 'eth',
    createdTimestamp: 1689352795,
    authorAddressId: '324801',
    content: 'This is a review',
    stars: 3,
  },
];
```

## /lib

專案中通用的 Function 、 Library 和 Custom Hook 將存放在這裡。Custom Hook 會放在 /hooks 之下：

```tsx
// lib/hooks/use_window_size.ts
import {useState, useEffect} from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 100,
    height: 100,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
```

通常還會有一個 `common.ts` 檔案，存放簡單的共用 Function ，例如 timestampToString 。

**※ 檔案命名須使用 `lower_snake_case` ，Custom Hook 則是 `use` + `lower_snake_case` 。**

## /locales

存放 i18n (多語言套件)各語言的翻譯文件，儲存格式為 `/{語言}/common.json`。

```json
// locales/en/common.json
{
  "NAV_BAR": {
    "TRADE": "Trade",
    "LEADERBOARD": "Leaderboard",
    "SUPPORT": "Support",
    "HELP_CENTER": "Help Center",
  }
}
```

```json
// locales/tw/common.json
{
  "NAV_BAR": {
    "TRADE": "交易",
    "LEADERBOARD": "排行榜",
    "SUPPORT": "支援",
    "HELP_CENTER": "幫助中心",
  }
}
```

需要注意的是，語言的命名(像`en` 或 `tw` )必須和設定檔保持一致，不然 i18n 將無法使用。

```tsx
// next-i18next.config.js
const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'tw', //預設語言
    locales: ['tw', 'en', 'cn'], //多語系，須與/locales的命名一致
  },
  localePath: path.resolve('./src/locales'), //記得設定翻譯檔的路徑位置
};

module.exports = i18nConfig;
```

**※ 翻譯檔格式為 `/{語言}/common.json` ，json key 的命名為 `UPPER_SNAKE_CASE`** 。

## /pages

執行 npx create-next-app 時就存在的資料夾，專案中的頁面都會存放於此。這個資料夾底下的每個頁面對應一個路由，路徑和檔案名稱相同。

由於 Next.js 有動態路由 (Dynamic Routes) 的系統，因此每個專案的 /pages 會因各自的需求而有不同的結構。以下為 MerMer-offcial 的 /pages 結構：

![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/f6ffbf9c-bf80-4cfd-99ee-4206722878ba)

**※ 檔案命名須使用 `spinal-case` ，頁面元件須使用 `UpperCamelCase` 。**

## /api

執行 npx create-next-app 時就存在的資料夾，層級在 /pages 底下，定義 API 路由。

Next.js 提供讓開發人員在應用程式中建立 API 端點，這裡的程式碼只會在伺服器端運行，對客戶端沒有影響，也可以實作操作資料庫等後端功能。且和 /pages 相同，每個檔案都對應到一個 API 路由，方便設置和管理伺服器端的 API 請求。

```tsx
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
```

**※ 檔案命名須使用 `spinal-case`  。**

## /styles

執行 npx create-next-app 時就存在的資料夾，存放專案的 CSS 文件，定義 UI 的外觀和樣式。

`globals.css` 為全域設定，這裡的 CSS 將套用到整個專案。也可以自訂其他的 CSS 樣式：

```css
// styles/custom.css

.link {
  color: blue;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

**※ 檔案命名須使用 `lower_snake_case` ，Selector 使用 `lowerCamelCase` 。**
