import { randomUUID } from 'crypto';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type Primitive = string | number | boolean | null;
type LogValue = Primitive | Record<string, unknown> | Array<Primitive | Record<string, unknown>>;

export interface ILogContext {
  service?: string;
  requestId?: string;
  route?: string;
  [key: string]: unknown;
}

export interface ILogFields {
  [key: string]: LogValue;
}

export interface ILogger {
  child(ctx: ILogContext): ILogger;
  debug(msg: string, fields?: ILogFields): void;
  info(msg: string, fields?: ILogFields): void;
  warn(msg: string, fields?: ILogFields): void;
  error(msg: string, fields?: ILogFields): void;
  time(label: string): { end: (extra?: ILogFields) => void };
}

const isProd = process.env.NODE_ENV === 'production';
const SERVICE = process.env.NEXT_PUBLIC_API_POWERBY ?? 'BusinessMonitor API';

class Logger implements ILogger {
  private readonly ctx: ILogContext;

  constructor(ctx?: ILogContext) {
    this.ctx = { service: SERVICE, ...ctx };
  }

  child(ctx: ILogContext): ILogger {
    return new Logger({ ...this.ctx, ...ctx });
  }

  debug(msg: string, fields?: ILogFields): void {
    this.log('debug', msg, fields);
  }

  info(msg: string, fields?: ILogFields): void {
    this.log('info', msg, fields);
  }

  warn(msg: string, fields?: ILogFields): void {
    this.log('warn', msg, fields);
  }

  error(msg: string, fields?: ILogFields): void {
    this.log('error', msg, fields);
  }

  time(label: string): { end: (extra?: ILogFields) => void } {
    const start = process.hrtime.bigint();
    return {
      end: (extra?: ILogFields) => {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1_000_000;
        this.info(`${label} done`, { durationMs, ...extra });
      },
    };
  }

  private log(level: LogLevel, msg: string, fields?: ILogFields): void {
    const payload = {
      ts: new Date().toISOString(),
      level,
      msg,
      ...this.ctx,
      ...(fields ?? {}),
    };

    if (isProd) {
      // Info: (20250808 - Tzuhan) 結構化 JSON，方便 Log pipeline
      const line = JSON.stringify(payload);
      switch (level) {
        case 'debug':
          console.debug(line);
          break;
        case 'info':
          console.info(line);
          break;
        case 'warn':
          console.warn(line);
          break;
        case 'error':
          console.error(line);
          break;
      }
      return;
    }

    // Info: (20250808 - Tzuhan) Dev：可讀格式
    const prefix = `[${payload.level.toUpperCase()}]`;
    const ctxStr = this.formatCtx(this.ctx);
    const fieldsStr = fields ? ` ${JSON.stringify(fields)}` : '';
    // Info: (20250808 - Tzuhan) 用對應 console 方法維持等級語意
    const line = `${prefix} ${msg}${ctxStr}${fieldsStr}`;
    switch (level) {
      case 'debug':
        console.debug(line);
        break;
      case 'info':
        console.info(line);
        break;
      case 'warn':
        console.warn(line);
        break;
      case 'error':
        console.error(line);
        break;
    }
  }

  private formatCtx(ctx: ILogContext): string {
    const { service, requestId, route, ...rest } = ctx;
    const parts: string[] = [];
    if (service) parts.push(`service=${service}`);
    if (requestId) parts.push(`requestId=${requestId}`);
    if (route) parts.push(`route=${route}`);
    if (Object.keys(rest).length > 0) parts.push(`ctx=${JSON.stringify(rest)}`);
    return parts.length ? ` (${parts.join(' ')})` : '';
  }
}

// Info: (20250808 - Tzuhan) ---- public API ----

export const logger: ILogger = new Logger();

/** Info: (20250808 - Tzuhan) 從 request 產生 child logger（帶 requestId / route） */
export const loggerFromRequest = (input: {
  method?: string;
  url?: string;
  requestIdHeader?: string;
}): ILogger => {
  const requestId = input.requestIdHeader || randomUUID();
  const route = input.method && input.url ? `${input.method} ${input.url}` : (input.url ?? '');
  return logger.child({ requestId, route });
};
