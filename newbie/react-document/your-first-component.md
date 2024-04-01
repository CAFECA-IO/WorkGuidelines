# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/e8a44b7baec5953891f747c47f0cf64799c3e30c/newbie/react-document/describing-the-ui.md#your-ui-as-a-tree-%E5%B0%87%E4%BD%A0%E7%9A%84-ui-%E8%A6%96%E7%82%BA%E6%A8%B9%E7%8B%80%E7%B5%90%E6%A7%8B) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。最後原文有提供一個實作的挑戰，這裡筆者就不放上來了，這部分請至原文按照步驟試試看。

# React | Your First Component

_元件_ 是 React 的核心概念之一。它們是你建構使用者界面（UI）的基礎，這使它們成為你開始 React 之旅的完美起點！

### 你將學到：

- 什麼是元件
- 元件在 React 應用程式中扮演的角色
- 如何撰寫你的第一個 React 元件

## Components: UI building blocks (元件：UI 架構塊)

在網頁上，HTML 讓我們可以使用其內建的一組標籤(tags)，如`<h1>`和`<li>`，來建立豐富的結構化文檔。

> tag VS markup : <br/>
> 我們常常看到 tag 與 markup 都被翻譯為「標籤」，筆者認為他們的差異在於：tag 指的是 HTML 的標籤，而 markup 指的是標記語言的標記。 <br/>
> 像是 `<h1>` 是一個 tag，而 `<h1>標題</h1>` 則是一個 markup。 <br/>
> 實際上，HTML 就是 HyperText Markup Language (超文本標記語言) 的縮寫。 <br/>
> 接下來，筆者會將 tag 譯為「標籤」，而 markup 譯為「標記文本」，以此區別兩者。

下面這段程式碼是一個 markup，可以稱為「標記文本」：

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

這個標記文本展現了這篇文章的 `<article>`、它的標題 `<h1>`，以及一個（縮寫的）目錄作為有序清單 `<ol>`。像這樣的標記文本，配合 CSS 設定風格，JavaScript 實現互動，是網頁上每個側邊欄、頭像、對話框和下拉式選單等 UI 元素的基礎。

React 讓你將你的標記文本、CSS 和 JavaScript 組合成自定義的“元件”，也是你應用程式中可重複使用的 UI 元素。你上面看到的目錄程式碼可以轉換為 `<TableOfContents />` 元件，你可以在每個頁面上渲染它。在幕後，它仍然使用相同的 HTML 標籤，如 `<article>`、`<h1>` 等。

就像 HTML 標籤一樣，你可以組合、排序和嵌套元件來設計整個頁面。例如，你正在閱讀的文檔頁面由 React 元件組成：

```html
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

隨著專案的成長，你會注意到許多設計可以通過重複使用你已經編寫的元件來組合，從而加快開發速度。我們上面的目錄可以通過 `<TableOfContents />` 添加到任何螢幕上！你甚至可以通過 React 開源社區共享的成千上萬個元件，如 [Chakra UI](https://chakra-ui.com/) 和 [Material UI](https://material-ui.com/)，來快速啟動你的專案。

## Defining a component (定義一個元件)

傳統上，在建立網頁時，網頁開發人員會對內容加上標記文本，然後通過少量地添加 JavaScript 來增加互動功能。當互動僅僅是網頁上的一個額外功能(nice-to-have)而非必要功能時，這種方法效果很好。

但現在，對於許多網站和所有應用程式來說，互動已經是一個期待的必要功能。

React 將互動放在首位，同時仍然使用相同的技術： **一個 React 元件是一個你可以 _加入標記文本_ 的 JavaScript 函數。**

```jsx
export default function Profile() {
  return <img src='https://i.imgur.com/MK3eW3Am.jpg' alt='Katherine Johnson' />;
}
```

以下是建立元件的步驟:

### 步驟 1：匯出元件 (Export the component)

`export default` 前綴是[標準的 JavaScript 語法](https://developer.mozilla.org/docs/web/javascript/reference/statements/export)（不僅限於 React）。

它讓你可以標記文件中的主要函式，以便稍後可以從其他文件中導入它。（更多關於導入的資訊，可以參考[導入和匯出元件](https://react.dev/learn/importing-and-exporting-components)！）

### 步驟 2：定義函式 (Define the function)

使用 `function Profile() { }` 你可以定義一個名稱為 `Profile` 的 JavaScript 函式。

> 陷阱 : <br/>
> React 元件是常規的 JavaScript 函式，但**它們的名稱必須以大寫字母開頭**，否則它們將無法運行！

### 步驟 3：新增標籤 (Add markup)

該元件回傳一個具有 `src` 和 `alt` 屬性的 `<img />` 標籤。 `<img />` 就像 HTML 一樣被寫入，但實際上它在幕後是 JavaScript！這種語法被稱為[JSX](https://react.dev/learn/writing-markup-with-jsx)，它允許你在 JavaScript 中嵌入標籤。

回傳語句可以全部寫在一行上，就像這個元件中一樣：

```jsx
return <img src='<https://i.imgur.com/MK3eW3As.jpg>' alt='Katherine Johnson' />;
```

但如果你的標記不全都在與 `return` 相同的行上，則必須將其包裹在一對括號中：

```jsx
return (
  <div>
    <img src='<https://i.imgur.com/MK3eW3As.jpg>' alt='Katherine Johnson' />
  </div>
);
```

> 陷阱 : <br/>
> 沒有括號，`return` 之後的任何代碼[都會被忽略](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)！

## Using a component (使用元件)

現在你已經定義了你的 `Profile` 元件，你可以將它嵌套在其他元件中。例如，你可以匯出一個 `Gallery` 元件，該元件使用多個 `Profile` 元件：

App.js :

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

### What the browser sees (瀏覽器看到的內容)

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

請注意大小寫的差異：

- `<section>` 是小寫的，因此 React 知道我們指的是一個 HTML 標籤。
- `<Profile />` 以大寫 `P` 開頭，所以 React 知道我們要使用我們稱為 `Profile` 的元件。

而 `Profile` 元件中還包含更多的 HTML：`<img />`。

最終，這就是瀏覽器所看到的內容：

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Nesting and organizing components (巢狀嵌套和組織元件)

元件是常規的 JavaScript 函數，因此你可以將多個元件放在同一個文件中。當元件相對較小或彼此之間關聯緊密時，這很方便。如果這個文件變得擁擠，你可以將 `Profile` 移到單獨的文件中。（你很快就會在[有關導入的頁面](https://react.dev/learn/importing-and-exporting-components)上學會如何做到這一點。）

由於 `Profile` 元件被渲染在 `Gallery` 內 ── 甚至多次！── 我們可以說 `Gallery` 是一個**父元件**，它將每個 `Profile` 渲染為一個**子元件**。這就是 React 的魔力所在：你可以定義(define)一個元件一次，然後在許多地方和許多次使用它。

> 陷阱
>
> 元件可以渲染其他元件，但**絕不要嵌套(nest)它們的定義，也就是說永遠不要在另一個元件內定義元件：**
>
> ```jsx
> export default function Gallery() {
>   // 🔴 Never define a component inside another component!
>   function Profile() {
>     // ...
>   }
>   // ...
> }
> ```
>
> 上面的程式碼片段[非常緩慢並導致錯誤。](https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) 正確的做法是，請將每個元件定義在最頂層：
>
> ```jsx
> export default function Gallery() {
>   // ...
> }
>
> // ✅ Declare components at the top level
> function Profile() {
>   // ...
> }
> ```
>
> 當子元件需要從父元件獲取一些資料時，[請通過 props 進行傳遞](https://react.dev/learn/passing-props-to-a-component)，而不是嵌套定義。

### Deep Dive - Components all the way down (深入探索 - 元件無所不在)

你的 React 應用程式始於一個“根”元件。通常，當你啟動一個新專案時，它會自動建立。例如，如果你使用 [CodeSandbox](https://codesandbox.io/) 或使用框架 [Next.js](https://nextjs.org/)，根元件定義在 `pages/index.js` 中。在這些範例中，你已經在匯出根元件。

大多數 React 應用程式從根元件開始一路使用元件。這意味著你不僅會將元件用於可重複使用的部分，如按鈕，還會用於更大的部分，如側邊欄，列表，最終甚至是完整的頁面！元件是組織 UI 代碼和標記文本的便利方式，即使其中一些元件只使用一次也是如此。

[基於 React 的框架](https://react.dev/learn/start-a-new-react-project)將此進一步發展。它們不僅僅使用空的 HTML 檔案並讓 React “接手” 管理頁面（用 JavaScript），而且還可以從你的 React 元件自動生成 HTML。這使得你的應用程式可以在 JavaScript 程式碼載入之前顯示一些內容。

不過，許多網站只使用 React 來[為現有的 HTML 頁面添加互動性](https://react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)。它們有許多根元件，而不是單一的根元件用於整個頁面。你可以根據需要使用更多或更少的 React。

## 回顧

恭喜你剛剛第一次嘗試了 React！讓我們回顧一些關鍵要點：

- React 讓你建立元件，**應用程式中可重複使用的 UI 元素。**
- 在 React 應用程式中，每個 UI 元素都是一個元件。
- React 元件就是常規的 JavaScript 函式，只是：
  1. 它們的名稱始終以大寫字母開頭。
  2. 它們回傳 JSX 標記文本(markup)。

## 試著挑戰看看

這部分是一個挑戰題，這裡就不爆雷，趕緊去[原文](https://react.dev/learn/your-first-component#challenges)照著步驟挑戰看看吧！

# 結語

此章節介紹了 React 的元件概念，並且示範了如何建立和使用元件。元件是 React 應用程式的基礎，你可以將其視為可重複使用的 UI 元素。透過元件，你可以將 UI 拆分成更小的部分，並且可以在不同的地方重複使用。

# 本文參考來源

[Your First Component](https://react.dev/learn/your-first-component)
