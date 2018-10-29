import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, schematic, Rule } from '@angular-devkit/schematics';

import { addImportToNgModule } from '../../ast/ast-wrappers';
import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { runPrettier } from '../../rules/run-prettier.rule';
import { runTslintFix } from '../../rules/run-tslint-fix.rule';
import { findParentModuleFilenameInTree } from '../../rules/tree-helpers';
import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = `${getContainingFolderPath(options.path, Folders.Modules)}/${options.name}`;

  return chain([
    processTemplates(options),
    schematic('service', options),
    schematic('type', {
      ...options,
      name: `${options.name}-state`
    }),
    schematic('ngrx', options),
    modifySourceFile(
      tree => findParentModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addImportToNgModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}Module`),
          `.${Folders.Modules}/${strings.dasherize(options.name)}/${strings.dasherize(
            options.name
          )}.module`
        )
    ),
    runPrettier(),
    runTslintFix(options)
  ]);
}
