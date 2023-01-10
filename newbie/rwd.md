# 1. 什麼是 RWD
全稱為 Responsive Web Design，中文稱之為響應式網頁設計(或回應式網頁設計)。是一種讓網頁根據不同尺寸的裝置時呈現對應的版面設計的一種網頁技術，減少使用者進行平移、縮放等操作，提供使用者在跨裝置中得到最佳瀏覽體驗。

# 2. 為何使用 RWD
傳統的網頁設計方式是針對不同的裝置做出多個不同的網頁，當使用者進入網頁時，由伺服器判斷使用的設備，再將使用者導引至對應的網頁。由於網頁沒有統一，這種設計方式將造成以下幾種缺點：
  - 網頁製作成本高，且維護不易
  - 伺服器判斷錯誤或使用者直接點擊特定裝置的連結，導致顯示與裝置不符的頁面，影響使用者體驗
  - 網址重複多次可能影響 SEO 搜尋排名
> SEO - search engine optimization ，搜尋引擎最佳化，透過搜尋引擎的運作規則來調整網站，提網站在有關搜尋引擎內的排名。

RWD 則是將各個對應版面設計整合在單一網址中，使用此種設計方式將使網頁的維護更便利，也因為 Google 鼓勵 RWD 設計方式，對網頁 SEO 的排名較有利。但也不是所有網站都適合使用 RWD ，如果網站資訊量大，或是希望針對特定裝置重新設計版面，就比較適合使用 AWD 或傳統網頁設計。

# 3. 實現方法
常見的 RWD 實作方法是使用 CSS3 提供的媒體查詢功能(Media Query)，Media Query 的設定可以幫助網頁判斷在什麼條件下要套用何種 RWD 樣式。通常都是以 viewport 的寬度為主，指定不同的螢幕尺寸套用到對應的 CSS 設定。
```
/* 螢幕寬度小於 768px 時 */
@media screen and (min-width: 768px) { ... }

/* 螢幕寬度小於 992px 時 */
@media screen and (min-width: 992px) { ... }

/* 螢幕寬度小於 1200px 時 */
@media screen and (min-width: 1200px) { ... }
```
選擇範圍可以使用 max-width 和 min-width 條件， max-width 代表小於(含)範圍的都適用， min-width 代表大於(含)範圍的都適用。這裡要注意 Media Query 不能使用 > 和 < 。不希望樣式被覆寫時，也可以寫多種條件，區分查詢範圍。
```
/* 螢幕寬度大於 768px 又小於 991.99px 時 */
@media (min-width: 768px) and (max-width: 991.99px) { ... }

/* 螢幕寬度大於 992px 又小於 1199.99px 時 */
@media (min-width: 992px) and (max-width: 1199.99px) { ... }
```
更多 Media Query 用法可參考 [W3Schools](https://www.w3schools.com/css/css3_mediaqueries.asp)。

市面上也有許多輔助開發的框架工具(如：Bootstrap)，可以直接套用現成版型和模組，提升網頁開發的效率。
```
npm install bootstrap react-bootstrap
```
依據需求，在專案中引入 Bootstrap 的 button component 以及 css 樣式。
```
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
```
更多詳情請參考[官方網頁](https://getbootstrap.com/)

# 4. 其他技巧
* 行動裝置設計優先(Mobile first)

由於手機的使用率比桌機來的高，以行動裝置為設計的優先考量可以省去不必要的元素，讓使用者的焦點能放在網頁的核心資訊上。Mobile first 也有助於縮短網頁載入的時間，因為行動裝置的使用者不用等待桌機版樣式先跑完即可瀏覽網站，降低網頁跳出率，提升 SEO 排名。
實作方法是寫 Media Query 時把螢幕小的條件往前排，這樣網頁套用的範圍就會從最小的畫面開始。

* 框架工具 vs 手工切版

使用框架工具可以節省許多開發時間，但相對的會有大量的累贅程式碼，修改起來不容易，也可能拉低網頁的 SEO 效能。而手工切版可以精簡程式，掌握較多的設計自主權，也可以達到 HTML 最佳化，缺點就是需要花費很長的製作時間。開始實作前應該先評估適合本次專案的作法。

## 參考來源
- [維基百科](https://zh.wikipedia.org/zh-tw/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BD%91%E9%A1%B5%E8%AE%BE%E8%AE%A1)
- [Welly](https://welly.tw/serp-rank-optimization/what-is-rwd-and-how-to-use)
- [Da-vinci](https://www.da-vinci.com.tw/tw/blog/rwd)
- [CADIIS](https://www.cadiis.com.tw/blog/rwd-web-design-infographic)
- [ALPHAcamp](https://tw.alphacamp.co/blog/rwd-responsive-web-design-introduction)
- [小事之 Media Query](https://ithelp.ithome.com.tw/articles/10196578)
- [什麼是行動優先設計](https://tenten.co/learning/mobile-first-design/)
