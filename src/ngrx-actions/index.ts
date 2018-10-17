import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function ngrxActions(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/store/${options.name}.actions.ts`, 'actions');

    return tree;
  };
}
