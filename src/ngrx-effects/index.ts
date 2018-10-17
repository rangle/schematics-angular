import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function ngrxEffects(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/store/${options.name}.effects.ts`, 'effects');

    return tree;
  };
}
