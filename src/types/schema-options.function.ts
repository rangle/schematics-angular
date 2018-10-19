import { SchematicsException } from '@angular-devkit/schematics';

import { SchemaOptions } from './schema-options.interface';

export function validateRegularSchema(options: SchemaOptions) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}

export function getModuleContainerPath(options: SchemaOptions) {
  return options.path.endsWith('modules') ? options.path : `${options.path}/modules`;
}

export function getModulePath(options: SchemaOptions) {
  return `${getModuleContainerPath(options)}/${options.name}` || `src/${options.name}`;
}
