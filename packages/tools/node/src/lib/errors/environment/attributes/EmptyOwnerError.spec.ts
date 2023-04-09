import { EmptyOwnerError } from './EmptyOwnerError';

describe('Throwing Error', () => {
  
  it('Throws succesfully', () => {
    const emptyOwnerError = new EmptyOwnerError();
    expect(() => { throw emptyOwnerError; }).toThrow(emptyOwnerError);
  });

});