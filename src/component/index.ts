import { Rule, Tree } from '@angular-devkit/schematics';

import { Options } from '../options.interface';

export function component(options: Options): Rule {
  const directory = `${options.path}/components/${options.name}`;

  return (tree: Tree) => {
    tree.create(`${options.path}/components/index.ts`, 'index');
    tree.create(`${directory}/${options.name}.component.ts`, 'component');
    tree.create(`${directory}/${options.name}.component.html`, 'html');
    tree.create(`${directory}/${options.name}.component.scss`, 'scss');

    return tree;
  };
}
