import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function routes(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/${options.name}-routing.module.ts`, 'module');

    return tree;
  };
}
