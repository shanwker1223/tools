/* eslint-disable autofix/no-unused-vars */
import type { HandlerDependencyInput } from './HandlerDependencyInput';
import type  { Context } from "aws-lambda";

export type Handler<TEvent = unknown, TResult = unknown> = (
    dependencies: HandlerDependencyInput,
    event: TEvent,
    context: Context
) => void | Promise<TResult>;

export type BareHandler<TEvent = unknown, TResult = unknown> = (
    dependencies: HandlerDependencyInput,
    event: TEvent,
    context: Context
) => void | Promise<TResult>;