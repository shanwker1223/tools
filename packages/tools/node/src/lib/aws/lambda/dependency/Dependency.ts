import { NotImplementedYetError } from "@lib/errors";

export abstract class Dependency {
  protected options: Record<string, unknown>;

  protected constructor(options: Record<string, unknown>) {
    this.options = options;
    console.info(`Constructing service ${typeof this}`, options);
  }

  public static async init(options: Record<string, unknown>): Promise<Dependency> {
    throw new NotImplementedYetError({
        'message': "Method init() of service " + typeof this + " is not implemented yet",
        'context': {
          'dependency_name': this.constructor.name,
          options
        },
    });
  }
}
