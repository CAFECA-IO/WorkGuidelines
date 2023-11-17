# 針對重複取消造成的TideBit 對沖 OKX 異常調查 SOP

## 檢查流程
目前造成異常的原因主要是由於**重複取消**造成的，所以以排查這個異常寫著這個調查的 SOP。

1. 查詢用戶不能掛單的交易對目前所有 pending 中的訂單，並將查詢結果以csv檔儲存，可以使用如下的 SQL 語法查詢:
```sql
SELECT
	*
FROM
	orders
WHERE
	member_id = <member_id>
	AND currency = <currency>; -- BTC-USDT = 201, ETH-USDT = 202
	AND state = 100; -- canceled = 0,done = 200, wait = 100
```

2. 如果是取消掛單異常需要額外檢查在 outer_orders 及 outer_trades 裡面這邊訂單是否已經被撮合，outer_orders 跟 order 的 id 是一一對應的，可以使用如下的 SQL 語法查詢:
outer_orders
```sql
SELECT
	*
FROM
	outer_orders
WHERE
	id = <order_id>;
```
outer_trades
```sql
SELECT
	*
FROM
	outer_trades
WHERE
	order_id = <order_id>;
```

2. 檢查用戶餘額跟 account_version 是否一致（如果不一致就是由 **重複取消** 以外的錯誤造成的，要參考 **例外處理** ），可以使用如下的 SQL 語法查詢:
```sql
SELECT
  account_id,
  member_id,
  currency,
  sum(balance) as sum_balance,
  sum(locked) as sum_locked
FROM
  account_versions
WHERE
  member_id = <member_id>
  GROUP BY account_id
  ;
```

3. 分別查詢用戶不能掛單的交易對對應的 baseUnit 及 quoteUnit 歷史以來的 accountVersions，並將查詢結果以csv檔儲存，可以使用如下的 SQL 語法查詢:
```sql
SELECT
	*
FROM
	account_versions
WHERE
	member_id = <member_id>
	AND currency = <currency>; -- btc: 2, eth: 3, usdt: 4
```

4. 打開下載下來的 account_versions csv檔，account_versions 裡面紀錄的是什麼原因造成這個帳號餘額(balance, locked) 變化了多少，紀錄的是變化量，
   想要知道這個變化之後的當下這個帳號的餘額(balance, locked) 是多少，要透過計算的值，在 balance, locked 後面分別新增一個欄位，以f2、f3、f4 的計算為例，f2 為初始值等於 e2，f3 的值為
   變化之前的值 f2 加上 變化量 e3，f4 的值為變化之前的值 f3 加上 變化量 e4，以此類推。
<img width="1413" alt="Screenshot 2023-11-17 at 5 02 00 PM" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/17249354/fe40f833-254e-48c5-8184-365f0d66ba1b">

5. amount 這個欄位紀錄的是變化後這個帳號的總餘額，在 amount 這個欄位後面新增一個欄位，驗算算每個 account_version 紀錄當下的 amount，可以通過加總 current_balance、current_locked 得到，
   然後這個欄位計算出來的結果如果不等於 amount 這個欄位的值就是有異常，就要進一步調查造成這個異常的 account_version。
<img width="1399" alt="Screenshot 2023-11-17 at 5 02 23 PM" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/17249354/9ad21884-cf0e-4a7d-81c7-951b11fe7356">

6. 要找出重複取消的訂單，如果有兩筆 account_versions 的 modifiable_id 一樣且同時符合取消訂單條件及為重複取消的訂單，找到重複取消的訂單，即可開始異常處理。
   6.1 符合下列條件的為取消訂單 reason: 610, modifiable_type: Order, amount < 0, locked > 0, amount * -1 === locked
   （這邊檢查之所以這麼複雜是因為之前有一個版本把掛單的 reason 錯誤紀錄成 610，原本掛單的 reason 為 600)


## 異常處理

## 用戶因重複取消導致要取消的訂單所對應的帳號中locked餘額不足

### 針對 order 重複取消的處理:
```sql
INSERT INTO account_versions (id, member_id, account_id, reason, balance, locked, fee, amount, modifiable_id, modifiable_type, created_at, updated_at, currency, fun)
		VALUES(DEFAULT, <member_id>, <account_id>, 1, <balance>, 0.44845, 0, 0.2455674, 37091, 'Audit', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 2);
```
### 針對 order(id: 419293835) 取消的處理:
新增 account_version
```sql
INSERT INTO account_versions (id, member_id, account_id, reason, balance, locked, fee, amount, modifiable_id, modifiable_type, created_at, updated_at, currency, fun)
		VALUES(DEFAULT, 669, 2956, 610, 0.694017, -0.694017, 0, 0.2455674, 420283053, 'Order', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3, 1);
```
order 更新
```sql
UPDATE
	orders
SET
	state = 0,
	updated_at = CURRENT_TIMESTAMP()
WHERE
	id = 420283053;
```
account 更新
```sql
UPDATE
	accounts
SET
        balance = 0.2455674,
	locked = 0,
	updated_at = CURRENT_TIMESTAMP()
WHERE
	id = 2956
LIMIT 1;
```

### 系統損失
- 相當於我們自行吸收用 1989.31 USDT per ETH 賣 0.694017 eth，得到 1380.61495827 usdt。


