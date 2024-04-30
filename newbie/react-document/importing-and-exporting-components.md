# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。最後原文有提供一個實作的挑戰，這裡筆者就不放上來了，這部分請至原文按照步驟試試看。

# React | Importing and Exporting Components - 導入與導出元件

元件(Component)的魔力在於它們的可重複使用性：你可以建立由其他元件組成的元件。也就是說，一個元件中可以包含多個元件，一層又一層的嵌套下去。

但隨著嵌套元件越來越多，我們就越需要將它們拆分為不同的檔案、文件(File)。如此一來，我們的檔案會變得更方便瀏覽，並且可以在更多地方重複使用這些元件。

### 這章節你將會學到

- 什麼是根元件檔案
- 如何導入和導出一個元件
- 何時使用預設和具名的導入和導出
- 如何從一個文件中導入和導出多個元件
- 如何將元件拆分為多個文件

## The root component file - 根元件檔案

在 [Your First Component](https://react.dev/learn/your-first-component) 中，你建立了一個 `Profile` 元件和一個 `Gallery` 元件來渲染它，這章節會接續這個範例，繼續示範：

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

這兩個元件目前位於**根元件檔案**中，在此範例中的根元件檔案名稱為 `App.js`。

根據每個人自己的設定，根元件名稱不一定要是 `App.js`，而可能是 `index.js` 或 `Main.js` 等。總之，根元件檔案是你應用程式的入口點，通常包含應用程式的主要元件。

而如果你使用**基於檔案路由的框架** (framework with file-based routing)，例如 Next.js，則每個頁面的根元件都會不同。（這裡不會進一步說明關於 NextJS，有興趣的讀者可以自行查閱）

## Exporting and importing a component - 導出和導入元件

現在我們要將範例中的 `Gallery` 和 `Profile` 從根元件檔案 (`App.js`) 中移出，因為我們可能會在其他地方重複使用它們。我們要盡量將元件拆分為更小的部分，這樣可以更容易維護和重複使用。

我們可以通過三個步驟移動這個元件：

1. 首先先**建立**一個新的 JS 檔案以放置此元件。
2. 從新的檔案中**導出**此函數元件（使用 [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) 或 [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) 導出）。
3. 在要使用此元件的檔案中**導入**它（使用相應的技術進行導入 [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) 或 [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) 導出）。

現在將 `Profile` 和 `Gallery` 兩者都從 `App.js` 移動到一個名為 `Gallery.js` 的新文件中。

現在我們在 `App.js` 中設定，從 `Gallery.js` 導入 `Gallery` 元件：

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
   - 定義 `Profile` 元件，該元件僅在同一文件中使用，並未導出。
   - 將 `Gallery` 元件作為 **預設導出 (default export)** 導出。
2. `App.js`：
   - 從 `Gallery.js` 中導入 `Gallery` 為 **預設導入 (default import)**。
   - 將根元件 `App` 作為 **default export** 導出。

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

到目前為止，我們的例子只使用了預設導出。但其實我們可以在同一個文件中使用其中一個，或者兩個都同時使用。

**特別注意：一個文件最多只能有一個 _預設_ 導出，但可以有任意多個 _具名_ 導出。**

![i_import-export](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/9018af06-0065-40ff-8945-555d6ab9c0af)

你導出元件的方式會決定你必須如何導入它。也就是說，如果你嘗試以與具名導出相同的方式導入預設導出，就會收到錯誤！

以下表格可以幫助你對照：

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

當你撰寫預設導入時，你可以在 `import` 後面放置任何你想要的名稱。例如，你可以寫成 `import Banana from './Button.js'`，它仍然會提供你相同的預設導出。

相比之下，對於具名導入，名稱必須在兩側匹配。這就是為什麼它們被稱為 _具名_ 導入的原因！

**如果檔案只導出一個元件，人們通常會使用預設導出，如果檔案會導出多個元件和值，則會使用具名導出。**

無論你偏好哪種程式碼風格，都請將你的元件函式(component functions)以及包含元件的檔案，賦予有意義的命名。有意義的命名可以幫助你和其他人更容易理解你的程式碼。舉一個較好命名方式：像是一個元件函式用來呈現按鈕的話，我們會命名為 `Button`，而包含此元件函式的檔案我們就會命名為 `Button.js`。

注意，我們不建議你這樣寫這種沒有名稱的元件，例如 `export default () => {}`，因為它們會使除錯變得困難。

## Exporting and importing multiple components from the same file - 從同一個文件導出和導入多個元件

如果我們要顯示 `Profile` 呢？

我們可以從 `Gallery.js` 導出 `Profile` 元件，但是目前 `Gallery.js` 已經有一個 _預設_ 導出，並且一個檔案不能有 _兩個_ 預設導出，所以我們只能使用 _具名_ 導出 `Profile` 元件。

或者另一種方式是，我們可以將 `Profile` 元件移動到一個新的檔案中，例如 `Profile.js`，然後在 `Gallery.js` 中導入它。

> 筆記 : <br/>
> 為了減少預設導出和具名導出之間的潛在混淆，有一些團隊會選擇只使用一種風格（預設或具名），或者避免在單個文件中混合它們。請按照最適合你的方式操作！

這裡的範例是從 `Gallery.js` 導出 `Profile` 元件，並在 `App.js` 中導入它。

首先，在 `Gallery.js` 中使用具名導出 `Profile`（不使用 `default`）：

```jsx
export function Profile() {
  // ...
}
```

然後，在 `App.js` 中使用具名導入 `Profile`（使用大括號`{}`）：

```jsx
import { Profile } from "./Gallery.js";
```

最後，在 `App` 元件中**渲染** `<Profile />`：

```jsx
export default function App() {
  return <Profile />;
}
```

總之，現在 `Gallery.js` 檔案中包含兩個導出：一個是預設的 `Gallery` 導出，另一個是具名的 `Profile` 導出。並在 `App.js` 導入了它們兩個：

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

這個範例混合使用了預設導出和具名導出，這裡再做一個統整：

- `Gallery.js`：
  - 將 `Profile` 元件作為名為 `Profile` 的 **具名導出** 導出。
  - 將 `Gallery` 元件作為 **預設導出** 導出。
- `App.js`：
  - 從 `Gallery.js` 中作為名為 `Profile` 的 **具名導入** 導入 `Profile`。
  - 從 `Gallery.js` 中作為 **預設導入** 導入 `Gallery`。
  - 將根 `App` 元件作為 **預設導出** 導出。

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

這篇文章帶我們了解到如何將元件拆分為不同的檔案，並在不同檔案之間導入和導出它們。

透過這樣拆分，把不同的元件放在不同的檔案中，可以讓我們更容易找到我們想要的元件，並且可以在需要的地方重複使用它們。

例如將 Button、SearchBar、Pagination、Card 等元件放在不同的檔案中，當我們需要使用時，只需要導入即可，不需要重複寫一次，這就是共用元件的好處。

重點回顧：

1. 根元件檔案是一個包含多個元件的文件，通常是應用程式的入口點。（如果使用基於檔案路由的框架像是 Next.js，則每個頁面的根元件都會不同）
2. 使用預設導出和具名導出來導出元件，並使用相應的導入語法來導入它們。
3. 一個文件最多只能有一個預設導出，但可以有任意多個具名導出。

# 本文參考來源

[Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
