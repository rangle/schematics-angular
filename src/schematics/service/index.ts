import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule } from '@angular-devkit/schematics';
import { addProviderToModule } from '@schematics/angular/utility/ast-utils';

import { modifySourceFileRule } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { findModuleFilenameInTree } from '../../rules/tree-helpers';
import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

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
