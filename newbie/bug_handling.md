# Bug Handling Working Guidelines
![Bug Tracking](https://user-images.githubusercontent.com/114177573/233570941-9a451e8f-a8aa-4e53-97e6-9e92ed93a581.jpg)

## Bug Reporting
- [Format and Sample](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/issue-format.md)

## Bug Tracking
### Standard Operation Procedure
1. 現象分析：分析問題
   - 連接錢包時，Send Request Button 點擊了卻沒有反應
   
2. 事件程式碼起點識別：尋找出錯的程式碼位置
   - 找到 signature_process_modal.tsx
   
3. 涉及設計程式碼羅列：分析這段程式中的關鍵步驟(分析 function 的執行內容)
   - i. requestSendingHandler
   - ii. locker.lock()
   - iii. userCtx.connect()
   - vi. userCtx.signServiceTerm()
   
4. Code Review：回顧剛剛整理的關鍵步驟，找出有瑕疵的流程
```
if (!lock()) {
  // 我們真的不打算讓使用者點擊嗎？
  return; // 沒有成功上鎖，所以不執行接下來的程式碼
}
```
5. 設立檢查點：在程式中設立檢查點，縮小 review 範圍直到找到錯誤原因
```
if (!lock()) {
  // 我們真的不打算讓使用者點擊嗎？
  console.log('check point 1');
  return; // 沒有成功上鎖，所以不執行接下來的程式碼
}

if (!userCtx.isConnected) {
  // It's a cycle
  try {
    setConnectingProcess(ConnectingProcess.CONNECTING);
    console.log('check point 2');
    const connectResult = await userCtx.connect();
     console.log('check point 4');
  } catch (e) {
    console.log('check point 3');
    // Info: 用戶拒絕連線，不會造成錯誤，如果有錯誤就是 component 跟 context 之間的錯誤
    // ToDo: Report the error which user rejected the signature in UserContext (20230411 - Shirley)
  }
  ...
```
6. 確認錯誤原因：將找出的錯誤原因記錄到 bug issue 上
7. 例外處理優化：程式出錯時應有try catch

## Bug Fixing
- 根據 bug issue 的紀錄修復問題，再按照 Bug Reporting 的步驟跑一次流程，確認問題沒有再現後， bug 的修復就完成了。
