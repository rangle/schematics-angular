import { Rule, Tree } from '@angular-devkit/schematics';

import { validateRegularSchema } from '../../types/schema-options.function';
import { SchemaOptions } from '../../types/schema-options.interface';

export function type(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  const directory = `${options.path}/types/${options.name}`;

  return (tree: Tree) => {
    tree.create(`${directory}/${options.name}.interface.ts`, 'interface');
    tree.create(`${directory}/${options.name}.functions.ts`, 'functions');

    return tree;
  };
}
