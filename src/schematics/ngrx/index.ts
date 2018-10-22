import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { validateRegularSchema } from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return chain([
    schematic('ngrx-actions', options),
    schematic('ngrx-effects', options),
    schematic('ngrx-reducer', options),
    schematic('ngrx-store', options)
  ]);
}
