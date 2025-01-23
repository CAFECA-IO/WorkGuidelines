# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 條件式渲染 (Conditional Rendering)

你的元件經常需要根據不同的條件顯示不同的內容。在 React 中，可以使用 JavaScript 語法（例如 `if` 語句、`&&` 以及 `? :` 運算子）來進行條件式渲染。

#### 這個章節你將學到：

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

## 根據條件包含 JSX

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

> #### 💡 深入探討 - 這兩個範例是完全等價的嗎？
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

### 邏輯 AND 運算子 (`&&`)

另一個常見的簡寫是 [JavaScript 的邏輯 AND (`&&`) 運算子。](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.>)

在 React 元件中，當你希望在條件為真時渲染某些 JSX，**否則什麼也不渲染**時，經常會用到 `&&`。利用 `&&`，你可以僅在 `isPacked` 為 `true` 時有條件地渲染勾選符號：

```tsx
return (
  <li className='item'>
    {name} {isPacked && "✅"}
  </li>
);
```

這段程式碼可以解讀為：**「如果 `isPacked` 為真，那麼 (`&&`) 渲染勾選符號；否則，什麼都不渲染。」**

以下是完整範例：

```tsx
function Item({ name, isPacked }) {
  return (
    <li className='item'>
      {name} {isPacked && "✅"}
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

> #### 💡 注意事項 - 不要將數字放在 `&&` 的左側
>
> 在測試條件時，JavaScript 會自動將左側的值轉換為布林值。然而，如果左側的值是 `0`，整個運算式就會回傳該值（`0`），而 React 會很樂意直接渲染 `0`，而不是什麼都不渲染。
>
> 例如，一個常見的錯誤是寫成 `messageCount && <p>New messages</p>`。可能會以為當 `messageCount` 是 `0` 時不會渲染任何內容，但實際上它會渲染 `0` 本身！
>
> 要修正這個問題，可以讓左側成為布林值：`messageCount > 0 && <p>New messages</p>`。

### 條件式將 JSX 指派給變數

當語法捷徑讓程式碼變得不易閱讀時，可以嘗試使用 `if` 語句和變數來實現條件渲染。使用 [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) 定義的變數可以重新指派，因此可以先指定預設要顯示的內容，例如名稱：

```tsx
let itemContent = name;
```

接著使用 `if` 語句，在 `isPacked` 為 `true` 時，重新指派 JSX 表達式給 `itemContent`：

```tsx
if (isPacked) {
  itemContent = name + " ✅";
}
```

[大括號打開了「進入 JavaScript 的窗口」。](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) 在回傳的 JSX 樹中，用大括號嵌入變數，將先前計算出的表達式嵌入 JSX 中：

```tsx
<li className='item'>{itemContent}</li>
```

這種風格是最冗長、最囉唆的，但同時也是最靈活的。以下是範例實作：

```tsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return <li className='item'>{itemContent}</li>;
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

如同之前的範例，這種方法不僅適用於文字，也適用於任意 JSX 表達式：

```tsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✅"}</del>;
  }
  return <li className='item'>{itemContent}</li>;
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

如果你對 JavaScript 不太熟悉，這些多樣的寫法一開始可能會讓你覺得有點難以消化。然而，學會這些寫法將有助於你閱讀和撰寫任何 JavaScript 程式碼，而不僅僅是 React 元件！你可以先選擇你偏好的方式開始，然後在忘記其他方式時，再回來參考這篇教學。

> #### 💡 筆者補充 - 使用 `const` 的條件式渲染
>
> 也許有人會好奇，這裡除了 `let`，也可以使用 `const` 嗎？
>
> 答案是：可以。但如果使用 `const`，則不能直接重新賦值（reassign），因此需要用不同的方式來處理條件。
>
> 例如，直接用條件運算符（三元運算子）來決定值，然後賦值給 `const`。以下是一個簡單的範例：
>
> - 使用 `const itemContent`，透過條件運算符直接在一行中決定 `itemContent` 的內容。
> - 如果 `isPacked` 為 `true`，則 `itemContent` 為帶 `<del>` 的 JSX；如果是 `false`，則直接顯示 `name`。
>
> ```jsx
> function Item({ name, isPacked }) {
>   const itemContent = isPacked ? <del>{name + " ✅"}</del> : name;
>
>   return <li className='item'>{itemContent}</li>;
> }
>
> export default function PackingList() {
>   return (
>     <section>
>       <h1>Sally Ride's Packing List</h1>
>       <ul>
>         <Item isPacked={true} name='Space suit' />
>         <Item isPacked={true} name='Helmet with a golden leaf' />
>         <Item isPacked={false} name='Photo of Tam' />
>       </ul>
>     </section>
>   );
> }
> ```
>
> 讀者應該會發現這種寫法，與前面介紹的「條件（三元）運算子 (`? :`)」的寫法是類似的，只是先賦值給 `const`，再回傳 `const` 的值。

## 總結

- 在 React 中，你可以使用 JavaScript 控制分支邏輯。
- 你可以透過 `if` 語句有條件地回傳 JSX 表達式。
- 你可以將某些 JSX 有條件地儲存到變數中，然後使用大括號將其嵌入其他 JSX 中。
- 在 JSX 中，`{cond ? <A /> : <B />}` 的意思是 **「如果 `cond` 成立，渲染 `<A />`，否則渲染 `<B />`」**。
- 在 JSX 中，`{cond && <A />}` 的意思是 **「如果 `cond` 成立，渲染 `<A />`，否則什麼都不渲染」**。
- 這些簡寫方式很常見，但如果你偏好使用一般的 `if`，也完全沒有問題。
