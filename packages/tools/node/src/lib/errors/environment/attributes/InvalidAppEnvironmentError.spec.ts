import { InvalidAppEnvironmentError } from './InvalidAppEnvironmentError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const invalidAppEnvironmentError = new InvalidAppEnvironmentError('HMG');
    expect(() => { throw invalidAppEnvironmentError; }).toThrow(invalidAppEnvironmentError);
  });

});