目錄

- [Tailwind](#tailwind)
  - [問題: Tailwind utility class hint](#問題-tailwind-utility-class-hint)
    - [解法: 安裝 Extension - Tailwind CSS IntelliSense](#解法-安裝-extension---tailwind-css-intellisense)
  - [問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行](#問題-自定義的-class-從-context-傳入-component-使用會無法正確執行)
    - [解法: 因為 `contexts/` 不在 `tailwind.config.js` 範圍內](#解法-因為-contexts-不在-tailwindconfigjs-範圍內)
- [Typescript](#typescript)
  - [問題: 將 useOuterClick 從 JS 改成 TS](#問題-將-useouterclick-從-js-改成-ts)
    - [解法: 使用泛型 (generic) 跟 `function` (而非 `const`)](#解法-使用泛型-generic-跟-function-而非-const)
    - [JS](#js)
    - [改成 TS](#改成-ts)
- [React.js with Typescript](#reactjs-with-typescript)
  - [問題: 使用 useContext 得到的是空值](#問題-使用-usecontext-得到的是空值)
    - [解法: 確認使用 context 的流程](#解法-確認使用-context-的流程)
  - [問題: 從 Parent component 傳值給 Child component](#問題-從-parent-component-傳值給-child-component)
    - [解法: 在 Child component 新增欄位接收 props](#解法-在-child-component-新增欄位接收-props)
  - [問題: 從 Child component 傳值給 Parent component](#問題-從-child-component-傳值給-parent-component)
    - [解法: 在 Parent component 將 callback function 傳給 Child component ，由 callback function 取值](#解法-在-parent-component-將-callback-function-傳給-child-component-由-callback-function-取值)
- [Next.js with Typescript](#nextjs-with-typescript)
  - [問題: 使用 i18n](#問題-使用-i18n)
    - [解法: 確認使用 i18n 使用流程](#解法-確認使用-i18n-使用流程)
    - [切換英文跟繁體中文語系](#切換英文跟繁體中文語系)

# Tailwind

## 問題: Tailwind utility class hint

### 解法: 安裝 Extension - Tailwind CSS IntelliSense

- [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 問題: 自定義的 class 從 Context 傳入 component 使用，會無法正確執行

### 解法: 因為 `contexts/` 不在 `tailwind.config.js` 範圍內

- Sol 1: 檢查 `tailwind.config.js` 的 `content` 是否包含 `src/contexts/`

  ```jsx
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    mode: 'jit',
    content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
    theme: {
  ...
  	},
  }

  ```

  - [commit comparison](https://github.com/CAFECA-IO/TideBit-DeFi/compare/b6d5f2f939411b23339eae77637f0c47565129a7...ac9961c9187325176cf4d7d8d4b3c74147d3595e)

- Sol 2: 在 `src/constants/display.ts` 使用該自定義 class，`src/contexts/`不放 Tailwind 相關的資料，然後在實際使用 Tailwind 的 `src/components/ticker_selector_box` 比對 `src/contexts/`跟 `src/constants/display.ts` 的資料
  - [commit comparison](https://github.com/CAFECA-IO/TideBit-DeFi/compare/ac9961c9187325176cf4d7d8d4b3c74147d3595e...ffda25503ae558913f7d278d477aea4b14480aaf)

# Typescript

## 問題: 將 useOuterClick 從 JS 改成 TS

### 解法: 使用泛型 (generic) 跟 `function` (而非 `const`)

### JS

- 定義 custom Hook

```jsx
import { useState, useEffect, useRef, forwardRef } from 'react';

function useOuterClick(initialVisibleState) {
	const [componentVisible, setComponentVisible] = useState(initialVisibleState);
	const ref = useRef(null);
	// forwardRef(otherProps?.refP) ??
	// const ref = useRef(null);

	const handleClickOutside = (event) => {
		// if (!componentVisible) return;

		if (ref.current && !ref.current.contains(event.target)) {
			setComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return {
		ref,
		componentVisible,
		setComponentVisible,
	};
}

export default useOuterClick;
```

- 使用 custom Hook

```tsx
const {
	ref: notifyRef,
	componentVisible,
	setComponentVisible,
} = useOuterClick(false);
```

### 改成 TS

- 定義 custom Hook

```tsx
import React, { useState, useEffect, useRef, forwardRef } from 'react';

function useOuterClick<T extends HTMLElement>(initialVisibleState: boolean) {
	const [componentVisible, setComponentVisible] =
		useState<boolean>(initialVisibleState);
	const targetRef = useRef<T>(null);

	function handleClickOutside(this: Document, event: MouseEvent): void {
		if (
			event.target instanceof HTMLElement &&
			!targetRef.current?.contains(event.target)
		) {
			setComponentVisible(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return { targetRef: targetRef, componentVisible, setComponentVisible };
}

export default useOuterClick;
```

- 使用 custom Hook

```tsx
const {
	targetRef: notifyRef,
	componentVisible,
	setComponentVisible,
} = useOuterClick<HTMLDivElement>(false);
```

# React.js with Typescript

## 問題: 使用 useContext 得到的是空值

### 解法: 確認使用 context 的流程

- 沒把該 component 放在 Context Provider 底下

1. 在 `market_context.tsx` 建立 `Context` 跟 `Provider`
2. 在 `_app.tsx` 或要用到 Context 的 component (此為 `TickerSelectorBox`) 的上上層用 `Provider` 包住 component

   ```tsx
   <MarketProvider>
   	<UpperUpperTickerSelectorBox />
   </MarketProvider>
   ```

3. 在 `ticker_selector_box.tsx` 運用 `Context` ，就能正常使用 Context

   ```
   // 以下兩種寫法都可以
   const {availableTickers} = useContext<IMarketContext>(MarketContext);
   const {availableTickers} = useContext(MarketContext) as IMarketContext;
   ```

## 問題: 從 Parent component 傳值給 Child component

### 解法: 在 Child component 新增欄位接收 props

- Parent component

  ```tsx
  import ChildComponent from './ChildComponent';

  const ParentComponent = () => {
  	const data = { name: 'John', age: 32 };

  	return <ChildComponent data={data} />;
  };

  export default ParentComponent;
  ```

- Child component

  ```tsx
  type Props = {
  	data: { name: string; age: number };
  };

  const ChildComponent = ({ data }: Props) => {
  	return (
  		<div>
  			<h1>Name: {data.name}</h1>
  			<h2>Age: {data.age}</h2>
  		</div>
  	);
  };

  export default ChildComponent;
  ```

## 問題: 從 Child component 傳值給 Parent component

### 解法: 在 Parent component 將 callback function 傳給 Child component ，由 callback function 取值

- Parent component

  ```tsx
  import ChildComponent from './ChildComponent';

  const ParentComponent = () => {
  	const [dataFromChild, setDataFromChild] = useState({});

  	const handleDataFromChild = (data: { name: string; age: number }) => {
  		setDataFromChild(data);
  	};

  	return (
  		<div>
  			<ChildComponent onDataFromChild={handleDataFromChild} />
  			<pre>{JSON.stringify(dataFromChild, null, 2)}</pre>
  		</div>
  	);
  };

  export default ParentComponent;
  ```

- Child component

  ```tsx
  type Props = {
  	onDataFromChild: (data: { name: string; age: number }) => void;
  };

  const ChildComponent = ({ onDataFromChild }: Props) => {
  	const handleButtonClick = () => {
  		onDataFromChild({ name: 'Jane', age: 28 });
  	};

  	return (
  		<button onClick={handleButtonClick}>Pass data to parent component</button>
  	);
  };

  export default ChildComponent;
  ```

# Next.js with Typescript

## 問題: 使用 i18n

### 解法: 確認使用 i18n 使用流程

- 如果出現 hydration error，很有可能是沒 `import {useTranslation} from 'next-i18next';` 而是從`react-i18next` import 的，改回來就沒問題了
- 每次在 config json 加進新的文字、在 component 上使用 i18n，都需要關掉 `npm run dev` 重新跑一次，不然可能會出現 `nav_bar.Trading`字樣 而非 `Trading` 的多語系轉換

### 切換英文跟繁體中文語系

- 在首頁加上 SSR

  ```jsx
  import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

  const getStaticPropsFunction = async ({ locale }: { locale: any }) => ({
  	props: {
  		...(await serverSideTranslations(locale, ['common', 'footer'])),
  	},
  });

  export const getStaticProps = getStaticPropsFunction;
  ```

- 在首頁底下的 component 直接加上

  ```jsx
  import {useTranslation} from 'next-i18next';

  type TranslateFunction = (s: string) => string;

  const StatisticBlock = () => {
    const {t}: {t: TranslateFunction} = useTranslation('common');
  ...
  const statisticContent = [
      {
        heading: t('home_page.StatisticBlock_Title_1'),
        content: t('home_page.StatisticBlock_Description_1'),
      },
      {
        heading: t('home_page.StatisticBlock_Title_2'),
        content: t('home_page.StatisticBlock_Description_2'),
      },
      {
        heading: t('home_page.StatisticBlock_Title_3'),
        content: t('home_page.StatisticBlock_Description_3'),
      },
    ];

  }
  ```

- 在 locale/en/common.json

  ```jsx
  {
    "nav_bar": {
      "Trading": "Trading",
      "TideBitUniversity": "TideBit University",
      "HelpCenter": "Help Center",
      "WalletConnect": "Wallet Connect"
    },
    "home_page": {
      "Cta_HighlightTitle": "Trusted",
      "Cta_RestTitle": "platform for Crypto investment",
      "Cta_Description": "Start investing now. On TideBit you can learn, buy and sell cryptocurrency assets with the best quality.",
      "Cta_Button": "GET STARTED",
      "StatisticBlock_Title_1": "24h volumn on TideBit",
      "StatisticBlock_Description_1": "365 Billion",
      "StatisticBlock_Title_2": "Users on TideBit",
      "StatisticBlock_Description_2": "30 Billion+",
      "StatisticBlock_Title_3": "Lowest Fee",
      "StatisticBlock_Description_3": "<0.10 %"
    }

  }
  ```

- 在 locale/tw/common.json
  ```jsx
  {
    "nav_bar": {
      "Trading": "交易",
      "TideBitUniversity": "TideBit 大學",
      "HelpCenter": "幫助中心",
      "WalletConnect": "連接錢包"
    },
    "home_page": {
      "Cta_HighlightTitle": "值得信賴的",
      "Cta_RestTitle": "加密貨幣投資平台",
      "Cta_Description": "現在就開始投資。 在 TideBit ，您可以免費學習以及買賣最優質的加密貨幣資產。",
      "Cta_Button": "開始交易",
      "StatisticBlock_Title_1": "TideBit 的 24h 交易量",
      "StatisticBlock_Description_1": "3650億",
      "StatisticBlock_Title_2": "TideBit 的用戶",
      "StatisticBlock_Description_2": "300億+",
      "StatisticBlock_Title_3": "最低手續費",
      "StatisticBlock_Description_3": "<0.10 %"
    }
  }
  ```
