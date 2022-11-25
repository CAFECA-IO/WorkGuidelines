- [SSH Key 連線 Linux VM (Linux \& macOS)](#ssh-key-連線-linux-vm-linux--macos)
  - [創造 SSH Key](#創造-ssh-key)
    - [檢查 .ssh 目錄是否存在](#檢查-ssh-目錄是否存在)
    - [使用 ssh-keygen 產生 ssh 金鑰](#使用-ssh-keygen-產生-ssh-金鑰)
  - [私鑰登入](#私鑰登入)
- [帳號密碼登入](#帳號密碼登入)

> Source: 
[鳥哥私房菜: 第十一章、遠端連線伺服器 SSH / XDMCP / VNC / RDP](https://linux.vbird.org/linux_server/centos6/0310telnetssh.php#ssh_server)

> Source: 
[SSH Key 是什麼？4 步驟實現 SSH 連線免密碼！ – Li-Edward](https://liedward.com/create-ssh-keys/)

## SSH Key 連線 Linux VM (Linux & macOS)

金鑰以建立後會在 ~/.ssh 的資料夾中產生一個 ~/.ssh/id_rsa.pub 檔案。同時也會產生 ~/.ssh/authorized_keys 這個檔案，用於在連線驗證符合 SSH 連線上的對應私密金鑰。更多詳細或是停用密碼都可以在 /etc/ssh/sshd_config 設定。

### 創造 SSH Key

#### 檢查 .ssh 目錄是否存在

```
#建立.ssh資料夾
mkdir -p ~/.ssh

#調整權限 (700只有創立者能編輯進入)
chmod 700 ~/.ssh

#切換到建立之目錄
cd ~/.ssh
```

#### 使用 ssh-keygen 產生 ssh 金鑰

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
SHA256:y6A+bNJnVZ6eUegIldMr4eSO/EtNa9g7q/x5oOysciE shirley@DESKTOP-VFJQDCP
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

### 私鑰登入

```
ssh {USER}@{SERVER}

```

## 帳號密碼登入

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
