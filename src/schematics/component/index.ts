import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addDeclarationToModule } from '@schematics/angular/utility/ast-utils';

import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { findModuleFilenameInTree } from '../../rules/tree-helpers';
import { updateBarrelFile } from '../../rules/update-barrel-file.rule';
import { Folders } from '../../types/folders/folders.enum';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';

export default function(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Components);

  return chain([
    (tree: Tree) => {
      options.prefix = getProjectPrefix(tree, options);

      return processTemplates(options, options.path);
    },
    updateBarrelFile(
      options.path,
      `export * from './${strings.dasherize(options.name)}/${strings.dasherize(
        options.name
      )}.component';\r\n`
    ),
    modifySourceFile(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addDeclarationToModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}Component`),
          `.${Folders.Components}`
        )
    )
  ]);
}
