Table of Contents

- [useState](#usestate)
  - [使用情境](#使用情境)
  - [使用範例](#使用範例)
  - [基於前一個值更新 state](#基於前一個值更新-state)
  - [當 state 為 objects 或 array，如何更新](#當-state-為-objects-或-array如何更新)
  - [注意事項](#注意事項)
- [useRef](#useref)
  - [使用情境](#使用情境-1)
  - [使用範例](#使用範例-1)
  - [注意事項](#注意事項-1)
- [useEffect](#useeffect)
  - [使用情境](#使用情境-2)
  - [使用範例](#使用範例-2)
  - [注意事項](#注意事項-2)
- [useContext](#usecontext)
  - [使用情境](#使用情境-3)
  - [使用範例](#使用範例-3)
  - [注意事項](#注意事項-3)
- [Reference](#reference)

## useState

### 使用情境

用於在函數組件中添加一些內部 state 以進行渲染或觸發重新渲染。這個 Hook 接受一個參數作為初始狀態，並返回一個包含兩個元素的陣列：當前狀態和一個更新狀態的函數。

### 使用範例

```jsx
const [state, setState] = useState(initialState);
setState(newState);
```

```tsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

### 基於前一個值更新 state

- 因為更新 state 是非同步操作，不會馬上發生，所以基於前一個值更新 state 需用函式處理

```jsx
setCount((prevCount) => prevCount + 1);
```

### 當 state 為 objects 或 array，如何更新

```jsx
const [user, setUser] = useState({ name: "John", age: 30 });

setUser((prevUser) => ({ ...prevUser, age: prevUser.age + 1 }));
```

### 注意事項

- `set` function 只會在下次渲染時更新 state，如果呼叫 `set` 之後馬上讀取 state，會拿到舊的 state
- 放進 `set` function 的值，透過 `Object.is` 判斷跟舊的 state 一樣時，React 就不會重新渲染該元件跟它的子元件
- React 會批量更新 state，意味者執行完所有 event handler 及呼叫完所有 `set` functions 之後，React 才會更新 states，這是為了優化效能；如果要強制 React 提前更新螢幕，可以參考 [flushSync](https://react.dev/reference/react-dom/flushSync) (該作法不常見且容易造成效能問題)

## useRef

### 使用情境

用於在組件中保存一個可變的值，這個值在組件的所有渲染中都會保持不變。當你需要從一個函數組件中引用一個 DOM 節點，或者保持任何可變值，這個值**不會觸發組件重新渲染**。

### 使用範例

```jsx
import React, { useRef } from "react";

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` refers to the text input element mounted on **DOM**
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;
```

```jsx
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
  // ...

function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

### 注意事項

- **`useRef()`** 的返回值在組件的所有渲染中都將保持不變；在下一次渲染時，`useRef` 將返回相同的 object。
- 可以更改**`useRef`** 返回的 **`ref`**的`current`屬性以儲存資料並稍後讀取。

## useEffect

### 使用情境

它告訴 React 在完成對 DOM 的更改後運行你的“副作用”函數。副作用可能包括資料獲取、訂閱或手動更改 React 組件之外的 DOM。

### 使用範例

```jsx
useEffect(() => {
  // side effect
}, [dependencies]);
```

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 使用瀏覽器的 API 更新文件標題
    document.title = `You clicked ${count} times`;
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Example;
```

### 注意事項

- 預設情況下，React 將在每次渲染後運行 `useEffect` 內的程式碼(side effect)，包括第一次渲染。
- 如果 `useEffect` 有需要清理的工作，比如取消訂閱或清理計時器，你可以返回一個函數，React 將在組件卸載或重新渲染前調用它。
- 使用 `useEffect` 要包含依賴項`[]`，否則會導致數據過時或無限循環。依賴項可包含所有須”訂閱”的變數。

## useContext

### 使用情境

用於在多個元件之間傳值，避免 prop drilling

### 使用範例

```jsx
const MyContext = React.createContext();

function MyComponent() {
  const contextValue = useContext(MyContext);
  // ...
}

function App() {
  const [value, setValue] = useState({ count: 0 });

  return (
    <MyContext.Provider value={value}>
      <MyComponent />
      <button onClick={() => setValue({ count: value.count + 1 })}>
        Increment
      </button>
    </MyContext.Provider>
  );
}
```

```jsx
function App() {
  const value = { count: 0 };

  return (
    <MyContext.Provider value={value}>
      <MyComponent />
      <button onClick={() => value.count++}>Increment</button>
    </MyContext.Provider>
  );
}
```

### 注意事項

- **`useContext(MyContext)`** 只是讓你能夠讀取 context 的值以及訂閱 context 的變化。你仍然需要在上層組件樹中使用 **`<MyContext.Provider>`** 來為下層組件提供 context。
- context value 更改時，會觸發重新渲染；如果 context value 是 object，那 object 裡面的值更改不會有重新渲染，只有換新的 object 才會重新渲染

## Reference

- [**React doc - built-in hooks**](https://react.dev/reference/react#state-hooks)
- [All React hooks in one short.](https://medium.com/@AbidKazmi/all-react-hooks-in-one-short-4b0ed4b5a6e4)
- \***\*[Goodbye, useEffect - David Khourshid](https://www.youtube.com/watch?v=bGzanfKVFeU&t=228s)\*\***
