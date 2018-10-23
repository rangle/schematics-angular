import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { runTslintFix } from '../../types/rules/run-tslint-fix';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  return () => {
    options.path = `${getContainingFolderPath(options.path, Folders.Modules)}/${options.name}`;

    return chain([
      processTemplates(options),
      schematic('service', options),
      schematic('ngrx', options),
      schematic('type', {
        ...options,
        name: `${options.name}-state`
      }),
      runTslintFix(options.path)
    ]);
  };
}
