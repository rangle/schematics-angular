import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { validateOptions } from '../../types/options.function';
import { Options } from '../../types/options.interface';

export function feature(options: Options): Rule {
  validateOptions(options);

  const childOptions = {
    path: `${options.path}/${options.name}` || `src/${options.name}`,
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
