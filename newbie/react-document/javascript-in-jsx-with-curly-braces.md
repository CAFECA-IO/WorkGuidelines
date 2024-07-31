# 前言

此為 [Describing the UI: Unveiling the Power of React Components](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/react-document/describing-the-ui.md) 此篇文章的延伸內容之一。

這一系列文章是筆者在學習 React 時，閱讀 [React 官方文件](https://react.dev/learn) 所做的翻譯筆記，希望能幫助更多的人學習 React。

筆者會將段落標題的英文原文附上在標題後方，讓有需要的人可以參照。

本篇文章沒有節錄原文範例的輸出結果，如有需要請至原文對照參考。

# 在 JSX 中使用大括號來寫 JavaScript 語法 (JavaScript in JSX with Curly Braces)

JSX 讓我們在 JavaScript 檔案內寫入類似 HTML 的標記(markup)，讓我們可以將渲染邏輯和內容放在同一個地方。

有時候我們會需要在這些標記內添加一些 JavaScript 邏輯或引用動態屬性。

在這種情況下，我們可以在 JSX 中使用大括號來開啟 JavaScript 的窗口。

#### 這個章節將會學到幾個重點:

- 如何傳遞帶有引號的字串
- 如何在 JSX 中使用大括號來引用 JavaScript 變數
- 如何在 JSX 中使用大括號來呼叫 JavaScript 函式
- 如何在 JSX 中使用大括號來使用 JavaScript 物件

## 傳遞帶有引號的字串 (Passing Strings with Quotes)

當你想要將字串屬性傳遞給 JSX 時，可以使用單引號或雙引號將其包起來：

```jsx
export default function Avatar() {
  return <img className='avatar' src='https://i.imgur.com/7vQD0fPs.jpg' alt='Gregorio Y. Zara' />;
}
```

在這裡，`"https://i.imgur.com/7vQD0fPs.jpg"` 和 `"Gregorio Y. Zara"` 是以字串的形式傳遞。

但如果你想要動態指定 `src` 或 `alt` 文字怎麼辦？你可以使用 JavaScript 的值，並且將 `"` 和 `"` 替換為 `{` 和 `}` ：

```jsx
export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";
  return <img className='avatar' src={avatar} alt={description} />;
}
```

注意 `className="avatar"` 和 `src={avatar}` 之間的差異。

`className="avatar"` 指定了一個 `"avatar"` 的 CSS 類名，而 `src={avatar}` 則讀取了名為 `avatar` 的 JavaScript 變數的值。

## 使用大括號：通往 JavaScript 世界的窗口 (Using curly braces: A window into the JavaScript world)

JSX 是一種特殊的 JavaScript 語法。這意味著我們可以在 JSX 中使用 JavaScript——藉由使用大括號 `{ }` 的方式。

### 範例一： JavaScript 變數

首先宣告了一個人的名字 `name`，然後將其嵌入 `<h1>` 中的大括號內。

```jsx
export default function TodoList() {
  const name = "Gregorio Y. Zara";
  return <h1>{name}'s To Do List</h1>;
}
```

隨著 `name` 的值改變，`<h1>` 內的文字也會跟著改變。

### 範例二： JavaScript 表達式

任何 JavaScript 表達式都可以放在大括號內，包括像 `formatDate()` 這樣的函式調用：

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList() {
  return <h1>To Do List for {formatDate(today)}</h1>;
}
```

在這裡，`formatDate(today)` 會回傳今天的日期，並且我們將它放入 `<h1>` 內。

### 使用大括號的地方

我們只能在 JSX 中以兩種方式使用大括號：

1. **作為文本** 直接放在 JSX 標籤內：
   `<h1>{name}'s To Do List</h1>` 是有效的。但要注意： `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 是無效的。
2. **作為屬性** 緊接在 `=` 符號後面：
   `src={avatar}` 會讀取 `avatar` 變數。但要注意： `src="{avatar}"` 會傳遞字串 `"{avatar}"`。

## 使用「雙大括號」：在 JSX 中的 CSS 和其他物件 (Using “double curlies”: CSS and other objects in JSX)

除了字串、數字和其他 JavaScript 表達式外，你甚至可以在 JSX 中傳遞物件。

物件也使用大括號來表示，例如 `{ name: "Hedy Lamarr", inventions: 5 }`。

因此，為了在 JSX 中傳遞 JavaScript 物件，你必須將物件包裹在另一對大括號內：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。

你可能會在 JSX 的內嵌 CSS 樣式中看到這種用法。
React 並沒有要求說一定要使用內嵌樣式（CSS 類別在大多數情況下效果很好）。
但是當你需要內嵌樣式時，你可以將物件傳遞給 `style` 屬性：

```jsx
export default function TodoList() {
  return (
    <ul
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

在這裡，`style` 屬性接受一個物件，這個物件包含了 CSS 屬性和值。

我們改用這樣方式編寫時，就可以真正看到大括號內的 JavaScript 物件：

```jsx
<ul style={
    {
    backgroundColor: 'black',
    color: 'pink'
    }
}>
```

所以下次當在 JSX 中看到 `{{` 和 `}}` 時，我們就會知道，喔，這只不過是 JSX 大括號內的一個物件，不必驚訝。

#### 補充說明:

內嵌的 `style` 屬性需要使用駝峰式命名法。例如，HTML 中的 `<ul style="background-color: black">` 在你的元件中應該要寫作 `<ul style={{ backgroundColor: 'black' }}>`。

## 更多關於 JavaScript 物件和大括號的趣味 (More fun with JavaScript objects and curly braces)

你可以將多個表達式放入一個物件中，並在 JSX 的大括號內引用它們：

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

在這個範例中，`person` JavaScript 物件包含了一個 `name` 字串和一個 `theme` 物件：

```jsx
const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};
```

這個元件可以像這樣使用 `person` 中的值：

```jsx
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

所以說，JSX 作為模板語言非常簡單之外，也可以寫得很簡潔，因為它允許我們使用 JavaScript 來組織資料和邏輯。

## 重點回顧

現在你幾乎了解了關於 JSX 的所有知識：

- JSX 屬性中的引號內的值會被當作字串傳遞。
- 大括號讓你可以將 JavaScript 邏輯和變數引入標記中。
- 大括號可以在 JSX 標籤內容內或屬性中的 `=` 符號後面使用。
- `{{` 和 `}}` 不是特殊語法：它們是在 JSX 大括號內的 JavaScript 物件。

## 嘗試一些挑戰 (Try out some challenges)

建議：可以直接去[原文](https://react.dev/learn/javascript-in-jsx-with-curly-braces#challenges)實作，那裡可以立即看到修改程式碼後的結果。

### 挑戰 1：修正錯誤

這段代碼會崩潰，顯示錯誤 `Objects are not valid as a React child`：

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
      <h1>{person}'s Todos</h1>
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

### 挑戰 2：將資訊提取到物件中

將圖片 URL 提取到 `person` 物件中。

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

### 挑戰 3：在 JSX 大括號內編寫表達式

在下面的物件中，完整的圖片 URL 被分成了四部分：base URL、imageId、imageSize 和檔案副檔名。

我們希望圖片 URL 能將這些屬性組合在一起：base URL（永遠都是 'https://i.imgur.com/'）、imageId（'7vQD0fP'）、imageSize（'s'）和檔案副檔名（始終為 '.jpg'）。

但是這裡 <img> 標籤指定 src 的方式有問題。

你能修正它嗎？

```jsx
const baseUrl = "https://i.imgur.com/";
const person = {
  name: "Gregorio Y. Zara",
  imageId: "7vQD0fP",
  imageSize: "s",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className='avatar' src='{baseUrl}{person.imageId}{person.imageSize}.jpg' alt={person.name} />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

## 挑戰的解決方案

### 挑戰 1：修正錯誤

這是因為這個範例嘗試將物件本身渲染到標記中，而不是字串：

`<h1>{person}'s Todos</h1>` 正在嘗試渲染整個 `person` 物件！

將原始物件作為文字內容顯示會引發錯誤，因為 React 不知道你想如何顯示它們。

要修正它的話，就將 `<h1>{person}'s Todos</h1>` 替換為 `<h1>{person.name}'s Todos</h1>`。

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

### 挑戰 2：將資訊提取到物件中

解決方案：將圖片 URL 移到一個名為 `person.imageUrl` 的屬性中，並使用大括號從 `<img>` 標籤中讀取它：

```jsx
const person = {
  name: "Gregorio Y. Zara",
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className='avatar' src={person.imageUrl} alt='Gregorio Y. Zara' />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

### 挑戰 3：在 JSX 大括號內編寫表達式

#### 解決方案：

你可以這樣寫：`src={baseUrl + person.imageId + person.imageSize + '.jpg'}`。

- `{` 開啟 JavaScript 表達式
- `baseUrl + person.imageId + person.imageSize + '.jpg'` 產生正確的 URL 字串
- `}` 關閉 JavaScript 表達式

```jsx
const baseUrl = "https://i.imgur.com/";
const person = {
  name: "Gregorio Y. Zara",
  imageId: "7vQD0fP",
  imageSize: "s",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className='avatar' src={baseUrl + person.imageId + person.imageSize + ".jpg"} alt={person.name} />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

#### ► 筆者補充：

這裡的表達式也可以使用模板字串的方式來寫：

```jsx
<img className='avatar' src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`} alt={person.name} />
```

#### 進階解決方案：

你也可以將這個表達式移到一個單獨的函數中，像是以下的 getImageUrl：

- App.js:

  ```jsx
  import { getImageUrl } from "./utils.js";

  const person = {
    name: "Gregorio Y. Zara",
    imageId: "7vQD0fP",
    imageSize: "s",
    theme: {
      backgroundColor: "black",
      color: "pink",
    },
  };

  export default function TodoList() {
    return (
      <div style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img className='avatar' src={getImageUrl(person)} alt={person.name} />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    );
  }
  ```

- utils.js:

  ```js
  export function getImageUrl(person) {
    return "https://i.imgur.com/" + person.imageId + person.imageSize + ".jpg";
  }
  ```

**變數和函數可以幫助我們保持 jsx 標記的簡潔，可以多多利用。**

# 結語

這篇文章介紹了如何在 JSX 中使用大括號來寫 JavaScript 語法，讓我們可以在 JSX 中引用 JavaScript 變數、函式和物件。

這樣的設計讓我們可以在 React 元件中使用 JavaScript 來組織資料和邏輯，並且可以更容易地將動態資訊傳遞到我們的應用程式中，利用這種方式除了可以建構出更具有動態性的應用程式，也可以讓我們的程式碼更加簡潔易讀。

# 本文參考來源

[JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
