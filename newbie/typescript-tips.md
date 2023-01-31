目錄

- [Type](#type)
  - [Union Types](#union-types)
  - [Type Aliases](#type-aliases)
- [Interfaces](#interfaces)
- [Interfaces vs **Type Aliases**](#interfaces-vs-type-aliases)
- [Generics](#generics)
- [`null` and `undefined`](#null-and-undefined)
- [Reference](#reference)

以下 code snippet 可在 [TS Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgJKoCYXMMBPZAbwChlkQ4BbCALmQGcwpQBzAblOQCNgowALDHDx0QAV0pdoHAL7FiMMSARhgAexDJgWHPgA8AFQB8ACjhQWdAwEorRTmSgQwYqJvPtic4gBtnyNTEwAAcg5ABeLR1VfXRo3DxTQgpqOgAiAEEfYCQ0gBpuXgEhEWQAJgAGMoBmCoBGarqZaw5iBA16NT8AOh81FhNAkKDrIA) 運行

## Type

```tsx
let message: string = 'Hello World';

// 其實不需要 type annotation ， TS 會 'message' 推斷為 'string'
let message = 'Hello World';
```

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

## Interfaces vs **Type Aliases**

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

## `null` and `undefined`

## Reference

- [Documentation - Generics - TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)
