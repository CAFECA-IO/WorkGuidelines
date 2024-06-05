# Next 專案

## `/page` 型態專案
- 在Next 的 `/page` 型態專案 底下，請將api放置在 `/page/api` folder之下
- 如果有database 的操作，需要將其從`api名稱.ts`中額外拉出去到`api名稱.repository.ts`，這是因為javascript在測試時候會有的限制，database需要在另一個檔案中，`api名稱.ts`才可以用 `haveBeenCallWith`做測試
- 每個 `ts`檔需要新增一個`.test.ts`黨做單元測試
