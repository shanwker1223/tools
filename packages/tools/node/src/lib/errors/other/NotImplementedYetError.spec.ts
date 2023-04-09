import { NotImplementedYetError } from './NotImplementedYetError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const notImplementedYetError = new NotImplementedYetError({});
    expect(() => { throw notImplementedYetError; }).toThrow(notImplementedYetError);
  });

});