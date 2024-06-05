# Overview

這篇文章第一個章節提供了一個小題目 (Quiz)，讓大家試試看，並且在第二章節提供解答和說明。

延續這個題目，在第三章節，我們會進一步解釋 `async`/`await` 在 JavaScript 的事件循環（Event Loop）中是如何運行的，並且提供一個範例逐步解釋程式碼的執行過程。

並於第四章節說明同步與非同步的概念，以及在前一個範例中同步與非同步的部分。

章節目錄:

- Quiz
- Answer
- async / await 在 Event Loop 中運行的方式
- 同步與非同步的概念
- Reference

# Quiz

index.jsx :

```jsx
import AComponent from "./acomponent";

export default function Home() {
  return (
    <>
      <AComponent />
    </>
  );
}
```

acomponent.jsx :

```jsx
import React from "react";
import BComponent from "./bcomponent";

const test = async () => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  setTimeout(() => {
    console.log(3);
  }, 0);
  console.log(4);
  new Promise((resolve) => {
    console.log(5);
    resolve(true);
  }).then(() => {
    console.log(6);
  });
};

const AComponent = () => {
  test();
  console.log("AComponent rendered");
  return (
    <div>
      <h1>A Component</h1>
      <BComponent />
    </div>
  );
};

export default AComponent;
```

bcomponent.jsx :

```jsx
import React, { useState } from "react";
import CComponent from "./ccomponent";

const BComponent = () => {
  const [count, setCount] = useState(0);
  console.log("BComponent rendered");

  const handleClick = () => {
    console.log("Button clicked");
    setCount(count + 1);
  };

  return (
    <div>
      <h2>B Component</h2>
      <button onClick={handleClick}>Click me</button>
      <p>Button clicked {count} times</p>
      <CComponent />
    </div>
  );
};

export default BComponent;
```

ccomponent.jsx :

```jsx
import React, { useState } from "react";

const CComponent = () => {
  const [count, setCount] = useState(0);
  console.log("CComponent rendered");

  return (
    <div>
      <h2>C Component</h2>
    </div>
  );
};

export default CComponent;
```

## Questions

1. What will be the output of the following code?
2. What will happen when the button is clicked?
3. How to modify the code so that the handleClick function is executed but CComponent is not rendered?

# Answer

## 1. 印出結果

一開始先執行 Home()，進入主畫面

Home() return AComponent

所以執行 AComponent

先執行 AComponent 中的 test();

```js
const test = async () => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  setTimeout(() => {
    console.log(3);
  }, 0);
  console.log(4);
  new Promise((resolve) => {
    console.log(5);
    resolve(true);
  }).then(() => {
    console.log(6);
  });
};
```

這裡雖然有 async 但是沒有 await，所以會等待 test() 執行完才執行下一行
也就說這裡 text() 是同步執行。

一開始直接執行 console.log(1)，印出 1。

接著遇到 `setTimeout(() => { console.log(2); }, 0);`，
會將這個放到 Event Loop 中的 Task Queue 中，等待 Call Stack 空了之後，並且 Microtask Queue 也為空的時候，才會執行。

接著遇到 `setTimeout(() => { console.log(3); }, 0);`，
也是一樣放入 Task Queue 中。
這裡兩者的時間雖然都是 0，但依然會先執行 console.log(2) 再執行 console.log(3)，原因是因為 Task Queue 是先進先出。

接著執行 console.log(4)，印出 4。

接著遇到 `new Promise((resolve) => { console.log(5); resolve(true); }).then(() => { console.log(6); });`

這裡的`(resolve) => { console.log(5); resolve(true); }`是同步執行，所以會印出 5。

通常 Promise 這個 Callback 會放入像是 Call API 這種非同步的操作。
這裡用 resolve(true) 來模擬非同步操作完成，並且將結果傳遞給 then()。
如果要模擬非同步操作失敗，則會使用 reject()。

`resolve(true);`表示操作成功，所以繼續往下執行這部分 `.then(() => { console.log(6); });` ，
但這部分會放入 Microtask Queue 中，等待 Call Stack 空了之後，才會執行。

目前 Call Stack 中還有 AComponent 這個 function，所以要繼續執行 AComponent 這個 function 直到結束，才會輪到 Microtask Queue，之後才再輪到 Task Queue。

所以這裡就繼續執行 AComponent 中的 console.log('AComponent')，印出 AComponent rendered。

接著 AcComponent return BComponent，所以執行 BComponent。

遇到 BComponent 中的 console.log('BComponent')，印出 BComponent rendered。

接著 BComponent return CComponent，所以執行 CComponent。

遇到 CComponent 中的 console.log('CComponent')，印出 CComponent rendered。

目前 AComponent 中的所有 function 都執行完畢，所以 Call Stack 為空。

接著執行 Microtask Queue 中的 Promise.then()，印出 6。

接著執行 Task Queue 中的 setTimeout(() => { console.log(2); }, 0);，印出 2。
以及 setTimeout(() => { console.log(3); }, 0);，印出 3。

所以最後印出的結果為：

```
1
4
5
AComponent rendered
BComponent rendered
CComponent rendered
6
2
3
```

### 以上的說明較為繁瑣，這裡提供一個更簡化的說明：

```
home function 被 push 到 Call Stack

AComponent function 被 push 到 Call Stack
test function 被 push 到 Call Stack
執行 test function
印出 1
setTimeout 2 被 push 到 Task Queue
setTimeout 3 被 push 到 Task Queue
印出 4
Promise 的 executor function 被 push 到 Call Stack
印出 5
.then 被 push 到 Microtask Queue
Promise 的 executor function 執行完畢 pop 出 Call Stack
test function 執行完畢 pop 出 Call Stack
印出 AComponent rendered

BComponent function 被 push 到 Call Stack
印出 BComponent rendered
CComponent function 被 push 到 Call Stack
印出 CComponent rendered
CComponent function 執行完畢 pop 出 Call Stack
BCOmponent function 執行完畢 pop 出 Call Stack
AComponent function 執行完畢 pop 出 Call Stack
Home function 執行完畢 pop 出 Call Stack

.then function 被 push 到 Call Stack
印出 6
.then function 執行完畢 pop 出 Call Stack

setTimeout 2 被 push 到 Call Stack
印出 2
setTimeout 2 執行完畢 pop 出 Call Stack

setTimeout 3 被 push 到 Call Stack
印出 3
setTimeout 3 執行完畢 pop 出 Call Stack
```

## 2. 按下按鈕後，會發生什麼事情？

按下按鈕後，會執行 handleClick()，會先印出 Button clicked，並且 setCount 會將 count + 1。

狀態更新後，會重新 render，所以會再次執行 BComponent 這個 function。

會先印出 BComponent rendered。

接著 BComponent return CComponent，所以會執行 CComponent。

執行 CComponent 中的 console.log('CComponent')，印出 CComponent rendered。

所以按下按鈕後，會印出：

```
Button clicked
BComponent rendered
CComponent rendered
```

## 3. 執行 handleClick 但同時不觸發 CComponent rendered

有兩個方式：
如果是不需要在畫面上顯示點擊次數，只需要追蹤，可以使用 useRef，取代 useState。
如果是需要在畫面上顯示點擊次數，可以使用 useMemo，搭配 useState。

### 1. 不使用 useState，改成使用 useRef

在這個範例中，點擊次數只會在控制台中顯示，而不會在畫面上顯示，沒有觸發 BComponent 重新渲染，也不會觸發 CComponent 重新渲染。

```jsx
import React, { useRef } from "react";
import CComponent from "./ccomponent";

const BComponent = () => {
  const countRef = useRef(0);
  console.log("BComponent rendered");

  const handleClick = () => {
    console.log("Button clicked");
    countRef.current += 1;
  };

  return (
    <div>
      <h2>B Component</h2>
      <button onClick={handleClick}>Click me</button>
      <CComponent />
    </div>
  );
};

export default BComponent;
```

### 2. 使用 useMemo

另一種避免 CComponent 重新渲染的方法是使用 React.memo 記憶化 CComponent。這樣會讓 CComponent 只有在它的 props 改變時才重新渲染。

ccomponent.jsx :

```jsx
import React from "react";

const CComponent = () => {
  console.log("CComponent rendered");
  return <div>C Component</div>;
};

export default React.memo(CComponent);
```

通過用 React.memo 包裝 CComponent，它只會在其 props 改變時重新渲染。

在範例中，由於沒有傳遞 props 給 CComponent，所以它在 BComponent 重新渲染時不會重新渲染。

bcomponent.jsx 則維持不變 :

```jsx
import React, { useState } from "react";
import CComponent from "./ccomponent";

const BComponent = () => {
  const [count, setCount] = useState(0);
  console.log("BComponent rendered");

  const handleClick = () => {
    console.log("Button clicked");
    setCount(count + 1);
  };

  return (
    <div>
      <h2>B Component</h2>
      <button onClick={handleClick}>Click me</button>
      <p>Button clicked {count} times</p>
      <CComponent />
    </div>
  );
};

export default BComponent;
```

# async / await 在 Event Loop 中運行的方式

這節主要是解說 `async`/`await` 在 JavaScript 的事件循環（Event Loop）中是如何運行的。

`async` 函數回傳一個 `Promise`後，`await` 關鍵字用意就是用來等待這個 `Promise` 的解析（resolve）。

也就是說，當遇到 `await` 時，JavaScript 引擎會暫停 `async` 函數的執行，讓出控制權給事件循環，直到 `Promise` 解析完畢為止。

這裡有個簡易的範例，並且我們逐行解釋程式碼的執行過程：

```jsx
const asyncFunction = async () => {
  console.log("1: Start of async function");

  await new Promise((resolve) => {
    console.log("2: Inside Promise executor");
    setTimeout(() => {
      console.log("3: Timeout callback");
      resolve("resolved");
    }, 1000);
  })
    .then(() => {
      console.log("6: Promise resolved");
    })
    .catch(() => {
      console.log("7: Promise rejected");
    });

  console.log("4: After await");
};

console.log("0: Before async function call");
asyncFunction();
console.log("5: After async function call");
```

## 執行順序分析

1. `console.log('0: Before async function call');`
   - **執行時機**：同步執行
   - **輸出**：`0: Before async function call`
2. `asyncFunction();`
   - **執行時機**：同步執行，開始執行 `asyncFunction`
   - **描述**：`asyncFunction` 函數調用立即開始執行，因為 `asyncFunction` 是一個異步函數，它會立即回傳一個 `Promise`。
3. `console.log('1: Start of async function');`
   - **執行時機**：在 `asyncFunction` 函數內部，立即同步執行
   - **輸出**：`1: Start of async function`
4. `await new Promise((resolve) => { ... });`
   - **執行時機**：立即執行 `Promise` 的 executor 函數
   - **描述**：此時 `asyncFunction` 進入暫停狀態，等待 `Promise` 解決
   - **內部步驟**：
     - `console.log('2: Inside Promise executor');`
       - **執行時機**：立即執行，因為 `Promise` 的 executor 是同步執行的
       - **輸出**：`2: Inside Promise executor`
     - `setTimeout(() => { console.log('3: Timeout callback'); resolve('resolved'); }, 1000);`
       - **執行時機**：將定時器回調函數排入事件循環的 "宏任務" 隊列，並在 1000 毫秒後執行
5. `console.log('5: After async function call');`
   - **執行時機**：立即執行，因為 `asyncFunction` 是非同步函數，`asyncFunction()` 調用回傳 `Promise`，這行代碼不等待 `asyncFunction` 完成
   - **輸出**：`5: After async function call`

### 事件循環結束

當調用堆疊清空後，事件循環首先檢查微任務隊列，但這時沒有微任務執行。所以往下接著進入宏任務隊列執行任務。

**進入宏任務隊列 (Task Queue) :**

1000 毫秒後，`setTimeout` 回調函數被執行：

- `console.log('3: Timeout callback');`
  - **執行時機**：1000 毫秒後執行回調
  - **輸出**：`3: Timeout callback`
- `resolve('resolved');`
  - **執行時機**：解決 `Promise`，將 `.then` 回調排入微任務隊列

在宏任務執行完後，事件循環再次重新檢查，檢查到微任務隊列有任務並執行。

**進入微任務隊列 (Microtask Queue) :**

- `console.log('6: Promise resolved');`
  - 執行時機：`Promise` 解決後，`.then` 回調執行
  - 輸出：`6: Promise resolved`
- `console.log('4: After await');`
  - 執行時機：`Promise` 解決後，`await` 後面的代碼繼續執行
  - 輸出：`4: After await`

### 最終輸出順序

根據上述分析，最終的輸出順序如下：

```
0: Before async function call
1: Start of async function
2: Inside Promise executor
5: After async function call
3: Timeout callback
6: Promise resolved
4: After await
```

### 簡單做個小結

- `0: Before async function call`、`1: Start of async function`、`2: Inside Promise executor` 和 `5: After async function call` 都是同步代碼，會按順序立即執行。
- 當 `Promise` 被解決時（由 `setTimeout` 觸發），`3: Timeout callback` 在宏任務隊列中執行。
- `Promise` 被解決後，`.then` 回調被排入微任務隊列，並在事件循環檢查並執行微任務時執行，輸出 `6: Promise resolved`。
- `await` 之後的代碼 `console.log('4: After await');` 在微任務執行完畢後執行，輸出 `4: After await`。

## 補充說明: 事件循環與 `async`/`await` 的運行方式

- 當 `asyncFunction` 被調用時，它立即開始執行，並同步輸出 `1: Start of async function` 和 `2: Inside Promise executor`。
- `await` 暫停了 `asyncFunction` 的執行，讓出控制權給事件循環。
- 事件循環處理所有同步代碼後，執行定時器回調，輸出 `3: Timeout callback`，並解決 `Promise`。
- 最後，事件循環處理微任務隊列，恢復 `asyncFunction` 的執行，輸出 `4: After await`。

# 同步和非同步的概念

### **同步(Synchronous)** :

- 在同步操作中，程式碼是按順序執行的，每個步驟必須等待前一個步驟完成後才能繼續。
- 簡單來說，同步就是「**一步接著一步**」的執行。

### **非同步(Asynchronous)** :

- 在非同步操作中，某些操作，像是網路請求、計時器等，會在不阻塞主程式的情況下進行，這意味著它們可以在等待結果的同時繼續執行其他操作。
- 簡單來說，非同步就是，它允許程式繼續執行，而不必等待某個操作完成。

## 範例中的同步與非同步

我們再來看一下之前的範例：

```jsx
const asyncFunction = async () => {
  console.log("1: Start of async function");

  await new Promise((resolve) => {
    console.log("2: Inside Promise executor");
    setTimeout(() => {
      console.log("3: Timeout callback");
      resolve("resolved");
    }, 1000);
  })
    .then(() => {
      console.log("6: Promise resolved");
    })
    .catch(() => {
      console.log("7: Promise rejected");
    });

  console.log("4: After await");
};

console.log("0: Before async function call");
asyncFunction();
console.log("5: After async function call");
```

### 同步部分

1. `console.log('0: Before async function call');`
   - **同步**：這行程式碼立即執行，輸出 `0: Before async function call`。
2. `asyncFunction();`
   - **同步**：調用 `asyncFunction` 函數，立即執行 `async` 函數內部的同步代碼。
3. `console.log('1: Start of async function');`
   - **同步**：在 `asyncFunction` 內部，這行程式碼立即執行，輸出 `1: Start of async function`。
4. `console.log('2: Inside Promise executor');`
   - **同步**：在 `Promise` 的 executor 函數內部，這行程式碼立即執行，輸出 `2: Inside Promise executor`。
5. `console.log('5: After async function call');`
   - **同步**：在調用 `asyncFunction` 之後立即執行，輸出 `5: After async function call`。

### 非同步部分

1. `setTimeout(() => { console.log('3: Timeout callback'); resolve('resolved'); }, 1000);`
   - **非同步**：這個 `setTimeout` 設置了一個回調函數，將在 1000 毫秒（1 秒）後執行。這段代碼立即執行，但回調函數會在未來某個時間點執行。
2. `await new Promise((resolve) => { ... });`
   - **非同步**：`await` 關鍵字暫停了 `asyncFunction` 的執行，直到 `Promise` 被解決（`resolve` 被調用）。
3. `console.log('4: After await');`
   - **非同步**：這行程式碼在 `Promise` 被解決之後才執行，因為它在 `await` 之後。
4. `.then(() => { console.log('6: Promise resolved'); })`
   - **非同步**：當 `Promise` 被解決後，`.then` 回調會被加入微任務隊列，並在所有同步代碼和宏任務完成後執行。

### 總結

在這個範例中：

- **同步**的部分會立即執行，包括 `console.log` 語句和調用 `asyncFunction`。
- **非同步**的部分包括 `setTimeout` 和 `await`，它們會讓出控制權給事件循環，並在未來的某個時間點繼續執行，也就是說，它**允許程式碼在等待的同時繼續執行其他操作**。

總之，非同步的優點是，它允許長時間運行的操作（例如網路請求或定時器）不會阻塞主程式。這讓應用程式可以在等待某些操作完成的同時，繼續執行其他操作。因此提高效率，也讓使用者體驗變得更好。

# Reference

https://www.jsv9000.app/
