import { ApiCode, HTTP_MAP } from '@/lib/utils/status';
import { fail, IApiResponse } from '@/lib/utils/response';

export class AppError extends Error {
  readonly code: ApiCode;
  readonly http: number;

  constructor(code: ApiCode, message: string) {
    super(message);
    this.code = code;
    this.http = HTTP_MAP[code] ?? 500;
    Error.captureStackTrace(this, this.constructor);
  }

  mapToResponse(): IApiResponse<null> {
    return fail(this.code, this.message);
  }
}
