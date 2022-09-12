# Pre commit 前的準備

## Summary:
為了確保 Commit 前的 code 是乾淨、符合 coding style 且能通過測試的，我們需要經過 test 、 format 、 eslint  等環節，以確認在 commit 前我們的 code 是符合規範的，而此研究就是針對 Pre Commit 的檢查步驟進行整理，並且提供一個比較方便查閱的檢查步驟。

## 環境
目前測試是針對 node.js 後端，支援 js、ts (備註： unit test 以 ts 為例），若要使用 react、vue 等前端框架需要加上一些 plugin，詳細資訊可以參考 reference 的 React eslint settings、Vue eslint settings。在使用 Git hook 前，請確保有下載 eslint 和 prettier，若有出現 eslint 與 prettier 衝突的情形可以參考此文件的 eslint 和 prettier 設定。


[注意]：以下步驟會直接進行 pre-commit，若只是需要檢驗目前程式碼是否符合 coding style，請查閱以下的 Format 和 eslint 內容並執行 All pre-commit test 的 step 2 ~ step 5
## Git Hook 
為了要讓檢查時機點和對應腳本有個明確的管控，我們可以使用 Git Hooks 來針對以下三種測試（ Test、Format、 eslint ) 進行對應腳本的註冊，而 Git 觸發這些 hooks 時就會執行這些腳本去做對應的處理。

### lint-staged 整合 format 、 lint
在 pre-commit 的時候，lint-staged 可以幫我們針對這次想要 commit 的檔案做 format 或 lint，故此處我們先安裝 lint-staged
```
npm install --save-dev lint-staged
```
在 root 新增 .lintstagedrc 檔案，配置設定 prettier 、 eslint (以下為說明用所以使用 comment，記得去除 comment)
```
{
  "**/*.{js,jsx,ts,tsx,css}": [
    // 會直接 format
    "prettier --write",
    // eslint check
    "eslint ."
  ]
}
```

### Husky - Node.js 的 Git Hooks 工具
```
npm install -D husky@4
npm install -D husky
```
在 package.json 新增 husky property，並在 hook 裡面新增 "pre-commit" (包含 unit test & coding-style check and "不符合 coding style 的 code format")
```
  ...
  "husky": {
    "hooks": {
      "pre-commit": "npm run test && lint-staged"
    }
  },
  ...
```
接著在輸入 git add . 和 git commit -m "your comment" 後，會出現 husky：
![](https://i.imgur.com/A96Qq52.png)

[可能會遇到的問題]
如果在 commit 時並未出現 husky ， 需要卸載並重新下載 husky@4 和 husky ，以確保可以取得更新後可以使用的 husky
```
npm uninstall husky
npm install -D husky@4
npm install -D husky
```
若再次 commit 後看到 husky 被啟動並執行 pre-commit 指令，表示有執行成功

## Test
在正式 commit 之前，我們需要針對 code 去撰寫我們的 unit test 檔案，此處以 Jest 為例：

我們先安裝 jest ：
```
npm install -D jest
```

若要測試 typescript，我們需要安裝 ts 相關的所有 jest 檔案
```
npm install -D jest ts-jest @types/jest
```

接著，我們在專案 root 資料夾內建立一個 tests folder，然後在 folder 內建立對應的測試檔案 （前端放在前端 root 資料夾，後端放在後端 root 資料夾)

[此處以 ts 為例子] 
在 run 測試以前，我們先在 root 資料夾裡面建立一個 jest.config.js 檔案，並且修改設置 (若沒有需要使用 ts 請參閱 [jest config 官網](https://jestjs.io/docs/configuration))
```
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  coverageDirectory: 'coverage',
  // for ts
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
};
```
為了使用 test 指令讓我們可以方便進行測試，需要修改 package.json 檔案中的 script 並新增一個 test 指令
```
  "scripts": {
    ...
    "test": "jest --coverage"
  },
```

在撰寫完成所有測試後，輸入以下指令並確保 test output 為 all pass
```
npm run test
```

最後確認一下測試覆蓋率：

![](https://i.imgur.com/TAZ2t7q.png)

以 js-Keccak-Laria 為例，library test branch 需要均為 100 %

## Format
### 目標： 
在進行 Format 時，我們需要確認我們的程式碼是符合命名規則且符合 coding style 的。
### 檢查步驟和方法：
1. 檢查命名規則
參考 [Naming covention](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md)

    - 在此處列出比較常用的幾個命名規則：
        ```
          // 檔案、Class、命名規則 
          
          Folder、File: snake_case
          
          Class: UpperCamelCase (注意： 此處的第一個字母為大寫）
          
          Function: lowerCamelCase （注意： 此處的第一個字母為小寫） 
          
          // 變數命名規則 
          
          Parameter (Public): lowerCamelCase
          
          Parameter (Private): _lowerCamelCase

          Static Constant: UPPER_SNAKE_CASE
        ```

2. Coding style 自動檢查與更新 - 安裝使用 Prettier 

    為了自動檢查排版相關的 coding style 問題，我們可以使用 npm 安裝 prettier 套件，而此套件可以幫我們找出不符合 coding style 的 code
    
    ```
    npm install --dev-dependency prettier
    ```
    接著，因為我們的 coding style 與 prettier 所預設的排版不同，我們可以在 root 建立 .prettierrc 來設定我們所要的 coding style 規則，我們目前是參考 airbnb 的規則，以下附上 airbnb 的 prettier 設定檔
    ```
	{
	    "$schema": "http://json.schemastore.org/prettierrc",
	    "arrowParens": "avoid",
	    "bracketSpacing": false,
	    "jsxSingleQuote": false,
	    "printWidth": 100,
	    "proseWrap": "always",
	    "quoteProps": "as-needed",
	    "semi": true,
	    "singleQuote": true,
	    "tabWidth": 2,
	    "trailingComma": "es5",
	    "useTabs": false
	}
    ```   
    如果未來有做大幅的 coding style 調整，我們想要自定義規則，我們可以使用 [prettier playground](https://prettier.io/playground/)，並勾選頁面左方的 options 來產出符合我們所要的 coding style 的 .prettierrc 檔案
    ![](https://i.imgur.com/KyK4pKS.png)
    
    [coding style 規則檢查指令設定] 
    
    我們需要將 package.json 檔案中的 script 增加一個 check-format 的設定，以找出目前不符合 coding style 的程式碼
    ```
    "scripts": {
        ...
        "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|ts|json)\"",
    },
    ```
    
    接著，我們可以使用以下指令來針對特定檔案使用 prettier 來自動更新不符合 coding style 的 code
    ```
    npx prettier --write src/file_you_want_to_test.js
    ```
    若想要使用一個指令讓 prettier 自動檢查所有檔案並且更新，我們可以修改 package.json 中的 script 並增加一個 format 的指令
    ```
    "scripts": {
        ...
        "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\""
    },
    ```

    最後執行以下指令，prettier 就會自動把 code 更新成符合我們所要的 coding style 的 code
    ```
    npm run format
    ```
 
## eslint 
### 目標： 
在進行 eslint check 以確認我們的程式碼沒有「錯字」和「型別錯誤」。

針對「錯字」跟「型別錯誤」，我們可以安裝 eslint，透過使用它來自動檢查我們的程式碼
```
npm install --dev-dependency eslint
```

如果要使用 ts，需要安裝 ts 相關的 plugin
```
 npm install @typescript-eslint/eslint-plugin@latest --save-dev
 npm install @typescript-eslint/parser --save-dev
```

接著，在 root 新增 .eslintrc.js 檔案

承上，我們需要來修改 .eslintrc.js 檔案內容為以下的 code 來讓 eslint support es6 語法 和 ts
```
module.exports = {
  parserOptions: {
    ecmaVersion: 2019, // 支援 ECMAScript2019
    sourceType: 'module', // 使用 ECMAScript ****module
    ecmaFeatures: {
      jsx: true, // 支援 JSX
      experimentalObjectRestSpread: true,
    },
  },
  // 加上 ts 相關規則
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
  extends: ['plugin:import/typescript'],
  // 加上 no console log 規則
  rules: {
    'no-console': 'error'
  },
  // 整合 prettier 和解決 prettier 衝突問題
  plugins: ['prettier'],
};


```
此時我們可以再輸入以下指令來檢查目前的檔案
```
npx eslint .
```
這時可能會發現 terminal 顯示缺乏 pkg

因此我們需要再下以下指令
```
npm install eslint-plugin-import@latest --save-dev
npm install eslint-plugin-prettier@latest --save-dev
```
然而，我們需要整理指令將其歸納到 package.json 中以方便統一管理，讓其他開發者在開發同樣的專案時能夠以相同的指令進行 eslint 檢查，故我們在 script 中新增 lint
```
  "scripts": {
		...
    "lint": "eslint --ignore-path .gitignore ."
  }
```
最後，為了方便可以一次使用 check-format 、 eslint ，我們可以在 package.json 中將其整合成一個 validate 指令
```
  "scripts": {
		...
    "validate": "npm run test && npm run check-format && npm run lint"
  }
```

## All pre-commit test
1. Git branch 檢查
   - 檢查目前的 branch 為何？
      ```
      git branch -a
      ```
   - switch 到正確的分支
      ```
      git checkout feature/your_branch
      ``` 
   - 確認 pull 成最新版本（ branch 為 develop or main ）
      ```
      git pull origin develop
      ```
      or
      ```
      git pull origin main
      ```
2. 檢查 Naming covention
    參考 [Naming covention](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md)

3. 確保 console.log 有正確刪除，若要 print 出結果來檢查，我們可以使用 Logger

   若使用 vscode，可以使用左方的 search 功能搜尋所有 console.log

    ![](https://i.imgur.com/YijGFdH.png)

4. 先進行檢驗 - unit-test & check-format & eslint
    ```
    // 確保你的 unit test 會通過，且測試覆蓋率有維持一定標準
    // 確保你的 coding style 沒問題
    npm run validate
    ```
5. 若有出現 prettier 報錯，可以使用以下 command 一次修正
    ```
    npm run format
    ```
6. 進行 Pre-commit (unit test & prettier & eslint)
    ```
    git add .
    git commit -m "your comment"
    ```
7. git hook 執行 pre-commit 檢查拼字、型別錯誤、console.log 
8. 若未看到出錯警訊，即完成 commit


## Reference

jest 官網： https://jestjs.io/docs/configuration

jest: https://titangene.github.io/article/jest-typescript.html

eslint and prettier: https://ithelp.ithome.com.tw/users/20130284/ironman/3612

airbnb config: https://www.npmjs.com/package/prettier-airbnb-config

eslint settings: https://pjchender.dev/webdev/note-eslint/

React eslint settings: https://ithelp.ithome.com.tw/articles/10215259

Vue eslint settings: https://pjchender.blogspot.com/2019/07/vue-vue-style-guide-eslint-plugin-vue.html

husky: https://typicode.github.io/husky/#/
