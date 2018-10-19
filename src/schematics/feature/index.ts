import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { ProjectSchemaOptions } from '../../types/project-schema-options.interface';
import { getModulePath, validateRegularSchema } from '../../types/schema-options.function';

export function feature(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  const childOptions = {
    path: getModulePath(options),
    name: options.name
  };

  return chain([
    schematic('component', childOptions),
    schematic('service', childOptions),
    schematic('ngrx', childOptions),
    schematic('type', {
      ...childOptions,
      name: `${childOptions.name}-state`
    }),
    schematic('routes', childOptions),
    schematic('module', childOptions)
  ]);
}
