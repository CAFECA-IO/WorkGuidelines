# 1. 環境設置
- 於 VS Code 延伸模組中搜尋 "GitHub Copilot" 並安裝
- 安裝後會導向 Github 的登入畫面，登入後即可啟用 GitHub Copilot

# 2. 如何使用
<img width="504" alt="image" src="https://user-images.githubusercontent.com/114177573/227882554-aaf826f3-9e0a-44ee-8068-63160e74d13a.png">

- 在註解中說明功能需求，GitHub Copilot 就會提供建議的程式碼，按下 Tab 鍵即可直接使用

<img width="502" alt="image" src="https://user-images.githubusercontent.com/114177573/227883051-6ed6899c-eb1d-465d-8bdf-21ef8e6455e6.png">

# 3. 註解規範
- 開始工作前，請在每個檔案的開頭寫上該程式的開發目的與功能範疇(目錄)，並記錄實現方法或執行步驟。請根據[註解規範](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/annotation.md)撰寫，幫助自己和其他工程師更快掌握狀況，也減少誤改程式碼的情形發生。
```
/** Info: (date - author)
 * 1. Step 1
 * 2. Step 2
 * 3. Step 3
...
 */

// Info: (date - author) 1. Step 1
your code 
```

```
/** Info: (20230327 - Shirley)
 * Collect market data from the database and other exchanges
 * 1. connect to okx websocket and list from specific market trade data
 * 2. when data is received, save to parans and push to client by websocket
 * 3. periodically (10mins) fetch market data from okx api and save to params
 * 4. data cleaning (merge duplicate data, remove invalid data, etc)
 * 5. periodically save data to database
 * 6. record the lastest data was saved to database
 */
```

```
/** Info: (20230327 - Shirley)
 * Draw a lvie candlestick chart with Tradingview Lightweight Charts Library
 * 1. Initial job
 * 1.1 setup chart container and chart options with window size
 * 1.2 fetch candlestick chart data from market context
 * 1.3 data cleaning
 * 1.4 draw candlestick chart with data
 * 2. Periodically job
 * 2.1 renew chart with candlestick chart data in marketcontext is updated
 * 2.2 data cleaning
 * 2.3 draw candlestick chart with data
 */
```

```
/** Info: (20230327 - Shirley)
 * Collect market trade data from backend and transform it to a format that can be used by the candlestick chart. 
 * 1. Initial job
 * 1.1 register a listener to the market trade data
 * 1.2 collect market trade data from backend api
 * 1.3 data cleaning
 * 1.4 transform data to a format that can be used by the candlestick chart
 * 2. Periodically job
 * 2.1 set interval to update candlestick chart data every 0.2 second
 * 2.2 add new data ppint with ceil(tine)
 * 2.3 If there is no data for ceil(tine), add a new data point with the last data point close price
 * 2.4 If there is data for ceil(tine), update the data point and remove the last data point close price
 * 2.5 data cleaning for new data point
 * 2.6 transform data to a format that can be used by the candlestick chart
 */
```
# 4. 注意事項
- 可以試著先寫幾行程式，讓 AI 多學習。
- 需要記住的是，GitHub Copilot 是能有效節省開發時間的工具，但它能做到的只是提供語法建議，沒辦法處理太複雜或牽涉商業邏輯的問題，系統的架構還是只能由人來想。把複雜的邏輯依照上述的方法拆成一個個小步驟，再讓 GitHub Copilot 輔助產生語法，是比較理想的開發模式。
