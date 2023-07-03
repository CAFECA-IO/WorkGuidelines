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
const name = 'Kenny';
const regex = new RegExp(name);
```

### 2. 使用正規表達式
建立完正規表達式，就可以使用 RegExp 物件中的 `test` 和 `exec` 方法來比對字串
- `test` 的回傳值為 boolean
- `exec` 會回傳詳細資訊的 array ，如果匹配失敗則會回傳 null ，詳細可以[見此](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
```
const regex = /\d/;

regex.test('abc'); //false

regex.exec('123'); //['1', index: 0, input: '123', groups: undefined]
regex.exec('abc'); //null
```

- 除此之外， `match` 、 `replace` 、 `search` 等方法也支援正規表達式
```
const str = 'The quick brown fox jumps over the lazy dog';

str.search(/\d/); //-1
//search回傳值為指定文字在字串中的起始位置，沒有找到則回傳 -1

str.match(/fox/); //['fox', index: 16, input: 'The quick brown fox jumps over the lazy dog', groups: undefined]
//match方法會回傳第一個匹配成功的詳細資訊

str.replace(/\w*$/,'cat'); //'The quick brown fox jumps over the lazy cat'
```

## 正規表達式的語法

### 常用特殊規則(以下內容引用自[此文章](https://moojing.medium.com/javascript-%E5%88%9D%E6%8E%A2regex-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-1da2f4d94795))

1. 跳脫字元：
有個好記的規則：小寫邏輯跟大寫邏輯是相對的，小寫代表「是」，大寫代表「否」

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
| \| | OR邏輯 |
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
| {m,n}? | 從m次到n次，選到匹配最少次的 |

### 1. 簡易模式
即直接輸入匹配的字元，如：`/World/` 這條規則將會直接匹配 'World' 這個文字
```
const regex = /World/;
const paragraphOne = 'Hello World !';
regex.test(paragraphOne); //true
//匹配成功，因為字串裡含有 'World'字符

const paragraphTwo = 'Hello John !';
regex.test(paragraphTwo); //false
//匹配失敗，因為字串不包含任何 'World' 字符
```

### 2. 特殊字元
需要搜尋較複雜的規則時使用，例如中華民國的身分證字號格式為：

1. 開頭為一個大寫英文字母 `/^[A-Z]/`
2. 數字第一位為 1 或 2 `/[12]/`
3. 後面為隨機八位數字 `/\d{8}/`

根據上述規則整理出以下正規表達式
```
const regex = /^[A-Z][12]\d{8}/;
const myId = 'A123456789';
const fakeId = 'D029482425';

regex.test(myId); //true
regex.test(fakeId); //false
```

## 小技巧

### 線上工具
- 有許多線上工具和教學可供學習和測試正規表達式，例如 [Regex101](https://regex101.com/) 。使用方法也相當簡單，非常適合練習和複習。

![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/68411dd0-91b1-46b9-a282-a0a1917562eb)

### 電子郵件地址(以下內容引用自[此文章](https://ithelp.ithome.com.tw/articles/10094951))
正確的 Email 格式會有以下規則：

1. 必須以一個以上的文字開頭
2. @ 之前，可以出現 1 個以上的文字與「-」的組合，例如 -abc-
3. @ 之前，可以出現 1 個以上的文字與「.」的組合，例如 .abc.
4. @ 之前，以上兩項以 OR 的關係出現，並且出現 0 次以上
5. 中間一定要出現一個 @
6. @ 之後，出現一個以上的大小寫英文及數字的組合
7. @ 之後，只能出現「.」或是「-」，但這兩個字元不能連續時出現
8. @ 之後，出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
9. @ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文

根據上述內容，我們可以整理出以下電子郵件格式
```
emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

// ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
// ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
// (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
// ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
// \@：中間一定要出現一個 @
// [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
// (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
// ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
// \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
```

## 參考來源
- https://zh.wikipedia.org/zh-tw/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
- https://5xruby.tw/posts/15min-regular-expression
- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions
- https://www.minwt.com/webdesign-dev/html/20352.html
- https://moojing.medium.com/javascript-%E5%88%9D%E6%8E%A2regex-%E6%AD%A3%E8%A6%8F%E8%A1%A8%E9%81%94%E5%BC%8F-1da2f4d94795
- https://ithelp.ithome.com.tw/articles/10094951
