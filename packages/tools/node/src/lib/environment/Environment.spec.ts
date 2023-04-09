import { EmptyOwnerError } from "@lib/errors/environment/attributes/EmptyOwnerError";
import { InvalidAppEnvironmentError } from "@lib/errors/environment/attributes/InvalidAppEnvironmentError";
import {Environment} from "./Environment";
import { AppEnvironment } from "./types/AppEnvironmentType";

describe('Initialize env', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  
  it('Initializes succesfully', () => {
    process.env['NX_APP_ENV'] =  AppEnvironment.LOCAL;
    process.env['NX_OWNER'] =  'Jest';

    const environmentClass = new Environment();

    expect(environmentClass.appEnvironment).toBe(AppEnvironment.LOCAL);
    expect(environmentClass.owner).toBe('Jest');
  });
  
  it('Invalid App Environment', () => {
    process.env['NX_APP_ENV'] =  'Invalid';

    expect(() => new Environment()).toThrow(InvalidAppEnvironmentError);
  });
  
  it('Empty App Environment', () => {
    expect(() => new Environment()).toThrow(InvalidAppEnvironmentError);
  });
  
  it('Invalid Owner Environment', () => {
    process.env['NX_APP_ENV'] =  AppEnvironment.LOCAL;
    process.env['NX_OWNER'] =  '';

    expect(() => new Environment()).toThrow(EmptyOwnerError);
  });
  
  it('Empty Owner Environment', () => {
    process.env['NX_APP_ENV'] =  AppEnvironment.LOCAL;

    expect(() => new Environment()).toThrow(EmptyOwnerError);
  });

});

describe('Setters', () => {
  const OLD_ENV = process.env;
  let environment : Environment;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy

    process.env['NX_APP_ENV'] =  AppEnvironment.LOCAL;
    process.env['NX_OWNER'] =  'Jest';
    environment = new Environment();
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  
  it('Sets owner succesfully', () => {
    environment.owner = 'new-owner';

    expect(environment.owner).toBe('new-owner');
  });
  
  it('Sets app environment succesfully', () => {
    environment.appEnvironment = AppEnvironment.DEVELOPMENT;

    expect(environment.appEnvironment).toBe(AppEnvironment.DEVELOPMENT);
  });
  
  it('Sets invalid app environment', () => {
    process.env['NX_APP_ENV'] =  'Invalid';

    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      () => environment.appEnvironment = 'Invalid'
      ).toThrow(InvalidAppEnvironmentError);
  });
  
  it('Sets invalid onwer environment', () => {
    expect(() => environment.owner = '').toThrow(EmptyOwnerError);
  });

});