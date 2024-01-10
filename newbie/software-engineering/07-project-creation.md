# 專案建立｜Project Creation

## 前端開發的步驟、時程規劃、工作票開立方式
參考此篇 KM : [前端開發時程規劃與開票的標準作業程序（SOP）](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/frontend-project-estimation-sop.md)

## 在 GitHub 建立 Repository

### 步驟
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/9c6f7ba8-29c1-478a-be6c-3e64acd2133f" alt="截圖1/2" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/5e88ec31-30bd-42ba-8df1-4b9685be6fe0" alt="截圖2/2" width="60%">

1. Create a new repository
2. 輸入 Repository name，命名方式為 kebab-case
3. 選擇 Public
4. add a README file 
5. add .gitignore : `Node`
6. choose a license : `MIT License`

### 分支規劃
Repository(a.k.a. Repo) 建立之後會產生預設主分支 main，接著拉出分支 Develop，再從 Develop 拉功能分支進行開發。
所有程式碼不可以直接提交至 main，包含 README.md。

此部份可參考 [Git Flow](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/git-flow.md) : 

>在 GitHub 的 Repository，由 main 拉出一個 branch 叫做 develop。
接著就跟隨 Git Flow 的規則，從 develop 拉出開發者自己的 branch。
開發者開發完成該 branch 後，就建立 PR。
PR 由團隊主管審核後就會自動被併入 develop，開發者再將自己的 branch 刪除。
只有 main 和 develop 兩個分支會始終存在於 Repository，其餘功能分支開發完成後就要刪除。

### 開發環境
參考此篇 KM : [development environment](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/development-environment.md)
