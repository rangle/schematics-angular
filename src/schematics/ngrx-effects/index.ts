import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule } from '@angular-devkit/schematics';

import { addEffectsToModule } from '../../ast/add-effects-to-module';
import { modifySourceFileRule } from '../../rules/modify-source-file.rule';
import { findModuleFilenameInTree } from '../../rules/tree-helpers';
import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return chain([
    processTemplates(options, options.path),
    modifySourceFileRule(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addEffectsToModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}Effects`),
          `.${Folders.Store}/${strings.dasherize(options.name)}.effects`
        )
    )
  ]);
}
