import { Rule } from '@angular-devkit/schematics';

import { processTemplates } from '../../rules/process-templates.rule';
import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';

import { TypeSchemaOptions } from './type-schema-options.interface';

export default function(options: TypeSchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Types);

  return processTemplates(options, options.path);
}
