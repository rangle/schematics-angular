import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { modifySourceFileRule } from '../../types/rules/modify-source-file.rule';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';
import { findModuleFilenameInTree } from '../../utils/tree-utils';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return chain([
    processTemplates(options, options.path),
    modifySourceFileRule(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addImportToModule(
          sourceFile,
          moduleFilename,
          `EffectsModule.forFeature([${strings.classify(`${options.name}Effects`)}])`,
          `.${Folders.Store}/${strings.dasherize(options.name)}.effects`
        )
    )
  ]);
}
