/**
 * Info: (20250918 - Luphia) eslint.config.mjs
 * - 這份設定檔是我們團隊的程式碼規範，目標是為了統一風格、預防錯誤、提升程式碼品質與可讀性
 * - 使用 Prettier 統一程式碼風格
 * - 使用 ESLint 專注於程式碼品質、最佳實踐與潛在錯誤
 */

import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
// import tailwindcss from 'eslint-plugin-tailwindcss';
import prettierConfig from 'eslint-config-prettier';

// Info: (20251113 - Tzuhan)  --- 抽離出的共用規則 (同時適用於 Next.js 和 Hardhat) ---
const commonRules = {
  'import/prefer-default-export': 'off',
  'no-nested-ternary': 'off',
  'no-param-reassign': ['error', { props: false }],
  '@typescript-eslint/naming-convention': [
    'error',
    // Info: (20251113 - Tzuhan) 一般函式採用 camelCase，react 元件採用 PascalCase
    { selector: 'function', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
    // Info: (20251113 - Tzuhan) 一般變數採用 camelCase，react 元件採用 PascalCase，常數採用 UPPER_CASE
    { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
    // Info: (20251113 - Tzuhan) 類別、型別、介面採用 PascalCase
    { selector: 'typeLike', format: ['PascalCase'] },
    // Info: (20251113 - Tzuhan) 介面採用 IPascalCase，名稱強制以 I 開頭
    { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true } },
  ],
  // 'tailwindcss/no-custom-classname': 'warn',
  // 'tailwindcss/classnames-order': 'error',
};

const tslintConfigs = [
  // Info: (20250918 - Luphia) 全域忽略設定
  {
    ignores: [
      'coverage',
      'node_modules',
      '.next',
      'dist',
      'build',
      'eslint.config.mjs',
      'tailwind.config.ts',
      'postcss.config.mjs',
      'jest.*.ts',
    ],
  },

  // Info: (20250918 - Luphia) 基礎設定
  ...tseslint.configs.recommended,
  // ...tailwindcss.configs['flat/recommended'],

  // Info: (20251113 - Tzuhan) --- CONFIG 1: Next.js / React App (src) ---
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}', 'next.config.ts'], // Info: (20251113 - Tzuhan) <-- 鎖定 Next.js 相關檔案
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
      // tailwindcss,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'], // Info: (20251113 - Tzuhan) <-- 使用 Next.js 的 tsconfig
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: {} },
    },
    rules: {
      ...commonRules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',

      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['../*'], message: "請使用 '@/' 路徑別名取代相對路徑 '..'" }] },
      ],

      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/control-has-associated-label': 'warn',
    },
  },

  // Info: (20251113 - Tzuhan) --- CONFIG 2: Hardhat / Node.js Scripts ---
  {
    files: ['scripts/**/*.ts', 'test/**/*.ts', 'ignition/**/*.ts', 'hardhat.config.ts'], // Info: (20251113 - Tzuhan) <-- 鎖定 Hardhat 相關檔案
    plugins: {
      // tailwindcss, // Info: (20251113 - Tzuhan) 這些檔案不需要 React/Next 外掛
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: false }, // Info: (20251113 - Tzuhan) Node 腳本不需要 JSX
        project: ['./tsconfig.hardhat.json'], // Info: (20251113 - Tzuhan) <-- 使用 Hardhat 專用 tsconfig
      },
      globals: {
        ...globals.node, // Info: (20251113 - Tzuhan) 主要是 Node 環境
        ...globals.es2020,
        ...globals.jest, // Info: (20251113 - Tzuhan) <-- 包含 Jest (給 test/ 資料夾)
      },
    },
    settings: {
      'import/resolver': { typescript: {} },
    },
    rules: {
      ...commonRules,
      'no-console': 'off', // Info: (20251113 - Tzuhan) 腳本/測試通常允許 console
      'no-restricted-imports': 'off', // Info: (20251113 - Tzuhan) 關閉 '@/' 路徑限制
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // Info: (20250918 - Luphia) Prettier 必須放在最後
  prettierConfig,
];

export default tslintConfigs;
