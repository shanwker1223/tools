import { InvalidAttributeError } from './InvalidAttributeError';
import type { InvalidAttributeErrorArguments } from './InvalidAttributeError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const errorAttributes : InvalidAttributeErrorArguments = {
      attribute: 'Test',
      attemptedValue: 'value',
      validationMessage: 'Test value must be a number'
    };
    const invalidAttributeError = new InvalidAttributeError(errorAttributes);
    expect(() => { throw invalidAttributeError; }).toThrow(invalidAttributeError);
  });

});