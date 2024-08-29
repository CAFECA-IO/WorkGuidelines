# 開立工作票｜Issue Creation

工作票，又名為工作單、issue、單子、任務、任務單、票...等。
所有要處理的任務都需要開立工作票。

## 開立工作票步驟

### 1. 於 GitHub 新增 issue
### 2. 輸入標題和敘述，敘述欄位不可空白
### 3. 選擇指定對象 Assignee，通常為自己
### 4. 選擇標籤 Labels，包含時數和種類
- 時數：在 **1** 至 **8** 等純數字的紅色標籤之中選擇一個，此為我們預計這張工作票會完成的時數，1表示為1小時，以此類推。
- 種類：工作票的種類。假設此張工作票會產出文件就選擇 documentation、會產出程式就選擇 enhancement。
### 5. 選擇專案 Projects，並指定狀態(Status)

- 選擇該工作票隸屬的專案，系統機器人會將狀態設定為 `Todo`，如果系統機器人未自動填入，再自行人工選取`Todo`，總之狀態欄位的值不可以為空。
- 請依情況更新狀態，狀態定義與變化流程請見下方標題【Status & Close date 欄位說明】。

### 6. 此張工作票如果有產生 Branch 或 Pull Request，就在 Development 欄位綁定該分支和PR

### 範例：
![截圖 2024-01-03 下午3 02 20](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/4400173f-980d-459c-ac97-2fa739174037)


## Status & Close date 欄位說明

專案(Projects)中有兩個欄位需要填寫:
1. Status: 顯示此工作單的狀態
2. Close date: 顯示此工作單被關閉的日期


### Status 狀態欄位

**狀態欄位中各個狀態的意義:**
1. Proposal: 提議，可能被執行或被棄用的任務
2. Todo: 待辦
3. Weekly Plan: 預計於本週執行
4. Daily Plan: 預計於本日執行
5. Daily Review: 準備於本日例會中回顧的工作票
9. Weekly Review: 準備於週報中回顧的工作票
10. Done: 此狀態僅限 PM 使用
11. Won't Fix: 此工作票被棄用

**狀態變化流程:**
```
Proposal 
--> Todo 
--> Weekly Plan 
--> Daily Plan 
--> Daily Review 
--> Weekly Review && Close date: 今日日期 
--> Done (PM only)
```

1. 所有工作單的初始狀態為 `Todo`，表示為確定要執行的任務，但尚未確定何時執行。
2. 如果是不確定是否要執行的工作，可將狀態設定為 `Proposal`。
3. 在週報中我們規劃要在本週執行的工作單，並且把單子狀態設定為 `Weekly Plan`。
4. 每日上午在 Slack 頻道，我們宣告今天要執行的工作單，並將單子狀態改為 `Daily Plan`，表示此工作單今天執行。
5. 完成後將 `Daily Plan` 改為 `Daily Review`，表示此工作單要在本日例會中回顧。
6. 工作單於本日例會中回顧後，請點擊工作單下方按鈕【Close with comment】關閉工作單，系統機器人會自動將單子狀態改成 `Weekly Review`，表示此工作單要在例會的週報時間回顧，並且要記錄於週報內。
7. 點擊 Close 按鈕關閉工作單後，我們同時需要在 **Close date 欄位** 點選 _今日日期_。
  ![截圖 2024-03-06 下午4 03 33](https://github.com/CAFECA-IO/WorkGuidelines/assets/105651918/9abefeb1-8634-4cac-a070-b67775373b33)



## 工作票記錄花費時數

> [!IMPORTANT]
> 注意：每張工作單預計最長時數為 8 小時，如果超過 8 小時就請盡可能拆成各項子任務工作單，並在原工作單裡註記所有新開的工作單，讓他們彼此有關聯。

- 每次執行工作票，須於工作單中記錄花費時數：
![截圖 2024-01-03 下午6 08 21](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/b71f57d9-9fac-44d9-990e-c9dd2128ac6e)

- 如果當天尚未執行完，並且花費時間尚未超過預估時間，需要記錄已花費時數和剩餘時數：
![截圖 2024-01-03 下午6 00 31](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/e26b28c6-f9b8-4753-bc56-9fb82bde20bf)

- 如果執行超過一天，可以於最後完成時，計算此張工作票的總花費時數：
![截圖 2024-01-03 下午6 07 20](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/9c1bb256-e506-4366-99c7-3b5e6e3a3579)
（像這張單子最後總計有 24 小時，已超過 8 小時，建議一開始就拆成多個子任務工作單）

#### 💡小技巧 : 主任務工作單 (此部分僅供參考，這沒有一定要這樣做)

假如一開始就知道這個任務會有花費很多時間的話，我們可以建立一個主任務工作單來管理子任務。

參考範例 : [[MainTask] 機器人聊天室chat-bot-lizzz #356](https://github.com/CAFECA-IO/BAIFA/issues/356)

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/0cf32954-5cef-40c0-9541-c0d6286b6607" alt="#356截圖1/2" width="60%">


## 工作票棄用

工作票無法自行刪除，如果有工作票要被棄用，需要依照以下流程進行工作票棄用。

### 開發人員（除了 PM 以外）的步驟：
1. 在工作單上記錄棄用原因
2. 工作單最下方的 Close 按鈕右側有個選單，打開來點選【Close as not planned】，按鈕會出現灰色圖示，接著再按下【Close issue】。
3. 將 Labels 裡面所有的標籤全部移除，只選擇 `wontfix`

<details><summary>截圖示範</summary>
<p>

**第一步＆第二步：**

<img src="https://github.com/user-attachments/assets/d8c51243-836b-4337-b65b-0e653592191d" width=720 />

**第二步接續：**

<img src="https://github.com/user-attachments/assets/b14fabb8-7824-46be-be23-4d346321ed11" width=720 />

**第三步：**

<img src="https://github.com/user-attachments/assets/5d6b3932-e6a6-4ce6-b8d9-e12b70812b94" width=720 />


</p>
</details> 



### PM 專屬的步驟：
1. 將工作單的 Assignees 清空
2. 將 Projects 的狀態改為 Won't Fix

<details><summary>截圖示範</summary>
<p>

**第一步：**

<img src="https://github.com/user-attachments/assets/6fa21e49-4726-4252-bc54-45bfba8f568a" width=720 />

**第二步：**

<img src="https://github.com/user-attachments/assets/f888ed12-8b77-492f-b5e5-fcd53f53b442" width=720 />


</p>
</details> 
