import { Rule } from '@angular-devkit/schematics';

import { processTemplates } from '../../types/path-options/path-options.functions';
import { validateRegularSchema } from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options);
}
