# 品質管理｜ Quality Management

## 品質管理的定義

品質管理是一種組織內部的系統和流程，旨在確保產品或服務達到一定的標準和客戶期望。
在不同領域的品質管理有不同的流程和作法，這篇文針對的是在軟體開發領域的品質管理，又稱為軟體品質管理 (Software Quality Management, SQM)。

## 軟體品質管理的運作方式是什麼？

通常，SQM 活動可分為三個主要組件：品質保證 (Quality Assurance, QA)、品質計劃 (Quality Planning, QP) 和品質控制 (Quality Control, QC)。

### 1. Quality Planning (QP)

此階段集中在全面的品質管理實踐或特定專案上。

專案層面的品質計劃應包括：

- 利害關係人的品質保證角色和責任。
- 軟體應遵循的需求規格和標準。
- 測試和測試文件的相關類別。
- 測試進度、成本和所需資源的估算。
- 測試指標、KPI 等。

> 簡單來說，品質計劃 (QP) 包括定義在整個軟體開發生命週期中將使用的品質標準、流程和指標。這包括設定目標，並確定實現這些目標所需的資源。

### 2. Quality Assurance (QA)

在此階段，您可以建立一套組織程序的結構良好且協調一致，確定軟體開發標準以及監管程序，有助於增加生成優質軟體的可能性。

此階段可能包括：

- 確定任何適用的軟體開發標準。
- 執行常規步驟，如品質審查。
- 對過程中的測試資料執行記錄步驟。

> 簡單來說，品質保證 (QA) 是一種系統地監控和評估用於創造產品的各種流程的過程，以確保最終輸出符合指定的品質標準。這通常涉及進行審查 (reviews)、檢查 (inspections) 和審計 (audits)。

### 3. Quality Control (QC)

品質控制團隊測試並審查產品是否符合組織和專案層面的品質保證標準和流程。此組件包括手動和自動化測試。
軟體品質控制更注重產品並可同時開始與開發過程。企業應實施敏捷品質管理，因為它加速測試過程，確保及早識別和解決錯誤，降低重做成本並提高客戶滿意度。

> 簡單來說，品質控制 (QC) 包括用於滿足品質要求的活動和技術。這包括測試軟體、識別錯誤並確保進行修正。其目的是在將軟體釋出給用戶之前識別並修復錯誤。

## 軟體品質管理的最佳實踐

### 1. 在規劃測試策略時考慮測試金字塔 (Consider Testing Pyramid in Planning Testing Strategy)

![Source: Semaphore](https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/b55cc562-ff4a-4fc9-9192-8368643c6196)

**測試金字塔 (Testing Pyramid)** 是一種流行的測試方法，表示應在應用程式架構的不同層次上創建的測試相對數量。
它包括三個層次：**單元測試、整合測試和端對端測試**。這種方法有助於在開發週期的早期識別錯誤，使它們更容易且成本較低地修復。

- **單元測試 (Unit tests) ：**
  小型、快速且獨立的測試，驗證個別元件 (individual components) 或代碼單元 (units of code) 的功能。
  數千個單元測試只需大約數分鐘來掃描函數 (functions)、類別 (classes)、方法 (methods) 或模組 (modules)。
  單元測試不必等到開發 UI，類似於[API 測試](https://blog.kms-solutions.asia/everything-you-need-to-know-about-api-testing)。

- **整合測試 (Integration tests) ：**
  使用資料庫 (databases)、單獨的服務 (separate services) 或檔案系統 (file systems) 驗證應用程式的行為。
  它們可以幫助檢測組合多個組件時出現的錯誤，例如不相容的介面或不正確的資料交換。

- **端對端測試 (End-to-end tests) ：**
  這些測試位於頂層，模擬使用者行為並測試整個應用程式的功能。
  在運行端對端測試之前，被測系統 (system-under-test, SUT) 需要達到一定程度的應用程式完整性。這包括點擊按鈕、輸入值並且等待應用程式顯示正確的資料。因此，自動化端對端測試是最繁重的測試步驟之一，也需要花費相當大量的時間來執行。

### 2. 自動化回歸測試 (Automate Regression Testing)

無論其重要性如何，每當程式碼發生變更，都需要進行回歸測試。在穩定階段的最後進行回歸測試週期是至關重要的，以確保先前正常運作的功能在開發變更時未受到影響。

團隊通常會面臨時間限制，因為大部分工作都專注於測試現有功能。相較於需要更多人工工作的領域，例如探索性測試以識別邊緣情境，通常會被快速處理。

由於回歸測試涉及重新執行先前已執行的測試案例，因此這類型測試最適合[自動化測試](https://blog.kms-solutions.asia/everything-you-should-know-about-automation-testing)。

自動化測試流程使團隊能夠有效地識別並選擇必要的測試案例，而無需每次都建立新的測試案例。透過安排測試套件在夜間執行，團隊可以在隔天得知需要修復的內容。這個過程可以在長期內節省大量時間和成本，讓測試人員能夠專注於更複雜和關鍵的任務。

### 3. 應用雲端測試環境 (Apply Cloud Test Environments)

雲端測試是利用雲計算資源和基礎設施進行軟體測試活動的實踐。這涉及利用基於雲端的平台和服務執行各種類型的測試，包括功能測試、性能測試、安全測試和相容性測試。

以下是雲端測試如何融入 Spotify 的 DevOps 工程文化的例子：

- 確保新的 Spotify 功能的想法和實驗能夠在不同平台和設備上有效運作，將需要大量投資於新機器。雲端測試環境通過提供基於訂閱的方法，允許客戶訪問包含最新設備的各種設備，解決了這個問題。因此，團隊只需等待供應商的開發團隊宣布環境的可用性，就可以開始測試。
  (這種訂閱式的方法意味著使用者直接透過訂閱服務來獲得對多樣化測試環境的存取權)

這種基於雲的解決方案不僅適用於像 Spotify 這樣的複雜、相互連接的 Web 音樂播放器，還適用於發展初期且預算緊張的企業。雲端測試環境有助於降低與測試相關的成本，因為它們消除了團隊為測試目的購買和維護自己的硬體和軟體基礎設施的需要。

雲端解決方案本質上將瀏覽器、設備和操作系統配置轉化為可重複使用的測試環境。

雲端測試的一些主要亮點包括：

- 單戶和多單戶部署測試應用程式
- 動態擴展以應對變化的工作量
- 測試數據的備份和還原，用於災難恢復
- 無成本的部署、主機、基礎結構/應用程式更新，以及提供給客戶的應用程式支援。

### 4. 模擬開發者環境 (Emulate the Developer Environments)

為了保護測試團隊和開發者免受應用程式性能不佳的影響，測試環境必須模擬開發環境。模擬開發者環境涉及創建一個與軟體開發環境相同或相似的測試環境。

在開發過程中，可以在模擬客戶環境的情況下，在多個生產場景中測試代碼。

這樣做的好處包括：

- **更準確的測試：** 通過在與開發者環境相似的環境中進行測試，測試人員可以更容易地識別可能在生產環境中發生的問題。這有助於更快速地識別和解決問題，從而產生更高質量的軟體。
- **增強開發和測試團隊之間的協作：** 通過在相同的環境中工作，開發者和測試人員可以更輕鬆地交流問題並共同解決。因此，錯誤可以更容易地被發現和解決。

### 5. 遵循敏捷測試流程 (Follow Agile Testing Process)

軟體品質流程的主要目標是儘早發現錯誤。在軟體開發過程中，錯誤越晚被發現，修復的成本就越高。在敏捷團隊中，開發者和測試人員並不是在固定的工作區域操作。

在[敏捷測試流程](https://blog.kms-solutions.asia/agile-testing-for-digital-team)中，測試任務被拆分成短暫的開發週期，通常由開發者和測試人員共同執行。即使在敏捷流程中，測試人員仍然發揮著至關重要的作用。自動化測試仍然是敏捷開發的核心，因為一個一致且迭代的測試流程對於建立無錯誤軟體來說是最確保的方法。

## 結論

本篇文章主要在蒐集 SQM 流程的相關資訊，包含流程以及名詞解釋。

在蒐集資料並且一邊試圖理解的同時，筆者產生了新的問題就是：「測試」是否被包含於「品質管理」的流程？又或者，「品質管理」除了「測試」以外，是否還有別的內容？

如果是的話，也許之後可以再寫一篇新的技術文章，蒐集並詳細介紹「測試」相關的資料。

## 資料來源

[Software Quality Management: How does It Work and Best Practices](https://blog.kms-solutions.asia/software-quality-management)

# 團隊現況

## 品質保證工作流程 (Quality Assurance Work Flow)

1. 測試案例 (Test Cases)
2. 測試報告 (Test Report)
3. 錯誤問題 (Bug Issues)

### 1. 測試案例 (Test Cases)

測試案例存放位置： `Documents/${Project}/testcases/${Document}`

例如 TBD 專案，測試案例的存放位置為: https://github.com/CAFECA-IO/Documents/tree/main/TBD/testcases

#### 定義包括:

- 需求規範 (Requirements Specification)
- 錯誤問題 (Bug Issues)

#### 基本資訊:

- 使用者情境 (User Scenario)
- 測試流程 (Test Flow)
- 檢查清單 (Check List)
- 注意事項 (Cautions)
- 待驗證問題清單 (To Be Verified Issues List)

### 2. 測試報告 (Test Report)

- 測試報告路徑： `EventReport/test_report/${Document}`
  例如：https://github.com/CAFECA-IO/EventReport/tree/main/test_report

- 測試案例結果(Test Case Result)路徑： `Documents/${Project}/testresult/${Document}`
  例如 TBD 專案，測試案例結果的存放位置為：https://github.com/CAFECA-IO/Documents/tree/main/TBD/testresult

### 3. 錯誤問題 (Bug Issues)

開立 Bug Issues 的格式如下:

- 測試環境 (Test Environment)
- 如何重現 (How To Reproduce)
- 異常描述 (Exception Description)
- 預期結果 (Expect Result)
- 參考資料 (Reference)

可以參考 [Bug 單範例](https://github.com/CAFECA-IO/TideBitEx/issues/1026)
