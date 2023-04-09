import {LogLevel} from '@lib/log/types/LogLevel';
import { InvalidAttributeError } from "./InvalidAttributeError";


export class EmptyOwnerError extends InvalidAttributeError {
  constructor() {
    super({
      attribute: 'owner', 
      attemptedValue: '', 
      validationMessage: 'Environment owner must not be empty',
      logLevel: LogLevel.EMERGENCY
    });
  }
}
