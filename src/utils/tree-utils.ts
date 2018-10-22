import { DirEntry, Tree } from '@angular-devkit/schematics';
import * as typescript from 'typescript';

export function deleteFile(tree: Tree, filename: string) {
  if (tree.exists(filename)) {
    tree.delete(filename);
  }
}

export function findParentModuleFilename(directory: DirEntry): string {
  const moduleFile = directory.subfiles.find(
    file => file.endsWith('.module.ts') && !file.includes('-routing')
  );

  if (moduleFile) {
    const fileEntry = directory.file(moduleFile);

    if (fileEntry) {
      return fileEntry.path;
    }
  }

  return directory.parent ? findParentModuleFilename(directory.parent) : null;
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
