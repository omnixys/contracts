export interface BuildKafkaHeaderDTO {
  topic: string;
  operation: string;
  trace?: TraceContextDTO;
  version: string;
  service: string;
}
export interface TraceContextDTO extends Record<string, string | undefined> {
  traceId?: string;
  spanId?: string;
  parentSpanId?: string;
  sampled?: string;
}
