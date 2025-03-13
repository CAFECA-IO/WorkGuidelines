## 開發過程中資料庫異常的標準作業程序（SOP）

### 一、情境一：`prisma.schema` 有改動且產生新的 migration 檔案，但資料庫尚未升級

**步驟：**
1. **確認異動**：
   - 檢查 git 記錄，確認 `prisma.schema` 變更內容。
   - 確認已產生新的 migration 檔案（`prisma/migrations` 內有新的目錄與 SQL 檔案）。

2. **備份現有資料庫**：
   - 立即進行資料庫備份，避免資料遺失。

3. **執行 Migration**：
   ```bash
   npx prisma migrate deploy
   ```

4. **檢查 DB 狀態**：
   - 確認 migration 已成功套用。
   ```bash
   npx prisma migrate status
   ```

5. **確認功能**：
   - 重新執行應用，確認資料庫運作正常。

---

### 二、情境二：`prisma.schema` 無變化、無新 migration 檔案，但資料庫 schema 發生改變

**步驟：**
1. **檢查資料庫異動原因**：
   - 檢查團隊是否有人手動調整資料庫。
   - 檢視 DB 管理工具（如 DBeaver 或 DataGrip）之 Schema 變動記錄。

2. **更新 Prisma Schema**：
   - 若資料庫 schema 異動合理且有效，執行 introspect 同步 schema。
   ```bash
   npx prisma db pull
   ```

3. **檢視 Schema 差異**：
   ```bash
   git diff prisma/schema.prisma
   ```

4. **生成 Migration（如需）**：
   - 若 schema 變更屬於未記錄的有效變更，建立新 migration。
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

5. **重新測試應用程式**：
   - 確認 Prisma client 與 DB Schema 同步運作無誤。

---

### 三、其他情境

**步驟：**
1. **記錄與分析錯誤訊息**：
   - 從錯誤日誌或 Prisma 報錯訊息中取得具體異常訊息。

2. **驗證環境一致性**：
   - 確認開發、本地、測試、部署環境之間的 Schema 和 migration 檔案是否一致。

3. **回復或同步 DB Schema**：
   - 若無法確認原因，考慮重建資料庫 Schema 或透過備份還原。
   - 透過 introspect 再次同步 Schema。

4. **建立團隊內溝通與回報機制**：
   - 異常發生後，團隊應及時記錄、檢討，避免相同問題再次出現。

---

以上步驟需團隊共同遵守，維持開發與部署環境間 Schema 一致性，降低異常風險。

