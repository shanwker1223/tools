import { NotImplementedYetError } from "@lib/errors";
import { Dependency } from "./Dependency";

describe('Correct dependency implementation', () => {
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

    public static get key(): string {
      return "mock_dependency";
    }

    public get key() {
      return this.options.key;
    }
  }
  

  // eslint-disable-next-line autofix/no-unused-vars, @typescript-eslint/no-unused-vars
  let mockService : Promise<MockDependency>;
  beforeEach(() => {
    mockService = MockDependency.init({
      key: "value"
    });
  });
  
  it('Initializes succesfully', async () => {
    const dependency = await mockService;
    expect(dependency.key).toBe('value');
  });

});

describe('Wrong dependency implementation', () => {
  type MockDependencyOptions = {
    key: string
  }

  class MockDependency extends Dependency {
    protected options!: MockDependencyOptions;

    public static get key(): string {
      return "mock_dependency";
    }

    public get key() {
      return this.options.key;
    }
  }
  
  it('Throws NotImplementedYetError', async () => {
    await expect(MockDependency.init({
      key: "value"
    })).rejects.toThrow(NotImplementedYetError);
  });

});