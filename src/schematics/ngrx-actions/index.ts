import { Rule } from '@angular-devkit/schematics';

import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  processTemplates,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export function ngrxActions(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return processTemplates(options, options.path);
}
