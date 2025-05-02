# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 渲染清單 (Rendering Lists)

你經常會想要根據一組資料來顯示多個相似的元件。你可以使用 [JavaScript 的陣列方法](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) 來操作資料的陣列。在這一頁中，你會使用 [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 和 [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 搭配 React，來篩選與轉換你的資料陣列，將它們變成元件的陣列。

#### 這個章節你將學到：

- 如何使用 JavaScript 的 `map()` 從陣列中渲染元件
- 如何使用 JavaScript 的 `filter()` 只渲染特定的元件
- 何時以及為什麼要使用 React 的 key

## 從陣列渲染資料 (Rendering data from arrays)

假設你有一份內容清單：

```tsx
<ul>
  <li>Creola Katherine Johnson: 數學家</li>
  <li>Mario José Molina-Pasquel Henríquez: 化學家</li>
  <li>Mohammad Abdus Salam: 物理學家</li>
  <li>Percy Lavon Julian: 化學家</li>
  <li>Subrahmanyan Chandrasekhar: 天體物理學家</li>
</ul>
```

這些清單項目之間唯一的差別就是它們的內容、也就是它們的資料。在建立介面的過程中，你經常會需要用不同的資料來顯示同一個元件的多個實例，例如留言清單或是個人頭像相簿。在這些情況下，你可以將資料儲存在 JavaScript 的物件與陣列中，並使用像是 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 和 [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 等方法，來從這些資料中渲染出元件清單。

以下是一個簡短的範例，示範如何從一個陣列中產生一個項目清單：

1. **將**資料移入一個陣列：

   ```tsx
   const people = [
     "Creola Katherine Johnson: mathematician",
     "Mario José Molina-Pasquel Henríquez: chemist",
     "Mohammad Abdus Salam: physicist",
     "Percy Lavon Julian: chemist",
     "Subrahmanyan Chandrasekhar: astrophysicist",
   ];
   ```

2. 使用 map 將 people 陣列中的成員轉換成新的 JSX 節點陣列 listItems：

   ```tsx
   const listItems = people.map((person) => <li>{person}</li>);
   ```

3. **從元件中回傳** 包裹著 `listItems` 的 `<ul>`：

   ```tsx
   return <ul>{listItems}</ul>;
   ```

這是完整的程式碼結果：

（可以到[官方文件原文](https://react.dev/learn/rendering-lists)提供的 [sandbox](https://codesandbox.io/p/sandbox/nsrmxd) 直接操作看看）

```tsx
const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];

export default function List() {
  const listItems = people.map((person) => <li>{person}</li>);
  return <ul>{listItems}</ul>;
}
```

請注意，上方範例會顯示一個 console 錯誤訊息：

```bash
Warning: Each child in a list should have a unique “key” prop.
```

你將會在本頁稍後的部分學到如何修正這個錯誤。在那之前，讓我們先為你的資料加上一些結構。

## 篩選陣列中的項目 (Filtering arrays of items)

這份資料還可以再結構化得更完整一些：

```tsx
const people = [
  {
    id: 0,
    name: "Creola Katherine Johnson",
    profession: "mathematician",
  },
  {
    id: 1,
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
  },
  {
    id: 2,
    name: "Mohammad Abdus Salam",
    profession: "physicist",
  },
  {
    id: 3,
    name: "Percy Lavon Julian",
    profession: "chemist",
  },
  {
    id: 4,
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
  },
];
```

假設你想要只顯示職業是 `'chemist'`（化學家）的人，你可以使用 JavaScript 的 `filter()` 方法，只回傳符合條件的人。這個方法會接收一個陣列，將每個項目傳入一個「測試函式」（這個函式回傳 `true` 或 `false`），並回傳一個新的陣列，內容只包含通過測試（也就是回傳 `true`）的項目。

你只想要職業為 `'chemist'` 的項目。這個「測試函式」可以寫成 `(person) => person.profession === 'chemist'`。

這是整個流程的寫法：

1. **建立**一個新的陣列 `chemists`，只包含職業是 chemist 的人，透過對 `people` 使用 `filter()`，條件為 `person.profession === 'chemist'`：

   ```tsx
   const chemists = people.filter((person) => person.profession === "chemist");
   ```

2. 然後對 `chemists` 使用 **map**：

   ```tsx
   const listItems = chemists.map((person) => (
     <li>
       <img src={getImageUrl(person)} alt={person.name} />
       <p>
         <b>{person.name}:</b>
         {" " + person.profession + " "}
         known for {person.accomplishment}
       </p>
     </li>
   ));
   ```

3. 最後，從元件中 **回傳** `listItems`：

   ```tsx
   return <ul>{listItems}</ul>;
   ```

完整程式碼：

（可以到[官方文件原文](https://react.dev/learn/rendering-lists)提供的 [sandbox](https://codesandbox.io/p/sandbox/6t5thd) 直接操作看看）
App.js

```tsx
import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function List() {
  const chemists = people.filter((person) => person.profession === "chemist");
  const listItems = chemists.map((person) => (
    <li>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
```

data.js

```tsx
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

utils.js

```tsx
export function getImageUrl(person) {
  return "https://i.imgur.com/" + person.imageId + "s.jpg";
}
```

### 注意事項

箭頭函式在 `=>` 後面**直接接表達式**時會自動回傳，因此你不需要加上 `return`：

```tsx
const listItems = chemists.map(
  (person) => <li>...</li> // 自動回傳！
);
```

但如果你的 `=>` **後面是用 `{` 大括號包起來的區塊**，那你就**必須要明確寫出 `return`**！

```tsx
const listItems = chemists.map((person) => {
  // 使用大括號
  return <li>...</li>;
});
```

這種使用 `=> {}` 的箭頭函式被稱為 [「區塊主體」（block body）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body)。它允許你撰寫多行程式碼，但你**一定要自己寫 `return`**。如果忘了寫，就會什麼都沒回傳！

## 使用 `key` 保持清單項目的順序 (Keeping list items in order with `key`)

你可能注意到，上面範例的 sandbox 都在開發者工具中出現這個錯誤訊息：

```bash
Warning: Each child in a list should have a unique “key” prop.
```

你需要為每個陣列項目加上一個 `key` —— 它必須是在該陣列中**能唯一識別該項目**的字串或數字：

```tsx
<li key={person.id}>...</li>
```

> 注意：
>
> 只要 JSX 元素是直接寫在 `map()` 裡的，就**一定要加上 key**！

`key` 的作用是讓 React 能夠知道每個元件對應到陣列中的哪一筆資料，這樣在重新渲染時才能正確比對。如果你的陣列資料有可能會變動（像是排序、插入或刪除），一個設計良好的 `key` 能幫助 React 判斷哪些元素被變更，並且正確地更新 DOM tree。

與其在渲染時動態產生 key，你應該在資料本身中就包含這個欄位：

完整程式碼：

（可以到[官方文件原文](https://react.dev/learn/rendering-lists)提供的 [sandbox](https://codesandbox.io/p/sandbox/lsx4qp?file=%2Fsrc%2FApp.js) 直接操作看看）

1. App.js

   ```tsx
   import { people } from "./data.js";
   import { getImageUrl } from "./utils.js";

   export default function List() {
     const listItems = people.map((person) => (
       <li key={person.id}>
         <img src={getImageUrl(person)} alt={person.name} />
         <p>
           <b>{person.name}</b>
           {" " + person.profession + " "}
           known for {person.accomplishment}
         </p>
       </li>
     ));
     return <ul>{listItems}</ul>;
   }
   ```

2. data.js

   ```tsx
   export const people = [
     {
       id: 0, // Used in JSX as a key
       name: "Creola Katherine Johnson",
       profession: "mathematician",
       accomplishment: "spaceflight calculations",
       imageId: "MK3eW3A",
     },
     {
       id: 1, // Used in JSX as a key
       name: "Mario José Molina-Pasquel Henríquez",
       profession: "chemist",
       accomplishment: "discovery of Arctic ozone hole",
       imageId: "mynHUSa",
     },
     {
       id: 2, // Used in JSX as a key
       name: "Mohammad Abdus Salam",
       profession: "physicist",
       accomplishment: "electromagnetism theory",
       imageId: "bE7W1ji",
     },
     {
       id: 3, // Used in JSX as a key
       name: "Percy Lavon Julian",
       profession: "chemist",
       accomplishment: "pioneering cortisone drugs, steroids and birth control pills",
       imageId: "IOjWm71",
     },
     {
       id: 4, // Used in JSX as a key
       name: "Subrahmanyan Chandrasekhar",
       profession: "astrophysicist",
       accomplishment: "white dwarf star mass calculations",
       imageId: "lrWQx8l",
     },
   ];
   ```

3. utils.js

   ```tsx
   export function getImageUrl(person) {
     return "https://i.imgur.com/" + person.imageId + "s.jpg";
   }
   ```

### 💡 深入探討

#### **每個清單項目要顯示多個 DOM 節點時怎麼做？**

當每一筆資料不只需要渲染一個，而是**多個 DOM 節點**時該怎麼處理？

你不能用簡短的 [`<>...</>` Fragment](https://react.dev/reference/react/Fragment) 語法，因為它**不能設定 `key`**。

這時有兩個選擇：

你可以把它們包在一個 `<div>` 裡，或者使用稍微長一點、但更明確的 [`<Fragment>` 語法：](https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments)

```tsx
import { Fragment } from "react";

// ...

const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
));
```

Fragment 在實際的 DOM 中不會留下痕跡，所以渲染結果會是一個扁平的清單，像是 `<h1>`, `<p>`, `<h1>`, `<p>`，依此類推。

### 要從哪裡取得 `key`

不同來源的資料會提供不同的 `key` 來源：

- **來自資料庫的資料：** 如果你的資料是從資料庫來的，可以直接使用資料庫的主鍵(keys)或 IDs，因為它們本質上是唯一的(unique by nature)。
- **本地產生的資料：** 如果你的資料是在本地產生並儲存在本地端的(例如筆記應用程式中的筆記)，在建立資料時可以使用遞增計數器(incrementing counter)、[`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) 或像 [`uuid`](https://www.npmjs.com/package/uuid) 這類的套件來產生唯一 ID。

### 使用 `key` 的規則

- **`key` 在同一層級中必須是唯一的。** 不過，不同陣列中的 JSX 節點可以使用相同的 `key`。
- **`key` 不應該變動，** 否則會失去 `key` 的作用！請不要在渲染(render)時才動態產生 `key`。

### 為什麼 React 需要 `key`？

想像一下你的電腦桌面上的檔案都沒有名字，而你只能用順序來辨識它們：第一個檔案、第二個檔案、第三個檔案……這在一開始也許還能應付，但一旦你刪除一個檔案，整個順序就會混亂。第二個檔案會變成第一個，第三個變成第二個，以此類推。

資料夾裡的「檔名」和陣列中的 JSX `key` 扮演的就是類似的角色：它們讓我們可以在同一層級中獨立辨識每一項目。相較於位置，**精心設計的 `key` 傳遞的是更穩定的識別方式**。即使某一項在陣列中的位置因為排序而改變，只要 `key` 不變，React 就能正確辨識這是同一項目，並維持它的生命週期。

### ⚠️ 注意事項

你可能會想用陣列中項目的索引作為 `key`。事實上，如果你沒有指定 `key`，React 就會自動使用索引。不過，當項目被插入、刪除，或陣列順序被重新排列時，渲染的順序會改變。使用索引作為 key，常常會導致一些難以察覺且令人困惑的 bug。

同樣地，也**不要**在渲染時即時產生 key，例如使用 `key={Math.random()}`。這會讓每次渲染時的 key 都對不上，導致所有元件和 DOM 每次都會被重新建立。不僅效能變慢，還會導致列表中原本的使用者輸入遺失。你應該使用**根據資料產生的穩定 ID**。

請注意，元件本身**不會接收到 `key` 作為 prop**。它是 React 自己內部使用的提示。如果你的元件需要一個 ID，你必須另外傳入一個 prop，例如：`<Profile key={id} userId={id} />`。

## 總結

本頁你學到了：

- 如何將資料從元件中抽離，儲存在像陣列或物件這樣的資料結構中。
- 如何使用 JavaScript 的 `map()` 產生一組類似的元件。
- 如何使用 JavaScript 的 `filter()` 建立過濾後的陣列。
- 為什麼要在集合中的每個元件上設定 `key`，以及如何設定，這樣 React 才能即使在位置或資料變更時，依然正確追蹤每個元件。

## 試試看一些挑戰 (Try out some challenges)

建議搭配[官網提供的小視窗](https://react.dev/learn/rendering-lists#challenges)，可以直接在網頁上修改程式碼，並觀察結果。

### 挑戰 1 / 4：將一個清單分成兩部分

這個範例會顯示所有人的清單。

請修改程式碼，讓它改為依序顯示兩個清單：**化學家（Chemists）** 和 **其他人（Everyone Else）**。就像先前一樣，你可以透過判斷 `person.profession === 'chemist'` 來判斷這個人是否為化學家。

App.js：

```tsx
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

data.js：

```tsx
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

### 挑戰 2 / 4：在一個元件中嵌套清單

從這個陣列中建立食譜清單！對於陣列中的每一筆食譜資料，顯示它的名稱作為 `<h2>`，並在 `<ul>` 中列出其食材。

App.js：

```tsx
import { recipes } from "./data.js";

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

data.js：

```tsx
export const recipes = [
  {
    id: "greek-salad",
    name: "Greek Salad",
    ingredients: ["tomatoes", "cucumber", "onion", "olives", "feta"],
  },
  {
    id: "hawaiian-pizza",
    name: "Hawaiian Pizza",
    ingredients: ["pizza crust", "pizza sauce", "mozzarella", "ham", "pineapple"],
  },
  {
    id: "hummus",
    name: "Hummus",
    ingredients: ["chickpeas", "olive oil", "garlic cloves", "lemon", "tahini"],
  },
];
```

### 挑戰 3 / 4：拆出一個清單項目的元件

這個 `RecipeList` 元件中有兩層 `map`。為了讓程式更簡潔，請把它拆出一個 `Recipe` 元件，並接受 `id`、`name` 和 `ingredients` 作為 props。請思考：你應該將外層的 key 放在哪裡？為什麼？

```tsx
import { recipes } from "./data.js";

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

data.js：

```tsx
export const recipes = [
  {
    id: "greek-salad",
    name: "Greek Salad",
    ingredients: ["tomatoes", "cucumber", "onion", "olives", "feta"],
  },
  {
    id: "hawaiian-pizza",
    name: "Hawaiian Pizza",
    ingredients: ["pizza crust", "pizza sauce", "mozzarella", "ham", "pineapple"],
  },
  {
    id: "hummus",
    name: "Hummus",
    ingredients: ["chickpeas", "olive oil", "garlic cloves", "lemon", "tahini"],
  },
];
```

### 挑戰 4 / 4：帶分隔線的清單

這個範例會顯示橘志坂北枝（Tachibana Hokushi）的一首知名俳句，每一行包在一個 `<p>` 標籤中。你的任務是要在每段 `<p>` 中間插入一個 `<hr />` 分隔線。最後的 HTML 結構應如下所示：

```tsx
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```

這首俳句只有三行，但你的解法應該可以處理任意行數。請注意：`<hr />` 只能出現在 `<p>` 元素**之間**，不要出現在開頭或結尾！

App.js：

```tsx
const poem = {
  lines: ["I write, erase, rewrite", "Erase again, and then", "A poppy blooms."],
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </article>
  );
}
```

（這是一個少見的情況，使用陣列索引作為 key 是可以接受的，因為詩句的順序永遠不會變動。）

# 結語

這篇文章是筆者在學習 React 時，閱讀 [React 官方文件 - Rendering Lists](https://react.dev/learn/rendering-lists) 所做的翻譯筆記，希望能幫助更多的人學習 React。

這篇文章主要介紹了如何使用 JavaScript 的 `map()` 和 `filter()` 方法來渲染清單，並且強調了在渲染清單時使用 `key` 的重要性。這些概念對於 React 開發者來說是非常基礎且重要的，希望能幫助你更深入地理解 React 的運作方式。

# 本文參考資料

https://react.dev/learn/rendering-lists
