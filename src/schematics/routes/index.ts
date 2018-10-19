import { Rule } from '@angular-devkit/schematics';

import { processTemplates, validateRegularSchema } from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export function routes(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options);
}
