import { LogLevel } from "../enums/log.enum.js";
import { TraceContextDTO } from "./trace.dto.js";

export interface LogDTO {
  level: LogLevel;
  message: string;
  service: string;
  timestamp: string;
  metadata?: Record<string, any>;

  /**
   * Provenance of the log record: either a service name (`"service:authentication"`)
   * or a shared package id (`"package:@omnixys/security-ts"`). Distinguishes logs
   * emitted directly by a service from those emitted by a shared package it consumes.
   */
  source?: string;

  traceContext?: TraceContextDTO;
  operation?: string;
}

export interface ContextLogDTO {
  log: LogDTO;
  ctx: any;
}
