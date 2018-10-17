import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function ngrxReducer(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/store/${options.name}.reducer.ts`, 'reducer');

    return tree;
  };
}
