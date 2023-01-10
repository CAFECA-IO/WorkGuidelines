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
常見的 RWD 實作方法是使用 CSS3 提供的媒體查詢功能(Media Query)，指定不同的螢幕尺寸套用到對應的 RWD 樣式。

```shell

```

關於 Media Query 的其他用法可參考 [W3Schools](https://www.w3schools.com/css/css3_mediaqueries.asp)

也可以使用框架工具(如：Boostrap)進行開發，直接套用現成語法和模組提升開發的效率。
# 4. 其他技巧

另外，使用框架工具雖然可以節省許多開發時間，但也會有大量的累贅程式碼，修改起來不容易，也可能拉低網頁的 SEO 效能。而手工切版可以精簡程式，掌握較多的程式自主權，也可以達到 HTML 最佳化，缺點就是需要花費很長的製作時間。開始實作前應該先評估

## 參考來源
- [維基百科](https://zh.wikipedia.org/zh-tw/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BD%91%E9%A1%B5%E8%AE%BE%E8%AE%A1)
- [Welly](https://welly.tw/serp-rank-optimization/what-is-rwd-and-how-to-use)
- [Da-vinci](https://www.da-vinci.com.tw/tw/blog/rwd)
- [CADIIS](https://www.cadiis.com.tw/blog/rwd-web-design-infographic)
- [ALPHAcamp](https://tw.alphacamp.co/blog/rwd-responsive-web-design-introduction)
