# Crisis Management Manual 危機處理手冊
## 應對方法
- 系統關閉
- 緊急下架
- 緊急封鎖
- 帳號凍結
- 強制執行
- 資產回收
- 資產賠償

### 系統關閉

### 緊急下架

### 緊急封鎖

### 帳號凍結

### 帳號凍結

### 強制執行
- 強制取消掛單
  - 需撰寫危機處理報告並記錄執行時間與內容
  - 危機處理報告需記錄強制取消原由
  - 危機處理報告需記錄相關事證
  - 強制取消方法
以 member_id: 4724, order_id: 391839558 的委託為例: 用 19919.235 在 OKX 上買 1.47 個 BTC。
1.  ++ TODO 若此筆委託未被撮合，需要在 OKX 上取消
2. 更新系統內該筆委託單狀態
```
UPDATE
	orders
SET
	state = 0,
	updated_at = NOW()
WHERE
        id  IN(391839558);
```
3. 新增 account_version 紀錄取消的委託需要更新用戶餘額及原因等
```
INSERT INTO account_versions (id, member_id, account_id, reason, balance, locked, fee, amount, modifiable_id, modifiable_type, created_at, updated_at, currency, fun)
		VALUES(DEFAULT, 4724, 859507, 610, 29281.27545, -29281.27545, 0, 27919.080972, 391839558, 'Order', NOW(), NOW(), 34, 1);
```
4. 更新用戶餘額（將用戶餘額恢復成掛 order_id: 391839558 的委託之前的餘額）
```
UPDATE
	accounts
SET
	balance = 27919.080972,
	locked = 0,
	updated_at = NOW()
WHERE
	id = 859507;
```
