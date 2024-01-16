# Git Flow
# 前言

此篇文目標是簡單講述 Git Flow 和 GitHub Flow 的流程，以及相關名詞解說，並且附上目前開發團隊的流程慣例。

### Git Flow 是什麼？為什麼需要 Git Flow？

當在同一個專案一起開發的人數越來越多，如果沒有訂好規矩，每個人的 Commit 習慣可能都不同，放任大家隨便 Commit 的話遲早會造成災難。在 2010 年的時候，就有人提出了一套[流程](https://nvie.com/posts/a-successful-git-branching-model/)讓大家可以遵守。這幾年來也陸續有其它優秀的開發流程，例如 GitHub Flow、Gitlab Flow 等流程。

# Git Flow

## 分支應用情境

根據 Git Flow 的建議，主要的分支有  `master`、`develop`、`hotfix`、`release`  以及  `feature`  這五種分支，各種分支負責不同的功能。其中 Master 以及 Develop 這兩個分支又被稱做**長期分支**，因為他們會一直存活在整個 Git Flow 裡，而其它的分支大多會因任務結束而被刪除。

![flow](https://github.com/CAFECA-IO/WorkGuidelines/assets/105651918/afcf25f3-b822-4a9f-87df-bf0c72ac2cfd)

## 分支介紹
### Master 分支

主要是用來放穩定、隨時可上線的版本。這個分支的來源只能從別的分支合併過來，開發者不會直接 Commit 到這個分支。因為是穩定版本，所以通常也會在這個分支上的 Commit 上打上版本號標籤。

### Develop 分支

這個分支主要是所有開發的基礎分支，當要新增功能的時候，所有的 Feature 分支都是從這個分支切出去的。而 Feature 分支的功能完成後，也都會合併回來這個分支。

### Hotfix 分支

當線上產品發生緊急問題的時候，會從 Master 分支開一個 Hotfix 分支出來進行修復，Hotfix 分支修復完成之後，會合併回 Master 分支，也同時會合併一份到 Develop 分支。

為什麼要合併回 Develop 分支？如果不這麼做，等到時候 Develop 分支完成並且合併回 Master 分支的時候，那個問題就又再次出現了。

那為什麼一開始不從 Develop 分支切出來修？因為 Develop 分支的功能可能尚在開發中，這時候硬是要從這裡切出去修再合併回 Master 分支，只會造成更大的災難。

### Release 分支

當認為 Develop 分支夠成熟了，就可以把 Develop 分支合併到 Release 分支，在這邊進行算是上線前的最後測試。測試完成後，Release 分支將會同時合併到 Master 以及 Develop 這兩個分支上。Master 分支是上線版本，而合併回 Develop 分支的目的，是因為可能在 Release 分支上還會測到並修正一些問題，所以需要跟 Develop 分支同步，免得之後的版本又再度出現同樣的問題。

### Feature 分支

當要開始新增功能的時候，就是使用 Feature 分支的時候了。Feature 分支都是從 Develop 分支來的，完成之後會再併回 Develop 分支。

# GitHub flow

GitHub flow 需要搭配 GitHub 帳號與 repository 一同使用，是一種輕量（lightweight）且基於分支的工作流程（branch-based workflow）。

GitHub flow 適合團隊成員使用同一個 repository 進行開發時的溝通。

依照 [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)，每次要對專案進行更動時，都會經歷以下步驟：

1. 建立分支 ([Create a branch](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-branch))
2. 提交修改 ([Make changes](https://docs.github.com/en/get-started/quickstart/github-flow#make-changes) : Add commits and push your changes to your branch)
3. 開啟 PR ([Create a pull request](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request))
4. Code Review ([Address review comments](https://docs.github.com/en/get-started/quickstart/github-flow#address-review-comments))
5. 合併分支 ([Merge your pull request](https://docs.github.com/en/get-started/quickstart/github-flow#merge-your-pull-request))
6. 刪除分支 ([Delete your branch](https://docs.github.com/en/get-started/quickstart/github-flow#delete-your-branch))

GitHub flow 下只有兩種分支，第一個是 master，其餘的都是 branch，而 branch 命名應該要有敘述性（例如：userInfo、getAllUser 等），讓其他人清楚知道分支正在進行的工作項目。

在 branch 準備 merge 時，開發者需要發起 pull request，管理者一定要測試完此 branch 沒有問題，再與 master 合併。

簡單的說，由 **管理者** 來負責做分支的合併，其餘的開發者只需專心開發 branch 就好。但是開發者在 commit 時，務必要撰寫清楚，讓大家知道你在做甚麼，且管理者才知道如何合併，多一個人力去做合併的動作。就好比大家一開始碰 git 時的方法，但多了一個人去專門負責合併工作，且 master 是隨時可以上線的情況。

## 基本名詞介紹

### Commit :

就是一般的 commit

### Pull Request :

當開發者要合併 branch 到 master 時，需要發出 pull request，此 pull request 有好幾個功能：

1. 使任何人都能清楚看到，什麼樣的提交內容將會被合併 (merge)。
2. 若遇到問題，可以在 pull request 裡談，讓大家知道你需要幫忙。在討論及回饋中，如果有需要進行修改的內容，在分支中修正它並繼續推送修改。GitHub 會在 Pull Request 頁面顯示新提交以及新的回饋。
3. 請管理者來合併此 branch
4. 留下合併的紀錄：在團隊檢核過提交內容後，就可以開始進行合併以及部屬。合併後，Pull Request 保存了當時的修改歷史記錄以及回饋。可以讓任開發人回頭檢視當初情況。

### Master : (or Main)

主要的開發分支，與 Git Flow 定義一樣，通常有版號。所有的 master 分支都是可以部署上線的。


## Master vs Main

`master` 和 `main` 這兩者指的都是主要的開發分支，使用哪一個取決於開發者或團隊。

1. Master:

   `master` 是傳統的分支名稱，最初在 Git 中使用。它被用來表示主要的、穩定的程式碼分支，通常代表了產品的生產版本。

   然而，有些人開始質疑這個術語的含義，認為它可能帶有不當的歷史聯想，因此開始尋找替代的名稱。

2. Main:

   `main` 是一個替代的分支名稱，被一些開發者和團隊選擇以取代`master`。

   這種變化的動機之一是消除與「主人」或「奴隸」等詞彙的聯想，以促進更加包容和無歧視的開發環境。

   許多開源專案和公司已經採用了 `main` 作為他們的主要分支名稱，這在一定程度上反映了對更加包容和多元的價值觀的努力。

   GitHub 等平台也已經開始在創建新儲存庫 (Repository) 時**將預設分支名稱更改為 `main`**，以支持這種趨勢。

# 目前我們團隊的開發流程

在 GitHub 的 Repository，由 main 拉出一個 branch 命名為 `develop`。

接著就跟隨 Git Flow 的規則，每一次開發都是從 `develop` 拉出開發者自己的功能分支，分支命名須為`feature/`開頭，例如：`feature/add_audit_report_formate`。

開發者開發完成該功能分支後，就建立 PR，依照團隊的 [Pull Request Document Rule](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/code-review.md) 規則撰寫 PR 的內文描述。

PR 由團隊主管審核後該功能分支就會自動被併入(merge) develop，開發者再將自己的分支刪除（遠端分支會由主管刪除，開發者自行刪除本地端分支即可）。

總之，只有 main 和 develop 兩個分支會始終存在於 Repository，其餘功能分支開發完成後就要刪除。

# References

- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- https://gitbook.tw/chapters/gitflow/why-need-git-flow
- https://gitbook.tw/chapters/gitflow/using-git-flow
- https://enginebai.medium.com/git-flow-60b9466e9942
- https://medium.com/i-think-so-i-live/git%E4%B8%8A%E7%9A%84%E4%B8%89%E7%A8%AE%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B-10f4f915167e
- https://ithelp.ithome.com.tw/articles/10293401
- https://blog.poychang.net/guide-to-use-github-flow/
