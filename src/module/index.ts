import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function module(options: Options): Rule {
  return (tree: Tree) => {
    tree.create(`${options.path}/${options.name}.module.ts`, 'module');

    return tree;
  };
}
