import { SchematicsException } from '@angular-devkit/schematics';

import { SchemaOptions } from './schema-options.interface';

export function validateRegularSchema(options: SchemaOptions) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}

export function getModuleFolderPath(path: string) {
  return path.endsWith('modules') ? path : `${path}/modules`;
}

export function getComponentFolderPath(path: string) {
  return path.endsWith('components') ? path : `${path}/components`;
}

export function getModulePath(options: SchemaOptions) {
  return (options.path ? `${getModuleFolderPath(options.path)}` : 'src') + `/${options.name}`;
}
