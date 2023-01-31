- [Tailwind](#tailwind)
  - [問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行](#問題-自定義的-class-從-context-傳入-component-使用會無法正確執行)
  - [解法:](#解法)
    - [因為 `contexts/` 不在 `tailwind.config.js` 範圍內](#因為-contexts-不在-tailwindconfigjs-範圍內)
- [Typescript](#typescript)
- [React.js](#reactjs)
- [Next.js](#nextjs)

# Tailwind

## 問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行

## 解法:

### 因為 `contexts/` 不在 `tailwind.config.js` 範圍內

- Sol 1: 檢查 `tailwind.config.js` 的 content 是否包含 `src/contexts/`

  ```js
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    mode: 'jit',
    content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
    theme: {
  ...
  	},
  }

  ```

- Sol 2: 在 `src/constants/display.ts` 使用該自定義 class，`src/contexts/`不放 Tailwind 相關的資料，然後在 `src/components/ticker_selector_box` 比對 `src/contexts/`跟 `src/constants/display.ts` 的資料

# Typescript

# React.js

# Next.js
