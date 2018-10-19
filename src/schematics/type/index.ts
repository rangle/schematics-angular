import { Rule } from '@angular-devkit/schematics';

import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  processTemplates,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export function type(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Types);

  return processTemplates(options, options.path);
}
