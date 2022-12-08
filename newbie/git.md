# Git

## How to solve this
- push failed
push failed 的原因是其他人已經 push 了新的版本上去，導致 GitHub 判斷遠端和目前推的兩者為無關的 Git 版本，因此拒絕 git push 指令。解決的方法是拉下最新版本的 repository，合併回 local branch，即可建立兩個不同版本庫之間的關聯，就能進行 push 了。
```shell
git pull <remotename> <branchname> --allow-unrelated-histories
```
- --allow-unrelated-histories 允許 Git 合併沒有共同祖先的分支

## Do not do this
- force push
```shell
push -f
```
這個指令會強制 push ，並覆蓋掉遠端分支，請不要在多人協同開發專案時使用

可以使用的時機：
1. 單獨開發專案時
```shell
git push -f origin <mybranch>
```
這個指令只會修改到 <mybranch> 分支，不會影響到其他人

2. 整理歷史紀錄



參考
- https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/24.md
- https://gitbook.tw/chapters/github/using-force-push
