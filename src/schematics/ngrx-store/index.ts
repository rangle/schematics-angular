import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, noop, DirEntry, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { addProviderToNgModule } from '../../ast/ast-wrappers';
import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { findModuleFilenameInTree, getTreeSubDirFileEntry } from '../../rules/tree-helpers';
import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

function findAppStateTypesFile(directory: DirEntry): string {
  const appStateInterfaceFileEntry = getTreeSubDirFileEntry(
    directory,
    ['types', 'app-state'],
    'app-state.interface.ts'
  );

  if (appStateInterfaceFileEntry) {
    return appStateInterfaceFileEntry.path.replace(/\.ts$/gi, '');
  }

  return directory.parent ? findAppStateTypesFile(directory.parent) : null;
}

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return chain([
    (tree: Tree, context: SchematicContext) => {
      const appStateInterfacePath = findAppStateTypesFile(tree.getDir(options.path));

      if (appStateInterfacePath) {
        return processTemplates(
          {
            ...options,
            appStateInterfacePath
          },
          options.path
        );
      } else {
        context.logger.error(
          `Could not create the Store in '${
            options.path
          }' because we can't find your 'app-state.interface.ts' file.`
        );

        return noop();
      }
    },
    modifySourceFile(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addProviderToNgModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}Store`),
          `.${Folders.Store}/${strings.dasherize(options.name)}.store`
        )
    )
  ]);
}
