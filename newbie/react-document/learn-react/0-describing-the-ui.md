# Describing the UI: Unveiling the Power of React Components

**_描述使用者介面：揭示 React 元件的威力_**

# 前言

這篇文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。（React 官方文件的翻譯筆記將會是一個系列，敬請期待！）

這個章節主要是描述使用者介面，讓你了解如何建立、自定義和有條件地顯示 React 元件等。

這是一個類似於大綱的章節，不會提供過多細節，每個標題底下頂多提供一個簡單的範例，這個章節的目的，是讓初學者對使用者介面有個基本且快速的了解。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

每個標題都有延伸的章節可以閱讀，之後筆者會再提供逐篇翻譯。延伸章節有提供實作的部分，建議可以參考原文練習。

# Describing the UI (描述使用者介面)

React 是一個用於呈現使用者介面（UI）的 JavaScript 函式庫。UI 是由像按鈕、文字和圖像這樣的小單位所建構而成。

React 讓你將它們結合成可重複使用、可嵌套的**元件** 。從網站到手機應用程式，螢幕上的所有內容都可以拆分為元件。

在這一章節中，你將學習建立、自定義和有條件地顯示 React 元件。

## 目錄

- [Your first component (你的第一個元件)](#your-first-component-你的第一個元件)
- [Importing and exporting components (匯入與匯出元件)](#importing-and-exporting-components-匯入與匯出元件)
- [Writing markup with JSX (使用 JSX 撰寫標記文本)](#writing-markup-with-jsx-使用-jsx-撰寫標記文本)
- [JavaScript in JSX with curly braces (JSX 中使用花括號表示 JavaScript)](#javascript-in-jsx-with-curly-braces-jsx-中使用花括號表示-javascript)
- [Passing props to a component (將 props 傳遞給元件)](#passing-props-to-a-component-將-props-傳遞給元件)
- [Conditional rendering (條件渲染)](#conditional-rendering-條件渲染)
- [Rendering lists (渲染清單)](#rendering-lists-渲染清單)
- [Keeping components pure (保持元件的純函式特性)](#keeping-components-pure-保持元件的純函式特性)
- [Your UI as a tree (將你的 UI 視為樹狀結構)](#your-ui-as-a-tree-將你的-ui-視為樹狀結構)

## Your first component (你的第一個元件)

React 應用程式由稱為*元件*的獨立 UI 塊組成。

一個 React 元件是一個你可以在其中加入標記文本的 JavaScript 函式。

元件可以小至一個按鈕，大至整個頁面。

以下是一個名為 `Gallery` 的元件，呈現了三個 `Profile` 元件：

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

### 延伸閱讀

閱讀 **[你的第一個元件](https://react.dev/learn/your-first-component)** 來學習如何宣告和使用 React 元件。

## Importing and exporting components (匯入與匯出元件)

你可以在一個檔案中宣告多個元件，但大型檔案可能會讓導覽變得困難。

為了解決這個問題，你可以將一個元件 **匯出(export)** 到它自己的檔案中，然後從另一個檔案 **匯入(import)** 該元件：

Gallery.js :

```jsx
import Profile from "./Profile.js";

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

Profile.js :

```jsx
export default function Profile() {
  return <img src='https://i.imgur.com/QIrZWGIs.jpg' alt='Alan L. Hart' />;
}
```

### 延伸閱讀

閱讀 **[匯入與匯出元件](https://react.dev/learn/importing-and-exporting-components)** 以學習如何將元件分割為它們自己的檔案。

## Writing markup with JSX (使用 JSX 撰寫標記文本)

每個 React 元件都是一個 JavaScript 函式，其中可能包含一些標記文本(markup)，React 會將其呈現到瀏覽器中。

> markup: <br/>
> 指的是標記語言中的標記文本，用於定義文檔的結構和格式。 <br/>
> HTML 是由標籤(tag)組合而成的標記文本，其中的 `<div>`、`<p>` 和 `<span>` 就是標籤(tag)。 <br/>
> 在 React 中，JSX 也是一種類似標記文本的語法，用於定義 UI 元素的結構。

> tag VS markup : <br/>
> 我們常常看到 tag 與 markup 都被翻譯為「標籤」，筆者認為他們的差異在於：tag 指的是 HTML 的標籤，而 markup 指的是標記語言的標記。 <br/>
> 像是 `<h1>` 是一個 tag，而 `<h1>標題</h1>` 則是一個 markup。 <br/>
> 實際上，HTML 就是 HyperText Markup Language (超文本標記語言) 的縮寫。 <br/>
> 接下來，筆者會將 tag 譯為「標籤」，而 markup 譯為「標記文本」，以此區別兩者。

React 元件使用一種語法擴展叫做 JSX 來表示該標記文本。JSX 看起來很像 HTML，但它更嚴格，並且可以顯示動態資訊。

如果我們將現有的 HTML 標記文本(HTML markup)貼到 React 元件中，它不一定會正常運作：

App.js :

```jsx
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve spectrum technology
    </ul>
  );
}
```

> Error :
>
> ```
> /src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (5:4)
>
>   3 |     // This doesn't quite work!
>   4 |     <h1>Hedy Lamarr's Todos</h1>
> > 5 |     <img
>     |     ^
>   6 |       src="https://i.imgur.com/yXOvdOSs.jpg"
>   7 |       alt="Hedy Lamarr"
>   8 |       class="photo"
> ```

如果你有類似這樣的現有 HTML，你可以使用[轉換器](https://transform.tools/html-to-jsx)來修復它：

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img src='https://i.imgur.com/yXOvdOSs.jpg' alt='Hedy Lamarr' className='photo' />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

### 延伸閱讀

閱讀 **[使用 JSX 撰寫標記文本](https://react.dev/learn/writing-markup-with-jsx)** 以學習如何撰寫有效的 JSX。

## JavaScript in JSX with curly braces (JSX 中使用花括號表示 JavaScript)

JSX 允許你在 JavaScript 檔案中寫入類似 HTML 的標記文本，將渲染邏輯和內容放在同一個地方。

有時你會希望在該標記文本中添加一些 JavaScript 邏輯或引用動態屬性。

在這種情況下，你可以在 JSX 中使用花括號來“打開一個窗口”到 JavaScript：

```jsx
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className='avatar' src='https://i.imgur.com/7vQD0fPs.jpg' alt='Gregorio Y. Zara' />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

### 延伸閱讀

閱讀 **[JSX 中的 JavaScript 與花括號](https://react.dev/learn/javascript-in-jsx-with-curly-braces)** 以學習如何從 JSX 中訪問 JavaScript 資料。

## Passing props to a component (將 props 傳遞給元件)

React 元件使用 **props** 來彼此通訊。

每個父元件都可以通過將 props 傳遞給其子元件來傳遞一些資訊。

Props 可能讓你想到了 HTML 屬性，但你可以通過它們傳遞任何 JavaScript 值，包括物件、陣列、函式，甚至是 JSX！

App.js :

```jsx
import { getImageUrl } from "./utils.js";

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}

function Avatar({ person, size }) {
  return <img className='avatar' src={getImageUrl(person)} alt={person.name} width={size} height={size} />;
}

function Card({ children }) {
  return <div className='card'>{children}</div>;
}
```

utils.js :

```jsx
export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
```

### 延伸閱讀

閱讀 **[將 Props 傳遞給元件](https://react.dev/learn/passing-props-to-a-component)** 以學習如何傳遞和讀取 props。

## Conditional rendering (條件渲染)

你的元件通常會根據不同的條件顯示不同的內容。在 React 中，你可以使用 JavaScript 語法，如 `if` 語句、 `&&` 和 `? :` 運算子(operator)來有條件地渲染 JSX。

在這個例子中，使用了 JavaScript 的 `&&` 運算子來有條件地渲染一個勾勾符號(checkmark)：

```jsx
function Item({ name, isPacked }) {
  return (
    <li className='item'>
      {name} {isPacked && "✔"}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name='Space suit' />
        <Item isPacked={true} name='Helmet with a golden leaf' />
        <Item isPacked={false} name='Photo of Tam' />
      </ul>
    </section>
  );
}
```

### 延伸閱讀

閱讀 **[條件渲染](https://react.dev/learn/conditional-rendering)** 以學習不同的條件渲染內容的方式。

## Rendering lists (渲染清單)

你通常會想要從一組資料中顯示多個相似的元件。

你可以在 React 中使用 JavaScript 的 `filter()` 和 `map()` 來過濾和轉換你的資料陣列為元件陣列。

對於每個陣列項目，你需要指定一個 `key`。

通常，你會希望使用來自資料庫的 ID 作為 `key`。`key` 讓 React 能夠跟蹤列表中每個項目的位置，即使列表發生變化。

App.js :

```jsx
import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function List() {
  const listItems = people.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

data.js :

```jsx
export const people = [
  {
    id: 0,
    name: "Creola Katherine Johnson",
    profession: "mathematician",
    accomplishment: "spaceflight calculations",
    imageId: "MK3eW3A",
  },
  {
    id: 1,
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
    accomplishment: "discovery of Arctic ozone hole",
    imageId: "mynHUSa",
  },
  {
    id: 2,
    name: "Mohammad Abdus Salam",
    profession: "physicist",
    accomplishment: "electromagnetism theory",
    imageId: "bE7W1ji",
  },
  {
    id: 3,
    name: "Percy Lavon Julian",
    profession: "chemist",
    accomplishment: "pioneering cortisone drugs, steroids and birth control pills",
    imageId: "IOjWm71",
  },
  {
    id: 4,
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
    accomplishment: "white dwarf star mass calculations",
    imageId: "lrWQx8l",
  },
];
```

utils.js :

```jsx
export function getImageUrl(person) {
  return "https://i.imgur.com/" + person.imageId + "s.jpg";
}
```

### 延伸閱讀

閱讀 **[渲染清單](https://react.dev/learn/rendering-lists)** 以學習如何渲染一個元件清單，以及如何選擇一個鍵（key）。

## Keeping components pure (保持元件的純函式特性)

某些 JavaScript 函式是 _純函式_ 。一個純函式具有以下特性：

- **只管自己的事。** 它不會改變在它被呼叫之前存在的任何物件或變數。
- **同樣的輸入，同樣的輸出。** 給定相同的輸入(inputs)，一個純函式應該要始終都回傳相同的結果(result)。

嚴格地只將你的元件編寫為純函式，你就可以避免在程式碼庫增長時，遇到的一整類令人困惑的錯誤和不可預測的行為。以下是一個不純的元件的例子：

App.js :

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

你可以通過傳遞一個 prop，而不是修改一個預先存在的變數，來使這個元件成為純函式(make this component pure)：

App.js :

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

### 延伸閱讀

閱讀 **[保持元件的純函式特性](https://react.dev/learn/keeping-components-pure)** 以學習如何將元件編寫為純函式，以獲得可預測性。

## Your UI as a tree (將你的 UI 視為樹狀結構)

React 使用樹狀結構來模擬(model)元件和模組之間的關係。

> model: 表示建模或模擬的行為。

### React render tree

一個 React 渲染樹(React render tree)是對元件之間父子關係的表示。

<!-- 範例圖 01 :  React 渲染樹 -->

An example React render tree:

![generic_render_tree](https://github.com/CAFECA-IO/cafeca/assets/105651918/f6e2faa0-a72f-45cf-9c3a-c3967d7498ee)

靠近樹的頂部、根元件附近的元件被認為是頂級元件(top-level components)。

沒有子元件的元件被稱為葉子元件(leaf components)。

這種元件的分類對於理解資料流(data flow)和渲染效能(rendering performance)非常有用。

### module dependency tree

對於理解你的應用程式，模擬 JavaScript 模組之間的關係是另一種有用的方式。我們稱之為模組依賴樹(module dependency tree)。

<!-- 範例圖 02 : 模組依賴樹 -->

An example module dependency tree:

![generic_dependency_tree](https://github.com/CAFECA-IO/cafeca/assets/105651918/35609468-4b48-403b-a130-3b168793bb8a)

依賴樹通常被建構工具(build tools)用來將所有相關的 JavaScript 程式碼打包(bundle)，供客戶端下載和渲染(download and render)。

對於 React 應用程式而言，較大的打包尺寸會降低使用者體驗。了解模組依賴樹有助於解決此類問題。

### 延伸閱讀

閱讀 **[將你的 UI 視為樹狀結構](https://react.dev/learn/understanding-your-ui-as-a-tree)** 以學習如何為 React 應用程式創建渲染和模組依賴樹，以及它們如何作為改善使用者體驗和性能的有用心智模型。

# 結論

此章節簡易的介紹了 React 的基本概念，讓你了解如何建立、自定義和有條件地顯示 React 元件等。這篇文章只是初淺的概念而已，如果想要更深入的了解，建議可以閱讀延伸閱讀的章節。（或者等筆者發布新的翻譯筆記？）

剛開始學習一門新的程式語言時，不曉得各位讀者傾向於哪種學習方式呢？

有些人喜歡閱讀官方文件、有些人喜歡看影片教學、有些人喜歡參考網路文章等。不管是哪種方式，只要能夠讓自己理解並且掌握，都是好的學習方式。（當然，最好的學習方式是多方面的學習，也就是「我全都要」。）

筆者喜歡的學習方法是一邊看教學影片、一邊實作，再閱讀官方文件，把相關的概念串起來。雖然嗑英文的時間比較久，但官方文件是最正確的資訊，所以不怕嗑錯？（笑）

# 本文參考來源

[Describing the UI](https://react.dev/learn/describing-the-ui)

# 所有章節的延伸閱讀清單

1. [How to write your first React component](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/1-your-first-component.md)
2. [When and how to create multi-component files](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/2-importing-and-exporting-components.md)
3. [How to add markup to JavaScript with JSX](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/3-writing-markup-with-jsx.md)
4. [How to use curly braces with JSX to access JavaScript functionality from your components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/4-javascript-in-jsx-with-curly-braces.md)
5. [How to configure components with props](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/5-passing-props-to-a-component.md)
6. [How to conditionally render components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/6-conditional-rendering.md)
7. [How to render multiple components at a time](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/learn-react/7-rendering-lists.md)
8. How to avoid confusing bugs by keeping components pure
9. Why understanding your UI as trees is useful
