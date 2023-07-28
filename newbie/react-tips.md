Table of Contents

- [useState](#usestate)
  - [使用範例:](#使用範例)
  - [注意事項](#注意事項)
  - [基於前一個值更新 state:](#基於前一個值更新-state)
  - [當 state 為 objects 或 array，如何更新:](#當-state-為-objects-或-array如何更新)
- [useRef](#useref)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [useHistory](#usehistory)

## useState

### 使用範例:

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

### 注意事項

- `set` function 只會在下次渲染時更新 state，如果呼叫 `set` 之後馬上讀取 state，會拿到舊的 state
- 放進 `set` function 的值，透過 `Object.is` 判斷跟舊的 state 一樣時，React 就不會重新渲染該元件跟它的子元件
- React 會批量更新 state，意味者執行完所有 event handler 及呼叫完所有 `set` functions 之後，React 才會更新 states，這是為了優化效能；如果要強制 React 提前更新螢幕，可以參考 [flushSync](https://react.dev/reference/react-dom/flushSync) (該作法不常見且容易造成效能問題)

### 基於前一個值更新 state:

### 當 state 為 objects 或 array，如何更新:

## useRef

## useEffect

## useContext

## useHistory
