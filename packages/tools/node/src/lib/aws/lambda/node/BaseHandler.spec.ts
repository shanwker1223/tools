import { Dependency } from "@lib/aws/lambda/dependency/Dependency";
import { BaseHandler } from "./BaseHandler";
import type  { Context } from "aws-lambda";

// TODO: Handler error and Handler with dependency
describe('Simple handler implementation', () => {
  
  async function handler() : Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Handler result');
      }, 1000);
    });
  }
  
  it('Runs succesfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const result = await (BaseHandler({}, handler))({}, {} as Context, () => {});
    expect(result).toBe('Handler result');
  });

});

describe('Handler with dependency implementation', () => {
  type MockDependencyOptions = {
    key: string
  }

  class MockDependency extends Dependency {
    protected options!: MockDependencyOptions;
  
    public static async init(options: MockDependencyOptions): Promise<MockDependency> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new MockDependency(options));
        }, 1000);
      });
    }

    public get key() {
      return this.options.key;
    }
  }
  
  type Input = {
    mock_dependency?: MockDependency
  };
  async function handler( dependencies: Input ) : Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Handler result. Option key: ${dependencies.mock_dependency?.key}`);
      }, 1000);
    });
  }
  
  it('Runs succesfully', async () => {
    const result = await (BaseHandler({
      mock_dependency: {
        class: MockDependency,
        options: {
          key: "value"
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    }, handler))({}, {} as Context, () => {});
    expect(result).toBe('Handler result. Option key: value');
  });

});

describe('Handler with dependency init error', () => {
  type MockDependencyOptions = {
    key: string
  }

  class MockDependency extends Dependency {
    protected options!: MockDependencyOptions;
  
    public static async init(): Promise<MockDependency> {
      return new Promise(() => {
          throw new Error('Unexpected Error');
      });
    }

    public get key() {
      return this.options.key;
    }
  }
  
  type Input = {
    mock_dependency?: MockDependency
  };
  async function handler( dependencies: Input ) : Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Handler result. Option key: ${dependencies.mock_dependency?.key}`);
      }, 1000);
    });
  }
  
  it('Throws error', async () => {
    await expect((BaseHandler({
      mock_dependency: {
        class: MockDependency,
        options: {
          key: "value"
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    }, handler))({}, {} as Context, () => {})).rejects.toThrow('Unexpected Error');
  });

});

describe('Handler with app error', () => {
  
  async function handler() : Promise<string> {
    return new Promise(() => {
      throw new Error('Unexpected Error');
    });
  }
  
  it('Throws error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await expect((BaseHandler({}, handler))({}, {} as Context, () => {})).rejects.toThrow('Unexpected Error');
  });

});
