import { Rule, Tree } from '@angular-devkit/schematics';

import { validateOptions } from '../../types/options.function';
import { Options } from '../../types/options.interface';

export function type(options: Options): Rule {
  validateOptions(options);

  const directory = `${options.path}/types/${options.name}`;

  return (tree: Tree) => {
    tree.create(`${directory}/${options.name}.interface.ts`, 'interface');
    tree.create(`${directory}/${options.name}.functions.ts`, 'functions');

    return tree;
  };
}
