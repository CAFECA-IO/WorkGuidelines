## Preparation

### 想好文章的目標觀眾是誰

1. 想透過 CFD 賺錢、又對區塊鏈有興趣的各個社會階層的人

### 依照目標觀眾擬訂好文章大綱

1. **文章簡介，標註預測的漲跌**
2. **各國對加密貨幣、區塊鏈的監管政策**
3. **該鏈相關的技術發展跟代幣經濟、或對手的技術發展**（以ETH為例，就是 Layer 2 的各種 Scalable solutions 的發展，以及各種在相關鏈上的應用；而競爭對手就是 Solana、BNB 、…等其他 Layer 1，及鏈上應用的進展）
4. **宏觀經濟展望**，蒐集可用於窺探未來景氣的數據或新聞，例如美國.中國.歐盟.日本.印度.英國的貨幣政策、非農就業數據（就業人數、就業率、失業率）、消費者物價指數(CPI)、CPI年增率、房地產市場、GDP……等
    1. ［另外延伸］可能引起通膨或影響民生經濟的要素
        1. 糧食：氣候變遷、農業跟畜牧業發展
        2. 能源：石油、再生能源產業
        3. 天災
        4. 戰爭
        5. 金融事件，例如銀行倒閉、恆大事件等等
        6. 傳染病大流行
        7. ……會危害人類生存的事件
5. **文章結論，概括剛剛講的重點，再重申一次預測的漲跌**

### 蒐集資料、確保資料可信度

1. 依照大綱蒐集資料，也許可以嘗試用 Bing AI 來找新聞，或者平時追蹤一些新聞網站，看到符合大綱的新聞就隨手丟到資料夾裡，時間到了再拿出來。
2. 寫文章前確認新聞可信度，如果知名新聞網站有相關報導，通常就可以當作材料。

## Initial research

每個段落的新聞蒐集至少2篇

### 監管

- 關鍵字
    - crypto news
    - crypto regulation
    - eu crypto
- 網站
    - [CNBC](https://www.cnbc.com/cryptoworld/)
    - [CoinDesk](https://www.coindesk.com/business/)
    - [Cointelegraph](https://cointelegraph.com/)

### 技術

- 網站
    - [鏈新聞](https://abmedia.io/category/trend/technology-development)
    - [動區動趨](https://www.blocktempo.com/category/technology/technology-eth/)
- 關鍵字
    - layer 2 tech
    - eth tech

### 經濟

- 關鍵字
    - overall economy news
    - us monetary policy
    - FED
    - inflation
- 網站
    - [CNN](https://edition.cnn.com/business/economy)
    - [Financial Times](https://www.ft.com/global-economy)
    - [Reuters](https://www.reuters.com/business/)
    - CNBC ([Economy](https://www.cnbc.com/economy/)｜[Finance](https://www.cnbc.com/finance/))
    - [WSJ](https://www.wsj.com/news/economy?mod=nav_top_section)

## Steps

1. 依照大綱以及收集到的新聞資料，分配各段落的長度，確保文章總字數在 600 ~ 1000 字內，大約是五分鐘內能讀完的長度。
2. 花費大把時間撰寫文章
3. 用工具檢查文法
    - Grammarly
4. 用工具修飾文章
    - Claude
    - NotionAI
    - ChatGPT
    - …其他 AI 工具

## Guide - Article Writing (Ethereum for example)

### Introduction

簡要概述本文涵蓋的內容，包括重點新聞、重點技術發展、預測下周價格漲跌等等，大概150字以內。

### Global Regulatory Stance

闡述過去一周各國對區塊鏈跟加密貨幣的最新監管政策消息，或者有連貫性、持續在發生還沒落幕監管新聞，以及討論這些監管變化可能會對區塊鏈或以太幣價格造成什麼樣的影響。

### Technological Advancements in ETH

闡述過去一周跟以太坊相關的技術發展，並討論這些進步如何影響以太幣價格。

### Economic Outlook and Trends

依照過去一周發生的事件，利用這些事件或數據猜測未來可能的經濟情況。

### Summary

總結文章要點，比文章簡介更多地涵蓋每個段落的重點，重申對下周價格預測的漲跌，大約250字以內。

最後加上標語，提醒讀者，加密貨幣市場高度波動且不可預測。 鼓勵他們在做出投資決定之前自行研究並諮詢財務顧問。

### Reference

羅列所有撰寫文章用到的參考來源

## AI prompts (ChatGPT-3.5 & ChatGPT-4 for example)

- Caveat
    - 不相關的個別句子修改就另外開一個 chat 詢問，避免轉移整串累積下來的注意力 (token limit / memory)
    - 視情況打開 Browsing plugin 或選擇 default，很多時候不用開 browsing，GPT3.5 或 GPT4 也能連網
<img width="500" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/7f828d08-fba5-49cf-abef-1a150222c8fb">
<img width="400" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/c02978ea-07f0-4d97-9bbf-04eee527fbe3">

### 給人設

*依照回答滿意度考慮下次要不要給人設

- You’re a sophisticated financial journalist with broad blockchain and computer science expertise.
- `Do sth` with insights of a professional and experienced economist with profound knowledge of software engineering

### 修改文章

You’re a sophisticated financial journalist with broad blockchain and computer science expertise. Modify the following article to be easy-understanding crypto news from the perspective of the prediction of `xx% depreciation/appreciation` of Ether, referring to all sources here ````

Besides, remain the structure of the article.

You are a highly knowledgeable financial journalist with extensive blockchain and computer science expertise. Reframe the following article to provide an in-depth analysis of projected `xx% depreciation/appreciation` of Ether, incorporating all references ````

Besides, remain the structure of the article.

### 新聞摘要

- Summarize the following sources to 50 words separately at most in English.

### 寫總結

- Conclude the following article.

### 修正句子/換句話說

- Correct “`…`”
- Correct the sentence “`…`”
- 20 similar expression to “`…`”
- 20 synonyms for “`…`”

### Examples
![screencapture-chat-openai-c-3dbdac9e-58a5-4cd1-a7b1-6bd51e91b34b-2023-06-29-15_56_23](https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/70bafa35-adc7-4b46-b6c2-3c1a98f6f9b8)

![screencapture-chat-openai-2023-06-29-16_15_39](https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/7daa2566-3674-4693-a936-1c116e7b48da)

![screencapture-chat-openai-2023-06-29-16_28_29](https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/b28d2304-e56b-4182-a3c7-b0b9d4d03cca)

![screencapture-chat-openai-2023-06-29-16_52_20](https://github.com/CAFECA-IO/WorkGuidelines/assets/20677913/9fc80155-8dc6-4639-af66-6aa42eeb4eb1)





