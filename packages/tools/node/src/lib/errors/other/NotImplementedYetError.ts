import {BaseError} from "@errors/BaseError";
import {LogLevel} from '@lib/log/types/LogLevel';

export type NotImplementedYetErrorArguments = {
  message?: string,
  context?: Record<string, unknown>,
  logLevel?: LogLevel
}

export class NotImplementedYetError extends BaseError {
  constructor({message = 'Not implemented yet', context = {}, logLevel = LogLevel.ERROR} : NotImplementedYetErrorArguments) {
    super({message, context, logLevel});
  }
}
