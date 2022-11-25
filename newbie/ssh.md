- [1. SSH Key 連線 Linux VM (Linux \& macOS)](#1-ssh-key-連線-linux-vm-linux--macos)
  - [1.1. 創造 SSH Key 並將 SSH Key 的公鑰放到 Linux VM](#11-創造-ssh-key-並將-ssh-key-的公鑰放到-linux-vm)
    - [1.1.1. 檢查 .ssh 目錄是否存在](#111-檢查-ssh-目錄是否存在)
    - [1.1.2. 使用 ssh-keygen 產生 ssh 金鑰](#112-使用-ssh-keygen-產生-ssh-金鑰)
    - [1.1.3. 透過 ssh-copy-id 複製 ssh 金鑰到 Linux VM](#113-透過-ssh-copy-id-複製-ssh-金鑰到-linux-vm)
  - [1.2. 私鑰登入](#12-私鑰登入)
- [2. 帳號密碼登入](#2-帳號密碼登入)

> Source:
> [鳥哥私房菜: 第十一章、遠端連線伺服器 SSH / XDMCP / VNC / RDP](https://linux.vbird.org/linux_server/centos6/0310telnetssh.php#ssh_server)

> Source:
> [SSH Key 是什麼？4 步驟實現 SSH 連線免密碼！ – Li-Edward](https://liedward.com/create-ssh-keys/)

## 1. SSH Key 連線 Linux VM (Linux & macOS)

金鑰以建立後會在 ~/.ssh 的資料夾中產生一個 ~/.ssh/id_rsa.pub 檔案。同時也會產生 ~/.ssh/authorized_keys 這個檔案，用於在連線驗證符合 SSH 連線上的對應私密金鑰。更多詳細或是停用密碼都可以在 /etc/ssh/sshd_config 設定。

### 1.1. 創造 SSH Key 並將 SSH Key 的公鑰放到 Linux VM

#### 1.1.1. 檢查 .ssh 目錄是否存在

```
#建立.ssh資料夾
mkdir -p ~/.ssh

#調整權限 (700只有創立者能編輯進入)
chmod 700 ~/.ssh

#切換到建立之目錄
cd ~/.ssh
```

#### 1.1.2. 使用 ssh-keygen 產生 ssh 金鑰

![image](https://user-images.githubusercontent.com/20677913/203984403-b8114901-9201-42b8-ac6e-81775c4e2448.png)

```
ssh-keygen [-t rsa|dsa] <==可選 rsa 或 dsa
ssh-keygen  <==用預設的方法建立金鑰
```

```
~$ ssh-keygen

Generating public/private rsa key pair.

Enter file in which to save the key (/home/shirley/.ssh/id_rsa): [按Enter]

Enter passphrase (empty for no passphrase): [按Enter]

Enter same passphrase again: [按Enter]

Your identification has been saved in /home/shirley/.ssh/id_rsa
Your public key has been saved in /home/shirley/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:y6A+bNJnVZ6eUegIldMr4eSO/EtNa9g7q/x5oOysciE shirley@DCPDCP
The key's randomart image is:
+---[RSA 3072]----+
|         o       |
|        * .      |
|       = o o     |
|      . + + .    |
|     ..+S*.o     |
|    E.+o+**.     |
|   o.. ==o=+     |
|  ..* +++.+o.    |
|   o.*.o*+=+     |
+----[SHA256]-----+

```

#### 1.1.3. 透過 ssh-copy-id 複製 ssh 金鑰到 Linux VM

將產生的 id_rsa.pub 這個公開金鑰複製到 Linux 伺服器上的 ~/.ssh/authorized_keys 檔案中：

```
ssh-copy-id -i ~/.ssh/id_rsa.pub {USER}@{SERVER}
```

### 1.2. 私鑰登入

將公開金鑰放在 Linux 伺服器上之後，就可以不用打密碼登入 Linux 了：

```
ssh {USER}@{SERVER}

```

## 2. 帳號密碼登入

- 使用 IP、帳號、密碼連線登入遠端主機，127.0.0.1 為範例 IP

```

> ssh ACCOUNT_NAME@127.0.0.1
The authenticity of host '127.0.0.1 (127.0.0.1)' can't be established.
RSA key fingerprint is eb:12:07:84:b9:3b:3f:e4:ad:ba:f1:85:41:fc:18:3b.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

> ACCOUNT_NAME@127.0.0.1's password: [輸入密碼]

```

- 離開這次的 SSH 連線

```

> exit

```
