- [**前端開發時程規劃與開票的標準作業程序（SOP）**](#前端開發時程規劃與開票的標準作業程序sop)
  - [**估算時程所需資料**](#估算時程所需資料)
    - [Must have](#must-have)
    - [Better have](#better-have)
  - [前端開發步驟分法](#前端開發步驟分法)
    - [先刻畫面再串接資料的步驟規劃](#先刻畫面再串接資料的步驟規劃)
  - [**估算時程的步驟**](#估算時程的步驟)
  - [**開票**](#開票)

# **前端開發時程規劃與開票的標準作業程序（SOP）**

## **估算時程所需資料**

### Must have

在開始估算時程之前，需確保已經收集以下資料：

1. **系統架構書**: 了解整體系統需求。
2. **Wireframe**: 提供大概的頁面布局和元素配置的視覺指引，可與 UML 相互對照。
3. **Class Diagram**: 詳述各類別的屬性和方法，描述 Context 裡資料的定義跟關係。
4. **Component Diagram**: 顯示前端組件間跟 Context 的關聯和互動。
5. **Sequence Diagram**: 描述功能流程和組件間的交互順序。

### Better have

1. **Mockup**: 了解詳細的頁面細節，可以在刻畫面的時程上有更精準的規劃。

## 前端開發步驟分法

可以將前端開發種類大方向分為

- 畫面
- 資料

其中畫面又分成桌面版跟行動版，再依照設計各自分為靜態跟動態，資料又可分為定義型別跟 dummy data、data from mock API、data from real API and WebSocket

### 先刻畫面再串接資料的步驟規劃

1. 初始化專案：建立專案的基礎建設，包含程式碼規範、precommit、專案架構等等
2. 頁面關係跟刻畫面：依照 component diagram 定義的組件關係去開發組件，並按照 mockup 刻出桌面版、行動版的靜態畫面跟動態畫面，畫面資料暫時用 component 裡面自定義的 dummy data
3. 初始化 contexts：初始化所有 class diagram 規劃好的 contexts，包括在 contexts 裡面定義各自的資料跟 function，其中的初始化 worker，需要寫好對應處理 API 跟 WebSocket 的邏輯才算完成
4. 定義型別跟 dummy data：在某個資料夾下集中定義資料型別跟產生對應的 dummy data，並且在 Context 這邊導入對應的資料跟 function，替換 context 自定義的 data，讓 component 存取 context 裡的資料或 function 來渲染畫面，替換 component 自定義的 data
5. 創造並連接 mock API：依照 class diagram ，寫出對應的 mock API，並透過 worker 提供的方法調用 API，讓其餘的 context 拿到 API 資料並且各自處理及儲存，需要跟後端互動(post / put)時，也透過 worker 的方法來互動，這一步跟第三步的主要區別在於測試 API 連線及進行相關例外處理
6. 連上真實 API 跟 WebSocket：如果沒有跳過第五步，這個階段主要是看 WebSocket 的連線及相關例外處理，以及看後端回傳的 API 跟 WebSocket 資料是否符合需求，這一步注重與後端的溝通跟協調

## **估算時程的步驟**

跟隨以下步驟來估算前端開發的時程：

1. **分析系統架構和 Wireframe 和 Mockup**:
   - 確定每個頁面或功能的複雜度。
   - 考慮 UI/UX 設計的細節程度。
   - 估計 components 的桌面版、行動版的靜態畫面跟動態畫面的執行時間。
2. **評估組件和類別需求**:
   - 根據 Component 和 Class Diagram，辨識所有必要的前端組件。
   - 建立和整合這些組件所需的時間。
     - 初始化 context
     - 定義型別跟 dummy data
3. **定義功能流程**:
   - 使用 Sequence Diagram 確定各個功能的實現步驟。
   - 評估實現每個步驟所需的時間。
     - 創建跟連接 mock API
     - 將 context 跟 component 連接起來
     - 連接真實的 API 跟 WebSocket
4. **整體時程規劃**:
   - 將以上估計的時間加總，考慮必要的緩衝時間。
   - 分配時間給不可預見的挑戰和問題解決。
5. **建立詳細的時程表**:
   - 使用表格或專案管理工具明確地列出每個任務和相對應的時間。
   - 確保時程表具有彈性以應對變動。

時程表可參考[範例](https://docs.google.com/spreadsheets/d/1fe66z8XQebjy6l6a7IKOdNPFss5lLJGQJekMbqLu3sY/edit#gid=131886607)，將開發項目依照總類拆成細項放在第一欄，然後每個項目需要不同的執行步驟則放在第二列，對應到的數字就是該項目的特定步驟所需的執行時間
![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/27436ced-32de-4552-96c6-41b4dc1c4cdb)

## **開票**

開票可以依照規劃時程表的項目跟步驟去開，呈上圖，可以開出 `init worker context - 8 pt` 的票，以此類推開下去，並且可以在該步驟的右邊開出一欄 GitHub issue 紀錄對應的票

<img width="1014" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/4f08b6b8-868b-4bdb-9d19-ca5d9ea01733">
