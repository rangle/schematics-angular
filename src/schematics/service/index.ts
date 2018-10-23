import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addProviderToModule } from '@schematics/angular/utility/ast-utils';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';
import {
  findParentModuleFilename,
  insertTreeChanges,
  openTypescriptSourceFile
} from '../../utils/tree-utils';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Services);

  return chain([
    processTemplates(options, options.path),
    (tree: Tree) => {
      const moduleFilename = findParentModuleFilename(tree.getDir(options.path));

      if (moduleFilename) {
        const sourceFile = openTypescriptSourceFile(tree, moduleFilename);

        if (sourceFile) {
          insertTreeChanges(
            tree,
            moduleFilename,
            addProviderToModule(
              sourceFile,
              moduleFilename,
              strings.classify(`${options.name}Service`),
              `.${Folders.Services}`
            )
          );
        }
      }

      return tree;
    }
  ]);
}
