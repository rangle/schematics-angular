import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { getProjectPrefix } from '../../types/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options.interface';
import { getModulePath, validateRegularSchema } from '../../types/schema-options.function';

export function feature(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return (tree: Tree) => {
    options.path = getModulePath(options);
    options.prefix = getProjectPrefix(tree, options);

    return chain([
      schematic('component', options),
      schematic('service', options),
      schematic('ngrx', options),
      schematic('type', {
        ...options,
        name: `${options.name}-state`
      }),
      schematic('routes', options),
      schematic('module', options)
    ]);
  };
}
