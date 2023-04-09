import { EnvironmentError } from './EnvironmentError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const environmentError = new EnvironmentError({});
    expect(() => { throw environmentError; }).toThrow(environmentError);
  });

});