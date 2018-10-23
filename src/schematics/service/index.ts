import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule } from '@angular-devkit/schematics';
import { addProviderToModule } from '@schematics/angular/utility/ast-utils';

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

  options.path = getContainingFolderPath(options.path, Folders.Services);

  return chain([
    processTemplates(options, options.path),
    modifySourceFileRule(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addProviderToModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}Service`),
          `.${Folders.Services}/${strings.dasherize(options.name)}.service`
        )
    )
  ]);
}
