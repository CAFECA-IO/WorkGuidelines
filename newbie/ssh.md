# SSH Operation

> Source: [鳥哥私房菜: 第十一章、遠端連線伺服器 SSH / XDMCP / VNC / RDP](https://linux.vbird.org/linux_server/centos6/0310telnetssh.php#ssh_server)

## SSH 連線實作 - Linux & macOS

### 私鑰登入

### 帳號密碼登入

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
