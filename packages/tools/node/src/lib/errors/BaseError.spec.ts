import { LogLevel } from '@lib/log/types/LogLevel';
import { BaseError } from './BaseError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const genericError = new BaseError({message: 'Test'});
    expect(() => { throw genericError; }).toThrow(genericError);
  });

});

describe('Initializes Error', () => {
  
  it('Initializes variables succesfully', () => {
    const message = 'Test';
    const context = {
      key: "value"
    };
    const logLevel = LogLevel.ALERT;

    const genericError = new BaseError({message, context, logLevel});

    expect(genericError.name).toBe('Error');
    expect(genericError.message).toBe(message);
    expect(genericError.context).toBe(context);
    expect(genericError.logLevel).toBe(logLevel);
  });

  it('Initializes previous error succesfully', () => {
    const previousMessage = 'Previous Error'; 
    const previousGenericError = new BaseError({message: previousMessage});

    const message = 'Error'; 
    const genericError = new BaseError({message, previousError: previousGenericError});

    expect(genericError.previousError).toBe(previousGenericError);
  });

});

describe('Sets errors attributes', () => {

  it('Sets name succesfully', () => {
    const message = 'Initial Message'; 
    const genericError = new BaseError({message});

    const changedMessage = 'Changed Message';
    genericError.message = changedMessage;

    expect(genericError.message).toBe(changedMessage);
  });

  it('Sets context succesfully', () => {
    const context = {
      key: 'Initial Value'
    }; 
    const genericError = new BaseError({message: 'Message', context});

    const changedContext = {
      key: 'Changed Value'
    }; 
    genericError.context = changedContext;

    expect(genericError.context.key).toBe(changedContext.key);
  });

  it('Sets logLevel succesfully', () => {
    const genericError = new BaseError({message: 'Message', logLevel: LogLevel.CRITICAL});
    genericError.logLevel = LogLevel.ALERT;

    expect(genericError.logLevel).toBe(LogLevel.ALERT);
  });

  it('Sets previousError succesfully', () => {
    const previousGenericError = new BaseError({message: 'Previous Error'});
    const genericError = new BaseError({message: 'Error'});
    genericError.previousError = previousGenericError;

    expect(genericError.previousError).toBe(previousGenericError);
  });

});
