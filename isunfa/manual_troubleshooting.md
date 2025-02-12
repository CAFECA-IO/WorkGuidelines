Table of Contents

- [■ 問題排除與除錯 (Troubleshooting \& Debugging)](#-問題排除與除錯-troubleshooting--debugging)
  - [前言 (Introduction)](#前言-introduction)
  - [問題描述與初步確認 (Initial Checks)](#問題描述與初步確認-initial-checks)
  - [服務容器狀態檢查 (Check Containers Status)](#服務容器狀態檢查-check-containers-status)
  - [環境與設定檔 (.env / docker-compose) 比對 (Configuration Check)](#環境與設定檔-env--docker-compose-比對-configuration-check)
  - [常見錯誤與對應處理方式 (Common Issues \& Solutions)](#常見錯誤與對應處理方式-common-issues--solutions)
  - [進階排錯技巧 (Advanced Troubleshooting)](#進階排錯技巧-advanced-troubleshooting)
  - [除錯案例 (Case Studies)](#除錯案例-case-studies)
  - [結論 (Conclusion)](#結論-conclusion)
  - [附錄 (Appendix)](#附錄-appendix)
    - [常用 Debug 指令參考](#常用-debug-指令參考)

# ■ 問題排除與除錯 (Troubleshooting & Debugging)

## 前言 (Introduction)

本文件旨在提供 iSunFA 專案在發生問題時的排查流程與除錯方法，讓開發者或維運人員能快速找到問題癥結，並進行修復。

iSunFA 透過 Docker Compose 在 Linux / macOS 上部署多個服務容器 (包含 isunfa、aich、faith、nginx、ollama、ofelia、postgres 及 GPU 加速等)，各服務之間相互依賴，若某容器發生錯誤，便可能影響整體系統功能。

在正式開始除錯之前，請先參考[本專案的主要 README](https://github.com/CAFECA-IO/ServerSwarm/tree/develop/isunfa)，瞭解：

• 伺服器與容器啟動流程 (「環境建置」、「啟動 docker compose」章節)

• 各服務容器介紹 (container dependency)

• domain 設定、.env 檔填寫方式

• GPU 安裝與設定 (若有使用 GPU 加速)

如有需要，也可參考[「遷移 iSunFA 服務集群」章節](https://github.com/CAFECA-IO/ServerSwarm/tree/develop/isunfa)，幫助你在不同環境間對應各種設定或資料備份。

在使用過程中，常見的錯誤可能發生在三個主要層級：

1. **主機 (Host) 層級：系統資源不足、Nvidia 驅動、網路設定，以及 Docker Daemon 本身與主機整合時可能出現的問題。**
2. **Docker / 容器層級：容器相依設定 (depends_on)、memory/CPU/GPU 配置、network bridge、Volume 掛載、健康檢查 (healthcheck) 錯誤等。**
3. **程式碼 (Code) 層級：Node.js 應用程式錯誤、npm 依賴缺失、環境變數 (.env) 配置不正確、啟動腳本 (start.sh)) 沒有正確執行等。**

## 問題描述與初步確認 (Initial Checks)

當發生問題時，建議先進行以下基礎確認：

1. 環境區分：

   - 出錯的是 [[isunfa.tw](http://isunfa.tw/)] (staging) 還是 [[isunfa.com](http://isunfa.com/)] (production)？
   - 在 [[isunfa.tw](http://isunfa.tw/)] (staging) 出錯時，連線到運行 isunfa `staging` 環境的機器，並且移到 ServerSwarm iSunFA 的 docker-compose yml 所在位置，方便做後續操作

     ```bash
     # 替換成自己的資訊
     ssh username@211.22.118.146

     cd /workspace/ServerSwarm/isunfa
     ```

   - 在 [[isunfa.com](http://isunfa.com/)] (production) 出錯時，連線到運行 isunfa `production` 環境的機器，並且移到 ServerSwarm iSunFA 的 docker-compose yml 所在位置，方便做後續操作

     ```bash
     # 替換成自己的資訊
     ssh username@211.22.118.147

     cd /home/workspace/ServerSwarm/isunfa
     ```

2. SSH / 網路連線：
   - 確認當前終端機能否正常 SSH 進入指定 IP。
   - 若無法 SSH，請先檢查網路、防火牆、或使用者密碼/金鑰。
3. Docker / 伺服器狀態：
   - 使用 `docker --version` / `systemctl status docker` 檢查 Docker 是否正常啟動。
   - 確認 `/var/run/docker.sock` 權限，以及 docker-compose 是否安裝正確。
   - 若有使用 GPU，請用 nvidia-smi 或 lsmod | grep nvidia 驗證主機是否辨識到 GPU。若無辨識到 GPU，請回頭參考專案的 README「確認 GPU 相關驅動程式是否安裝（可選）」一節。

若這些基礎檢查均正常，則可進一步進行容器檢查與日誌分析。

## 服務容器狀態檢查 (Check Containers Status)

利用 Docker 的基本指令了解各容器狀況：

1. 容器清單與狀態

   `docker ps`

   或

   `docker compose ps`

   - 此處可檢查容器是否已正常啟動或不斷重啟 (Restarting)。
   - 若有重啟行為，請立即查看該容器 logs。

2. 查看日誌 (Logs)  
   `docker compose logs <SERVICE_NAME>`  
   例如：docker compose logs isunfa、faith、aich、nginx、ollama、qdrant、postgres、ofelia 等查看錯誤訊息。
   - 可加上 -f 參數即時監控：`docker compose logs -f isunfa`
3. 健康檢查 Healthcheck
   本專案在 isunfa、faith、aich 中都設定了類似：
   test: ["CMD", "curl", "-f", "http://<SERVICE>:${<SERVICE>_PORT}"]
   start_period / interval / timeout / retries - 若出現容器健康狀態一直為 (unhealthy)，或無法通過 healthcheck，請檢查該服務 Port 是否正確開啟，或是否確定可以用 curl 連線。
4. 進入容器內部
   `docker exec -it <CONTAINER_NAME> /bin/bash` - 若為較精簡映像 (e.g. ofelia，可能是 Alpine)，改用 `/bin/sh`，舉例 `docker exec -it ofelia /bin/sh` - 進入後可檢查應用程式資料夾 (e.g. /isunfa, /faith, /aich, /root/.ollama) 與檔案是否齊全，或安裝套件是否正常。

## 環境與設定檔 (.env / docker-compose) 比對 (Configuration Check)

docker-compose.yml 中的設置

- nginx: 監聽 80, 443，透過 ./nginx/templates 提供動態配置。
- isunfa: 使用 node:20，掛載 ./isunfa 與 ${ISUNFA_FILE_PATH}/isunfa 兩個 Volume，並於啟動時運行 [isunfa-start.sh](http://isunfa-start.sh/)。
- faith: 同樣使用 node:20，掛載 ./faith 作為程式碼位置。
- aich: 掛載 ./aich 與 ${AICH_FILE_PATH}/AICH，主要執行 [aich-start.sh](http://aich-start.sh/)。
- ollama: Docker image 為 ollama/ollama:0.3.6, 預設不綁定外部 ports，預設僅在容器內部暴露 $OLLAMA_PORT（11434），可能依 CPU 或 GPU 需求調整。
- qdrant: 使用 qdrant/qdrant:v1.11.0，將 qdrant_data 掛載到 /qdrant/storage。
- postgres: 透過 .env.postgres 定義 POSTGRES_PORT、使用者、密碼等，會將資料儲存在 ./postgres/data。
- ofelia: 會綁定 /var/run/docker.sock，並載入 ./ofelia/config.ini，以執行排程任務 (daemon --config=/etc/ofelia/config.ini)。

CPU / GPU 配置檔

- docker-compose.cpu.yml: 只對 ollama 啟用 x-deploy-cpu (cpu-config)，限制 memory=17G。
- docker-compose.gpu.yml: 透過 x-deploy-gpu (gpu-config) 為 ollama 設定 GPU (driver: nvidia, count:1) 以及 memory=17G。

建議檢查：

1. memory 限制 (如 4G / 1G / 17G) 是否符合主機資源。
2. healthcheck 端口 (如 isunfa:${ISUNFA_PORT}) 與 .env 內的變數是否對上。
3. volumes 掛載路徑 (如 ${ISUNFA_FILE_PATH}/isunfa、${AICH_FILE_PATH}/AICH 等) 是否存在於主機且具可寫入權限。

## 常見錯誤與對應處理方式 (Common Issues & Solutions)

以下整理常見問題：

1. 容器無法啟動 / 重啟循環
   - 主機層：主機快取不足或 Docker Daemon 未啟動(systemctl status docker 失敗)。
   - Docker 層：healthcheck fail, volumes 掛載失敗, depends_on 服務尚未啟動。
   - code 層：[start.sh](http://start.sh/) 腳本無執行權限、npm install 不完全、.env 參數錯誤。
     → 檢視 docker compose logs <SERVICE_NAME> 預估是哪一層級產生錯誤。
2. GPU 啟動失敗 (ollama)
   - 主機層：nvidia-smi 找不到顯示卡，nvidia-driver / nvidia-container-toolkit 未安裝。
   - Docker 層：未使用 docker-compose -f … -f docker-compose.gpu.yml up -d；或 GPU count=1 但主機實際無 GPU。
   - code 層：ollama 映像檔內部版本不支援特定 driver (可能性較低)。
     → 先在主機端修復 GPU 驅動，再確定 Docker config 正確呼叫 nvidia runtime。
3. Postgres 數據庫連接錯誤
   - 主機層：磁盤空間不足導致 Postgres 初始化失敗。
   - Docker 層：.env.postgres PORT 不符合 docker-compose.yml expose；檔案衝突導致 data 損壞。
   - code 層：isunfa, aich 等應用程式裡的 DATABASE_URL 填錯帳密或 host。
     → 檢查 docker logs postgres 與 psql 連接測試，確保 DB 狀態與連線字串有效。
4. 網頁 502 Bad Gateway / 無法存取
   - 主機層：iptables / 防火牆阻擋 80, 443 等網路 port；DNS 未設定正確。
   - Docker 層：nginx depends_on isunfa / faith / aich，但這些服務 unhealthy 導致 Proxy 無回覆。
   - code 層：nginx.conf 動態模板 (/nginx/templates) 變數錯誤，跳轉錯誤 Host。
     → docker compose logs nginx，或檢查 /etc/hosts、DNS 設置，並確定 .env.nginx 內 SERVER_NAME 正確。

## 進階排錯技巧 (Advanced Troubleshooting)

1. Healthcheck 詳細排查
   - 不同服務的 healthcheck retry 次數與 start_period 時間略有不同（例如 isunfa 是 interval=60s, retries=5, start_period=10m）；若啟動初期資源較緊或需要等待其他容器初始化，可能導致前幾次檢查失敗。可調整 start_period (容器啟動後的預熱時間)。
2. 日誌與事件追蹤
   - docker compose logs -f <SERVICE_NAME> 即時看 log，亦可搭配 journalctl -fu docker 在主機看 Docker Daemon 是否回報錯誤。
3. 合併或切換 CPU / GPU 配置
   - 若只想在 CPU 上測試 ollama，可改用 docker compose -f docker-compose.yml -f docker-compose.cpu.yml up -d；若換成 GPU 模式，則要特別確認主機上 GPU driver 安裝完善，再使用 docker-compose.gpu.yml。
4. 確認容器的記憶體限額
   - isunfa 最多 4G，faith 為 1G，aich 為 2G，qdrant 與 postgres 為 1G，ollama 可能達到 17G (CPU 或 GPU 模式)。若主機可用 RAM 不足，會導致 OOM Killed。可搭配 docker stats 或 top 查看真實使用情況。

## 除錯案例 (Case Studies)

案例 1：AICH 無法完成健康檢查，重啟循環

• Issue：docker compose ps 顯示 aich 為 unhealthy。

• 主機層檢查：CPU / 記憶體夠用，Docker Daemon 正常。

• Docker 層檢查：docker logs aich 出現「Could not connect to Qdrant」。qdrant logs 正常，但啟動時間較長。

• 程式碼層檢查：[aich-start.sh](http://aich-start.sh/) / .env.aich 裡的 QDRANT_HOST 設定沒問題。

→ 原因：start_period 設置太短，aich 正式可用前就執行 curl -f 導致檢查失敗。

→ 處理：提升 aich healthcheck start_period=2m → 5m，或確保 qdrant fully ready 後再啟動 aich。

案例 2：Ollama (GPU) 報錯「no nvidia device found」

• Issue：docker compose logs ollama 顯示「Could not load CUDA driver」。

• 主機層檢查：nvidia-smi 無法執行 → driver 未安裝。

• Docker 層檢查：docker-compose.gpu.yml 正常，但無法載入 nvidia runtime。

• 程式碼層：ollama 映像檔版本符合需求，問題不在 app 內部。

→ 處理：sudo apt-get install nvidia-driver-530 / nvidia-container-toolkit → 重啟 Docker → docker compose -f docker-compose.yml -f docker-compose.gpu.yml up -d → 問題解決。

## 結論 (Conclusion)

本專案透過 docker-compose.yml 與 healthcheck + depends_on 機制，協助自動化及安全啟動多個容器。當服務無法正常使用時，可循以下路線做排查：

(1) SSH / Docker / 硬體(GPU) 底層確認 → (2) docker compose ps & logs → (3) healthcheck 與設定檔 (ports/volumes) → (4) 進入容器檢查。

若問題較複雜，請同時參考本專案的主要 README、或詢問了解容器配置與 Node.js 啟動腳本邏輯的團隊夥伴。在修正、重啟容器後，可透過瀏覽器再次測試各服務 (isunfa / faith / aich) 功能是否完全恢復。

iSunFA Server swarm 的問題排查可依「主機 (Host) → Docker (容器) → code (app / 啟動腳本 / 更新腳本)」三層順序逐步深入。

• 主機層：檢查硬體資源、GPU 驅動、系統防火牆、Docker Daemon。

• Docker 層：docker compose ps & logs、healthcheck、memory/CPU/GPU 的配置、Volume 掛載路徑。

• 程式碼層：.env 參數、[start.sh](http://start.sh/) 腳本、npm modules、Git 自動更新腳本。

## 附錄 (Appendix)

- [專案 README](https://github.com/CAFECA-IO/ServerSwarm/tree/develop/isunfa)
  - 更詳細的「環境建置」、「確認 GPU 驅動安裝」、「.env 設定」與「執行 docker compose」指令。
- Docker 與服務官方文件
  - Docker: [https://docs.docker.com](https://docs.docker.com/)
- Nvidia Container Toolkit: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/
- PostgreSQL: https://www.postgresql.org/docs/
- NGINX: https://nginx.org/en/docs

### 常用 Debug 指令參考

- 主機層: systemctl status docker, nvidia-smi(GPU 狀態), journalctl -fu docker (主機層級日誌), history | grep -i docker(查看 docker 有關的指令的歷史紀錄)
- Docker 層: docker ps, docker compose ps, docker compose logs -f <SERVICE>, docker exec -it <SERVICE> /bin/bash
- 程式碼層: node -v, npm install, `env | grep XXX` (在容器內檢查環境變數)
