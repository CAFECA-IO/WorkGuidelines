# 1. 安裝 Node.js & npm
- [Node.js 官網](https://nodejs.org/en/)
- 選擇最新的 LTS 版本，較為穩定。
  - 注意： npm 5.2 以上的才有包含 npx
- 開啟安裝程式進行安裝
- 安裝完成後，打開本機終端機，輸入指令
```shell
node -v
```

# 2. 安裝 VSCode & 設定 IDE
- [VSCode 官網](https://code.visualstudio.com/)
- 選擇最新版本
- 開啟安裝程式進行安裝
- 安裝完成後開啟 VSCode
  - 1. 在工具列 ➡️ 檢視 ➡️ 延伸模組中，搜尋 Prettier 並安裝
  - 2. 在工具列 ➡️ Code ➡️ 喜好設定 ➡️ 設定 ➡️ 搜尋 format
  - 3. 將 Editor:Default Formatter 設定為 Prettier-Code formatter
  - Prettier 套件會在存檔(Command + S)時自動整理程式碼格式

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
