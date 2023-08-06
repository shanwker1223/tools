import type { Dependency } from '@lib/aws/lambda/dependency/Dependency';

export type HandlerDependencyPromises = {
    [key: string]: Promise<Dependency>;
  }