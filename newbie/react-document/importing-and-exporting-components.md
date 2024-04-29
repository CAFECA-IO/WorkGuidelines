# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。最後原文有提供一個實作的挑戰，這裡筆者就不放上來了，這部分請至原文按照步驟試試看。

# React | Importing and Exporting Components

元件的魔力在於它們的可重複使用性：你可以建立由其他元件組成的元件。但隨著你越來越多地嵌套元件，將它們拆分為不同的文件通常是有意義的。這讓你可以保持文件易於瀏覽，並在更多地方重複使用元件。

### 你將會學到

- 什麼是根元件檔案
- 如何導入和導出一個元件
- 何時使用預設和具名導入和導出
- 如何從一個文件中導入和導出多個元件
- 如何將元件拆分為多個文件

## The root component file - 根元件檔案

在 [Your First Component](https://react.dev/learn/your-first-component) 中，你建立了一個 `Profile` 元件和一個 `Gallery` 元件來渲染它：

App.js:

```jsx
function Profile() {
  return <img src='https://i.imgur.com/MK3eW3As.jpg' alt='Katherine Johnson' />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

這些目前位於**根元件檔案**中，在此範例中名為 `App.js`。不過，根據你的設定，你的根元件可能位於另一個檔案中。如果你使用**基於檔案路由的框架**（framework with file-based routing），例如 Next.js，每個頁面的根元件都會不同。

## Exporting and importing a component - 導出和導入元件

如果你未來想要更改登陸畫面(landing screen)並放置一個科學書籍清單？或者將所有個人檔案放在其他地方？將 `Gallery` 和 `Profile` 從根元件檔案中移出是合理的。這將使它們更模組化並可在其他文件中重複使用。你可以通過三個步驟移動一個元件：

1. **建立**一個新的 JS 檔案以放置元件。
2. 從該文件中**導出**你的函數元件（使用 [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) 或 [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) 導出）。
3. 在你將使用元件的文件中**導入**它（使用相應的技術進行導入 [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) 或 [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) 導出）。

現在將 `Profile` 和 `Gallery` 兩者都從 `App.js` 移動到一個名為 `Gallery.js` 的新文件中。現在你可以更改 `App.js`，從 `Gallery.js` 中導入 `Gallery`：

App.js:

```jsx
import Gallery from "./Gallery.js";

export default function App() {
  return <Gallery />;
}
```

Gallery.js:

```jsx
function Profile() {
  return <img src='https://i.imgur.com/QIrZWGIs.jpg' alt='Alan L. Hart' />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

請注意，此範例現在分為兩個元件文件：

1. `Gallery.js`：
   - 定義了 `Profile` 元件，該元件僅在同一文件中使用，並未導出。
   - 將 `Gallery` 元件作為 **預設導出(default export)** 導出。
2. `App.js`：
   - 從 `Gallery.js` 中導入 `Gallery` 為 **預設導入(default import)**。
   - 將根 `App` 元件作為 **default export** 導出。

> 筆記 : <br/>
> 你可能會遇到省略 `.js` 檔案副檔名的檔案，像這樣：
>
> ```jsx
> import Gallery from "./Gallery";
> ```
>
> 在 React 中，`'./Gallery.js'` 或 `'./Gallery'` 都可以使用，不過前者更接近 [原生 ES 模組](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) 的運作方式。

### 深入探討 : 預設導出 vs 具名導出 (Default vs named exports)

在 JavaScript 中，有兩種主要的導出值的方式：預設導出和具名導出。

到目前為止，我們的例子只使用了預設導出。但你可以在同一個文件中使用其中一個或兩個都使用。**一個文件最多只能有一個 _預設_ 導出，但可以有任意多個 _具名_ 導出。**

<!-- img here -->

你導出元件的方式將決定你必須如何導入它。如果你嘗試以與具名導出相同的方式導入預設導出，則會收到錯誤！以下圖表可以幫助你追蹤：

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

當你撰寫預設導入時，你可以在 `import` 後面放置任何你想要的名稱。例如，你可以寫成 `import Banana from './Button.js'`，它仍然會提供你相同的預設導出。相比之下，對於具名導入，名稱必須在兩側匹配。這就是為什麼它們被稱為 _具名_ 導入的原因！

**如果檔案只導出一個元件，人們通常會使用預設導出，如果它導出多個元件和值，則會使用具名導出。** 無論你偏好哪種程式碼風格，都請始終給你的元件函數和包含它們的檔案命名有意義的名稱。沒有名稱的元件，例如 `export default () => {}`，我們不建議你這樣寫，因為它們使得除錯變得更加困難。

## Exporting and importing multiple components from the same file - 從同一個文件導出和導入多個元件

如果你只想顯示一個 `Profile` 而不是一個 gallery 呢？你也可以導出 `Profile` 元件。但是 `Gallery.js` 已經有一個 _預設_ 導出，你不能有 _兩個_ 預設導出。你可以建立一個具有預設導出的新文件，或者為 `Profile` 添加一個 _具名_ 導出。**一個文件只能有一個預設導出，但可以有許多具名導出！**

> 筆記 : <br/>
> 為了減少預設導出和具名導出之間的潛在混淆，有一些團隊會選擇只使用一種風格（預設或具名），或者避免在單個文件中混合它們。請按照最適合你的方式操作！

首先，在 `Gallery.js` 中使用具名導出（不使用 `default` 關鍵字）**導出** `Profile`：

```jsx
export function Profile() {
  // ...
}
```

然後，在 `App.js` 中使用具名導入（使用大括號）**導入** `Profile` 自 `Gallery.js`：

```jsx
import { Profile } from "./Gallery.js";
```

最後，在 `App` 元件中**渲染** `<Profile />`：

```jsx
export default function App() {
  return <Profile />;
}
```

現在 `Gallery.js` 包含兩個導出：一個預設的 `Gallery` 導出，以及一個具名的 `Profile` 導出。`App.js` 導入了它們兩個。

App.js :

```jsx
import Gallery from "./Gallery.js";
import { Profile } from "./Gallery.js";

export default function App() {
  return <Profile />;
}
```

Gallery.js :

```jsx
export function Profile() {
  return <img src='https://i.imgur.com/QIrZWGIs.jpg' alt='Alan L. Hart' />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

現在你正在混合使用預設導出和具名導出：

- `Gallery.js`：
  - 將 `Profile` 元件作為名為 `Profile` 的 **具名導出** 導出。
  - 將 `Gallery` 元件作為 **預設導出** 導出。
- `App.js`：
  - 從 `Gallery.js` 中作為名為 `Profile` 的 **具名導入** 導入 `Profile`。
  - 從 `Gallery.js` 中作為 **預設導入** 導入 `Gallery`。
  - 將根 `App` 元件作為 **預設導出** 導出。

## 回顧

在本章你學到了：

- 什麼是根元件檔案
- 如何導入和導出元件
- 何時以及如何使用預設和具名導入和導出
- 如何從同一個文件導出多個元件

## 試著挑戰看看

這部分是一個挑戰題，這裡僅翻譯題目，剩下答題的部分就去[原文](https://react.dev/learn/importing-and-exporting-components#challenges)照著步驟挑戰看看吧！

### 題目 - 挑戰 1/1: 進一步拆分元件

目前，`Gallery.js` 同時導出了 `Profile` 和 `Gallery`，這讓人有點混亂。

請將 `Profile` 元件移動到自己的 `Profile.js` 中，然後更改 `App` 元件以依次渲染 `<Profile />` 和 `<Gallery />`。

你可以為 `Profile` 使用預設導出或具名導出，但請確保在 `App.js` 和 `Gallery.js` 中使用相應的導入語法！你可以參考上面深入探討中的表格：

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

# 結語

這篇文章帶我們了解了如何將元件拆分為不同的文件，並在不同文件之間導入和導出它們。這是一個重要的技巧，可以幫助我們保持程式碼整潔並提高可重用性。

# 本文參考來源

[Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
