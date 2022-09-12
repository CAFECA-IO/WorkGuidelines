
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

# 設定 Eslintignore
建立 .eslintignore 檔案

將 eslint 需要排除的檔案（ 不要進行 eslint 的檔案 ）放入 .eslintignore

.eslintignore
```
!.eslintrc.js
/dist
/build
*.html
*.json
```

# Folder Structure
前端 folder structure

<img width="192" alt="Screen Shot 2022-09-12 at 11 23 04 AM" src="https://user-images.githubusercontent.com/29693123/189568195-e9ab38a9-a50f-4f42-bed2-c3018f7cf646.png">

public folder - index.html 入口點

<img width="149" alt="Screen Shot 2022-09-12 at 11 24 55 AM" src="https://user-images.githubusercontent.com/29693123/189568430-9a297627-7d6e-4c93-ac87-fa422243bc9e.png">

後端 folder structure

<img width="162" alt="Screen Shot 2022-09-12 at 11 26 54 AM" src="https://user-images.githubusercontent.com/29693123/189568552-14a59e51-d610-4f1c-82c0-381cf20c06e2.png">



