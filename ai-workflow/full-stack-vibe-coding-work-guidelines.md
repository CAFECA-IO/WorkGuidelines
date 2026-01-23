# Full Stack Vibe Coding Work Guidelines

- [專案初始化](#專案初始化)
- [設置 pre-commit](#設置-pre-commit)
- [✨AI Agent 入門指南](#ai-agent-入門指南)
- [開發 UI](#開發-ui)
- [規劃 Mock API](#規劃-mock-api)
- [串接 API](#串接-api)
- [⚠️注意事項](#%EF%B8%8F注意事項)

本文說明 Full Stack Vibe Coding 的整體開發流程，並介紹 [Google Antigravity](https://antigravity.google/) AI Agent 在專案中的使用方式。

開發過程中請依照本文件流程執行，並特別留意文末的 **⚠️注意事項**。

開發請統一使用 Google Antigravity 作為 AI 開發輔助工具。

## 專案初始化
### 初始化 Next.js 專案

專案請以當下最新穩定版本的 Next.js 作為基礎。

```bash
cd <專案資料夾>
npx create-next-app@latest . --use-npm
```

根據指示設定 TypeScript、ESLint、Tailwind CSS、`src/` 目錄結構與 App Router。

### 複製設定檔與工具

從 [WorkGuidelines](https://github.com/CAFECA-IO/WorkGuidelines/tree/main/ai-workflow/config) 中複製以下檔案和資料夾：

- `eslint.config.mjs` (file)：這是我們團隊共用的程式碼規範設定，包含[命名規範](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md)、Coding style 等檢查，用於維持程式碼風格一致。
- `src/lib/utils`(folder)：這裡配置了 Logger、API request & response 等常用的 class 和 function。可直接複製使用，避免重複實作基礎功能。
- `scripts/update_version.ts`(file)：這是 commit 時自動更新版本號的腳本，用於降低多人協作時產生版本衝突的機率。後續章節將說明實際使用方式。

## 設置 pre-commit
設置 pre-commit 的詳細說明請參考以下文件：
- （待補上）

### 設定 `package.json`
`package.json` 中應該要有以下必要腳本（記得移除註解）：

```json
{
  ...
  "scripts": {
    "dev": "next dev",
    "lint": "eslint --fix . --cache", // 自動修正並執行 ESLint 檢查
    "build": "npm run lint && next build",
    "start": "npm run build && next start",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|ts|tsx|json)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|ts|tsx|json)\"",
    "validate": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|ts|tsx|json|css)\" && eslint --fix . && npm run test",
    "update-version": "npx tsx scripts/update_version.ts && git add package.json", // 執行更新版本號的腳本
    "swarm": "next start -p 10010",
    "prepare": "husky",
    "test": "jest --coverage" 
  },
  ...
}
```

### 檢驗 ESLint 

於 `.husky/pre-commit` 設置：

```bash
npm run lint && npm run test && lint-staged && npm run update-version
```

這會強制所有 commit 皆需通過 ESLint 和 Jest 檢驗後才可提交，並自動更新版本號。以維持專案品質與提交一致性，避免增加後續修正成本。

## ✨AI Agent 入門指南

Agent 是 [Google Antigravity](https://antigravity.google/docs/home) 中的核心功能，代表一種可執行多步推理與行動的 AI 代理。它除了可以對現有的程式碼進行推理，還能操作 IDE 的編輯器、終端機及內建瀏覽器等工具，自動完成開發任務（如寫 code、執行測試、跑指令），並生成可供人類審查的成果（Artifacts）。

Agents 多半由 frontier LLM 驅動，支援多種 AI 模型（例如 *Gemini 3 Pro*、*Claude Sonnet 4.5*、*GPT-OSS* 等）。

Agent 支援同時開啟多個對話串與**並行處理**不同任務。

<img width="367" height="512" alt="截圖 2026-01-23 上午10 16 36" src="https://github.com/user-attachments/assets/c9cc762f-bdba-49a7-94f8-ba76e3162117" />

### 啟動對話與交互

- 可在對話框輸入需求
- 可上傳圖片輔助說明
- 支援執行斜線命令

### Agent 推理模式（Modes）

Antigravity 的 Agent 有以下兩種推理模式：

#### Planning

- 先制定計劃（任務步驟）
- 會生成 task 列表、計劃書、Artifacts 等詳細資訊
- 適合**複雜任務、跨檔案變更、研究流程**
- 通常在大型或需要深度推理時更有用（產出更完整也更可追溯）

#### Fast

- 直接執行，不額外規劃
- 速度快、交互響應直接
- 適合簡單、明確、可快速完成的需求（如*重新命名變數*、*跑 bash 命令*）

### 支援的推理模型

常見的可選模型包括：

- **Gemini 3 Pro**（通常預設；提供深度推理與 AI 能力）‍
- **Claude Sonnet 4.5**（進階推理模型）
- **GPT-OSS**（開源模型）

註：不同模型在推理品質與計費/配額方面可能不同，具體請參考[官方說明](https://antigravity.google/docs/plans)。

> [!TIP]
> 使用快捷鍵 `Command + L` 即可開啟 AI 對話框。

### 自訂規則和工作流程

Agent 提供自訂規則（Rules）和工作流程（Workflows）的功能。兩者皆以 Markdown 檔案格式儲存。

#### 規則

- 可依據需求新增局部 (Workspace) 規則或全局 (Global) 規則
- 這些規則可以定義條件與指引，引導 Agent 的行為與反應模式
- 例如設定 custom instructions、執行限制/警告等
- Antigravity 會以這些規則輔助決策或觸發特定行為（但仍需 review）

#### 工作流程

- 可依據需求新增局部 (Workspace) 規則或全局 (Global) 流程
- 定義一系列步驟，讓 Agent 可重複性地執行關鍵流程，如*部署服務*或*回覆 PR 評論*等
- 儲存後可透過斜線指令（格式為 `/workflow-name`）快速呼叫
- 方便重複執行既定程序，提高效率與一致性

<img width="347" height="337" alt="截圖 2026-01-23 上午11 08 56" src="https://github.com/user-attachments/assets/a9a1c3cc-468f-44fb-81eb-4137fda672e2" />

點開上方工具列「⋯」按鈕，就能找到 Customizations 項目。

## 開發 UI

### 建議步驟

1. 以畫面描述或上傳設計稿（圖片），由 AI 產出初版 UI
2. 視需求進行手工細節調整與視覺微調
3. 確認 UI 的最終可用性與 UX 合理性
4. 在註解中標註負責開發人員的名字

> [!IMPORTANT]
> 元件須放在 `src/components` 中，並根據頁面或功能進一步分類，如 `src/components/chain/block_list.tsx`

### 驗收標準

- UI 可正常顯示，無明顯排版或互動問題
- Component 結構清楚，僅負責單一功能或畫面區塊，未混雜多餘邏輯
- 已清理未使用的元件與樣式

## 規劃 Mock API

### 建議步驟

1. 依據 UI 畫面與互動需求，由 AI 模擬出合理的 Mock Data，並同步定義對應的 interface
2. 請 AI 依照產出的 interface，並使用既有的 `src/lib/utils/response.ts` 實作 Mock API
3. 確認 Mock API 的回傳格式、欄位命名與實際 UI 使用情境一致
4. 視需求補齊錯誤情境（如空資料、錯誤回傳）以利前端測試
5. 在註解中標註負責開發人員的名字

> [!IMPORTANT]
> interface 須統一放置於 `src/interfaces` 資料夾中。

> [!IMPORTANT]
> API 須遵守 `api/v1/...` 路徑規範。

### 驗收標準

- 前端可在不依賴實際後端的情況下正常開發與測試
- Mock API 的路徑符合規範
- 所有 Mock API 皆嚴格遵守已定義 interface
- API 回傳格式統一，並符合 `response.ts` 定義的結構
- 已涵蓋基本成功與失敗情境（如資料為空、錯誤狀態）
- 未出現與 UI 實際使用無關或多餘的欄位

## 串接 API

### 建議步驟

1. 確認後端 API 規格，包含路徑、Method、Request 與 Response 格式
2. 依照規格使用 `src/lib/utils/request.ts` 發送請求，串接真實 API
3. 確認 UI 對應的 Component 可正確顯示 API 回傳的資料
4. 處理 API 錯誤與異常情況，例如網路失敗、錯誤回傳或資料為空
5. 在註解中標註負責串接與驗證的人員

### 驗收標準

- API 路徑與方法符合後端規範
- 所有 API 請求皆使用 `request.ts` 進行統一處理
- UI 正確顯示 API 回傳資料，無明顯錯誤或異常狀況
- 已處理基本異常情境（網路錯誤、資料為空、錯誤回傳）
- 註解中標註的負責人清楚，便於追蹤與維護
- 對尚未穩定的 API，有 Mock API 作為過渡測試

## ⚠️注意事項

### 與 AI 互動

- Agent 功能強大，但仍需要你提供**清晰需求**，避免誤解。
- 遇到不熟悉的實作或概念時，可請 Agent 補充**流程與原理說明**，作為理解輔助。
- 與 AI 溝通時，建議**分段提出需求**，將大型問題拆成小任務，通常能獲得更穩定的產出品質。

### 自動執行與安全

- 在自動執行命令時，請**確認終端機 / 系統命令已授權**，避免意外變更或安全風險。
- 規則（Rule）或工作流程（Workflow）可引導 Agent，但**執行前仍需 review 產出**，確保符合預期。

### 開發規範與程式碼品質

- 單一檔案若超過 500 行，請主動拆分，維持可讀性。
- 開發過程中請善用 Git 保留階段性成果，確保能隨時回溯，因為 AI 有可能直接用 shell script 修改檔案。
- 專案中需遵守[註解規範](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/annotation.md)：
    - 目的在於確保開發人員實際閱讀並理解該段程式碼
    - 確認後，請以你本人作為該段程式碼與註解的責任者
