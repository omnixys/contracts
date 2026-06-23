import { LogLevel } from "../enums/log.enum.js";
import { TraceContextDTO } from "./trace.dto.js";

export interface LogDTO {
  level: LogLevel;
  message: string;
  service: string;
  timestamp: string;
  metadata?: Record<string, any>;

  traceContext?: TraceContextDTO;
  operation?: string;
}

export interface ContextLogDTO {
  log: LogDTO;
  ctx: any;
}
