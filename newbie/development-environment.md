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
- 安裝完成後用 VSCode 開啟，並打開 VSCode 終端機
```shell
npm install
npm run dev
```

- 執行完成後將回傳本機伺服器開設在 http://localhost:3000/ 的訊息 ，打開應該會看到初始的 Welcome to Next.js! 畫面，代表 project 已成功運作

# 4. 建立 API

# 參考來源
- [VS Code 版本控制](https://ithelp.ithome.com.tw/articles/10250436)
- [VS Code 中啟用 Git](https://pythonviz.com/git/use-git-in-vs-code-basic-operations/)
- [pre-commit hooks 設置步驟](https://ashine02.medium.com/python-pre-commit-hook-%E8%A8%AD%E7%BD%AE%E6%AD%A5%E9%A9%9F-25d98f44183b)
- [使用 pre-commit](https://matthung0807.blogspot.com/2021/08/pre-commit-code-check.html)
- [Next.js API](https://ithelp.ithome.com.tw/articles/10273049)
