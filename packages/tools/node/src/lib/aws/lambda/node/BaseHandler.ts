import type { HandlerDependencyInput } from './types/HandlerDependencyInput';
import type { HandlerDependencyPromises } from './types/HandlerDependencyPromises';
import type { BaseHandlerDependencyInput } from '@lib/aws/lambda/node/types/BaseHandlerDependencyInput';
import type  { Handler } from "@lib/aws/lambda/node/types/HandlerType";
import type  { Handler as BareHandler, Context } from "aws-lambda";


export function BaseHandler (dependenciesBootstrap : BaseHandlerDependencyInput, handler: Handler): BareHandler {
  const dependencyPromises : HandlerDependencyPromises = {};
    Object.keys(dependenciesBootstrap).forEach((dependencyKey) => {
    dependencyPromises[dependencyKey] = dependenciesBootstrap[dependencyKey].class.init(dependenciesBootstrap[dependencyKey].options);
  });

  return async (event, context: Context) => {
    const resolvedDependencies : HandlerDependencyInput = {};

    try {
      // Wait for all promises in the array to resolve using Promise.all
      await Promise.all(Object.keys(dependencyPromises).map(async (dependencyKey) => {
        resolvedDependencies[dependencyKey] = await dependencyPromises[dependencyKey];
      }));
    } catch (error: unknown) {
      // TODO: Map dependency errors
      console.error(error);
      throw error;
    }

    try {
      return await handler(resolvedDependencies, event, context);
    } catch (error: unknown) {
      // TODO: Map app errors
      console.error(error);
      throw error;
    }
      
  };
}
