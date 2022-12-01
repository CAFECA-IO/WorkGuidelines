# 1. 安裝 Node.js & npm
- [Node.js 官網](https://nodejs.org/en/)
- 選擇最新的 LTS 版本，較為穩定。
  - 注意： npm 5.2 以上的才有包含 npx
- 開啟安裝程式進行安裝
- 安裝完成後，打開本機終端機，輸入指令
```shell
node -v
```
- 回傳版本號代表 Node 安裝成功

# 2. 安裝 VSCode & 設定 IDE
- [VSCode 官網](https://code.visualstudio.com/)
- 選擇最新版本
- 開啟安裝程式進行安裝
- 安裝完成後開啟 VSCode
  - 1. 在工具列 ➡️ 檢視 ➡️ 延伸模組中，搜尋 Prettier 並安裝
  - 2. 在工具列 ➡️ Code ➡️ 喜好設定 ➡️ 設定 ➡️ 搜尋 format
  - 3. 將 Editor:Default Formatter 設定為 Prettier-Code formatter
  - Prettier 套件會在存檔(Command + S)時自動整理程式碼格式

## 2.1 安裝版本控制系統
- 在「延伸模組」中安裝 Git Extension Pack
- 擴充包安裝完成後可能會彈出要求安裝 Git 軟體的視窗，點擊安裝
  - git version 2.37.0 (Apple Git-136)
- 在 VS Code 新增終端機，輸入以下指令加入用戶標籤
```shell
git config --global user.email "your email"
git config --global user.name "your name"
```
- 建立 local repository
```shell
git init
```
## 2.2 設定 Precommit 機制
- 安裝 pre-commit
```shell
pip3 install pre-commit  
```
- 在專案下設定 .pre-commit-config.yaml 這個 config 檔(以下//後為說明，套用時記得刪除)
```shell
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.3.0
    hooks:
      - id: check-yaml //檢查 yaml 格式是否正確
      - id: check-json //檢查 json 格式是否正確
      - id: check-xml //檢查 xml 格式是否正確
      - id: end-of-file-fixer //修正檔案結尾
      - id: trailing-whitespace //移除行尾空白
      - id: pretty-format-json //檢查 json 格式是否整齊
```
- 將 pre-commit 設定到 git hooks
```shell
pre-commit install  
```
- 如果出現 'pre-commit: command not found' 的錯誤，檢查看看環境變數
```shell
echo $PATH
```
- 如果沒有就補上去
  - Python version 3.9
```shell
PATH=$PATH:/Users/{Your_Name}/Library/Python/3.9/bin
```
- 執行 Commit 指令(記得先 Stage Changes)
```shell
git commit -m "Your Commit"
```
如果出現 "Your pre-commit configuration is unstaged." 錯誤訊息，將 .pre-commit-config.yaml commit 後再試一次

- 加入 Github repository
```shell
git remote add origin <your url>
git push -u origin main
```
# 3. 建立 Next 專案 
- 打開本機終端機，輸入指令
```shell
npx create-next-app
{projectName}
Y
```
- 運行專案
```shell
cd {projectName}
npm install
npm run dev
```

- 執行完成後將回傳本機伺服器開設在 http://localhost:3000/ 的訊息 ，打開應該會看到初始的 Welcome to Next.js! 畫面，代表 project 已成功運作

## 3.1 將開發目錄轉移至 src
- 打開本機終端機，輸入指令
```shell
cd {projectName}
mkdir src
mv pages src
mv styles src
```
- 將開發目錄集中在 src 資料夾，便利整理

# 4. 在 Nested Routes 中建立 Link Component
## 4.1 file-based routing 說明
Next.js 的基本單位是 page ，一個 page 即是一個 component ，這些 component 被放置在 'pages' 資料夾中，並由其檔案名稱來決定路由的名稱。在 Next.js 可分為三種 routing 方式：
  1. static routes ：舉例來說， pages/index.js 的路徑為 '/' ， pages/post.js 的路徑為 '/post' ，以此類推。每個 index 檔案代表其根目錄，如果檔案被放置在 pages/post/index.js ，則路徑同樣會是 '/post'。
  2. dynamic routes ：當需要定義 /post/1 、 /post/2 等動態 URL 時，可用 dynamic routes 來處理，只要定義一個 pages/post/[postId].js 即可達成。多層級的路由也是以這個方式處理，例如 /pages/post/[postId]/[commentId].js 。
  3. catch all routes ：屬於一種 dynamic routes ，這個方法不需要一個個定義多層級資料夾，可以一次拿到所有層級的參數。例如我們要設計  /pages/post/[year]/[month]/[day] 的 URL ，只需定義 /pages/post/[...date].js 即可。

## 4.2 執行步驟
- 專案資料夾結構
```
|_page
     |_index.js //localhost:3000
     |_about.js //loclahost:3000/about
     |_portfolio
          |_index.js //localhost:3000/portfolio
          |_[pageid].js //localhost:3000/portfolio/(id)
```
- 在 page/index.js 中引入 Link
```
import Link from "next/link";
```
- 完整 page/index.js 如下：
```
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/about">About</Link> //指向 about.js
        </li>
        <li>
          <Link href="/portfolio">Profolio</Link> 指向 portfolio/index.js
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
```
# 5. 建立 API Routes
- 建立一個 URI 為 /api/feedback 的 API ，根據 file-based routing ，檔案路徑與名稱即是 URI
- 新增 /pages/api/feedback.js (api folder 是特別名稱，不可擅自改動)
```
function handler(req, res) {
  res.status(200).json({ message: "This works!" }); // HTTP status code 200
}

export default handler;
```
- 當我們向 /api/feedback 發送請求時，得到的回覆是 json 格式的資料，內容為 { message: "This works!" }

# 參考來源
- [VS Code 版本控制](https://ithelp.ithome.com.tw/articles/10250436)
- [VS Code 中啟用 Git](https://pythonviz.com/git/use-git-in-vs-code-basic-operations/)
- [pre-commit hooks 設置步驟](https://ashine02.medium.com/python-pre-commit-hook-%E8%A8%AD%E7%BD%AE%E6%AD%A5%E9%A9%9F-25d98f44183b)
- [使用 pre-commit](https://matthung0807.blogspot.com/2021/08/pre-commit-code-check.html)
- [從零開始學習 Next.js](https://ithelp.ithome.com.tw/users/20110504/ironman/4269)
- [Next.js Routing](https://powerfultraveling.coderbridge.io/2021/12/11/nexjs-routing/)
