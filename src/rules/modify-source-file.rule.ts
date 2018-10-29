import { normalize } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import * as typescript from 'typescript';

import { SourceFileModification } from '../ast/source-file-modification.interface';
import { Folders } from '../types/folders/folders.enum';

import { applyModificationsToTreeFile, openSourceFileFromTree } from './tree-helpers';

function getFolderType(filename: string): Folders {
  const paths = normalize(filename).split('/').reverse();

  for(const path of paths) {
    switch (`/${path}`) {
      case Folders.Features:
        return Folders.Features;
      case Folders.Modules:
        return Folders.Modules
    }
  }

  return Folders.Features;
}

export function modifySourceFile(
  getFilename: (tree: Tree) => string,
  computeModifications: (
    sourceFile: typescript.SourceFile,
    folderType: Folders
  ) => SourceFileModification[]
): Rule {
  return (tree: Tree) => {
    const filename = getFilename(tree);

    if (filename) {
      const sourceFile = openSourceFileFromTree(tree, filename);

      if (sourceFile) {
        applyModificationsToTreeFile(
          tree,
          filename,
          computeModifications(sourceFile, getFolderType(filename))
        );
      }
    }

    return tree;
  };
}
