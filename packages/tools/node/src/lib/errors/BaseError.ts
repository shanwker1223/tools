import {LogLevel} from "@lib/log/types/LogLevel";
import type {ErrorInterface} from "@errors/types/Error";

export type BaseErrorArguments = {
  message: string,
  context?: Record<string, unknown>,
  logLevel?: LogLevel
  previousError?: BaseError
}

export class BaseError extends Error implements ErrorInterface {
  private _context: Record<string, unknown>;
  private _logLevel: LogLevel;
  private _previousError: BaseError;


  constructor({message, context = {}, logLevel = LogLevel.ERROR, previousError} : BaseErrorArguments) {
    super(message);
    this._context = context;
    this._logLevel = logLevel;
    this._previousError = previousError as BaseError;
  }

  public get context() {
    return this._context;
  }

  public set context(context: Record<string, unknown>) {
    this._context = context;
  }

  public get logLevel() {
    return this._logLevel;
  }

  public set logLevel(logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  public get previousError() {
    return this._previousError;
  }

  public set previousError(error: BaseError) {
    this._previousError = error;
  }
}
