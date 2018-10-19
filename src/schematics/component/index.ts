import { Rule } from '@angular-devkit/schematics';

import { ProjectSchemaOptions } from '../../types/project-schema-options.interface';
import { validateRegularSchema } from '../../types/schema-options.function';
import { processTemplates } from '../../util/util';

export function component(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return processTemplates(options, `${options.path}/components`);
}
