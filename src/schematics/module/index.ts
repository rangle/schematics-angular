import { Rule } from '@angular-devkit/schematics';

import { processTemplates, validateRegularSchema } from '../../types/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options.interface';

export function module(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options);
}
