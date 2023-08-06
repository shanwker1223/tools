import type { DependencyBootstrap } from '@lib/aws/lambda/dependency/DependencyBootstrap';

export type BaseHandlerDependencyInput = {
    [key: string]: DependencyBootstrap;
  }