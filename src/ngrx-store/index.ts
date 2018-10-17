import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function ngrxStore(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/store/${options.name}.store.ts`, 'store');

    return tree;
  };
}
