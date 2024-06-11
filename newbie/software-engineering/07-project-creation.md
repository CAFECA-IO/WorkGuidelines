# 專案建立｜ Project Creation

## 前端開發的步驟、時程規劃、工作票開立方式

參考此篇 KM : [前端開發時程規劃與開票的標準作業程序（SOP）](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/frontend-project-estimation-sop.md)

## 在 GitHub 建立 Repository

### 步驟

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/9c6f7ba8-29c1-478a-be6c-3e64acd2133f" alt="截圖1/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/5e88ec31-30bd-42ba-8df1-4b9685be6fe0" alt="截圖2/5" width="60%">

1. Create a new repository
2. 輸入 Repository name，命名方式為 UpperCamelCase
3. 選擇 Public
4. add a README file
5. add .gitignore : `Node`
6. choose a license : `MIT License`

### 專案設定

1. 打開專案設定：Repository settings → Branches → **Branch protection rule**
2. 點擊 Add rule
3. 新增 `main` 和 `develop` 兩個保護規則

每個保護規則都需要勾選以下選項：

✅ Require a pull request before merging <br/>
When enabled, all commits must be made to a non-protected branch and submitted via a pull request before they can be merged into a branch that matches this rule.

✅ Require approvals <br/>
When enabled, pull requests targeting a matching branch require a number of approvals and no changes requested before they can be merged.(Required number of approvals before merging: 1)

✅ Require status checks to pass before merging <br/>
Choose which status checks must pass before branches can be merged into a branch that matches this rule. When enabled, commits must first be pushed to another branch, then merged or pushed directly to a branch that matches this rule after status checks have passed.

✅ Require conversation resolution before merging <br/>
When enabled, all conversations on code must be resolved before a pull request can be merged into a branch that matches this rule. Learn more about requiring conversation completion before merging.

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/11f68a03-b7bd-440c-8608-79470fd84aa3" alt="截圖3/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/0ad1695e-a777-4192-8b1c-23c7fdced6b7" alt="截圖4/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/ba0f0fdf-1191-4198-a3aa-d0fbe2e82ee3" alt="截圖5/5" width="60%">

### 分支規劃

Repository(a.k.a. Repo) 建立之後會產生預設主分支 main，接著拉出分支 Develop，再從 Develop 拉功能分支進行開發。

> [!CAUTION]
> 所有程式碼 (包含 README.md)，都不可以直接提交至 main。

關於分支規劃的部份可參考此篇文章 [Git Flow](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/git-flow.md)，以下為節錄：

> 在 GitHub 的 Repository，由 main 拉出一個 branch 叫做 develop。 <br />
> 接著就跟隨 Git Flow 的規則，從 develop 拉出開發者自己的 branch。 <br />
> 開發者開發完成該 branch 後，就建立 PR。 <br />
> PR 由團隊主管審核後就會自動被併入 develop，開發者再將自己的 branch 刪除。 <br />
> 只有 main 和 develop 兩個分支會始終存在於 Repository，其餘功能分支開發完成後就要刪除。

### 開發環境設定

參考此篇 KM : [development environment](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/development-environment.md)

### 撰寫 README

參考此篇 KM : [README Writing](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/tips/readme-writing.md)

# 建立 Vercel 專案

## 什麼是 Vercel？

Vercel 是一個為開發者設計的平台，提供我們所需的工具、工作流程和基礎架構，讓我們能更快地構建和部署我們的 Web 應用程式，不需要太多額外配置。

Vercel 起始就支援[熱門的前端框架](https://vercel.com/docs/frameworks)。並且它在全球分佈了可擴展且安全的基礎架構，並從靠近我們的使用者資料中心提供內容以獲得最佳速度。

在開發過程中，Vercel 提供實時協作工具，如自動預覽和生產環境，並且可以在預覽部署上進行評論(comments)。

## 認識 Vercel 的 Projects 和 Deployments

要開始使用 Vercel 之前，我們可以先來了解專案和部署在 Vercel 上的概念。

### Projects（專案）

專案是指部署到 Vercel 的應用程式。你可以有多個專案連接到單一的儲存庫，並且每個專案可以有多個部署。你可以在儀表板上查看所有專案，並通過專案儀表板配置你的設定。

### Deployments（部署）

部署是你專案成功構建的結果。當你導入現有專案或模板，或者通過連接的整合推送 Git 提交或使用 CLI 中的 vercel deploy 時，會觸發部署。每次部署會自動生成一個 URL。

## 使用 Vercel 部署 Next.js 專案的步驟

### Step 1

建立 Vercel 帳號：[註冊](https://vercel.com/signup) 或 [登入](https://vercel.com/login)

並且和你的 GitHub 帳號連接。

連接之後，要在右上角切換成公司的團隊帳號。

![1](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/14e2dd20-d631-4456-a44c-db45bcd65701)

之後按下 `Add New...` 按鈕，選擇 `Project`。

![2](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/03ab96fd-5394-448e-a6e1-42fc1ee51ee7)

### Step 2

通過導入你現有的前端專案，在 Vercel 上建立一個新專案。

當你使用 Vercel 支援的框架時，Vercel 會自動檢測並設置最佳的構建和部署設定。
（想要知道所有 Vercel 支援的框架請看[這裡](https://vercel.com/docs/frameworks/more-frameworks)。）

你也可以在手動設定專案，包括構建和輸出設定、環境變數等。而這些設置也可以之後再設定，不必急著現在設定。

這裡我們導入 Next.js 框架的專案。

![3](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/b0f269f8-1dc3-4b31-94cd-d7482f218ae8)

因為我們的專案是 Next.js，所以 Vercel 自動幫我們檢測並設定：

![4](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/97e6a491-1ec1-452a-9e1d-3b8c9a424131)

構建和輸出設定、環境變數也可以之後再設定：

![5](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/6f3f0d9a-aa73-4990-9c11-5ddc4dd4734e)

### Step 3

按下部署按鈕。Vercel 將根據選擇的設定建立專案，並且部署。

![6](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/04b046b5-9f70-4afc-b716-5adac733ab16)

部署完成。

![7](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/81951dbc-aad2-46e5-9577-af3c195683b6)

要查看你的部署，就在儀表板中選擇專案，然後選擇域名(Domain)。現在起，任何擁有此 URL 的人都可以訪問此頁面。

![8](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/c6ebad14-f62f-4fbc-bc43-cc38fcf9729b)

### Step 4

我們回到 GitHub 專案中的 Code 頁面，右邊有 Deployments 的區塊可以點選。

![9](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/b0c348c3-e69d-4be4-9cbd-5c9dce92f11a)

點進去後有各個部署的紀錄，點進去可以看到部署的詳細資訊。

![10](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/27f889b3-a0df-4f66-a657-a6b9c5af4b3f)

## Vercel 重要資訊總結

1. **簡介**：

   - Vercel 是一個專為前端框架和靜態網站設計的平台，與無頭內容、電子商務或資料庫 API 無縫整合。
   - 由 Next.js 的開發者創建，為 Next.js 應用程式提供無縫整合和優化。

2. **帳號和團隊**：

   - 你可以使用 GitHub、GitLab 或 Bitbucket 帳號註冊。
   - Vercel 支援個人帳號和團隊帳號，允許協作專案管理。

3. **專案部署**：

   - **自動部署**：每當你將更改推送到 Git 儲存庫時，自動部署你的專案。
   - **手動部署**：使用 Vercel CLI 或儀表板手動部署。

4. **支援的框架**：

   - 專為 Next.js 優化，但也支援多種框架，包括 React、Vue、Svelte、Angular 等。

5. **環境變數**：

   - 通過 Vercel 儀表板輕鬆管理不同部署階段（開發、預覽、生成）的環境變數。

6. **自訂網域**：

   - 可直接通過 Vercel 儀表板新增和管理自訂網域。
   - 自訂網域自動提供 SSL 憑證。

7. **無伺服器函數**：

   - 使用無伺服器函數新增後端功能。
   - 函數會自動部署和擴展。

8. **分析**：

   - 內建分析功能，監控網站的效能，如頁面瀏覽量、載入時間和訪客詳情。

9. **預覽部署**：

   - 每個分支或拉取請求都會獲得一個獨特的預覽 URL，用於在合併到主分支前檢查更改。

10. **邊緣網路**：

    - Vercel 利用全球邊緣網路，確保快速交付內容。
    - 提供快取和 CDN 整合，以改善網站效能。

11. **建置和部署配置**：

    - 使用 `vercel.json` 配置檔進行進階設置，如重寫、重定向、標頭和函數路由。
    - 範例 `vercel.json`：
      ```json
      {
        "version": 2,
        "builds": [{ "src": "next.config.js", "use": "@vercel/next" }],
        "rewrites": [{ "source": "/about", "destination": "/about.html" }]
      }
      ```

12. **整合**：

    - 與各種服務整合，如 GitHub、GitLab、Bitbucket、Slack 等。
    - 支援無頭 CMS 和電子商務平台。

13. **Vercel CLI**：

    - 使用 Vercel CLI 從終端直接進行部署和管理任務。
    - 基本 CLI 指令：
      - `vercel`: 部署當前目錄中的專案。
      - `vercel --prod`: 部署到生成環境。
      - `vercel env`: 管理環境變數。

14. **監控和日誌**：

    - 通過 Vercel 儀表板訪問建置日誌和函數日誌，以進行除錯和監控。

15. **定價**：

    - Vercel 提供免費層，包含基本功能，及收費方案以滿足更多進階使用和支援需求。
