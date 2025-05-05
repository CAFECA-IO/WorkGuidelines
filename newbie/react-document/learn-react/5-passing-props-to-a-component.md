# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 將 Props 傳遞給元件 (Passing Props to a Component)

React 元件之間透過 _props_ 進行溝通。每個父元件可以將一些資訊傳遞給其子元件，方法是給子元件 props。

Props 可能會讓我們想到 HTML 屬性(attributes)。但與 HTML 屬性不同，我們可以透過 props 傳遞任何 JavaScript 值，包括物件、陣列和函式。

#### 這個章節將會學到幾個重點:

- 如何將 props 傳遞給元件
- 如何從元件中讀取 props
- 如何為 props 指定預設值
- 如何將一些 JSX 傳遞給元件
- props 隨時間變化的方式

## 熟悉的 props (Familiar props)

Props 是我們傳遞給 JSX 標籤的資訊。

例如，`className`、`src`、`alt`、`width` 和 `height` 都是可以傳遞給 `<img>` 的 props：

```jsx
function Avatar() {
  return <img className='avatar' src='<https://i.imgur.com/1bX5QH6.jpg>' alt='Lin Lanying' width={100} height={100} />;
}

export default function Profile() {
  return <Avatar />;
}
```

在這裡，我們可以傳遞給 `<img>` 標籤的 props 是預定義的（ReactDOM 遵循 [HTML 標準](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)）。也就是說，我們只能添加標籤本身就已經定義好的屬性。

但如果是我們自己的元件，我們就可以將任何 props 傳遞給 _我們自己的_ 元件，來進行客製化！

以下用 `<Avatar>` 舉例。

## 將 props 傳遞給元件 (Passing props to a component)

在這段程式碼中，`Profile` 元件並未將任何 props 傳遞給其子元件 `Avatar`：

```jsx
export default function Profile() {
  return <Avatar />;
}
```

我們透過兩個步驟給 `Avatar` 一些 props。

### 步驟 1：將 props 傳遞給子元件

首先，將一些 props 傳遞給 `Avatar`。例如，傳遞兩個 props：`person`（一個物件）和 `size`（一個數字）：

```jsx
export default function Profile() {
  return <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />;
}
```

> 注意 :
>
> 如果 `person=` 後的雙大括號讓你感到困惑，請記住 [它們只是物件](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) 在 JSX 大括號中的表示方式。

現在可以在 `Avatar` 元件中讀取這些 props。

### 步驟 2：在子元件中讀取 props

我們可以透過在 `function Avatar` 後的 `({` 和 `})` 中列出它們的名稱 `person, size` 來讀取這些 props，這樣就可以在 `Avatar` 的程式碼中使用它們，就像平常我們使用變數的方式一樣。

```jsx
function Avatar({ person, size }) {
  // person 和 size 可以在此處使用
}
```

接著再加入一些邏輯，讓 `Avatar` 使用 `person` 和 `size` 進行渲染，這樣就完成了。

現在我們可以透過不同的 props 設置 `Avatar` 以多種方式渲染。試著調整這些值吧！

👉 [範例捷徑](https://react.dev/learn/passing-props-to-a-component#step-2-read-props-inside-the-child-component) : 可以去範例調整 value 可以立即看到效果。

utils.js

```jsx
export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
```

App.js

```jsx
import { getImageUrl } from "./utils.js";

function Avatar({ person, size }) {
  return <img className='avatar' src={getImageUrl(person)} alt={person.name} width={size} height={size} />;
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
```

Props 讓我們可以獨立去思考父元件和子元件。

例如，我們可以在 `Profile` 中更改 `person` 或 `size` props，而無需考慮 `Avatar` 如何使用它們。同樣，我們可以更改 `Avatar` 使用這些 props 的方式，而無需查看 `Profile`。

我們可以將 props 視為可以調整的「旋鈕」。它們的作用就像函式的參數一樣——實際上，props _就是_ 元件的唯一參數！React 元件函式接受單一參數，即一個 `props` 物件：

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

通常我們不需要整個 `props` 物件本身，因此可以將其解構為單獨的 props。

### 提醒

在宣告 props 時，**別忘了在 `(` 和 `)` 之間的 `{` 和 `}`**

```jsx
function Avatar({ person, size }) {
  // ...
}
```

這種語法稱為 [「解構」](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter)，等同於從函式參數(parameter)中讀取屬性(properties)：

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## 為 prop 指定預設值 (Specifying a default value for a prop)

如果想要在沒有指定值時，給 prop 一個預設值，可以透過在解構後的參數旁邊加上 `=` 和預設值來實現：

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

現在，如果 `<Avatar person={...} />` 被渲染且沒有 `size` prop，那麼 `size` 會被設為 `100`。

只有當 `size` prop 缺少，或者傳遞 `size={undefined}` 時才會使用預設值。

如果傳遞 `size={null}` 或 `size={0}`，則不會使用預設值。

## 使用 JSX 展開語法轉傳 props (Forwarding props with the JSX spread syntax)

有時候，傳遞 props 會顯得非常重複：

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className='card'>
      <Avatar person={person} size={size} isSepia={isSepia} thickBorder={thickBorder} />
    </div>
  );
}
```

重複的程式碼並沒有問題，它可以提高可讀性。但有時候我們可能會更重視簡潔性。有些元件會將所有的 props 轉傳給子元件，例如這裡的 `Profile` 將其 props 傳遞給 `Avatar`。由於它們不直接使用自己的 props，因此可以使用更簡潔的「展開」語法：

```jsx
function Profile(props) {
  return (
    <div className='card'>
      <Avatar {...props} />
    </div>
  );
}
```

這樣就可以將 `Profile` 的所有 props 轉傳給 `Avatar`，而不需要列出每個屬性的名稱。

**謹慎使用展開語法** : 如果我們在大多數元件中使用展開語法，這可能是設計上出了問題。通常，這表示我們應該將元件分割，並將子元件以 JSX 的形式傳遞。接下來會有更多說明！

## 透過 `children` 傳遞 JSX (Passing JSX as children)

嵌套內建的瀏覽器標籤是很常見的做法：

```jsx
<div>
  <img />
</div>
```

我們也會想以相同方式嵌套自定義元件：

```jsx
<Card>
  <Avatar />
</Card>
```

當我們在 JSX 標籤內嵌入內容時，父元件會透過一個名為 `children` 的 prop 來接收這些內容。

例如，下方的 `Card` 元件會接收到 `children` prop，內容為 `<Avatar />`，並將其渲染在包裹的 `div` 中：

App.js :

```jsx
import Avatar from "./Avatar.js";

function Card({ children }) {
  return <div className='card'>{children}</div>;
}

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
```

Avatar.js :

```jsx
import { getImageUrl } from "./utils.js";

export default function Avatar({ person, size }) {
  return <img className='avatar' src={getImageUrl(person)} alt={person.name} width={size} height={size} />;
}
```

utils.js :

```jsx
export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
```

來，試著將 `<Card>` 裡面的 `<Avatar>` 替換成一些文字，看看 `Card` 元件如何包裹任何嵌入的內容。

👉 [範例捷徑](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) : 快去調整看看。

對於這個 `Card` 元件而言，它並不需要「知道」內部渲染的是什麼，因此很有彈性。這種靈活的模式在許多地方都可以看到。

我們可以把具有 `children` prop 的元件想像成有一個「洞」，可使用任意 JSX 來「填補」。

我們會經常使用 `children` prop 來包裝視覺效果，例如面板(panels)、網格(grids)等。

就像下圖的比喻，帶有 `children` prop 的父元件可以包裹任意子元件或者一般 JSX 標籤，像是一個插槽，可以插入任意 JSX。

![image](https://github.com/user-attachments/assets/8c197425-9d47-4db0-9859-8a8d16a7ee37)
(Card 是一個長得像是拼圖的積木，帶有一個「children」插槽，可用於放置文字或 Avatar 元件等內容。)

## props 如何隨時間改變 (How props change over time)

下方的 `Clock` 元件接收了來自父元件的兩個 props：`color` 和 `time`。（此處省略父元件的程式碼，因為它使用了 [state](https://react.dev/learn/state-a-components-memory)，我們暫不深入探討。）

試著在下方選擇框中更改顏色：👉  [範例捷徑](https://react.dev/learn/passing-props-to-a-component#how-props-change-over-time)

```jsx
export default function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}
```

此範例說明了**元件可以隨時間接收不同的 props。** props 並非總是靜態的！

在此範例中，`time` prop 每秒會更新，而 `color` prop 則隨選擇不同顏色而改變。props 反映了元件在任何時間點的資料，而不僅僅是在最初的狀態。

然而，props 是 [不可變的](https://en.wikipedia.org/wiki/Immutable_object) (immutable)── 這是計算機科學中的術語，意思是「不可更改 (unchangeable)」。

當元件需要改變其 props（例如因應使用者互動或新資料），它將需要「請求」父元件傳遞*不同的 props*── 一個新的物件！舊的 props 會被丟棄，最終由 JavaScript 引擎回收其佔用的記憶體。

**不要試圖「更改 props」。**

當需要對使用者輸入做出回應（例如更改選擇的顏色）時，我們需要「設定狀態」。

可在 [State: A Component’s Memory](https://react.dev/learn/state-a-components-memory) 中學到更多，之後連載也會寫到這一篇，請持續關注。

## 重點回顧

- 傳遞 props 時，像使用 HTML 屬性一樣，將它們加在 JSX 上。
- 讀取 props 時，使用 `function Avatar({ person, size })` 解構語法。
- 可以指定預設值，例如 `size = 100`，用於未指定或 `undefined` 的 props。
- 可以使用 `<Avatar {...props} />` JSX 展開語法轉傳所有 props，但勿過度使用！
- 嵌套 JSX，如 `<Card><Avatar /></Card>`，會作為 `Card` 元件的 `children` prop 傳入。
- props 是每次渲染時的唯讀快照：每次渲染都會收到一組新的 props。
- props 無法更改。當需要互動性時，需要設定狀態。

## 嘗試一些挑戰 (**Try out some challenges)**

### 挑戰 1 of 3：提取元件

> 👉 [挑戰捷徑](https://react.dev/learn/passing-props-to-a-component#challenges) (可以在 [CodeSandbox](https://codesandbox.io/p/sandbox/jf2skg?file=%2Fsrc%2FApp.js) 嘗試作答再複製回去原文網頁確認是否正確)

這個 `Gallery` 元件包含了兩個非常相似的個人檔案標記(markup)。

將其提取為一個 `Profile` 元件，以減少重複的程式碼。

你需要選擇傳遞哪些 props 進入這個元件。

```jsx
import { getImageUrl } from "./utils.js";

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className='profile'>
        <h2>Maria Skłodowska-Curie</h2>
        <img className='avatar' src={getImageUrl("szV5sdG")} alt='Maria Skłodowska-Curie' width={70} height={70} />
        <ul>
          <li>
            <b>Profession: </b>
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b>
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className='profile'>
        <h2>Katsuko Saruhashi</h2>
        <img className='avatar' src={getImageUrl("YfeOqp2")} alt='Katsuko Saruhashi' width={70} height={70} />
        <ul>
          <li>
            <b>Profession: </b>
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b>
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

### 挑戰 2 of 3：根據 prop 調整圖片大小

> 👉 [挑戰捷徑](https://react.dev/learn/passing-props-to-a-component#challenges) (可以在 [CodeSandbox](https://codesandbox.io/p/sandbox/mmmx8x?file=%2Fsrc%2FApp.js) 嘗試作答再複製回去原文網頁確認是否正確)

在這個範例中，`Avatar` 元件接收一個數值型的 `size` prop，該 prop 決定了 `<img>` 的寬度與高度。在此範例中，`size` prop 設為 40。不過，如果你在新分頁中開啟圖片，你會發現圖片本身的大小為 160 像素。實際的圖片大小取決於你請求的縮圖尺寸。

請修改 `Avatar` 元件，根據 `size` prop 來請求最接近的圖片尺寸。具體來說，如果 `size` 小於 90，將 's'（小圖）而非 'b'（大圖）傳遞給 `getImageUrl` 函數。透過使用不同的 `size` prop 值來渲染 avatar 並在新分頁中開啟圖片，確認你的修改有效。

```jsx
import { getImageUrl } from "./utils.js";

function Avatar({ person, size }) {
  return <img className='avatar' src={getImageUrl(person, "b")} alt={person.name} width={size} height={size} />;
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{
        name: "Gregorio Y. Zara",
        imageId: "7vQD0fP",
      }}
    />
  );
}
```

### 挑戰 3 of 3：在 `children` prop 中傳遞 JSX

> 👉 [挑戰捷徑](https://react.dev/learn/passing-props-to-a-component#challenges) (可以在 [CodeSandbox](https://codesandbox.io/p/sandbox/wrdcl3?file=%2Fsrc%2FApp.js) 嘗試作答再複製回去原文網頁確認是否正確)

從以下標記中提取出一個 `Card` 元件，並使用 `children` prop 傳遞不同的 JSX 給它：

```jsx
export default function Profile() {
  return (
    <div>
      <div className='card'>
        <div className='card-content'>
          <h1>Photo</h1>
          <img className='avatar' src='https://i.imgur.com/OKS67lhm.jpg' alt='Aklilu Lemma' width={70} height={70} />
        </div>
      </div>
      <div className='card'>
        <div className='card-content'>
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

# 結語

這篇文章介紹了如何將 props 傳遞給元件，以及如何在元件中讀取 props。我們也學習了如何為 props 指定預設值，以及如何使用 JSX 展開語法來轉傳 props。

對於 React 開發者而言，props 非常重要，因為 props 是元件之間溝通的橋樑。透過 props，我們可以將資訊從父元件傳遞到子元件。這樣的設計讓我們可以更容易地編寫可重複使用的元件，並且讓元件之間的關係更加清楚。

# 本文參考資料

[Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
