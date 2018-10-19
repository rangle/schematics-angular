import { Rule } from '@angular-devkit/schematics';

import { validateRegularSchema } from '../../types/schema-options.function';
import { SchemaOptions } from '../../types/schema-options.interface';
import { processTemplates } from '../../util/util';

export function routes(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options);
}
