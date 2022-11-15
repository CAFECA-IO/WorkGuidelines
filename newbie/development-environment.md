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
- 安裝 husky
```shell
npm install -D husky@4
npm install -D husky
```
- 執行 Commit 指令(要先 Stage Changes)
```shell
git commit -m "Your Commit"
```
- 如果出現 "husky > pre-commit (node v18.12.1)" 訊息，在專案根目錄下 Ctrl + Command + . ，進入 .git/hook ，將 pre-commit 檔案刪除
# 3. 建立 Next 專案 
- 打開本機終端機，輸入指令
```shell
npx create-next-app
{projectName}
Y
```
- 安裝完成後用 VSCode 開啟，並打開 VSCode 終端機
```shell
npm install
npm run dev
```

- 執行完成後將回傳本機伺服器開設在 http://localhost:3000/ 的訊息 ，打開應該會看到初始的 Welcome to Next.js! 畫面，代表 project 已成功運作

# 4. 建立 React 專案
- 打開終端機，輸入指令
```shell
npx create-react-app {projectName}
Y
```
```shell
cd {projectName}
npm start
```
- 執行完成後打開 http://localhost:3000/ ，看到旋轉的 React 代表 project 已成功運作

# 參考來源
- [VS Code 版本控制](https://ithelp.ithome.com.tw/articles/10250436)
- [VS Code 中啟用 Git](https://pythonviz.com/git/use-git-in-vs-code-basic-operations/)