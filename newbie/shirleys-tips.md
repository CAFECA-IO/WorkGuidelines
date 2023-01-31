- [Tailwind](#tailwind)
  - [問題: Tailwind utility class hint](#問題-tailwind-utility-class-hint)
  - [解法: 安裝 Extension - Tailwind CSS IntelliSense](#解法-安裝-extension---tailwind-css-intellisense)
  - [問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行](#問題-自定義的-class-從-context-傳入-component-使用會無法正確執行)
  - [解法: 因為 `contexts/` 不在 `tailwind.config.js` 範圍內](#解法-因為-contexts-不在-tailwindconfigjs-範圍內)
- [Typescript](#typescript)
- [React.js](#reactjs)
- [Next.js](#nextjs)

# Tailwind

## 問題: Tailwind utility class hint

## 解法: 安裝 Extension - Tailwind CSS IntelliSense

- [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行

## 解法: 因為 `contexts/` 不在 `tailwind.config.js` 範圍內

- Sol 1: 檢查 `tailwind.config.js` 的 `content` 是否包含 `src/contexts/`

  ```jsx
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    mode: 'jit',
    content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
    theme: {
  ...
  	},
  }

  ```

  - [commit comparison](https://github.com/CAFECA-IO/TideBit-DeFi/compare/b6d5f2f939411b23339eae77637f0c47565129a7...ac9961c9187325176cf4d7d8d4b3c74147d3595e)

- Sol 2: 在 `src/constants/display.ts` 使用該自定義 class，`src/contexts/`不放 Tailwind 相關的資料，然後在實際使用 Tailwind 的 `src/components/ticker_selector_box` 比對 `src/contexts/`跟 `src/constants/display.ts` 的資料
  - [commit comparison](https://github.com/CAFECA-IO/TideBit-DeFi/compare/ac9961c9187325176cf4d7d8d4b3c74147d3595e...ffda25503ae558913f7d278d477aea4b14480aaf)

# Typescript

# React.js

# Next.js
