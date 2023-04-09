/* eslint-disable autofix/no-unused-vars */
export enum LogLevel {
  /**
   * System completely unavailable
   */
  EMERGENCY = 'emergency',

  /**
   * Errors that require immediate action.
   *
   * Example: Database unavailable, website down, non-functional payment...
   */
  ALERT = 'alert',

  /**
   * Critical conditions
   *
   * Example: Application component unavailable, unexpected errors.
   */
  CRITICAL = 'critical',

  /**
   * Errors that do not require immediate action.
   */
  ERROR = 'error',

  /**
   * Exceptional occurrences that are not considered errors.
   *
   * Example: Use of deprecated APIs, erroneous use of APIs... Unwanted occurrences that are not errors.
   */
  WARNING = 'warning',

  /**
   * Eventos normais mas significativos.
   *
   * Example: Worker process start, data processing information.
   */
  NOTICE = 'notice',

  /**
   * Interesting information.
   *
   * Example: User logs, logins, SQL queries, cache usage...
   */
  INFO = 'info',

  /**
   *  Detailed information for debugging
   */
  DEBUG = 'debug',
}
