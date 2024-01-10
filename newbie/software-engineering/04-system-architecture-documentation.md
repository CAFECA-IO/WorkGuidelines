# 系統架構書

本文是根據過去撰寫過的系統架構書，整理出大致的文件格式並說明。基本上只有[系統概述](#壹、系統概述)和[需求規格](#貳、需求規格)是通用項目；其他項目不一定所有系統都有，所以非必要。

由於系統架構書沒有硬性規定的格式，開發人員可以參照本文，依實際情況新增或刪減內容。

> 以下內容以 [IPFS網頁生成引擎](https://docs.google.com/document/d/1CJeBum3cR5j7Jr5aExRWlXckVYAG-Qh_ndIwwIK3yBU/edit?usp=drive_link) 和 [ASICEX 系統架構書](https://docs.google.com/document/d/1jDg2fw-cn0Z-BapNCV_b0lTu6HVrJLdZnWu8g9sNNRk/edit) 為參考範例。

## 壹、系統概述

### 一、系統簡介

首先是系統簡介，包含系統正式名稱，以及簡述系統想達成的目標、採用的核心技術：
```
1. 系統名稱
  本服務名稱為「IPFS 網頁生成引擎開發服務」，以下簡稱為本服務。

2. 系統目標
  本服務的目標在於根據需求規格描述，實現一項便利維護的網頁生成引擎，讓使用者只需具備基礎網頁編輯知識，即可將目標網頁託管至「去中心式系統 IPFS」 運行，最後使用 DNS 服務綁定網域。
```

### 二、系統架構

系統架構圖提供了整體系統架構的快速概覽，幫助讀者理解系統的結構和相依性。

以圖形表示系統中各主要組件的互動關係，包括組件間的通訊、資料流動，以及軟硬體的配置等。

![系統架構](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/9b51aee1-dd38-48a9-8779-51a6af22cc5d)

圖 1.1 「IPFS 網頁生成引擎」系統架構

## 貳、需求規格

### 一、功能需求

從不同的使用者角色剖析**功能需求**，羅列出細項並加以**編號**，再與**設計稿**的頁面編號連結。格式大概如下：
```
1. 首頁、註冊與登入登出
	1.1 註冊與登入
		1.1.1. 用戶可以使用 email 搭配一組密碼註冊一個新帳號。AEXWF-000001
		1.1.2. email 不可與現有用戶重複。AEXWF-000002
		1.1.3. 用戶於 email 欄位輸入非 email 資訊需警示，且此時不可提交註冊。AEXWF-000002
```

### 二、系統環境

說明運行該系統的環境需求，包括必須要有的硬體元件或是其他軟體資源：
```
1. 軟體需求
	a. 作業系統： Linux Ubuntu 20.04
	b. 資料庫軟體： MongoDB 6.0
	c. 開發語言： Typescript 、 Markdown

2. 硬體需求
	a. CPU： 2 core
	b. 記憶體： 4 GB
	c. 硬碟：200 GB
```
---

## 參、資料庫規劃

提供 DB Schema，包括表格結構、類型、索引，以及資料庫的選擇（例如關聯式資料庫或 NoSQL）等。

這個項目以 [IPFS網頁生成引擎](https://docs.google.com/document/d/1CJeBum3cR5j7Jr5aExRWlXckVYAG-Qh_ndIwwIK3yBU/edit?usp=drive_link) 為例：

### 一、資料表欄位定義

表 3.1.1 使用者管理資料表

| 欄位 | 類型 | 說明 | 空值 | 索引 |
| --- | --- | --- | --- | --- |
| User_id | number:int(10) | 使用者編號 | N | PK |
| User_Name | string:varchar(30) | 使用者名稱 | N |  |
| User_mail | string:varchar(30) | 使用者信箱 | N |  |
| User_password | string:varchar(12) | 使用者密碼 | N |  |
| Role_id | int(10) | 管理角色 | Y | FK |

有繪製 ER Diagram 的話也是放置於此。

### 二、備份方法

表 3.2.1 MongoDB 備份步驟

| 步驟 | 說明 | 指令 |
| --- | --- | --- |
| 1 | 切換至 admin 資料庫中 | use admin |
| 2 | 執行磁碟同步與上鎖工作 | db.runCommand({fsync:1,lock:1}) |
| 3 | 檢查是否確實上鎖 | db.currentOp() |
| 4 | 開啟另一個 console 視窗來執行備份操作 | 本機資料庫：mongodump -d (資料庫名稱) -o (磁碟位置) ../data/backup <br />遠端資料庫：mongodump -h (資料庫主機的IP) --port (port) -u (登入帳號) -p (登入密碼) -d (資料庫名稱) -o (磁碟位置) ../data/backup |
| 5 | 資料庫解鎖 | db.fsyncUnlock() |

## 肆、系統微服務架構

如果系統中有使用微服務架構，則需要說明以下內容：

1. 系統如何拆分微服務，每個微服務的主要功能和負責範疇
2. 列出所有微服務的名稱和簡短描述
3. 微服務的部署流程，包括所需的環境變數、配置文件、依賴和相應的維護策略
4. 視覺化的微服務架構

這個項目以 [ASICEX 系統架構書](https://docs.google.com/document/d/1jDg2fw-cn0Z-BapNCV_b0lTu6HVrJLdZnWu8g9sNNRk/edit) 為例：

![微服務架構](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/d4b743a3-1f0e-410e-8815-1bf8d11b52a7)

圖 4.1 「ASICEX」微服務架構

```
1. 基礎模組與數據分析監控解決方案
	1.1. DPX - Data Pilot X 智能資料讀寫代理系統
	1.2. SWM - System Wellness Monitor 系統健康度監控微服務
	1.3. WBS - Watchguard Blacklist Sentry 哨兵系統
	1.4. AEN - Application Events Notifier 事件通知微服務
```

## 伍、需求追溯表

需求追溯表是將前述的系統功能細項，與需求規格連接在一起，將系統規格與對應的需求繪製成表格，以供未來軟體系統驗收時查核。

除此之外，需求追溯表還可以用來確認需求規格書的各個項目，是否已被完整地涵蓋在系統中，當作系統架構的檢驗清單。

若系統架構較複雜，不易用單一表格表示時，則可依不同性質歸類分為若干個表。例如分割成前端系統追溯和後端系統追溯：

表 5.1 後端系統追溯

| 需求功能 | SRS（需求規格書） | SDD（系統架構書） |
| --- | --- | --- |
| 共通 |  |  |
| 架構管理 | 二-1 | 1.1.2 |
| 權限管理 | 一-1 、 一-2 | 1.2.1 |
| 操作記錄管理 | 五-2 | 1.2.3 |
| 發布管理 | 四-2 | 1.1.1 、 1.2.2 |
| 瀏覽器版本 | 四-3 | 1.1.8 |
| 網頁無障礙規範 | 六 | 1.1.9 |
