import {LogLevel} from '@lib/log/types/LogLevel';
import { InvalidAttributeError } from "./InvalidAttributeError";


export class InvalidAppEnvironmentError extends InvalidAttributeError {
  constructor(currentAppEnv: string) {
    super({
      attribute: 'appEnvironment', 
      attemptedValue: currentAppEnv, 
      validationMessage: 'App environment must be one of AppEnvironmentType enum',
      logLevel: LogLevel.EMERGENCY
    });
  }
}
