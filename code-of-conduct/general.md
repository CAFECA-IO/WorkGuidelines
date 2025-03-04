# General
> v1.0.0 20220502
- 月計劃排定
- 週計畫排定
- 日計畫排定
- 工作票執行
- 工作票結束
- 日計畫結報
- 週計畫結報
- 月計畫結報
- Pull Request
- KnowledgeManagement
- 假勤規範

## 月計劃排定
- 每月第一個工作日會分配本月目標，中午 12:00 前需完成本月工作事項規劃並記錄於 EventReport 專案。  
EX: [EventReport/2022/m4/Tzuhan.md](https://github.com/CAFECA-IO/EventReport/blob/main/2022/m4/Tzuhan.md)
- 須開立週計劃提案票（Status: Proposal，Tag: plan #FBCA04)，並描述執行範疇。

## 周計劃排定
- 每週第一個工作日須根據本週目標排定本週工作計劃，中午 12:00 前完成並記錄於 EventReport 專案。  
EX: [EventReport/2022/w17/Tzuhan.md](https://github.com/CAFECA-IO/EventReport/blob/main/2022/w17/Tzuhan.md)
- 需提案開立工作票（Status: Weekly Plan，Tag: Bug / Enhance / Documentation)，並連結至週計劃提案票。
- 工作票須預估難度，一小時內可完成難度為 1，依此類推 1 2 3 5 8，預估超過 8 小時才能完成的工作需分割。
- 工作票須設定執行者 Assignees。
- 工作票須設定所屬 Milestone。
- 本週工作計劃為週報的一部分，需記錄本週排定工作點數以及同月份內排定尚未完成的點數（本月延遲點數）。

## 日計劃排定
- 每日需揀選 6 - 8 點工作票，將 Status 調整為 Daily Plan，作為當日工作目標。
- 每日 09:30 前需於 Slack #cafeca 頻道通知當日工作目標，若該日為當週第一個工作日，則於中午 12:00 前完成。

## 工作票執行
- Status: Daily Plan 之工作票須描述執行計劃與預期成果。
- Status: Daily Plan 之工作票資訊需有開立來源票，可能是 Weekly Plan 也可能是另一張工作票。
- 過程中需記錄過程中的聯繫資訊、規格文件、研究需求等中間產物。
- 過程中需要分割或開立延伸工作票需簡述原因並連結之。
- 若當日無法完成須記錄已執行時間、評估剩餘時間，以及延遲原因。

## 工作票結束
- 若工作票屬於程式碼開發，需連結至 Pull Request。
- 若工作票屬於文件撰寫或技術研究，需連結相關 wiki 或 markdown 檔案。
- 其他工作票須將成果文件化置於 Google Drive 並附上連結。
- 工作票完成後需調整 Status: Daily Review

## 日計畫結報
- 每日 17:30 前需於 Slack #cafeca 頻道通知當日工作完成狀況。

## 週計畫結報
- 每週最後一個工作日需完成週報。
- 週計劃執行過程中若有臨時新增工作需記載於臨時提案分項。
- 週報需記錄本週新增點數、本月延遲點數、本週完成點數、本週延遲點數，並統整於總結段落。
- 週報需根據本週完成點數 / 本週新增點數記錄本週完成率，低於 75% 需撰寫事件報告，整理本週執行瓶頸與特殊事件。
- 本週執行成果若有額外成果或貢獻可記錄於其他成果段落，針對執行上可改進之處記錄於改善方針段落。

## 月計畫結報
- 每月最後一個工作日需完成月報。
- 月計劃執行過程中若有臨時新增工作需記載於臨時提案分項。
- 月報最後需審視所有未完成票，關閉偏離方針的規劃。
- 月報需記錄本月新增點數、本年延遲點數、本月完成點數、本月延遲點數、本月取消點數。
- 月報需包含其他成果段落，記錄本月不在計劃內的執行成果或貢獻，若無則填無。
- 月報需包含改善方向段落，記錄執行過程檢討並研擬可改進之處，月執行率低於 75% 不得為空。
- 月報需包含技術分享，針對本月工作執行建立一篇以上的專業知識整理，保存於 KnowledgeManagement 並附上連結。

## Pull Request
- 每日須根據當日排定目標，以 develop branch 為基礎建立 feature branch，該 feature 完成後需根據 [Code Review](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/code-review.md) 規範建立 pull request。
- 若 feature 當日無法完成開發仍需建立 pull request，且隔日需以該 feature 為基礎建立 extend branch，extend branch merge 對象為前一日之 feature branch。
- 必須完成 Pull Request Code Review 並完成合併才可關閉相關工作票。

## Knowledge Management
- 需記錄研究成果
- 需記錄研究效益

## 假勤規範
- 病假需檢附證明文件
- 特休假一日（含）以內需提前 24 小時提出申請
- 特休假一日（不含）以上三日（含）以內需提前 7 日提出申請
- 特休假三日（不含）以上需提前 30 日提出申請
