import * as strings from '@angular-devkit/core/src/utils/strings';
import { DirEntry, FileEntry, Tree } from '@angular-devkit/schematics';
import * as typescript from 'typescript';

import { openSourceFile } from '../ast/ast-helpers';
import { SourceFileModification } from '../ast/source-file-modification.interface';
import { SchemaOptions } from '../types/schema-options/schema-options.interface';

export function deleteFile(tree: Tree, filename: string) {
  if (tree.exists(filename)) {
    tree.delete(filename);
  }
}

export function getSubDirEntry(directory: DirEntry, subDirectoryNames: string[]): DirEntry {
  if (subDirectoryNames.length > 0) {
    const subDirectoryPath = directory.subdirs.find(dir => dir === subDirectoryNames[0]);

    if (subDirectoryPath) {
      const subDirectory = directory.dir(subDirectoryPath);

      return subDirectoryNames.length > 1
        ? getSubDirEntry(subDirectory, subDirectoryNames.slice(1))
        : subDirectory;
    }
  }

  return null;
}

export function getSubFileEntry(directory: DirEntry, subFileName: string): FileEntry {
  const stateTypeFilePath = directory.subfiles.find(file => file.includes(subFileName));

  return stateTypeFilePath ? directory.file(stateTypeFilePath) : null;
}

export function getSubDirFileEntry(
  directory: DirEntry,
  subDirectoryNames: string[],
  subFileName: string
): FileEntry {
  const subDirEntry = getSubDirEntry(directory, subDirectoryNames);

  if (subDirEntry) {
    const subFileEntry = getSubFileEntry(subDirEntry, subFileName);

    if (subFileEntry) {
      return subFileEntry;
    }
  }

  return null;
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

export function applyModificationsToTreeFile(
  tree: Tree,
  filename: string,
  modifications: SourceFileModification[]
) {
  const updateRecorder = tree.beginUpdate(filename);

  modifications.forEach(modification => {
    if (modification.removeToIndex) {
      updateRecorder.remove(modification.index, modification.removeToIndex - modification.index);
    }

    if (modification.toAdd) {
      updateRecorder.insertLeft(modification.index, modification.toAdd);
    }
  });

  tree.commitUpdate(updateRecorder);
}

export function getTouchedFiles(tree: Tree) {
  return tree.actions.reduce((files, action) => {
    return action.path.endsWith('.ts') ? files.concat([`.${action.path}`]) : files;
  }, []);
}
