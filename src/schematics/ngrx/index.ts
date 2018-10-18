import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { validateOptions } from '../../types/options.function';
import { Options } from '../../types/options.interface';

export function ngrx(options: Options): Rule {
  validateOptions(options);

  return chain([
    schematic('ngrx-actions', options),
    schematic('ngrx-effects', options),
    schematic('ngrx-reducer', options),
    schematic('ngrx-store', options)
  ]);
}
