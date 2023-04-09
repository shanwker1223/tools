import {BaseError} from "@errors/BaseError";
import {LogLevel} from '@lib/log/types/LogLevel';
import type { BaseErrorArguments } from "@errors/BaseError";

export type EnvironmentErrorArguments = {
  message?: string
} & Omit<BaseErrorArguments, 'message'>

export class EnvironmentError extends BaseError {
  constructor({message = "Environment Error", context = {}, logLevel = LogLevel.ALERT} : EnvironmentErrorArguments) {
    super({message, context, logLevel: logLevel});
  }
}
