import type { Dependency } from '@lib/aws/lambda/dependency/Dependency';

export type HandlerDependencyInput = {
    [key: string]: Dependency;
  }