export interface LogEventDTO {
  level: LogLevel;
  message: string;
  service: string;
  context: string;
  traceContext?: TraceContext;
  timestamp: string;
}

export enum LogLevel {
  TRACE= "TRACE",
  DEBUG= "DEBUG",
  INFO= "INFO",
  WARN= "WARN",
  ERROR= "ERROR",
};

export interface TraceContext extends Record<string, string | undefined> {
  traceId?: string;
  spanId?: string;
  parentSpanId?: string;
  sampled?: string;
}