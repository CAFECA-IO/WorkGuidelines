# Wireframe 與 Mockup 閱讀

- [釐清目標功能](#釐清目標功能)
- [依需求切版](#依需求切版)
- [Figma 基本功能介紹](#figma-基本功能介紹)
- [切版技巧](#切版技巧)

Wireframe（線框圖）是簡單的草稿圖，目的在於確認目標功能和大致的 UI 佈局，通常只有黑白的框線。Mockup（視覺稿）則是根據 Wireframe 進行配色和樣式設計，加強視覺效果，而專案的成品需要與之一致。

不論是 Wireframe 或 Mockup，前端工程師都需要從這兩個步驟開始

1. 從頁面編碼對照系統架構書的說明，釐清目標功能以及頁面間的互動關係
2. 依功能需求切割畫面（切版），規劃 component

## 釐清目標功能

以 ASICEX 的 Wireframe 為例，先查看系統架構書：

![架構書截圖](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/c335ddd0-1027-4ce8-b68b-b1d18034550a)

根據架構書找出對應的頁面，這裡以註冊（AEXWF-000002）和登入（AEXWF-000022）為例，確認需求功能和互動關係：

![註冊  登入畫面](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/eb2c39b7-d12e-41ed-be0e-bb901463a499)

釐清了每個區塊各自的功能，就能開始切版和規劃 component 了。

## 依需求切版

依據功能不同，規劃出以下  component：

![註冊 登入元件](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/c55e60f6-1cf2-4059-9f07-9ff2594dc572)

- LoginPageBody：包在 LoginPage 最外層的容器
- RegistrationPanel：送出註冊資料的表單
- LoginPanel：送出登入資料的表單

除此之外，我們還需要繪製出 class diagram、component diagram、sequence diagram，並規劃好 API 的接口，詳細請參考 [開發規格文件撰寫](#開發規格文件撰寫) 這個章節。

![ASICEX Component Diagram - Registration, Login, Logout](https://github.com/CAFECA-IO/ASICEX/assets/114177573/8aaa383e-1d10-4d54-a8d9-337162435668)

> ASICEX - Registration, Login, Logout component diagram

![ASICEX122](https://github.com/CAFECA-IO/Documents/assets/114177573/e0616038-7955-491b-b885-973909959a8f)

> ASICEX - Login sequence diagram

## Figma 基本功能介紹

![Figma](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/45554440-cd02-4bbd-a8e3-e6a50fb52186)

### 工作模式（黃色區域）

設計模式和開發模式的切換按鈕。如果你正在開發中，記得切換到 Dev mode ，以免不小心修改到設計稿。
關於 Dev mode 的詳細介紹可以參考[這篇 KM](https://github.com/CAFECA-IO/KnowledgeManagement/blob/25ecefb8d967b62d79d3d1c1202fb4df6bededff/UI/Figma%202023%20Update.md)。

### Page （紫色區域）

Figma 提供建立多個 page 的功能，可以在這裡切換不同頁面進行查看。

### 物件層級 （綠色區域）

以階層的方式呈現各個物件在頁面中的位置，幫助了解物件的層級和相依關係。

### 主畫面（紅色區域）

呈現設計內容的區域，顯示 UI 應該看起來的樣子。

### 物件屬性（藍色區域）

顯示物件的顏色、樣式、圖片資產等內容。這裡可以直接輸出圖片或 CSS 樣式，加速開發的進度。

### 註解

![comment1](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/dc6456ad-a369-4cfb-b511-7a84a71c16f3)

 請記得注意其他人在 Comment 留下的訊息！

![comment2](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/e2f7687c-dd96-4833-b5e3-6090dda1cb10)

![comment3](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/1ed7d547-c441-4dfd-99fa-7cc9b0b993a3)

點擊工具列左上方可以查看所有註解，對話框出現紅點代表有新的 comment。

## 切版技巧

如果你在切版的時候遇到一點小狀況，可以參考以下兩點

- 根據功能分類：功能一致的物件就切在同一個層級（div），不同的則分開
- 根據物件排列方向：當遇到方向不同的物件，就細分一層。

![BAIFA_EXP1](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/96d44acb-d326-4990-8834-39f667a8d9e7)

![BAIFA_EXP2](https://github.com/CAFECA-IO/KnowledgeManagement/assets/114177573/ee62a384-d96e-4d74-8fb4-b229bb2105d4)

以上圖的 BAIFA 官網為例，頁面上的物件大致都是沿著紅色箭頭方向排列，因此最外層應該會有一個以 Y 軸為主軸的大 div。

而有些物件底下會有沿著紫色箭頭方向排列的小物件，這時就可以分割出以 X 軸為主軸的小 div。
