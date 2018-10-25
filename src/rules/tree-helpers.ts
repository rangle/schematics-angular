import * as strings from '@angular-devkit/core/src/utils/strings';
import { DirEntry, Tree } from '@angular-devkit/schematics';
import { Change, InsertChange, RemoveChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { openSourceFile } from '../ast/ast-helpers';
import { SchemaOptions } from '../types/schema-options/schema-options.interface';

export function deleteFile(tree: Tree, filename: string) {
  if (tree.exists(filename)) {
    tree.delete(filename);
  }
}

export function findFilenameInTree(
  directory: DirEntry,
  fileMatchesCriteria: (file: string) => boolean
): string {
  const pathFragment = directory.subfiles.find(fileMatchesCriteria);

  if (pathFragment) {
    const fileEntry = directory.file(pathFragment);

    if (fileEntry) {
      return fileEntry.path;
    }
  }

  return directory.parent ? findFilenameInTree(directory.parent, fileMatchesCriteria) : null;
}

export function findModuleFilenameInTree(tree: Tree, options: SchemaOptions): string {
  return findFilenameInTree(
    tree.getDir(options.path),
    file => file.endsWith('.module.ts') && !file.includes('-routing')
  );
}

export function findParentModuleFilenameInTree(tree: Tree, options: SchemaOptions): string {
  return findFilenameInTree(
    tree.getDir(options.path),
    file =>
      file.endsWith('.module.ts') &&
      !file.includes('-routing') &&
      file !== `${strings.dasherize(options.name)}.module.ts`
  );
}

export function findParentRoutingModuleFilenameInTree(tree: Tree, options: SchemaOptions): string {
  return findFilenameInTree(
    tree.getDir(options.path),
    file =>
      file.endsWith('-routing.module.ts') &&
      file !== `${strings.dasherize(options.name)}-routing.module.ts`
  );
}

export function openSourceFileFromTree(tree: Tree, filename: string): typescript.SourceFile {
  return openSourceFile(filename, () => tree.read(filename).toString('utf-8'));
}

export function insertTreeChanges(tree: Tree, filename: string, changes: Change[]) {
  const updateRecorder = tree.beginUpdate(filename);

  changes.forEach(change => {
    if (change instanceof InsertChange) {
      updateRecorder.insertLeft(change.pos, change.toAdd);
    }
  });

  tree.commitUpdate(updateRecorder);
}

export function getTouchedFiles(tree: Tree) {
  return tree.actions.reduce((files, action) => {
    return action.path.endsWith('.ts') ? files.concat([`.${action.path}`]) : files;
  }, []);
}
