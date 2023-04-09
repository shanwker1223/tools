
import { EnvironmentError } from "@errors/environment/EnvironmentError";
import type { EnvironmentErrorArguments } from "@errors/environment/EnvironmentError";


export type InvalidAttributeErrorArguments = {
    attribute: string,
    attemptedValue: string
    validationMessage: string
  } & Omit<EnvironmentErrorArguments, 'message' >

export class InvalidAttributeError extends EnvironmentError {
  // eslint-disable-next-line no-empty-pattern
  constructor({attribute, attemptedValue, validationMessage, logLevel, context}: InvalidAttributeErrorArguments) {
    const message = `Invalid environment ${attribute} defined`;
    context = {
        attribute,
        attemptedValue,
        validationMessage,
        ...context,
    };

    super({message, context, logLevel});
  }
}
