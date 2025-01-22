# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 條件式渲染 – React

你的元件經常需要根據不同的條件顯示不同的內容。在 React 中，可以使用 JavaScript 語法（例如 `if` 語句、`&&` 以及 `? :` 運算子）來進行條件式渲染。

### 你將學習到

- 如何根據條件回傳不同的 JSX
- 如何條件式地包含或排除某一段 JSX
- React 程式碼中常見的條件語法捷徑

## 根據條件回傳 JSX

假設你有一個 `PackingList` 元件，用來渲染幾個可以被標記為已打包或未打包的 `Item` 物品：

```tsx
function Item({ name, isPacked }) {
  return <li className='item'>{name}</li>;
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

可以注意到這裡，有些 `Item` 元件的 `isPacked` 屬性被設定為 `true`，而不是 `false`。

如果是 `isPacked={true}`，意思就是這是已經打包的物品，我們用 `isPacked` 來表示是否已經打包。

現在我們想在畫面上為已打包的項物品新增一個勾選標記（✅），我們可以使用 [`if`/`else` 語句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 這樣寫：

```tsx
if (isPacked) {
  return <li className='item'>{name} ✅</li>;
}
return <li className='item'>{name}</li>;
```

如果 `isPacked` 屬性為 `true`，這段程式碼 **回傳一個不同的 JSX 樹**。透過這個改動，部分物品會在最後面顯示一個勾選標記（✅）：

```tsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className='item'>{name} ✅</li>;
  }
  return <li className='item'>{name}</li>;
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

試著編輯在每種情況下回傳的內容，觀察結果的變化！

注意如何使用 JavaScript 的 `if` 和 `return` 語句建立分之邏輯。因為在 React 中，控制流程（例如條件）是由 JavaScript 處理的。

### 使用 `null` 條件式地不回傳任何內容

在某些情況下，你可能不想渲染任何內容。例如，假設你完全不想顯示已打包的物品。

而一個元件**必須回傳**一些內容，而在這種情況下，你可以回傳 `null`：

```tsx
if (isPacked) {
  return null;
}
return <li className='item'>{name}</li>;
```

如果 `isPacked` 為 `true`，這個元件將回傳空的內容，也就是 `null`。否則，它會回傳要渲染的 `JSX` 。

```tsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className='item'>{name}</li>;
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

實際上，從元件回傳 null 並不常見，因為這可能會讓嘗試渲染該元件的開發者感到困惑。更常見的做法是，在父元件的 JSX 中有條件地包含或排除該元件。以下是實現方法！

## 條件式包含 JSX

在前面的範例中，你控制了元件會回傳哪個 JSX 樹（如果有的話）。你可能已經注意到渲染輸出中有些重複：

```tsx
<li className='item'>{name} ✅</li>
```

與以下內容非常相似：

```tsx
<li className='item'>{name}</li>
```

這兩個條件分支都回傳了 `<li className="item">...</li>`：

```tsx
if (isPacked) {
  return <li className='item'>{name} ✅</li>;
}

return <li className='item'>{name}</li>;
```

雖然這種重複並不會造成傷害，但它可能會讓你的程式碼變得難以維護。如果你想更改 `className`，就必須在程式碼的兩個地方進行修改！在這種情況下，你可以有條件地包含少量的 JSX，讓程式碼更加[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)（避免重複）。

### 條件（三元）運算子 (`? :`)

JavaScript 提供了一種簡潔的語法來撰寫條件運算式 —— [條件運算子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 或稱為三元運算子。

與其這樣寫：

```tsx
if (isPacked) {
  return <li className='item'>{name} ✅</li>;
}
return <li className='item'>{name}</li>;
```

你可以這樣寫：

```tsx
return <li className='item'>{isPacked ? name + " ✅" : name}</li>;
```

你可以將它理解為：「如果 `isPacked` 為 true，則（`?`）渲染 `name + ' ✅'`，否則（`:`）渲染 `name`」。

> #### 深入探討 - 這兩個範例是完全等價的嗎？
>
> 如果你有物件導向程式設計的背景，可能會假設上述兩個範例存在微妙的差異，因為其中一個可能會創造兩個不同的 `<li>`「實例」。但事實上，JSX 元素並不是「實例」，因為它們不包含任何內部狀態，也不是實際的 DOM 節點。它們更像是輕量的描述，就像藍圖一樣。因此，這兩個範例其實是*完全等價*的。 </br>
> 在 [保留與重置狀態](https://react.dev/learn/preserving-and-resetting-state) 這篇文章有更詳細地解釋其運作原理。（也可以等待筆者日後翻譯此文）

現在，假設你想將已完成項目的文字包裹在另一個 HTML 標籤中，例如使用 `<del>` 來加上刪除線。你可以添加更多的換行和括號，讓在每個情況下嵌套更多 JSX 時變得更容易：

```tsx
function Item({ name, isPacked }) {
  return <li className='item'>{isPacked ? <del>{name + " ✅"}</del> : name}</li>;
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

這種風格適合處理簡單的條件，但要適度使用。如果你的元件因為過多巢狀條件標記(markup)而變得混亂，考慮將子元件抽取出來，讓程式碼更乾淨。在 React 中，標記(markup)是程式碼的一部分，因此你可以使用變數和函式等工具來整理複雜的運算式。
