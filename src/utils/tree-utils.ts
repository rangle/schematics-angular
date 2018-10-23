import { DirEntry, Tree } from '@angular-devkit/schematics';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

export function deleteFile(tree: Tree, filename: string) {
  if (tree.exists(filename)) {
    tree.delete(filename);
  }
}

export function findParentFilename(
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

  return directory.parent ? findParentModuleFilename(directory.parent) : null;
}

export function findParentModuleFilename(directory: DirEntry): string {
  return findParentFilename(
    directory,
    file => file.endsWith('.module.ts') && !file.includes('-routing')
  );
}

export function openTypescriptSourceFile(tree: Tree, filename: string): typescript.SourceFile {
  if (filename) {
    const sourceText = tree.read(filename);

    if (sourceText) {
      return typescript.createSourceFile(
        filename,
        sourceText.toString('utf-8'),
        typescript.ScriptTarget.Latest,
        true
      ) as typescript.SourceFile;
    }
  }

  return null;
}

export function insertTreeChanges(tree: Tree, filename: string, changes: Change[]) {
  const declarationRecorder = tree.beginUpdate(filename);

  changes.forEach(change => {
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
  });

  tree.commitUpdate(declarationRecorder);
}

export function getTouchedFiles(tree: Tree) {
  return tree.actions.reduce((files, action) => {
    return action.path.endsWith('.ts') ? files.concat([`.${action.path}`]) : files;
  }, []);
}
