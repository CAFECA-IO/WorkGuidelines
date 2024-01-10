# 版本釋出｜Release Version


「版本釋出」指的是將軟體或應用程式的特定版本發佈給最終使用者的**過程**。

而「釋出版本 (Release version)」則表示該版本已經經過測試，是被視為穩定且適合公開釋出的版本。釋出版本後就可以使新功能、修復錯誤或改進性能等變更被用戶使用。

以下是有關版本釋出的關鍵點：

1. **穩定性（Stability）：** 預期釋出版本應該是穩定的，這意味著它已經經歷了全面的測試，以確保其按照預期的方式運作，並且沒有關鍵的錯誤或問題。
2. **功能凍結（Feature Freeze）：** 在釋出版本之前，通常有一個被稱為「功能凍結」的階段。在這個階段，不會添加新功能，重點是修復任何剩餘的錯誤或問題。
3. **文件（Documentation）：** 釋出版本會附帶文件，這可能包括釋出說明、使用者指南和其他相關資訊，以幫助用戶了解更改、功能和任何潛在問題。
4. **分發（Distribution）：** 一旦軟體版本釋出，就會提供給最終用戶進行分發。這種分發可以通過各種途徑進行，例如從網站下載、應用商店或實體媒體。
5. **版本編號（Software versioning）：** Software versioning 是指為軟體設定版本號碼的方式。通常，版本號碼會以數字訂定，但亦有不同的方式。版本號碼這有助於用戶和開發人員追蹤變更和更新。
6. **用戶通訊（User Communication）：** 開發人員通常會透過釋出公告、通訊或軟體內的更新通知，向用戶宣布新版本的釋出。

釋出版本是軟體開發生命週期中的一個重要里程碑，代表軟體已達到一個成熟並準備好廣泛使用的階段。


## 產品上線流程相關的名詞解釋
也就是「程式碼的改動被部署到正式環境」會經過的流程，及其相關名詞解釋。

### Deployment（部署、上版）
本身的意思是將程式碼放到特定環境中，常見的環境包含開發環境（dev）、測試環境（test）、正式環境（production），有些團隊中會在上線正式環境前有個模擬環境（staging, stg）來做整合測試或 E2E 測試。

在日常生活中當我們提到「今天有 deployment 嗎？」可能就是指有沒有新的改動要上線到正式環境當中，所以有時候 deploy 跟 release 這兩個詞會被混在一起使用。

### Release（釋出、上線）
這個詞很容易讓人誤會，因為有時候我們將改動部署到正式環境中時，改動馬上就可以被終端使用者看見並使用；但有時候我們會先只釋出給一部分使用者、特定市場、做 A/B Testing，如果成果是好的才會是好的才會釋出給所有使用者。

從工程師的角度來看，可能每一次的正式環境部署都可以算是 release，但從產品團隊、行銷團隊、使用者的角度來看又會不同。

[此篇文章作者](https://medium.com/3pm-lab/software-product-release-management-definition-and-workflow-e93075bd8ae)認為，一個新版本、新功能要有來自正式環境的流量與真實使用者使用時才算是 release，若只是給內部團隊在正式環境測試，那也不能算釋出。

在這個定義下，rollout 也可以代表相同的意思。

### Phased Rollout、Staged Rollout（階段性釋出）
承上，從部署完到完全上線中間有時候會有一個階段性釋出的過程，短則一週、長則幾個月都是有可能的，這部分通常是由產品經理負責的。

這個階段會做的事情就是內部測試、外部測試、蒐集回饋，如果有 bug、從使用者身上得到新回饋，也可能會將產品改動或功能做得更完整後再釋出給更多人。有些團隊也會明定 Alpha Test、Beta Test、Release Candidate（RC）等不同階段。

### Full Rollout、Rollout to All（完整上線、釋出給所有人）
經歷過上面釋出給一部分使用者測試、在特定市場試水溫、用實驗來觀察數據變化後，若反應都很正向，就可以正式上線給所有人使用了。

當然也有可能在前面幾個階段發現新的改動並不值得上線，而直接取消上線、或是大改方向的狀況。

### Product Launch（產品發布、上市）
這個步驟則是在功能或產品釋出給所有人後，選擇對外公開公告新功能或新產品的階段，通常由產品團隊、行銷團隊（B2C）或客服與業務團隊（B2B）負責，小則從在網站上推播、或寄信發公告給使用者，大至發新聞稿給媒體、舉辦大型記者會。

## 相關技術名詞概述
### Delivery（交付）
CI/CD 中，前者是持續整合（Continuous Integration），後者是有人說是持續交付（Continuous Delivery）、也有人說是持續部署（Continuous Deployment），這部分令人較為困惑。

其中一種說法是，交付代表程式碼隨時準備好能夠被部署到正式環境中，因此是部署前的步驟；也有人說交付的程式碼是小包小包的，而部署的程式碼是一整個大版本；[此篇文章作者](https://medium.com/3pm-lab/software-product-release-management-definition-and-workflow-e93075bd8ae)則認為這兩者的差異為：部署（deploy）作為動詞時，對象是環境；而交付（deliver）作為動詞時，對象是使用者。


### Master & Branch（主線 & 分支）
產品上線會持續有很多不同的版本，可以使用 Git 這個分散式的版本控制系統來做專案的版本管理。

可以想像同時有很多個不同的工程師在為同一個產品開發新功能，使用者現在在正式環境看到的都是統一版本，然而每個工程師在自己的本地端會因為開發新功能而加了新的程式碼，所以每個版本都不同，這時候版本控制系統就非常重要。

Master Branch 是最主要的主線，其他分支如 Dev Branch、Feature Branch、Release Branch、Hotfix Branch 等等，新的功能通常會開新的分支來開發，開發完成後會再合併（merge）回主線。

> 主線分支在 GitHub 的預設命名是 main，我們團隊跟隨此設定。

**Git 相關名詞補充：**

- Push：將本地端的檔案、程式碼上傳（推）到遠端。
- Pull：把遠端的程式碼下載（拉）下來，類似於複製最新的版本到本地端，並將遠端分支合併到本地分支，這樣開發時才會是基於最新的版本。
- PR（Pull Request）：要求第三方、遠端、其他分支拉自己的版本過去，類似於合併到其他人的版本上。
- Merge：把新的程式碼合回去主線。
- Dependency：相依性，某段程式碼跟其他程式碼有關聯，merge 的先後順序可能會有差異。
- Conflicts：不同的版本之間在 merge 的過程中可能會有衝突，例如兩個工程師雖然在開發不同的功能，但可能背後一些交錯的邏輯是有相關的，這時候就要來解 conflicts。
- Rebase：同上，當有新的版本部署到正式環境，跟每個工程師在本地端開發的版本可能已經有不同，因此要整理本地端的版本，避免還在舊的版本上開發。

### Build（建置、版本）
原則上就是即將部署的版本，會是一堆任務、功能、改動、Pull Request 的集合。團隊會基於這個版本在模擬環境（staging env, pre-production env）做上線前的最終測試。如果在測試中發現問題，就會 merge bugfix to the build 然後重新測試，確保上線的版本是經過檢驗的。

### Version（版本、版號）
每個 Build 都會有一個獨特的版號，有些團隊會以「日期」來命名，但另一個常見的形式是如 1.23.0 的三組數字，意思分別為 major.minor.patch（主版號.次版號.修訂號），數字會隨著新版本遞增。第一個數字是大版本更新時、第二個是功能更新或新功能上線時、第三個是小型變動時，當前一個數字進位時，後面低階層的數字會歸零。

[此篇文章作者](https://medium.com/3pm-lab/software-product-release-management-definition-and-workflow-e93075bd8ae)的習慣是預設一般情況下只改變 minor 的數字（上面案例變為 1.24.0），patch 是留給 hotfix 使用（變為 1.23.1），major 則是底層架構大更新、整個介面大改版時才會更新（變為 2.0.0）使用機會較低。

> 版號命名可以參考：[Semantic Versioning 2.0.0 (GitHub創辦人定義的語意化版本)](https://semver.org/)
> 往下繼續閱讀，有另外介紹幾種相關的版本編號以及範例可以參考。
> 版本編號沒有一定的規定，只要團隊達成共識、方便管理版本即可。


### Rollback（回滾、回復上一動）
當部署到環境中發生問題時，可以 rollback 回到該環境的上一個狀態中。通常是部署到正式環境後發生問題，短時間內找不到問題而無法用 hotfix 解決，因此決定將正式環境回復到還沒部署新程式碼的狀態。這種情況當然是愈少愈好。

### Hotfix（現在一定要上線的緊急修正）
當正式環境發生了緊急且嚴重的問題，無法等到下一次版本上線，必須立刻修好的時候，我們就會馬上上一個 hotfix。

它不是功能、也不是預料之中要上線的東西，且會立刻打斷原先排程的工作，再怎麼會拖，通常當天下班前一定要處理完，否則就會變成你今晚的惡夢。

> 日常用法總複習：
> 「最新的 build 上了之後發現有一個 production issue，我們現在是不是要來討論一下有沒有辦法很快找到 root cause、上個 hotfix，還是說現在要整個 rollback？」
> 通常我們在提到這些名詞時幾乎都是用英文稱呼，也因此講話總是中英夾雜，所以這裡絕對不是故意要講晶晶體喔！


## 補充說明：版本編號

介紹幾種訂定版本編號的方式：
1. 小數
2. 日期
3. 年份
4. 數學常數
5. 英文縮寫

### 小數

以小數去訂定版本號碼的例子：

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/24d5bb02-335b-4737-9123-f1e3dbc371a0" alt="VersionNumbers" width="15%">


這是最常用的一種訂定方式。大部份軟體的版號都是用此方法去計算。

通常訂定規則為：`major.minor(.build)`。

*major*是最大的版本編號，*minor*為其次，某些軟體可能再細分作*build*，為更小的版本編號。

通常，正式版的版本編號為「1.0」。1.0以下的版本（0.x）為測試版，代表仍有一些重大錯誤（bugs），未正式推出。

在新版本推出時，應更新*major*、*minor*或是*build*（如有）的版號，決定於變更的大小。

當有極大的更新時，會增加*major*的版號。而當有大更新，但不至於更新*major*時，會更新*minor*的版號。若更新比較小，例如只是修正錯誤，則會更新*build*的版號。

以下是一個例子：
```
1.0→1.0.1→1.0.2→1.1→1.1.1→2.0→2.1→2.1.1→3.0→…
```
以上例子中，1.0至1.0.1至1.0.2、1.1至1.1.1、2.1至2.1.1都是小更新；
1.0.2至1.1、2.0至2.1都是較大的更新；
而1.1.1至2.0和2.1.1至3.0則是重大更新。

有時，小數版本號碼後面會有「a」、「b」、「rc」等字樣，代表某版本的測試版。「a」、「b」、「rc」分別代表「alpha」、「beta」和「release candidate」。

- 例如：
  - 「2.0a」是2.0的alpha測試版，接著可能發佈「2.0b」，是2.0的beta測試版。
  - 跟著，又可能出現「2.0b2」，代表2.0的第2個beta測試版。
  - 當beta測試完結後，又可能推出「2.0rc1」、「2.0rc2」兩個版本，分別代表2.0的第一和第二個release candidate測試版。
  - 當一切測試結束後，就會有「2.0」正式版。

**實例:**

只有*major*和*minor*的軟體有如[MediaWiki](https://zh.wikipedia.org/wiki/MediaWiki)。當MediaWiki發佈1.9版本後，下一個版本是1.10。

[Mozilla Firefox](https://zh.wikipedia.org/wiki/Mozilla_Firefox)的3.x版本有 *major*、*minor* 和 *build*。例如其中兩個版本為3.0和3.0.1。而Firefox的2.x版本更有四個數字，此時版本結構改為`major.minor.maintenance.build`。例如Firefox 2.x的其中一個版本為2.0.0.14。

### 日期

除了依照版本發佈次序逐個數以外，軟體版本編號亦有可能使用日期。例如版本「20080101」代表該版本於2008年1月1日發佈。通常日期的排列方法會是「YYYY-MM-DD」，因為這樣做的好處是，當電腦排序時，可以自動分辨哪個是較舊或較新的版本。

有時候，版本編號更會由小數和日期結合，即是類以1.5.20080101等方式。

**實例:**

使用小數和日期結合的版本編號軟體，例如[Firefox](https://zh.wikipedia.org/wiki/Mozilla_Firefox)的其中一個[擴充套件](https://zh.wikipedia.org/wiki/Firefox%E6%93%B4%E5%B1%95%E5%88%97%E8%A1%A8)「[IE Tab](https://zh.wikipedia.org/wiki/IE_Tab)」的其中一個版本編號為1.5.20080823。

而[Ubuntu](https://zh.wikipedia.org/wiki/Ubuntu_Linux)亦是採用日期的訂定版本編號方式，但卻看起來像以普通小號訂定。例如Ubuntu 8.04版本代表該版本於2008年4月發佈。事際上，由於Ubuntu並非每個月發佈，而是每半年發布一個版本，因此版本編號會跳序。而一年只有12個月，所以亦沒有像6.13這樣的版本。


### 年份

有些軟體，尤其不會在一年中出版兩次的軟體會使用年份作版本編號。例如 2003 版代表該軟體於 2003 年發佈。有時軟體亦採用兩字的年份縮寫，例如以 04 代表 2004 年。

**實例:**

[微軟](https://zh.wikipedia.org/wiki/%E5%BE%AE%E8%BB%9F)的很多產品都以此方式訂定版本編號。例如[Windows 95](https://zh.wikipedia.org/wiki/Windows_95)、[Windows 2000](https://zh.wikipedia.org/wiki/Windows_2000)、[Microsoft Office 2007](https://zh.wikipedia.org/wiki/Microsoft_Office_2007)等。但是，微軟這些產品一般還具有小數版本號。例如：[Microsoft Visual Studio 2010](https://zh.wikipedia.org/wiki/Visual_Studio#Visual_Studio_2010)的版本號是 10.0；[Windows 2000](https://zh.wikipedia.org/wiki/Windows_2000)的版本號是 5.0，[Windows XP](https://zh.wikipedia.org/wiki/Windows_XP)的版本號是 5.1，[Windows Vista](https://zh.wikipedia.org/wiki/Windows_Vista)的版本號是 6.0，[Windows 7](https://zh.wikipedia.org/wiki/Windows_7)的版本號是 6.1 等等。

[MATLAB](https://zh.wikipedia.org/wiki/MATLAB)通常一年中釋出兩個版本，自 2006 年後以「R」+四位年份+「a」或「b」的方式區分。例如 MATLAB R2011a、MATLAB R2011b 等。

### 數學常數

有些軟體採用[數學常數](https://zh.wikipedia.org/wiki/%E6%95%B8%E5%AD%B8%E5%B8%B8%E6%95%B8)來進行訂定版本編號。具體方法為先選定一個數學常數，每個新版本都距離該數學常數更近。其含義是該軟體有一個確定的功能目標，而不是在未來無限擴充其功能範圍，所以採用數學常數作為版本號表示距離軟體的目標越來越逼近。例如選用[圓周率](https://zh.wikipedia.org/wiki/%E5%9C%93%E5%91%A8%E7%8E%87)的軟體，其版本應為 3、3.1、3.14、3.141、……

**實例:**

[TeX](https://zh.wikipedia.org/wiki/TeX)選定的數學常數為 [π](https://zh.wikipedia.org/wiki/%E5%9C%93%E5%91%A8%E7%8E%87)。而[METAFONT](https://zh.wikipedia.org/wiki/METAFONT)選定的數學常數則為 [e](<https://zh.wikipedia.org/wiki/E_(%E6%95%B8%E5%AD%B8%E5%B8%B8%E6%95%B8)>)。

### 英文縮寫

有些軟體採用英文縮寫來為版本制定編號。

**實例:**

[Macromedia](https://zh.wikipedia.org/wiki/Macromedia)於 2004 年推出[Flash MX](https://zh.wikipedia.org/wiki/Adobe_Flash)。[Adobe](https://zh.wikipedia.org/wiki/Adobe)收購 Macromedia 後，為其推出之後續版本為 Flash CS2，當中「CS」代表 Creative Suite。

[Windows](https://zh.wikipedia.org/wiki/Windows)有兩個版本採用英文縮寫作版本編號，分別是[Windows Me](https://zh.wikipedia.org/wiki/Windows_Me)和[Windows XP](https://zh.wikipedia.org/wiki/Windows_XP)。「Me」代表「Millennium」（千禧年）或「me」（自己）；「XP」代表「experience」（體驗），當讀出 experience 時，讀音像讀出 x 和 p。

[Ubuntu](https://zh.wikipedia.org/wiki/Ubuntu)於 2008 年 4 月推出 8.04 LTS 版本。Ubuntu 將長期為 8.04 版本提供技術支援。支援時間最少為三年。LTS 是 Long Term Support 的英文縮寫，意為[長期支援](https://zh.wikipedia.org/wiki/%E9%95%B7%E6%9C%9F%E6%94%AF%E6%8F%B4)。

### 特別注意事項

**混合使用各種訂定方式:**

有些軟體會混合使用各種版本編號訂定方式，即不同的版本分別採用不同的訂定方式。

例如[Windows](https://zh.wikipedia.org/wiki/Windows)，曾採用: 普通小數方式（[Windows 1.0](https://zh.wikipedia.org/wiki/Windows_1.0)至[Windows 3.11](https://zh.wikipedia.org/wiki/Windows_3.11)），年份（[Windows 95](https://zh.wikipedia.org/wiki/Windows_95)、[Windows 98](https://zh.wikipedia.org/wiki/Windows_98)、[Windows 2000](https://zh.wikipedia.org/wiki/Windows_2000)），縮寫（[Windows Me](https://zh.wikipedia.org/wiki/Windows_Me)、[Windows XP](https://zh.wikipedia.org/wiki/Windows_XP)）和英文字（[Windows Vista](https://zh.wikipedia.org/wiki/Windows_Vista)）。

**同時擁有兩個版本編號:**

有些軟體會同時擁用兩個版本編號，即是以兩種不同的訂定方式，賦予同一個版本兩個編號。

例如[Windows](https://zh.wikipedia.org/wiki/Windows)：[Windows 95](https://zh.wikipedia.org/wiki/Windows_95)亦即 Windows 4.0，[Windows 98](https://zh.wikipedia.org/wiki/Windows_98)亦即 Windows 4.10，[Windows Me](https://zh.wikipedia.org/wiki/Windows_Me)亦即 Windows 4.90，[Windows 2000](https://zh.wikipedia.org/wiki/Windows_2000)亦即 NT 5.0，[Windows XP](https://zh.wikipedia.org/wiki/Windows_XP)亦即 NT 5.1，[Windows Vista](https://zh.wikipedia.org/wiki/Windows_Vista)亦即 NT 6.0，[Windows 7](https://zh.wikipedia.org/wiki/Windows_7)亦即 NT 6.1。

**小數版本序號可能會跳序:**

有些軟體的小數版本序號可能會出現跳序。此處「跳序」是指同一個軟體，兩個相鄰的使用[小數版本序號](https://zh.wikipedia.org/wiki/%E8%BB%9F%E4%BB%B6%E7%89%88%E6%9C%AC%E8%99%9F#%E5%B0%8F%E6%95%B8)的版本，並不是*major*、*minor*或*build*其中一個值相差 1。

例如[Simutrans](https://zh.wikipedia.org/wiki/Simutrans)自 2005 年的*major*版本序號為 86.x、88.x、89.x、99.x、100.x。當中 86 至 88 和 89 至 99 出現了跳序。

除此以外，還有軟體會因為「不幸運數字」（例如[4](https://zh.wikipedia.org/wiki/4)、[13](https://zh.wikipedia.org/wiki/13)）的原因而跳序。

### 在軟體以外的領域

除了軟體以外，還有其他東西也採用類似的版本編號訂定。

- 電影的續集通常為「XXX 2」，當中 XXX 是電影名稱。如果再有續集，則會是「XXX 3」。
  - 例如:[魔鬼終結者](https://zh.wikipedia.org/wiki/%E6%9C%AA%E4%BE%86%E6%88%B0%E5%A3%AB)、魔鬼終結者 2和魔鬼終結者 3
- [Web 2.0](https://zh.wikipedia.org/wiki/Web_2.0)並不是指軟體「Web」的第二個版本，而是指[網際網路](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%AF%E7%B6%B2)的一個新定義，新轉變。


## 結論
此篇《版本釋出》的文章主要在解釋名詞定義，例如：版本釋出、釋出版本、以及開發團隊會使用到的技術名詞，並且介紹版本編號的訂定方式。

至於團隊實作的方式，以及相關流程規範，等之後有定案後會再補齊。


## References
- [Software versioning](https://en.wikipedia.org/wiki/Software_versioning)
- [Software release life cycle](https://en.wikipedia.org/wiki/Software_release_life_cycle)
- https://www.techtarget.com/searchsoftwarequality/definition/release
- https://medium.com/3pm-lab/software-product-release-management-definition-and-workflow-e93075bd8ae
- [產品上線規劃：分階段釋出網路產品的實作流程與工具](https://medium.com/3pm-lab/product-release-planning-and-phased-rollout-4de95cd058a1)
