# **開發規格文件撰寫｜Development Specification Document Writing**
💡2024/1/9：團隊統一使用 Figma 作為畫圖工具

- [Persona（人物誌）](#persona人物誌)
- [User Story（使用者故事）](#user-story使用者故事)
- [User Journey Map（使用者旅程地圖）](#user-journey-map使用者旅程地圖)
- [Wireframe & Mockup（線框圖 & 視覺稿）](#wireframe--mockup線框圖--視覺稿)
- [UML](#uml)
  - [Class Diagram（類別圖）](#class-diagram類別圖)
  - [Component Diagram（元件圖）](#component-diagram元件圖)
  - [Sequence Diagram（循序圖）](#sequence-diagram循序圖)
- [DB schema (ER-D)](#db-schema-er-d)
- [API Document](#api-document)
- [Error Code Documentation](#error-code-documentation)

## Persona（人物誌）

**Persona** 是觀察系統的目標客群（TA），分析他們的共同特性而建立出的虛擬角色。它包括系統用戶的特徵、需求、喜好和挑戰等，以幫助開發團隊更好地理解目標用戶的需求。

Persona 的建立沒有一個固定的數量，這取決於目標客群和專案的複雜度。 如果目標客群非常多樣，擁有不同的需求和特徵；或是專案涉及的產品或服務有多個功能或模組，提供不同的用戶使用，那就需要建立多個 persona 以更全面地涵蓋這些差異。

- 建立 persona 的四個步驟：
    1. **名字**：幫 persona 取個名字，也可以附上大頭照
    2. **特徵**：性別、年齡、喜好、個性、職業、居住地等。角色輪廓越清晰越好
    3. **目標**：persona 使用產品的具體目標和期望？為了滿足何種需求？
    4. **痛點**：persona 面臨的具體問題或挑戰？藏在心裡的痛點是什麼？
- 範例：

![persona01](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/3aa3c1c2-c483-46b0-b875-6b673c6addb3)

![persona02](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/3877cb2f-4c06-49d7-a4cc-82ff61399a83)

更多介紹[請點我](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/UX/persona-and-empathy-map.md)

## User Story（使用者故事）

**User Story** 是從**不同的**用戶視角描述對系統的功能需求，其內容須涵蓋三個重點：

1. who? 誰在使用？
2. what? 做了什麼？
3. why? 為什麼？

User story 除了讓開發團隊更理解用戶的需求，確保開發團隊始終保持以用戶為中心的開發方向。也促進開發團隊、產品擁有者和其他利害關係者之間的共識，有助於改善 UI 和整體設計。

一般來說，撰寫 user story 不需要包含太多細節，形式通常為簡單的一句話。

- User story 的格式：

```
💡 As a [persona], I want to [do something], so that [benefit].
```

```
💡 作為 [某種角色], 我想要 [做某些事], 以便 [達成某種目標]。
```

- 範例：

```
As a 'active trader', I want to 'do analysis as more efficient as I can', so that 'I won’t miss the good opportunity to earn money'.
```

```
As a 'government worker', I want to 'verify that the data I collects is accurate and secure', so that 'I can finish my job more efficiency and accuracy'.
```

## User Journey Map（使用者旅程地圖）

**User Journey Map** 是單一使用者與產品互動的整個過程（使用者旅程）的視覺化呈現，將使用者在過程中經歷的不同階段畫在時間軸上。分析使用者在每個步驟的感受、需求和痛點，以及這些元素隨著時間的推移如何變化。

使用者旅程地圖有助於團隊站在用戶角度思考真正的需求，並從關鍵的問題點找出解決方案。

- 繪製 user journey map 的大致流程：
    1. 決定**使用者**：決定從哪個 persona 的視角繪製
    2. **步驟**：將大致的步驟依順序畫在圖上，當作時間軸
    3. **行動**：試想這個 persona 會如何行動，畫在圖上
    4. **接觸點**：畫出用戶與產品互動的具體接觸點，如網站、應用程式、客服等
    5. **思考**：想像 persona 會如何思考，將可能遇到的問題或痛點記錄於此
    6. **情感曲線**：想像 persona 的情緒起伏，並繪製成曲線
- 範例：

![user journey map](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/9922a176-af97-416f-a107-955b6800afa1)

## Wireframe & Mockup（線框圖 & 視覺稿）

- [Low-fidelity Wireframe](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/UX/low-fidelity-wireframe.md)
- [High-fidelity Wireframe](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/UI/high-fidelity-wireframe.md)

## UML

### Class Diagram（類別圖）

根據設計稿，思考前端畫面的 component 如何與後端互動。具體來說，就是整理 API 需要哪些資料、interface（接口）應該是什麼樣的、以及 useContext 需要存放哪些內容。

規劃出類別（class）、屬性（attribute）、方法（method），並把它們之間的關聯性整理在 class diagram上。 

- 範例：

![class diagram - Page 1 (3)](https://user-images.githubusercontent.com/17249354/209104999-3f9dc995-67d0-4461-b704-4c3d94fa8fb9.jpeg)
### Component Diagram（元件圖）

根據設計稿，規劃系統中的各個組成部分（元件），並將彼此間的相依關係繪製出來。

閱讀元件圖對於使用者而言，能更清楚軟體的架構；對開發團隊而言，能幫助開發人員辨識元件的可再利用性，也就是該元件是否能在其他地方重複使用，避免一直建構出功能重複的元件。

- 範例：

![ASICEX Component Diagram - General data](https://github.com/CAFECA-IO/ASICEX/assets/114177573/6db663a4-431d-4e27-a14b-63cd1fd14540)

### Sequence Diagram（循序圖）

完成 class diagram 和 component diagram 後，就能開始規劃 sequence diagram。這是描述物件在**時間序列**中的訊息交換活動，顯示它們如何透過訊息溝通完成特定的功能。

循序圖可以清晰地表達系統中各對象（可能是物件或使用者）之間的交互和行為，使開發人員能更直覺地理解系統的運行流程。

- 範例：

<img src="https://github.com/CAFECA-IO/Documents/assets/114177573/0a9ed919-5a6b-411c-a198-638d31cd46cc" alt="ASICEX121" width="50%" height="50%" />

## DB schema (ER-D)

有了前端的 UML 圖後就可以開始設計 DB 了。整理出 DB 的資料表和欄位設計，並將系統中實體間的相互關聯繪製成 ER Diagram （實體關係圖）。

- 設計 DB schema 的大致步驟：
    1. 閱讀前端的 API 需求，思考 DB 的大致規格
    2. 確認屬性類型、命名是否符合[命名規範](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md)等
    3. 進行資料庫正規化
    4. 繪製圖表

> 需要注意的是：使用不同的資料庫，正規化的程度會有所不同。如果使用的是 RDB，就需要進行到 3NF；而 NoSQL 的設計較為彈性，因此沒有這麼嚴格的要求。

DB 文件中需要定義屬性的名稱、類型、簡短的描述、是否必要以及索引。

- 範例：

| 屬性名稱 | 屬性類型 | 描述 | 是否必要 | 索引 |
| --- | --- | --- | --- | --- |
| _id | ObjectId | 資料唯一識別ID | 是 | PK |
| user_address | ObjectId (ref: User) | 使用者地址的參考ID | 是 | FK |
| currency | string | 貨幣類型 | 是 |  |
| available | string | 可用餘額 | 是 |  |
| locked | string | 鎖定餘額 | 是 |  |
| block_number | number | 區塊編號 | 是 |  |
| created_at | number | 記錄創建的時間戳 (秒) | 是 |  |
| updated_at | number | 記錄更新的時間戳 (秒) | 是 |  |

接下來繪製 ER Diagram 。屬性列在實體框中，用線條相連表示彼此間的關係，並標註關係的型態（一對一、一對多、多對多等）。外鍵可以用箭頭指向被參照的實體表示。

- 範例：

<img src="https://user-images.githubusercontent.com/17249354/232969238-b1646c7e-1f39-4698-b663-44bf5f55a758.png" alt="ERD" width="50%" height="50%" />

## API D**ocument**

API 文件是用來記錄 API 的詳細資訊(包括功能、參數、回傳值等)，幫助前端開發人員了解每支 API 的操作指南。它會記錄在每個專案的 wiki 中，讓開發人員可以快速查閱。以 iSunFA 的 API 文件作為範例：

![截圖 2024-06-05 下午2 54 27](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/9a6b4ab9-b298-4d29-baf8-a67e3d088f09)

![截圖 2024-06-05 下午2 56 12](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/ceac570d-c78e-4028-90a0-fcfbb5a77e5f)

![截圖 2024-06-05 下午3 07 17](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/89600871-b074-4ea5-9b5a-fb97d90a1fa4)


### 版本號

用來區分不同版本的 API，讓前端開發人員知道應該使用哪個版本的 API。

### 編號

每個專案會有個別的編號規則，新增 API 前請先參閱目錄和編號規則，避免跳號或重複編號。

### 目錄

API 文件的開頭和側欄會有所有 API 的目錄，新增 API 時記得這兩處也要加上。標題有規定的格式：

![截圖 2024-06-05 下午3 44 53](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/eec42ccb-ef8c-4d2c-9346-ca0ef842e666)

- API 編號：如前述。
- HTTP 方法和 URL：說明 API 的請求方法(GET, POST, PUT, DELETE)和 URL，其中也包含所需的請求參數。
- 設計稿編號：需紀錄 API 功能對應的設計稿編號，可以在畫面的右上角找到：
    
![截圖 2024-06-05 下午3 53 08](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/2f2d15b4-ee56-4586-99f7-d63a51f38ecc)

### 內容

API 的內容說明也有規定的格式，請參考以下：

# API Example

- description: some description

## Request

### Request URL

```tsx
GET /example
```

### Parameters

| name | type | description | required | default |
| --- | --- | --- | --- | --- |

### **Query**

| name | type | description | required | default |
| --- | --- | --- | --- | --- |

### **Headers**

| Name | Type | Description | Required |
| --- | --- | --- | --- |

### **Body**

| Name | Type | Description |
| --- | --- | --- |

### Request Example

```tsx
GET /example
```

### **Body** Example

```json
{
    "id":"example"
}
```

## Response

### Response Parameters

| name | type | description |
| --- | --- | --- |

### Response Example

- 成功的回傳

```json
{
    "powerby": "ISunFa api 1.0.0",
    "success": true,
    "code":  "00000000",
    "message": "example",
    "payload": "example",
}
```

- 失敗的回傳

```json
{
    "powerby": "ISunFa api 1.0.0",
    "success": false,
    "code":  "09000000",
    "message": "fail request",
    "payload": null
}
```

格式說明：

- **Request URL**：API 的請求方法和 URL
- **Parameters**：記錄每個請求參數的名稱、類型、描述、是否必填以及預設值
- **Query**：記錄每個查詢參數的名稱、類型、描述、是否必填以及預設值
- **Headers**：記錄 Headers 的名稱、類型、描述、是否必填
- **Body**：記錄 Body 的接口格式，應和前端的 interface 保持一致
- **Request Example**：一個可以成功回傳的請求示例
- **Body Example**：一個可以成功回傳的 Body 示例
- **Response Parameters**：記錄回傳的接口格式，應和前端的 interface 保持一致
- **Response Example**：這裡應記錄成功和失敗的回傳示例

```
⚠️ 請注意：調整 API 文件前請先告知你的工作夥伴，以免多人同時操作導致編輯內容丟失！
```

## Error Code Documentation

Error Code 文件是 API 文件的一部分，用於記錄 API 在各種情況下返回的錯誤代碼，以及這些代碼的分類和簡短描述。讓前端開發人員知道捕捉到錯誤時，應該作何處理。

範例格式如下：

## Error Code Example

### success

| code | description |
| --- | --- |
| 00000000 | success |

### API

| code | description |
| --- | --- |
| 10000000 | server error |
| 10000001 | invalid input |

錯誤代碼的規則依據各個專案有所不同，不過一般情況下，前兩到三位代表錯誤的分類。以上述範例來說，開頭 `000` 是回傳成功、`100` 則是和 API 有關的錯誤。

最後四位代表具體的編碼，將各個錯誤代碼從 0000~9999 依序編號。 所以 `10000000` 表示這是 API 的錯誤 ，編號為 0000。
