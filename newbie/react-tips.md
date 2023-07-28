# React Tips

- [React Tips](#react-tips)
  - [useState](#usestate)
    - [使用範例:](#使用範例)
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

### 基於前一個值更新 state:

### 當 state 為 objects 或 array，如何更新:

## useRef

## useEffect

## useContext

## useHistory
