import { NextResponse } from 'next/server';
import { ApiCode } from '@/lib/utils/status';
import { name, version } from '@/package';

export const POWERBY = `${name} v${version}`;

export interface IApiResponse<T> {
  powerby: string;
  success: boolean;
  code: ApiCode;
  message: string;
  payload: T | null;
}

export const ok = <T>(payload: T, message = 'OK'): IApiResponse<T> => {
  // Info: (20250926 - Luphia) jsonstringify 無法解析 bigint，這邊做個轉換
  const safePayload = JSON.parse(
    JSON.stringify(payload, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  );

  return {
    powerby: POWERBY,
    success: true,
    code: ApiCode.SUCCESS,
    message,
    payload: safePayload,
  };
};

export const fail = (code: ApiCode, message: string): IApiResponse<null> => ({
  powerby: POWERBY,
  success: false,
  code,
  message,
  payload: null,
});

export const jsonOk = <T>(payload: T, message = 'OK', init?: ResponseInit) =>
  NextResponse.json<IApiResponse<T>>(ok(payload, message), init);

export const jsonFail = (code: ApiCode, message: string, init?: ResponseInit) =>
  NextResponse.json<IApiResponse<null>>(fail(code, message), {
    status: httpStatusOf(code),
    ...init,
  });

function httpStatusOf(code: ApiCode): number {
  switch (code) {
    case ApiCode.SUCCESS:
      return 200;
    case ApiCode.VALIDATION_ERROR:
      return 400;
    case ApiCode.UNAUTHORIZED:
      return 401;
    case ApiCode.FORBIDDEN:
      return 403;
    case ApiCode.NOT_FOUND:
      return 404;
    default:
      return 500;
  }
}
