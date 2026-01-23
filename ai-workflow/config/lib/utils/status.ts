export enum ApiCode {
  // Info: (20250925 - Tzuhan) --- 成功 ---
  SUCCESS = 'SUCCESS',

  // Info: (20250925 - Tzuhan) --- 客戶端錯誤 ---
  VALIDATION_ERROR = 'VALIDATION_ERROR', // Info: (20250925 - Tzuhan) 400: 請求參數驗證失敗
  UNAUTHORIZED = 'UNAUTHORIZED', // Info: (20250925 - Tzuhan) 401: 未經身份驗證
  FORBIDDEN = 'FORBIDDEN', // Info: (20250925 - Tzuhan) 403: 權限不足
  NOT_FOUND = 'NOT_FOUND', // Info: (20250925 - Tzuhan) 404: 資源不存在
  CONFLICT = 'CONFLICT', // Info: (20250925 - Tzuhan) 409: 資源衝突 (例如：重複註冊)
  RATE_LIMIT = 'RATE_LIMIT', // Info: (20250925 - Tzuhan) 429: 請求過於頻繁

  // Info: (20250925 - Tzuhan) --- 伺服器端錯誤 ---
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // Info: (20250925 - Tzuhan) 500: 未知的伺服器錯誤
}

export const HTTP_MAP: Record<ApiCode, number> = {
  [ApiCode.SUCCESS]: 200,
  [ApiCode.VALIDATION_ERROR]: 400,
  [ApiCode.UNAUTHORIZED]: 401,
  [ApiCode.FORBIDDEN]: 403,
  [ApiCode.NOT_FOUND]: 404,
  [ApiCode.CONFLICT]: 409,
  [ApiCode.RATE_LIMIT]: 429,
  [ApiCode.INTERNAL_SERVER_ERROR]: 500,
};
