import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function type(options: Options): Rule {
  const directory = `${options.path}/types/${options.name}`;

  return (tree: Tree) => {
    tree.create(`${directory}/${options.name}.interface.ts`, 'interface');
    tree.create(`${directory}/${options.name}.functions.ts`, 'functions');

    return tree;
  };
}
