# 試算表 Debug SOP

本 SOP 用於協助後端開發人員有效定位並修復試算表 (Trial Balance) 相關問題，包含建立測試環境、驗證資料與埋設日誌等步驟，確保問題能被徹底排查和解決。

---

## **1. 建立驗算資料**

在進行 Debug 前，需建立標準化的測試資料以模擬實際情境。

### 測試資料
- **Company ID**: `10000007`
- **User ID**: `10000006` （此用戶具有存取權限）
- **Role ID**: `1003`（該角色對應的權限設定）
- **Voucher 總數**: 18 張
- **試算結果**:
  - 借方：1,313,296
  - 貸方：1,313,296

### 操作步驟
1. 使用測試資料庫初始化上述數據。
2. 若無法直接初始化，應確保程式能正確讀取這些測試資料。

---

## **2. 設置測試環境**

測試環境應該能模擬實際環境中的 Session 資訊，確保相關 API 測試的穩定性。

### 修改 Session 設定
修改 `src/utils/session.ts` 中的 `getSession` 方法以返回固定的測試 Session：

```typescript
// export const getSession = nextSession(options);
export const getSession = () => {
  const session = {
    userId: 10000006,
    companyId: 10000007,
    challenge: 'challenge',
    roleId: 1003,
  };
  return session;
};
```

**注意**：
- 修改完畢後，請確認測試環境的 Session 是否正常應用到 API。
- 測試結束後，務必將此段程式碼還原，避免影響正式環境。

---

## **3. 確認相關 API 測試結果**

### **3.1 試算表 API**
- **API**: 
  ```
  http://localhost:3000/api/v2/company/10000007/trial_balance?startDate=1734710400&endDate=1734796799&page=1&pageSize=99999
  ```
- **目前結果**:
  - 借方：1,313,186
  - 貸方：1,313,186
  - 問題分析：發現科目 `10001469` 借方 100 + 10、貸方 100 + 10，因會計科目被刪除導致數據缺漏。
- **修正建議**:
  - 修改邏輯，即使會計科目刪除，仍應列出該數據，並使用科目 ID 作為代稱。

### **3.2 總分類帳 API**
- **API**:
  ```
  http://localhost:3000/api/v2/company/10000007/ledger?startDate=1704038400&endDate=1734796799&startAccountNo=&endAccountNo=&labelType=general&pageSize=99999
  ```
- **目前結果**:
  - 借方：496,985
  - 貸方：1,369,819
  - 問題分析：借方少 816,201，貸方多 56,633。
- **修正建議**:
  - 逐步分析 API 中的資料來源，檢查是否存在數據錯誤或遺漏。

---

## **4. 嘗試分析並還原數據**

嘗試分析並還原問題科目 (`10001469`) 的數據。

### **4.1 邏輯驗證**
1. 確認數據是否正確記錄：
   - **借方 (debit)**: 是否存在數據被漏記？
   - **貸方 (credit)**: 是否存在數據被多記？

2. **比對原始資料**：
   - 檢查該科目相關的 Voucher、LineItem 等資料是否正確。

---

## **5. 埋設日誌進行 Debug**

### **5.1 檢驗 Voucher 清單一致性**
檢查 `initializeAccountBook` 初始化後的 Voucher 數量：
- **目前情況**:
  - `initializeAccountBook` 取得 47 筆。
  - 僅匯入 42 筆。
  - 缺少的 5 筆為科目 `10001469`，其 LineItem 借方為 `100`、貸方為 `110`。
- **修正建議**:
  - 加入日誌，記錄每筆 Voucher 的過濾條件與處理邏輯。

### **5.2 檢驗各科目數據**
1. 檢查每個科目的數據是否正確加總。
2. 針對異常科目 (`10001469`) 添加額外的日誌。

### **5.3 檢驗加總結果**
- 確保試算表中的借方與貸方加總一致。
- 如果存在不一致情況，記錄影響的數據範圍及原因。

### **日誌範例**
在需要埋設日誌的地方，記錄完整上下文資訊：
```typescript
logger.info({
  step: 'initializeAccountBook',
  voucherId: voucher.id,
  lineItems: voucher.lineItems,
  message: 'Check Voucher consistency',
});
```

---

## **6. 綜合檢查與修正**

完成上述 Debug 步驟後，對系統進行以下操作：

1. **確認所有問題是否已被修正**。
2. **重新測試相關 API**，確保試算表與總分類帳結果正確。
3. **記錄修正過程與結論**，將問題與解決方案同步至團隊。
