# Pre-work

## Collect prompt

- 至 [Midjourney Explore](https://www.midjourney.com/app/feed/) 輸入關鍵字先行瀏覽他人產出之圖片，並彙集自己所需的關鍵字
- 針對構圖先行準備好必備的關鍵字，如：生成風格、色調、角度

  生成風格範例： 3D, 2D, Animate, Picture, Comic, Cartoon, Realistic, Cyberpunk, Outline, Sketch, Painting, Vector 等

  色調範例：Bright, Dark, High Contract, solid, Gradient, warm, cool, black and white, color name 等

  角度範例：Super elevation, High angle, Eye level, Low angle, Bird's eye view

# Onboard

## Prompt

- 於Discord 的 Midjourney 對話，輸入 /imagine 後鍵入關鍵字
- 關鍵字鍵入順序為: Image Prompts[非必要，以圖產圖]——Text Prompt[關鍵字]——Parameters[製圖條件，未鍵入則以系統Default製圖]
  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/2363613d-51ee-4779-b611-81a13e10586f)
- 送出後會產出四張圖，可再針對四張圖進行縮放或變異：U 按鍵為產出相對應圖片的放大版並且增加更多細節，V 按鍵為產出以想對應圖片為基礎的四張新圖片，🔄鍵則為以相同關鍵字重新產出四張圖
  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/80f433b9-1ffb-4be5-9f9a-762fbc5b3f45)

## Parameters

- Aspect Ratios [製圖比例，Default為1:1]

   於所有關鍵字後加入 ”--aspect <value>:<value>, or --ar <value>:<value>“ 可調整產圖比例
    ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/fc5258d7-ed22-41c1-9e6f-ef3c2609c1d3)

- Chaos [製圖變化，Default為0]

    於所有關鍵字後加入"--chaos <value> or --c <value>"，value 數值為 0-100，數字越大，所產出的四張圖之間的差距越大，也越容易產生較天馬行空的圖

    Low:
    ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/710f2889-e05c-48aa-a44c-92f73795fecd)


    High:
    ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/466ca732-1811-4da6-824e-f4dc2190a16a)


- No [排除關鍵字]

    於所有關鍵字後加入"--no item1, item2, item3“，可排除不要的物體、顏色等

- Quality [算圖品質，Default為1]

    於所有關鍵字後加入"--quality <value> or --q <value>"，value 數值為 .25 或 .5 或 1，數字越大，圖片細節越多，算圖時間越長

    --quality .25
  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/ae40b85b-9a8c-4f97-9231-b9b843c8237f)

     --quality 1
  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/9f44c8ef-ec84-4193-af9b-4fb28da8fa8f)


- Repeat[預設算圖次數，Default為1]
   於所有關鍵字後加入"--repeat <values>“， value 為 2–10，可直接設定算圖次數

- Seed [種子參數，Default為隨機]

    於所有關鍵字後加入"--seed <value>“，value 為 0–4294967295，可於 Discord 中針對某圖像回覆“✉️ ”，並改獲取該圖像的 seed value，透過限縮圖像的seed值可產出較相近的圖片。

- Stop [預先中斷算圖，Default為100]

    於所有關鍵字後加入"--stop <value>"，value 為 10-100，數值越低，越能產出細節較少較模糊的圖像


    --stop 10

    ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/e40d4068-303e-4dae-8859-4df18607453f)

    --stop 100

    ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/74297515-c0ac-461e-9f4f-d1ea354b0e1f)



- Stylize [藝術化程度，Default為100]

  於所有關鍵字後加入"--stylize <value> or --s <value>"，value 為 10-1000，數值越低能產出與關鍵字較為接近但創意度較低的圖片，數字越高則反之

  --stylize 100 (default)

  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/d6d363b4-d3ee-48f9-b976-df8e0c94b59f)

  --stylize 1000

  ![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/5ee50a8a-465b-4fa1-a9d3-b1d782e00678)

  
- Tile [產出可重複排列之pattern]

  於所有關鍵字後加入"--tile“ 可產出可重複排列之圖，方便用於材質或pattern使用

![image](https://github.com/CAFECA-IO/WorkGuidelines/assets/98379087/f4717a6b-a098-448d-8200-fd1810e807b8)
