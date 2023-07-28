# 在[墨沫官網](https://www.mermer.cc/en/knowledge-management)中新增 KM 的方法

## 新增 Author

<img width="767" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/bd876b55-cc53-42dc-b584-9d35e4a0cd02">

- 目前作者資料是放在 `src/interfaces/author_data.ts` 裡，新增 KM 前，請先在 `mermerAuthors` 的陣列中加入自己的作者資料
- IAuthor 內容說明：
  - `id`：作為 path 用途，建議使用全小寫英文名字
  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/40cfa646-cba2-4c22-a183-45d9103933d1)
  - `name`：全名(要串翻譯檔)
  - `jobTitle`：職稱(要串翻譯檔)
  - `intro`：自我介紹(要串翻譯檔)
  - `avatar`：頭貼路徑，圖檔請放在 `public/profiles` 資料夾底下
  <img width="256" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/68529ef2-a836-4e4a-a16c-be78df493eca">
- 記得串上翻譯檔，在 `src/locales` 底下的文件中寫入翻譯的內容，key 需使用 UPPER_SNAKE_CASE 命名

// src/locales/tw/commom.json
<img width="944" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/0c7f3346-ab51-4b3c-b28f-23c18605fab0">

// src/locales/en/commom.json
<img width="867" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/7eadbee5-094a-40c5-8a35-6ea18d635687">

- 格式範例：
```js
  {
    id: 'julian',
    name: 'AUTHOR.JULIAN_NAME',
    jobTitle: 'AUTHOR.JULIAN_JOBTITLE',
    intro: 'AUTHOR.JULIAN_INTRO',
    avatar: '/profiles/profile_julian.png',
  }
```

## KM 檔案命名規則

<img width="269" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/2d8c71e5-ca84-4fce-8921-2fc258f6fb2f">

- 統一放在`src/km`資料夾內，命名的規則如下：
  1. `km-` 開頭
  2. YYYYMMDD 格式的 8 位日期數字
  3. 末三位為編號，從 001 開始

- 範例：
  - 2023 年 7 月 21 號的第一則 KM ，檔案名稱應為 `km-20230721001.md`
  - 2024 年 8 月 17 號的第五則 KM ，檔案名稱應為 `km-20240817005.md`

## KM 檔案格式
```md
---
date: 1689696000
title: '新手指南 - SEO'
description:
  '搜尋引擎最佳化（Search engine optimization），簡稱為
  SEO，是藉由調整網站的架構或內容，提高網站在搜尋引擎內排名的行銷方法。提升網站的能見度與流量能夠打響品牌知名度和創造業績，因此所以不少網站都希望以各種形式來影響搜尋引擎的排序，讓自己的網站可以有優秀的搜尋排名。'
picture: '/km/km-julian-20230719001.png'
category: ['KM_CATEGORY.NEWBIE']
authorId: 'julian'
---
...
{以下為 markdown 內容}
```

## 日期格式

- 日期的格式為 10 位的 timestamp ，如 `1689696000`
- [線上轉換工具](https://youtils.cc/timestamp/zh-hants)

## 文章分類(tag)

- category 中可以填入多種標籤，記得也要串上翻譯檔，如：`category: ['KM_CATEGORY.TAG1','KM_CATEGORY.TAG2']`
  
## 圖片位置

<img width="255" alt="image" src="https://github.com/CAFECA-IO/WorkGuidelines/assets/114177573/eb60428b-4f10-4705-a820-d913e5f911f1">

- 放在`public/km`資料夾內，圖片檔沒有命名規範，可以任意取名
- 記得在 KM 檔案中的 `picture` 填入圖片的路徑 `/km/{圖檔名稱}.png`，如：`picture: '/km/01.png'`

