
# Overview

# package.json 設定
為了確保下載 typescript、nest 框架、react、prettier、eslint、pre-commit 要用的 husky 等相關插件，需要先針對 package.json 進行設定

以下提供一個包含上述需要下載的 dependencies 的 package.json 範本:
```
{
  "name": "Your package name",
  "version": "your package version",
  "private": true,
  "dependencies": {
    "@nestjs/cli": "^8.2.6",
    "@nestjs/common": "^8.1.1",
    "@nestjs/config": "^2.1.0",
    "@nestjs/core": "^8.1.1",
    "@nestjs/platform-express": "^8.1.1",
    "@nestjs/serve-static": "^2.2.2",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "babel-loader": "^8.2.5", // 若要使用 webpack 記得加入此檔案
    "nest": "^0.1.6",
    "prettier": "^2.7.1",
    "react-redux": "^8.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "redux": "^4.2.0",
    "reflect-metadata": "^0.1.13", //ts es7
    "sass": "^1.53.0", // 若要使用 sass 加入這行
    "ts-custom-error": "^3.2.0",
    "typescript": "^4.6.4",
    "web-vitals": "^2.1.4", // 若要使用網站指標加入此行
    "webpack": "^5.73.0" // 若要使用 webpack 加入此行
  },
  "scripts": {
    "start:react": "react-scripts start",
    "start": "nest start",
    "build:nest": "nest build",
    "debug:nest": "nest start --debug --watch",
    "build:react": "react-scripts build",
    "eject:react": "react-scripts eject",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|ts|json)\"",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
    "lint": "eslint --ignore-path .gitignore .",
    "validate": "npm run lint && npm run check-format"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.36.2",
    "@typescript-eslint/parser": "^5.36.2",
    "eslint": "^8.23.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-import-resolver-typescript": "^3.5.1",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.6.1",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.31.8",
    "eslint-plugin-react-hooks": "^4.6.0",
    "husky": "^4.3.8",
    "lint-staged": "^13.0.3"
  }
}

```
設定完 package.json 需要進行 npm install
```
npm install
```
# [ts] 若需要使用 ts 需要設定 tsconfig.json

tsconfig.json
```
{
  "compilerOptions": {
    "module": "commonjs",
    "rootDir": "server",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  "include": ["server/", "server/config/.env"]
}

```

# [ts] 接著需要設定 tsconfig.build.json
``` 
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

# 設定 .lintstagedrc
在 root folder 建立 .lintstagedrc 檔案

將 prettier 和 eslint 加入並整合

```
{
  "**/*.{js,jsx,ts,tsx,css}": [
    "prettier --write",
    "eslint ."
  ]
}
```

# 設定 Eslintignore
在 root folder 建立 .eslintignore 檔案

將 eslint 需要排除的檔案（ 不要進行 eslint 的檔案 ）放入 .eslintignore

.eslintignore :
```
!.eslintrc.js
/dist
/build
*.html
*.json
```

# 設定 .prettierrc
在 root folder 建立 .prettierrc 檔案

將 airbnb 的 coding style config 加入 prettier 設定檔中

.prettierrc
```
{
    "$schema": "http://json.schemastore.org/prettierrc",
    "arrowParens": "avoid",
    "bracketSpacing": false,
    "jsxSingleQuote": false,
    "printWidth": 100,
    "proseWrap": "always",
    "quoteProps": "as-needed",
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "useTabs": false
}
```
# File Structure
前端 react 的部分需要新增 src folder 放入主程式， 再新增 component 資料夾放入 react component、pages folder 放入頁面、container folder 放入主要的 app component。

另外，需要新增 public folder 放入 asset folder (images) 、 favicon.ico (網站縮圖) 、 index.html（入口 html) 、 manifest.json (網站縮圖尺寸等設定）

---

以下為 react 的參考 folder structure
- 前端 file structure

<img width="192" alt="Screen Shot 2022-09-12 at 11 23 04 AM" src="https://user-images.githubusercontent.com/29693123/189568195-e9ab38a9-a50f-4f42-bed2-c3018f7cf646.png">

參考程式碼：

index.js
```
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './container/app/app';

// create react root
const root = createRoot(document.getElementById('root'));

// initialize I18nProvider, CookieProvider, App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

components/about/about.js
```
import React, {Component} from 'react';
import './about.scss';

class About extends Component {
  // A constructor is used to inherit the value (prop)  from upper class
  /**
   * @param props means value from the upper class
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  // show the text in about component
  render() {
    return (
      <div className="c_about">
        <div>
          <div className="title">關於我們</div>
        </div>
        <div> Test sample</div>
      </div>
    );
  }
}

export default About;

```

components/routers/router.js
```
import React from 'react';
import HomePage from '../../pages/homepage/homepage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// routers return the BrowserRouter and pages(viewer)
const routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routers;

```

container/app/app.js
```
import React from 'react';
import './app.scss';
import Routers from '../../components/routers/routers';

const APP = () => {
  // app create routers
  return <Routers></Routers>;
};

export default APP;

```

pages/homepage/homepage.js
```
import React, {Component} from 'react';
import About from '../../components/about/about';
import './homepage.scss';

class HomePage extends Component {
  render() {
    // put header , chinasuntv, programlist, about, contact, footer in the homepage
    return <About></About>;
  }
}

export default HomePage;

```

- public folder - index.html 入口點

<img width="149" alt="Screen Shot 2022-09-12 at 11 24 55 AM" src="https://user-images.githubusercontent.com/29693123/189568430-9a297627-7d6e-4c93-ac87-fa422243bc9e.png">
 
參考程式碼：

manifest.json
```
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>website title</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

---
後端使用 nest 框架，此處將 nest 後端的 root folder 設置為 server

在以下的 file structure 中，會有用來啟動 module 的 main.ts、主要的 module : app_module.ts、主要的 controller : app_controller.ts、主要的 app service app_service.ts，其他的 folder 介紹則如下：

- controller folder: 放入其他新建立的 controller
- service folder: 放入其他新建立的 service
- module folder: 放入其他新建立的 module
- middleware folder: 放入主要的 middleware
- util: 任何要共用的程式碼 function 放入此

- 後端 file structure

<img width="163" alt="Screen Shot 2022-09-12 at 1 32 02 PM" src="https://user-images.githubusercontent.com/29693123/189580336-b750a208-858d-4bb5-9ec2-9b40089436b8.png">



