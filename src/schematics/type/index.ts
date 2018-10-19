import { Rule } from '@angular-devkit/schematics';

import { processTemplates, validateRegularSchema } from '../../types/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options.interface';

export function type(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options, `${options.path}/types`);
}
