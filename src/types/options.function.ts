import { SchematicsException } from '@angular-devkit/schematics';

import { Options } from './options.interface';

export function validateOptions(options: Options) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}

export function getModuleContainerPath(options: Options) {
  return options.path.endsWith('modules') ? options.path : `${options.path}/modules`;
}

export function getModulePath(options: Options) {
  return `${getModuleContainerPath(options)}/${options.name}` || `src/${options.name}`;
}
