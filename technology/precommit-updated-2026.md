# Pre-commit (Updated 2026)

- [前言](#前言)
  - [目的](#目的)
  - [檢查項目](#檢查項目)
- [軟體版本](#軟體版本)
- [Pre-commit 工具設置](#pre-commit-工具設置)
  - [Prettier](#prettier)
  - [ESLint](#eslint)
  - [lint-staged](#lint-staged)
  - [Husky](#husky)
- [Jest 單元測試設置](#jest-單元測試設置)
- [完整 pre-commit 流程](#完整-pre-commit-流程)
- [Reference](#reference)

## 前言

### 目的

為了確保每次 commit 前的程式碼是乾淨、符合 coding style 且能通過測試的，我們需要經過 test、format、eslint 等環節，以確保程式碼品質和一致性。

本指南旨在針對 pre-commit  的檢查步驟進行整理，並且提供一個方便查閱的檢查步驟。

### 檢查項目

- 單元測試
- 程式碼格式化
- 語法和型別檢查

## 軟體版本

| 軟體 | 版本 |
| --- | --- |
| Node.js | v20+ |
| npm | v10+ |
| Next.js | v15+ |
| Husky | v9+ |
| ESLint | v9+ |
| lint-staged | v15+ |
| Prettier | v3+ |
| Jest | v29+ |
| ts-jest（TypeScript 專案） | v29+ |

## Pre-commit 工具設置

### Prettier

Prettier 會確保所有輸出程式碼都符合一致的樣式，是非常方便的排版工具。

安裝 prettier：

```bash
npm install -D prettier
```

在 root 新增 `.prettierrc` 檔案，配置 prettier 設定：

```json
{
  "$schema": "http://json.schemastore.org/prettierrc",
  "arrowParens": "always",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "printWidth": 100,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
}
```

### ESLint

ESLint 提供檢查語法的功能，可依自定義的規範檢查程式碼，方便團隊統一coding style。

安裝 ESLint：

```bash
npm install --dev-dependency eslint
```

在 root 新增 `eslint.config.mjs` 檔案，直接複製[此處](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/ai-workflow/config/eslint.config.mjs)的內容即可。

### lint-staged

lint-staged 只會作用於 staged 的檔案，避免整個專案重新檢查，速度更快。

安裝 lint-staged：

```bash
npm install --save-dev lint-staged
```

在 root 新增 `.lintstagedrc.json` 檔案，配置 prettier 和 eslint 設定：

```json
{
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "**/*.css": ["prettier --write", "eslint --fix"]
}
```

### Husky

Husky 會把登陸成 hooks，並把這些工具串接到 Git commit 流程中。commit 或 push 時就會自動檢查提交資訊、程式碼，並執行測試。

安裝並初始化 husky：

```bash
npm install --save-dev husky
npx husky init
```

這個 init 命令會在 root 一個腳本`.husky/`，並在 `package.json` 中新增 prepare 腳本。

後續可於 `.husky/pre-commit` 設置：

```bash
npx lint-staged && npm run test
```

## Jest 單元測試設置

安裝 jest 相關套件：

```bash
npm install -D jest ts-jest @types/jest
```

設置 `jest.config.js`

```jsx
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

module.exports = config;
```

在 `package.json` 加入 test 指令：

```json
"scripts": {
  ...
  "test": "jest --coverage --passWithNoTests"
},
```

撰寫完所有測試後，就可以輸入以下指令進行 test

```bash
npm run test
```

確認測試覆蓋率：
<img width="534" height="278" alt="截圖 2026-02-23 下午4 59 59" src="https://github.com/user-attachments/assets/716d553d-68a4-441c-aae8-f12592ae775d" />

## 完整 pre-commit 流程

為了方便跑 Format、ESLint 等檢查，我們會在 `package.json` 中加入以下指令。

```json
  "scripts": {
		...
    "lint": "eslint --fix . --cache",
    "build": "npm run lint && next build",
    "start": "npm run build && next start",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|ts|tsx|json)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|ts|tsx|json)\"",
    "validate": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|ts|tsx|json|css)\" && eslint --fix . && npm run test",
    "prepare": "husky",
    "test": "jest --coverage --passWithNoTests" 
  },
```

開發者應確保在 commit 前完成以下檢查流程：

1. Git branch 檢查
    - 檢查目前的 branch
    
    ```bash
    git branch -a
    ```
    
    - 切換到指定 branch
    
    ```bash
    git checkout feature/your_branch
    ```
    
    - 拉取並合併 develop branch
    
    ```bash
    git pull origin develop
    git checkout feature/your_branch
    git merge develop
    ```
    
2. Code 品質檢查
    - 檢驗專案是否 build 得起來
    
    ```bash
    npm run build
    ```
    
    - 檢驗單元測試、check-format & eslint
    
    ```bash
    npm run validate
    ```
    
    - 若 prettier 報錯，使用以下指令一次修正
    
    ```bash
    npm run format
    ```
    
3. Commit 提交

```bash
git add .
git commit -m "your comment"
```

執行指令後，git hook 會執行 pre-commit 檢查拼字、型別錯誤、console.log 等。

若未看到出錯警訊，即完成 commit。

### Reference

- [Prettier - What is Prettier?](https://prettier.io/docs/)
- [ESLint - Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Husky](https://typicode.github.io/husky/#/)
