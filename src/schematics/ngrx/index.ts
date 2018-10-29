import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { NgrxSchemaOptions } from '../../types/ngrx-schema-options/ngrx-schema-options.interface';
import { validateRegularSchema } from '../../types/schema-options/schema-options.functions';

export default function(options: NgrxSchemaOptions): Rule {
  validateRegularSchema(options);

  return chain([
    schematic('ngrx-actions', options),
    schematic('ngrx-effects', options),
    schematic('ngrx-reducer', options),
    schematic('ngrx-store', options)
  ]);
}
