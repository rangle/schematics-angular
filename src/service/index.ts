import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function service(options: Options): Rule {
  const directory = `${options.path}/services/${options.name}`;

  return (tree: Tree) => {
    tree.create(`${directory}/${options.name}.service.ts`, 'service');

    return tree;
  };
}
