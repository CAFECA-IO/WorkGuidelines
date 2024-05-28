# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 使用 JSX 撰寫標記 (Writing Markup with JSX)

_JSX_ 是 JavaScript 的語法擴展(syntax extension)，讓我們可以在 JavaScript 檔案中寫類似 HTML 的標記(markup)。

雖然有其他方法可以撰寫元件，但大多數的 React 開發者喜歡 JSX 的簡潔性，而且大多數的程式碼庫也都使用 JSX。

### 這章節你將會學到

- 為什麼 React 將標記和渲染邏輯混合在一起
- JSX 如何與 HTML 不同
- 如何使用 JSX 顯示資訊

## JSX：將標記放入 JavaScript (Putting markup into JavaScript)

網頁(Web)是建立在 HTML、CSS 和 JavaScript 之上的。

多年來，網頁開發者會將內容寫在 HTML 中，將設計寫在 CSS 中，將邏輯放在 JavaScript 中。也就是說我們會將內容、設計、邏輯放在不同的檔案裡。

網站頁面的內容會在 HTML 中用標記文本撰寫，而頁面的邏輯則獨立存在於 JavaScript 中，如下圖：

<br />
<br />
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/c7a73bbd-2543-4160-9feb-0424b5bca5ea">
<br />
<br />
但隨著網頁變得越來越有互動性，由邏輯決定內容的部分越來越多。JavaScript 開始要負責 HTML 了！
<br />
<br />
這就是為什麼在 React 中，渲染邏輯和標記被放在同一個地方，這個地方就是 **元件**。
<br />
<br />
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/8d606137-7242-4496-8bde-4e1970519903">
<br />
(圖中橘色部分是 JavaScript，紫色部分是 HTML，請和前一張圖做比較)
<br />
<br />

當我們將按鈕的渲染邏輯和標記放在一起，此舉可以確保它們在每次編輯時保持同步。

相反，不相關的細節 (例如按鈕的標記和側邊欄的標記) 是彼此隔離的，這樣我們可以更安全的去更改其中任何一個，不會讓它們互相影響。

每個 React 元件都是一個 JavaScript 函數，可能包含一些標記，這些標記會由 React 渲染到瀏覽器中。

React 元件使用稱為 JSX 的語法擴展來表示這些標記。

JSX 看起來很像 HTML，但它更為嚴格一點，而且可以顯示動態資訊。想要理解他們兩個之間差異的最佳方法就是：將一些 HTML 標記轉換為 JSX 標記。

### 注意

1. JSX 和 React 是兩個獨立的事物。它們通常一起使用，但我們**可以** [獨立使用它們](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)。
2. JSX 是語法擴展，而 React 是 JavaScript 庫。

## 將 HTML 轉換為 JSX (Converting HTML to JSX)

假設現在你有一些 (完全有效的) HTML：

```html
<h1>Hedy Lamarr's Todos</h1>
<img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" class="photo" />
<ul>
  <li>Invent new traffic lights
  <li>Rehearse a movie scene
  <li>Improve the spectrum technology
</ul>
```

並且你想將它放入你的元件中：

```jsx
export default function TodoList() {
  return (
    // ???
  )
}
```

如果你直接複製並貼上它，將無法運作：

App.js:

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
      <li>Improve the spectrum technology
    </ul>
  );
}
```

會出現錯誤訊息：

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/2da88569-7cc4-48c9-bcaf-06dcfb9c75ce">

這是因為 JSX 比 HTML 更嚴格，並且有一些額外的規則！如果你閱讀上面的錯誤訊息，它們會指導你修正標記，或者你可以按照下面的指南進行。

> 注意
> 大多數情況下，React 在螢幕上顯示的錯誤訊息會幫助你找到問題所在。如果你遇到困難，請仔細閱讀它們！

## JSX 的規則 (The Rules of JSX)

### 1. 回傳單一根元素 (Return a single root element)

如果要從元件中回傳多個元素，我們必須**用單一的父標籤包裹它們。**

例如，我們可以使用 `<div>`：

```jsx
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img src='<https://i.imgur.com/yXOvdOSs.jpg>' alt='Hedy Lamarr' class='photo' />
  <ul>...</ul>
</div>
```

如果我們不想在標記中添加額外的 `<div>`，我們可以使用 `<>` 和 `</>` 代替：

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

這個空標籤的名字是 [_Fragment_](https://react.dev/reference/react/Fragment)。Fragments 可以讓我們在瀏覽器的 HTML 樹中，將元素分組，並且不留下任何痕跡。

#### ► 深入探討 - 為什麼多個 JSX 標籤需要包裹起來 (Why do multiple JSX tags need to be wrapped?)

JSX 看起來像 HTML，但實際上它被轉換為純 JavaScript 物件。

就像我們不能在函數中回傳兩個物件一樣，我們需要將它們包裹在一個陣列中才可以回傳。

這解釋了為什麼你不能回傳兩個 JSX 標籤而不將它們包裹在另一個標籤或 Fragment 中。

### 2. 關閉所有標籤 (Close all the tags)

JSX 要求標籤明確地關閉，舉例而言：

1. 自閉合標籤 (self-closing tags) 像是 `<img>` 必須寫成 `<img />`
2. 包裹標籤 (wrapping tags) 像是 `<li>oranges` 必須寫成 `<li>oranges</li>`

承接前面的範例，這裡將圖片和列表項目改為看起來是明確閉合的樣子：

```jsx
<>
  <img src='https://i.imgur.com/yXOvdOSs.jpg' alt='Hedy Lamarr' className='photo' />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

#### ► 筆者補充：

這部分大家也許會有疑問，咦？ `li` 不是通常都會有結尾標籤嗎？為什麼 React 在這裡說 `li` 沒有結尾標籤呢？

事實上，在 HTML 中，[`li` 元素](http://www.w3.org/TR/2014/REC-html5-20141028/grouping-content.html#the-li-element)有一個結尾標籤 (`</li>`)，但在某些情況下不是必須的，是可以自行選擇的，[請參考此文](http://www.w3.org/TR/2014/REC-html5-20141028/syntax.html#optional-tags)：

> 如果 `li` 元素後面緊接著另一個 `li` 元素，或者父元素中沒有更多內容，`li` 元素的結尾標籤可以省略。

雖然在 HTML 中有時可以省略 `li` 元素的結尾標籤，但大家在實務上通常都還是會寫上結尾標籤，以便於閱讀。而在 JSX 中 `li` 必須要明確地關閉標籤，不可以省略結尾標籤。

### 3. camelCase ~~所有~~ 大部分的東西！ (camelCase ~~all~~ most of the things!)

_讓大家都變成小駝峰吧！_

JSX 會轉換成 JavaScript，而在 JSX 中編寫的屬性會變成 JavaScript 物件的鍵。在你自己的元件中，你經常會想要將這些屬性讀取到變數中。但 JavaScript 對變數名稱有限制。例如，它們的名稱不能包含連字符或是保留字如 `class`。

這就是為什麼在 React 中，許多 HTML 和 SVG 屬性是用 camelCase 編寫的。例如，`stroke-width` 會寫成 `strokeWidth`。

保留字的部分，像是 `class` 是保留字，在 React 中我們就要改寫成 `className`，這是根據[對應的 DOM 屬性](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)命名的。

```jsx
<img src='https://i.imgur.com/yXOvdOSs.jpg' alt='Hedy Lamarr' className='photo' />
```

你可以[在 DOM 元件屬性列表中找到所有這些屬性](https://react.dev/reference/react-dom/components/common)。

如果你寫錯了也不必擔心——React 會在[瀏覽器控制台](https://developer.mozilla.org/docs/Tools/Browser_Console)中打印一條訊息，提供可能的更正。

> 注意
> 由於歷史原因，[`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) 和 [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) 屬性仍然像在 HTML 中一樣用連字符編寫。

### 專業提示：使用 JSX 轉換器 (Pro-tip: Use a JSX Converter)

將現有標記中的所有屬性轉換過來可能會很繁瑣！我們建議使用一個 [轉換器](https://transform.tools/html-to-jsx) 來將你現有的 HTML 和 SVG 轉換為 JSX。

轉換器在實踐中非常有用，但了解其運作方式仍然值得，這樣你就可以自己編寫 JSX。

這是本篇範例的最終結果：

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img src='https://i.imgur.com/yXOvdOSs.jpg' alt='Hedy Lamarr' className='photo' />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

## 嘗試一些挑戰 (Try out some challenges)

### 挑戰 1-1：將一些 HTML 轉換為 JSX

這段 HTML 被貼到一個元件中，但它不是有效的 JSX。修正它：

```jsx
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

你可以試試看手動或者使用轉換器來作答。

嘗試挑戰了嗎？

公佈解答：

```jsx
export default function Bio() {
  return (
    <div>
      <div className='intro'>
        <h1>Welcome to my website!</h1>
      </div>
      <p className='summary'>
        You can find my thoughts here.
        <br />
        <br />
        <b>
          And <i>pictures</i>
        </b> of scientists!
      </p>
    </div>
  );
}
```

## 結語

這篇文章主要是在介紹 JSX 的基本規則，並且示範如何將 HTML 標記轉換為 JSX 標記。

小結一下這篇文章的重點：

1. JSX 是 JavaScript 的語法擴展，讓我們可以在 JavaScript 檔案中寫類似 HTML 的標記。
2. JSX 和 React 是兩個獨立的事物，但通常一起使用。
3. JSX 與 HTML 有一些不同，例如：需要將多個元素包裹在一個父標籤中，並且需要明確地關閉所有標籤。
4. 在 JSX 中，屬性通常使用 camelCase 編寫，例如：`className`。
5. 使用[轉換器](https://transform.tools/html-to-jsx)可以幫助我們將 HTML 和 SVG 轉換為 JSX。
6. 錯誤訊息通常會指引你修正標記的正確方向，不要錯過它們。

希望這篇文章能幫助你更了解 JSX 的基本規則，並且在實作 React 元件時更加得心應手！

# 本文參考來源

[Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
