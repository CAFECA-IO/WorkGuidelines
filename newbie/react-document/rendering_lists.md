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
