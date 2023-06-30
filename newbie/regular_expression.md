# Regular Expression

## 什麼是正規表達式
正規表達式（Regular expression），簡稱 regex 或 regexp，是一種用來描述字串是否符合**某個語法規則**的模型，用簡單字串來描述符合文中全部指定格式的字串。正規表達式是由一系列的字符和特殊字符組成，透過正規表達式可以執行以下操作：

- 在文字中尋找符合格式的部分
- 判斷一個字串是否完全符合格式
- 將符合格式的文字部分替換為指定的內容

目前很多文字編輯器和程式語言都支援用正規表達式搜尋、比對和替換符合的文字。

## 如何使用
### 1. 建立正規表達式
正規表達式可以透過雙斜線 `//` 或 `new RegExp()` 呼叫 RegExp 物件來建立
```
// 常見用法
const regex = /[a-z]/;

// 適合用在需要動態產生 pattern 的場合
const regex = new RegExp('[a-z]');
```

### 2. 使用正規表達式
- RegExp 物件中的 exec & test 方法 (未完成)
- match & replace & search (未完成)

## 正規表達式的語法

### 1. 簡易模式
即直接輸入匹配的字元，如：/World/ 這條規則將會直接匹配 'World' 這個文字
```
const paragraphOne = 'Hello World !';
paragraphOne.test(/World/); //true ，因為含有 'World'

const paragraphTwo = 'Hello John !';
paragraphTwo.test(/World/); //false ，因為不包含任何 'World' 字符
```

### 2. 特殊字元
需要搜尋較複雜的規則時使用，例如中華民國的身分證字號格式為：

1. 開頭為一個大寫英文字母 `/^[A-Z]/`
2. 數字第一位為 1 或 2 `/[12]/`
3. 後面為隨機八位數字 `/\d{8}/`

根據上述規則整理出以下正規表達式
```
const regex = /^[A-Z][12]\d{8}/;
const myId = A123456789;
const fakeId = D029482425

myId.test(regex); //true
fakeId.test(regex); //false
```

### 常用特殊規則(以下內容引用自[此文章](https://moojing.medium.com/javascript-%E5%88%9D%E6%8E%A2regex-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-1da2f4d94795))

1. 跳脫字元：
這邊有個好記的規則：小寫邏輯跟大寫邏輯是相對的，小寫代表「是」，大寫代表「否」

|  符號   | 說明  |
|  ----  | ----  |
| \d  | 匹配任意數字 |
| \D  | 匹配任意非數字字元 |
| \w  | 匹配所有文字字元(a-z、A-Z、0-9、_) |
| \W  | 匹配所有非文字字元(標點符號、特殊字元) |
| \s  | 匹配空白字元 |
| \S  | 匹配非空白字元 |
| \b  | 匹配字元邊界|
| \B  | 匹配非字元邊界 |
> 字元邊界：也就是單字與 空格或\ 之間，例如 `/er\b/` 代表匹配 'never' 或 'ver/sion' ，但不匹配 'verb'

2. 特殊符號

|  符號   | 說明  |
|  ----  | ----  |
| \ | 跳脫字元，例如需要搜尋'/'時，使用`\/` |
| . | 匹配任意字元 |
| ^ | 匹配字元開頭 |
| $ | 匹配字元結尾 |
| [] | 比對[]中的任一字元，可用於範圍匹配([A-Z]、[0-9]) |
| [^] | 比對[]中以外的任一字元 |
| | | OR邏輯 |
| () | 群組 |

3. 匹配次數
次數符號要放在匹配規則的**後面**，例如`/c{3}/`代表匹配 'c' 字元三次
|  符號   | 說明  |
|  ----  | ----  |
| * | 0次以上 |
| + | 1次以上 |
| ? | 0次或1次 |
| {m} | m次 |
| {n,} | 最少n次 |
| {m,n} | 從m次到n次 |
| {m,n}?  | | 從m次到n次，選到匹配最少次的 |

## 小技巧
- 有許多線上工具和教學可供學習和測試正規表達式，例如 [Regex101](https://regex101.com/)

## 參考來源
- https://5xruby.tw/posts/15min-regular-expression
- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions
- https://www.minwt.com/webdesign-dev/html/20352.html
- https://moojing.medium.com/javascript-%E5%88%9D%E6%8E%A2regex-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-1da2f4d94795
