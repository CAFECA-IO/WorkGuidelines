# 版本管理｜Version Management

## 什麼是版本管理
版本管理是一個重要的程式開發概念，用於追蹤和控制程式碼的變化。

在程式開發中，我們使用版本控制系統 (Version Control System, VCS) 來**管理**程式碼的不同**版本**，也就是利用版本控制來追蹤、維護原始碼 (Source code)、檔案 (file) 以及設定檔 (configuration file) 等的改動。

所以說，當我們討論到「版本管理」，也就是在討論「版本控制」，在這裡我們可以先將兩者視為同樣意涵的用詞。

### 版本控制(版控)

如果我們想要避免資料不見的風險，我們就會進行備份。有了備份，就有辦法還原，即便是電腦中毒掛了，只要備份還在，就能夠把以前的資料拿回來。這種概念就是最原始的版控系統，VCS (Version Control System)。但如果我們只在本地端 (自己的電腦上) 備份並控管，一旦本地設備出狀況就會血本無歸。

同樣道理，公司裡儲存大型數據的資料庫，或是開發部門的專案，也需要備份。對於公司而言，維持這些資料的完整可說是至關重要，千萬不能有「一跳電資料就全部消失還原不了」這類情況發生。

但除了備份之外，如果要在公司中使用，我們還得實現一個功能——「共用」。

想像一下，在一間 100 人的小公司裡，一次只有一台電腦能連上資料庫，如果遇到問題需要更改，就得排隊排好長一段時間，等到排到時可能問題已經擴散到其他檔案了......

為了方便多人共用，便出現了備份+共用的版控，CVCs (Centralized Version Control System)，比起 VCS，可以接受多人共同使用，但還是繼承了上一代的缺點，只要本地設備一出狀況，就會血本無歸。

因此後來又有了 Git 的誕生！

### Git 與版本控制

世界上有很多版本控制系統可供選擇，其中一個常見的是 Git。

Git 讓我們可以追蹤程式碼的變化、合併不同的版本。我們可以建立不同的分支來進行實驗、修復錯誤，最終將它們合併到主分支中。這有助於確保團隊合作的順暢程度，最重要的是它同時提供了一個完整的版本歷史記錄。

Git 與其他版控系統最大的差異就於，它解決了「單一儲存區」這項最致命的缺點，改為「分散式儲存」， DVCs (Distributed Version Control System)。DVSs 將資料分散於不同設備上 (就是儲存資料的本地端)，如此一來，就算其中一處設備損壞，也不影響其他用戶使用。

GitHub 便是採用 Git 的理念，除了專案作者本人的電腦上，也在 GitHub 官網上儲存一份備份，而且每個曾進行過更動的本地端 (就是改過檔案的人的電腦) 也能重新放回官網上，形成新的備份。

在這邊分享 Git 開發時期的一小段故事：

其實 Git 的開發者 林納斯·托瓦茲 (Linus Torvalds，當今最著名的電腦工程師之一)，當初並不是為了開發版本控制系統而開發 Git 的，而是為了方便他現有的開源專案—— Linux 作業系統的合作開發所做的工具。

由於作業系統的程式碼隨隨便便都是百萬行起跳，因此，良好的版控工具變得至關重要，除了在錯誤出現時，能有效的還原回正確的版本，還要能將各種程式碼反覆在各裝置上測試與轉移。
但是 Linus 對當時的版控工具抱有疑慮，而當時的版控工具公司又拒絕與 Linus 團隊合作改進版控工具，無奈之下只好自己做一個了，最終 Git 問世。


## 透過 GitHub 實現版本控制

GitHub 是一個「透過 Git 進行版本控制」的「原始碼代管服務平台」。意思就是，GitHub 是一個網路平台，它使用分散式版本控制系統 Git 來管理和追蹤原始碼的更改，並且提供一個協作環境，讓多個開發人員更容易在同一個專案上一起工作。

以下是 GitHub 上版本控制的關鍵:

1. **Repositories:** 
在GitHub中，儲存庫（repository, a.k.a. repo）是一個存放專案的原始碼、文件和版本歷史的空間。儲存庫可以是公開的或私人的，並且可以包含分支（branches）、發布（releases）等。

2. **Forking:** 
GitHub 允許使用者針對一個 repo 建立屬於自己的副本（fork)，這通常在有人想要貢獻到專案，但不直接修改原始程式碼庫時使用。
在對 fork 進行更改後，使用者可以通過 pull request 將這些更改提議給原始儲存庫。

3. **Branching:** 
開發人員可以在儲存庫內建立分支，以便專注於特定功能 (specific features) 或修復 (fixes)。分支可以使這些修改與主程式碼庫 (main codebase) 隔離，直到它們準備好合併。

4. **Pull Requests:** 
Pull request 是對儲存庫的建議更改。它使開發人員能夠提交他們的更改以進行審查 (code review)，最終整合到主程式碼庫中。

8. **Issues:** 
GitHub 的問題跟蹤器 (issue tracker) 有助於管理專案的任務 (tasks)、增強功能 (enhancements) 以及錯誤 (bugs)。
Issues 可以與 pull requests 關聯，使得更容易跟蹤功能或錯誤修復的進度。

9. **Collaboration:** 
GitHub提供了協作工具，例如對程式碼進行評論 (commenting on code)、提及團隊成員 (mentioning team members) 和審查更改 (reviewing changes) 等。這些功能使多個開發人員更容易在一個專案上共同工作。

## 結論
總之，由於 GitHub 對使用者友好的界面、豐富的協作功能以及與 Git 的整合，GitHub 在軟體開發社群中被廣泛使用。

而我們團隊也是使用 GitHub 來進行版本管理與控制，關於詳細流程的部分可以參考延伸閱讀 [Git Flow](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/git-flow.md)。

## 資料來源
[【工程師必懂的版本控制技術】什麼是GitHub?](https://medium.com/@makerincollege2018/%E5%B7%A5%E7%A8%8B%E5%B8%AB%E5%BF%85%E6%87%82%E7%9A%84%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E6%8A%80%E8%A1%93-%E4%BB%80%E9%BA%BC%E6%98%AFgithub-376421fd871d)
[關於版本控制](https://git-scm.com/book/zh-tw/v2/%E9%96%8B%E5%A7%8B-%E9%97%9C%E6%96%BC%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
[版本控制-wiki](https://zh.wikipedia.org/zh-tw/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

# 補充：目前我們團隊的開發流程

在 GitHub 的 Repository，由 main 拉出一個 branch 命名為 `develop`。

接著就跟隨 Git Flow 的規則，每一次開發都是從 `develop` 拉出開發者自己的功能分支，分支命名須為`feature/`開頭，例如：`feature/add_audit_report_formate`。

開發者開發完成該功能分支後，就建立 PR，依照團隊的 [Pull Request Document Rule](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/code-review.md) 規則撰寫 PR 的內文描述。

並且在建立 PR 前先調整自己分支的版本號碼，假設目前開發的版本為 `1.0.0+1`，要發 PR 前就需要先調整為 `1.0.0+2`。

PR 由團隊主管審核後該功能分支就會自動被併入(merge) develop，開發者再將自己的分支刪除（遠端分支會由主管刪除，開發者自行刪除本地端分支即可）。

總之，只有 main 和 develop 兩個分支會始終存在於 Repository，其餘功能分支開發完成後就要刪除。
