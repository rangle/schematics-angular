import { SchematicsException } from '@angular-devkit/schematics';

import { SchemaOptions } from './schema-options.interface';

export function validateRegularSchema(options: SchemaOptions) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}

export function getModuleContainerPath(path: string) {
  return path.endsWith('modules') ? path : `${path}/modules`;
}

export function getModulePath(options: SchemaOptions) {
  return (options.path ? `${getModuleContainerPath(options.path)}` : 'src') + `/${options.name}`;
}
