目錄

- [Type](#type)
  - [Type Annotations](#type-annotations)
  - [Union Types](#union-types)
  - [Type Aliases](#type-aliases)
- [Interfaces](#interfaces)
  - [Interfaces vs **Type Aliases**](#interfaces-vs-type-aliases)
- [Generics](#generics)
- [**Type Assertions**](#type-assertions)
- [`null` and `undefined` (`strictNullChecks` on)](#null-and-undefined-strictnullchecks-on)
  - [Non-null Assertion Operator (Postfix`!`)](#non-null-assertion-operator-postfix)
- [Reference](#reference)

以下 code snippet 可在 [TS Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgJKoCYXMMBPZAbwChlkQ4BbCALmQGcwpQBzAblOQCNgowALDHDx0QAV0pdoHAL7FiMMSARhgAexDJgWHPgA8AFQB8ACjhQWdAwEorRTmSgQwYqJvPtic4gBtnyNTEwAAcg5ABeLR1VfXRo3DxTQgpqOgAiAEEfYCQ0gBpuXgEhEWQAJgAGMoBmCoBGarqZaw5iBA16NT8AOh81FhNAkKDrIA) 運行

## Type

```tsx
let message: string = 'Hello World';

// 其實不需要明確指定變數類型 ， TS 會將 'message' 推斷為 'string'
let message = 'Hello World';
```

### Type Annotations

定義變數、參數、回傳的值的型別之後，可看到型別註釋。

### Union Types

定義型別時，允許該參數有多種類型的可能性

- 定義 Union Type

```tsx
function printId(id: number | string) {
	console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// 定義單一參數 id 的型別為數字或字串，而非定義為物件中的其中一個屬性為數字或字串
```

- 使用 Union Type

```tsx
function printId(id: number | string) {
	if (typeof id === 'string') {
		// In this branch, id is of type 'string'
		console.log(id.toUpperCase());
	} else {
		// Here, id is of type 'number'
		console.log(id);
	}
}
```

### Type Aliases

```tsx
type Point = {
	x: number;
	y: number;
};

// 參數 pt 物件的型別
function printCoord(pt: Point) {
	console.log("The coordinate's x value is " + pt.x);
	console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

- 可用在任何 type 上，不只 object

```tsx
type ID = number | string;
```

- 使用 alias 時，不能改變或擴充型別，但該變數可以被重新賦值

```tsx
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
	return sanitize(str);
}

// 宣告變數
let userInput = sanitizeInput(getInput());

// 重新賦值
userInput = 'new input';
```

## Interfaces

可用來定義 object 型別

- 定義了一個 Person 介面，它包含了兩個 data：name 和 age。

```tsx
interface Person {
	name: string;
	age: number;
}

let p: Person = { name: 'John', age: 30 };
```

### Interfaces vs **Type Aliases**

幾乎所有 `interface` 的功能都能用 `type` 替代，唯一差別是 `interface` 可以被繼承 (extends) 、被擴充 (加入新的 fields/ properties)，`type` 不能被重新打開 (re-open) 並加入新屬性 (property)。

- extends

  - interface

    ```tsx
    interface Animal {
    	name: string;
    }

    interface Bear extends Animal {
    	honey: boolean;
    }

    const bear: Bear = { name: 'unknown bear', honey: false };
    bear.name;
    bear.honey;
    ```

  - type extended via intersections

    ```tsx
    type Animal = {
    	name: string;
    };

    type Bear = Animal & {
    	honey: boolean;
    };

    const bear: Bear = { name: 'unknown bear', honey: false };
    bear.name;
    bear.honey;
    ```

- 增加新 field ([Playground](https://www.typescriptlang.org/play?#code/PTAEEEDtQS0gXApgJwGYEMDGjSfdAIx2UQFoB7AB0UkQBMAoEUfO0Wgd1ADd0AbAK6IAzizp16ALgYM4SNFhwBZdAFtV-UAG8GoPaADmNAcMmhh8ZHAMMAvjLkoM2UCvWad+0ARL0A-GYWVpA29gyY5JAWLJAwGnxmbvGgALzauvpGkCZmAEQAjABMAMwALLkANBl6zABi6DB8okR4Jjg+iPSgABboovDk3jjo5pbW1d6+dGb5djLwAJ7UoABKiJTwjThpnpnGpqPBoTLMAJrkArj4kOTwYmycPOhW6AR8IrDQ8N04wmo4HHQCwYi2Waw2W1S6S8HX8gTGITsQA))

  - interface

    ```tsx
    interface ISentence {
    	title: string;
    }

    interface ISentence {
    	content: number;
    }

    const src: ISentence = { title: 'const a = "Hello World"', content: 2023 };

    console.log(src);

    /*
    {
      "title": "const a = \"Hello World\"",
      "content": 2023
    }
    */
    ```

  - type ([Playground](https://www.typescriptlang.org/play?&q=283#code/C4TwDgpgBAkgyhAdsJBjaBeKBvAsAKCimAEtgAbCALigGdgAnExAcwIF8CDRJYFk0mHASKoA9gOQ1EAVwC2AIwgMOQA))

    ```tsx
    type ISentence = {
    	title: string;
    };

    type ISentence = {
    	ts: TypeScriptAPI;
    };

    // Error: Duplicate identifier 'Window'.
    ```

## Generics

- Function `identity` 接受一個類型為 T 的參數，並回傳一個類型為 T 的結果。**調用 `identity` 時才需要指定 T 的具體類型**（以下例子為接受 string 參數、回傳 string 參數）。

```tsx
function identity<T>(arg: T): T {
	return arg;
}

let output = identity<string>('Hello World');
```

- interface and generics

```tsx
interface IIdentity {
	name: string;
	birthday: number;
}

function identity<T>(arg: T): T {
	return arg;
}

let output = identity<IIdentity>({ name: 'Alice', birthday: 20230131 });

console.log(output);
/*
{
  "name": "Alice",
  "birthday": 20230131
}
*/
```

- 用 extends 將 interface 用在 generic 上能解決 `Property 'length' does not exist on type 'Type'.(2339)View Problem (Alt+F8)` 的問題
  - 需在宣告 function 時定義好 generic (用 extends )，才能確定 function 內要用到的 property (此為 length ) 存在。

```tsx
interface Lengthwise {
	length: number;
}

function loggingIdentity<Type>(arg: Type): Type {
	console.log(arg.length); // Property 'length' does not exist on type 'Type'.
	return arg;
}

loggingIdentity<Lengthwise>({ length: 2333 });
```

```tsx
interface Lengthwise {
	length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
	console.log(arg.length); // Now we know it has a .length property, so no more error
	return arg;
}

loggingIdentity({ length: 2333 });
```

- type and generics；接受類型為 T 的參數，並回傳類型為 `TOutput` 的結果

```tsx
type TOutput = string;

function identity<T>(arg: T): TOutput {
	return `${arg}/01/31`;
}

let output = identity<number>(2023);

console.log(output);
// "2023/01/31"
```

## **Type Assertions**

TS 不知道某些值的型別時，可使用型別斷言。

- 例如用 `document.getElementById` 時，TS 只知道會回傳某種 `HTMLElement`，實際上明確的回傳結果為 _給定 ID 的 HTMLCanvasElement_，可用型別斷言來指定更具體的型別。

```tsx
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
```

- 跟 type annotation 一樣， type assertions 會被編譯器刪掉，所以不會影響 runtime 時的代碼行為。(換句話說，如果型別斷言錯誤，不會產生 exception 或 null。)
- 在 `.tsx`檔案下，可用 `<>` (angle-bracket syntax) 代替。

```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
```

- 🏮 避免太保守而無法應對複雜的情況，可使用兩次斷言 (先斷言為 `any` 或 `unknown`，再斷言為所需的類型)

```tsx
const a = expr as any as T;
```

## `null` and `undefined` (`strictNullChecks` on)

- 跟 JS 一樣， TS 有`null` 跟`undefined`；這兩個型別的行為取決於是否開啟 [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
  - 沒開啟則類似沒有空值檢查的語言，容易出錯，故建議打開 [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
- 需檢查是否為 null

```tsx
function doSomething(x: string | null) {
	if (x === null) {
		// do nothing
	} else {
		console.log('Hello, ' + x.toUpperCase());
	}
}
```

### Non-null Assertion Operator (Postfix`!`)

- 在 TS 中， 可用非空值斷言運算子 `!.` 將型別排除 null 跟 undefined

```tsx
function liveDangerously1(x?: number | null) {
	// No error
	console.log(x!.toFixed()); // 排除 null 跟 undefined
}

function liveDangerously2(x?: number) {
	// No error
	console.log(x!.toFixed()); // 排除 undefined
}
```

## Reference

- [Documentation - Generics - TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)
- [TypeScript: TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play#code/Q)
