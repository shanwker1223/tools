import {InvalidAppEnvironmentError} from "@errors/environment/attributes/InvalidAppEnvironmentError";
import { EmptyOwnerError } from "@lib/errors/environment/attributes/EmptyOwnerError";
import {AppEnvironment} from "./types/AppEnvironmentType";

export class Environment {
  protected _appEnvironment: AppEnvironment;
  protected _owner: string;

  constructor() {
    const appEnvironment = process.env["NX_APP_ENV"] ?? "";
    this.validateAppEnv(appEnvironment);
    this._appEnvironment = appEnvironment as AppEnvironment;

    const owner = process.env["NX_OWNER"] ?? "";
    this.validateOwner(owner);
    this._owner = owner;
  }

  public get appEnvironment(): AppEnvironment {
    return this._appEnvironment;
  }

  public set appEnvironment(environmentValue: AppEnvironment) {
    this.validateAppEnv(environmentValue);
    this._appEnvironment = environmentValue;
  }

  protected validateAppEnv(appEnvironment:string) {
    if (!Object.values(AppEnvironment).includes(appEnvironment as AppEnvironment)) {
      throw new InvalidAppEnvironmentError(appEnvironment);
    }
  }

  public get owner(): string {
    return this._owner;
  }

  public set owner(envValue: string) {
    this.validateOwner(envValue);
    this._owner = envValue;
  }

  protected validateOwner(owner:string) {
    if (!owner) {
      throw new EmptyOwnerError();
    }
  }

}
