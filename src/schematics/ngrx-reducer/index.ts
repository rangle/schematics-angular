import { chain, Rule, Tree } from '@angular-devkit/schematics';

import { addDefaultValueToParentStateFunctions } from '../../ast/add-default-value-to-parent-state-functions/add-default-value-to-parent-state-functions';
import { addReducerToParentReducer } from '../../ast/add-reducer-to-parent-reducer/add-reducer-to-parent-reducer';
import { addStateMemberToParentStateInterface } from '../../ast/add-state-member-to-parent-state-interface/add-state-member-to-parent-state-interface';
import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { Folders } from '../../types/folders/folders.enum';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

function findParentReducerFile(tree: Tree, name: string, path: string): string {
  const directory = tree.getDir(path);
  const storePath = directory.subdirs.find(dir => dir === 'store');

  if (storePath) {
    const storeDirEntry = directory.dir(storePath);

    const reducerPath = storeDirEntry.subfiles.find(
      file => file.includes('.reducer.ts') && file !== `${name}.reducer.ts`
    );

    if (reducerPath) {
      return storeDirEntry.file(reducerPath).path;
    }
  }

  return directory.parent ? findParentReducerFile(tree, name, directory.parent.path) : null;
}

function findParentStateTypesFile(
  tree: Tree,
  extension: string,
  name: string,
  path: string
): string {
  const directory = tree.getDir(path);
  const typesPath = directory.subdirs.find(dir => dir === 'types');

  if (typesPath) {
    const typesDirEntry = directory.dir(typesPath);

    const statePath = typesDirEntry.subdirs.find(dir => dir.includes('-state'));

    if (statePath) {
      const stateDirEntry = typesDirEntry.dir(statePath);

      const stateTypeFilePath = stateDirEntry.subfiles.find(
        file => file.includes(`-state.${extension}.ts`) && file !== `${name}-state.${extension}.ts`
      );

      if (stateTypeFilePath) {
        return stateDirEntry.file(stateTypeFilePath).path;
      }
    }
  }

  return directory.parent
    ? findParentStateTypesFile(tree, extension, name, directory.parent.path)
    : null;
}

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return chain([
    processTemplates(options, options.path),
    modifySourceFile(
      tree => findParentReducerFile(tree, options.name, options.path),
      sourceFile => addReducerToParentReducer(sourceFile, options.name)
    ),
    modifySourceFile(
      tree => findParentStateTypesFile(tree, 'interface', options.name, options.path),
      sourceFile => addStateMemberToParentStateInterface(sourceFile, options.name)
    ),
    modifySourceFile(
      tree => findParentStateTypesFile(tree, 'functions', options.name, options.path),
      sourceFile => addDefaultValueToParentStateFunctions(sourceFile, options.name)
    )
  ]);
}
