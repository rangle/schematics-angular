import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addDeclarationToModule } from '@schematics/angular/utility/ast-utils';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import {
  getContainingFolderPath,
  updateBarrelFile,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import {
  findParentModuleFilename,
  insertTreeChanges,
  openTypescriptSourceFile
} from '../../utils/tree-utils';

export default function(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Components);

  return chain([
    (tree: Tree) => {
      options.prefix = getProjectPrefix(tree, options);

      return processTemplates(options, options.path);
    },
    (tree: Tree) => {
      updateBarrelFile(
        tree,
        options,
        `export * from './${strings.dasherize(options.name)}/${strings.dasherize(
          options.name
        )}.component';\r\n`
      );

      return tree;
    },
    (tree: Tree) => {
      const moduleFilename = findParentModuleFilename(tree.getDir(options.path));

      if (moduleFilename) {
        const sourceFile = openTypescriptSourceFile(tree, moduleFilename);

        if (sourceFile) {
          insertTreeChanges(
            tree,
            moduleFilename,
            addDeclarationToModule(
              sourceFile,
              moduleFilename,
              strings.classify(`${options.name}Component`),
              './components'
            )
          );
        }
      }

      return tree;
    }
  ]);
}
