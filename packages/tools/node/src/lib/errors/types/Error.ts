import type {LogLevel} from "@lib/log/types/LogLevel";
  
export type ErrorInterface = {
  message: string;
  context: Record<string, unknown>,
  logLevel: LogLevel,
  previousError: Error
}
