import type {Dependency} from "./Dependency";

export type DependencyBootstrap = {
  options: Record<string, unknown>,
  class: typeof Dependency,
}
