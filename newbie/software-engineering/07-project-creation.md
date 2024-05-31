# 專案建立｜ Project Creation

## 前端開發的步驟、時程規劃、工作票開立方式

參考此篇 KM : [前端開發時程規劃與開票的標準作業程序（SOP）](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/frontend-project-estimation-sop.md)

## 在 GitHub 建立 Repository

### 步驟

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/9c6f7ba8-29c1-478a-be6c-3e64acd2133f" alt="截圖1/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/5e88ec31-30bd-42ba-8df1-4b9685be6fe0" alt="截圖2/5" width="60%">

1. Create a new repository
2. 輸入 Repository name，命名方式為 UpperCamelCase 
3. 選擇 Public
4. add a README file
5. add .gitignore : `Node`
6. choose a license : `MIT License`

### 專案設定

Repository settings : **Branch protection rule** (for `main` and `develop` branches) <br/>
勾選以下選項（通常預設是已經勾選，但請再次確認）：

✅ Require a pull request before merging <br/>
When enabled, all commits must be made to a non-protected branch and submitted via a pull request before they can be merged into a branch that matches this rule.

✅ Require approvals <br/>
When enabled, pull requests targeting a matching branch require a number of approvals and no changes requested before they can be merged.(Required number of approvals before merging: 1)

✅ Require status checks to pass before merging <br/>
Choose which status checks must pass before branches can be merged into a branch that matches this rule. When enabled, commits must first be pushed to another branch, then merged or pushed directly to a branch that matches this rule after status checks have passed.

✅ Require conversation resolution before merging <br/>
When enabled, all conversations on code must be resolved before a pull request can be merged into a branch that matches this rule. Learn more about requiring conversation completion before merging.

<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/11f68a03-b7bd-440c-8608-79470fd84aa3" alt="截圖3/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/0ad1695e-a777-4192-8b1c-23c7fdced6b7" alt="截圖4/5" width="60%">
<img src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/105651918/ba0f0fdf-1191-4198-a3aa-d0fbe2e82ee3" alt="截圖5/5" width="60%">

### 分支規劃

Repository(a.k.a. Repo) 建立之後會產生預設主分支 main，接著拉出分支 Develop，再從 Develop 拉功能分支進行開發。

> [!CAUTION]
> 所有程式碼 (包含 README.md)，都不可以直接提交至 main。

關於分支規劃的部份可參考此篇文章 [Git Flow](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/git-flow.md)，以下為節錄：

> 在 GitHub 的 Repository，由 main 拉出一個 branch 叫做 develop。 <br />
> 接著就跟隨 Git Flow 的規則，從 develop 拉出開發者自己的 branch。 <br />
> 開發者開發完成該 branch 後，就建立 PR。 <br />
> PR 由團隊主管審核後就會自動被併入 develop，開發者再將自己的 branch 刪除。 <br />
> 只有 main 和 develop 兩個分支會始終存在於 Repository，其餘功能分支開發完成後就要刪除。

### 開發環境

參考此篇 KM : [development environment](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/development-environment.md)

### 撰寫 README.md

參考此篇 KM : [README Writing](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/tips/readme-writing.md)
