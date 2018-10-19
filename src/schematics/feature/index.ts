import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { getModulePath, validateOptions } from '../../types/options.function';
import { Options } from '../../types/options.interface';

export function feature(options: Options): Rule {
  validateOptions(options);

  console.log(options);

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
