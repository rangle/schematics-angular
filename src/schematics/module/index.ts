import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, schematic, Rule } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { modifySourceFileRule } from '../../types/rules/modify-source-file.rule';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';
import { findParentModuleFilenameInTree } from '../../utils/tree-utils';

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
      modifySourceFileRule(
        tree => findParentModuleFilenameInTree(tree, options),
        (sourceFile, moduleFilename) =>
          addImportToModule(
            sourceFile,
            moduleFilename,
            strings.classify(`${options.name}Module`),
            `.${Folders.Modules}/${strings.dasherize(options.name)}/${strings.dasherize(
              options.name
            )}.module`
          )
      )
    ]);
  };
}
