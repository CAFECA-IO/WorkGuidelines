# SSH Operation

> Source: [鳥哥私房菜: 第十一章、遠端連線伺服器 SSH / XDMCP / VNC / RDP](https://linux.vbird.org/linux_server/centos6/0310telnetssh.php#ssh_server)

SSH (Secure SHell protocol) 透過資料封包加密技術，將等待傳輸的封包加密後再傳輸到網路上，是類似 telnet 的遠端連線使用 shell 的伺服器，也是類似 FTP (File Transfer Protocol) 服務的 sftp-server。

## 非對稱金鑰

常見的網路封包加密技術是藉由『非對稱金鑰系統』來處理的。 主要是透過兩把不一樣的公鑰與私鑰 (Public and Private Key) 來進行加密與解密的過程。由於這兩把鑰匙是提供加解密的功用， 所以在同一個方向的連線中，這兩把鑰匙當然是需要成對的！它的功用分別如下：

公鑰 (public key)：提供給遠端主機進行資料加密的行為，也就是說，大家都能取得你的公鑰來將資料加密的意思；

私鑰 (private key)：遠端主機使用你的公鑰加密的資料，在本地端就能夠使用私鑰來進行解密。私鑰是不能夠外流的！只能保護在自己的主機上。

由於每部主機都應該有自己的金鑰 (公鑰與私鑰)，且公鑰用來加密而私鑰用來解密， 其中私鑰不可外流。但因為網路連線是雙向的，所以，每個人應該都要有對方的『公鑰』才對！那如果以 ssh 這個通訊協定來說，在用戶端與伺服器端的相對連線方向上，應該有如下的加密動作：

![image](https://linux.vbird.org/linux_server/centos6/0310telnetssh//keypair-2.gif)

## SSH 連線簡介

連線步驟:

1. 伺服器建立公鑰檔： 每一次啟動 sshd 服務時，該服務會主動去找 /etc/ssh/ssh_host\* 的檔案，若系統剛剛安裝完成時，由於沒有這些公鑰檔案，因此 sshd 會主動去計算出這些需要的公鑰檔案，同時也會計算出伺服器自己需要的私鑰檔；

2. 用戶端主動連線要求： 若用戶端想要連線到 ssh 伺服器，則需要使用適當的用戶端程式來連線，包括 ssh, pietty 等用戶端程式；

3. 伺服器傳送公鑰檔給用戶端： 接收到用戶端的要求後，伺服器便將第一個步驟取得的公鑰檔案傳送給用戶端使用 (此時應是明碼傳送，反正公鑰本來就是給大家使用的！)；

4. 用戶端記錄/比對伺服器的公鑰資料及隨機計算自己的公私鑰： 若用戶端第一次連接到此伺服器，則會將伺服器的公鑰資料記錄到用戶端的使用者家目錄內的 ~/.ssh/known_hosts 。若是已經記錄過該伺服器的公鑰資料，則用戶端會去比對此次接收到的與之前的記錄是否有差異。若接受此公鑰資料， 則開始計算用戶端自己的公私鑰資料；

5. 回傳用戶端的公鑰資料到伺服器端： 用戶將自己的公鑰傳送給伺服器。此時伺服器：『具有伺服器的私鑰與用戶端的公鑰』，而用戶端則是： 『具有伺服器的公鑰以及用戶端自己的私鑰』，你會看到，在此次連線的伺服器與用戶端的金鑰系統 (公鑰+私鑰) 並不一樣，所以才稱為非對稱式金鑰系統喔。

6. 開始雙向加解密： (1)伺服器到用戶端：伺服器傳送資料時，拿用戶的公鑰加密後送出。用戶端接收後，用自己的私鑰解密； (2)用戶端到伺服器：用戶端傳送資料時，拿伺服器的公鑰加密後送出。伺服器接收後，用伺服器的私鑰解密。

![image](https://linux.vbird.org/linux_server/centos6/0310telnetssh//ssh-keypair2.gif)

## SSH 連線實作 - Linux & macOS

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
