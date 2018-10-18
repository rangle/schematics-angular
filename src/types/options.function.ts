import { SchematicsException } from '@angular-devkit/schematics';

import { Options } from './options.interface';

export function validateOptions(options: Options) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}
