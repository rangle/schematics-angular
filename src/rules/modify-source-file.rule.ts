import { Rule, Tree } from '@angular-devkit/schematics';
import * as typescript from 'typescript';

import { SourceFileModification } from '../ast/source-file-modification.interface';

import { applyModificationsToTreeFile, openSourceFileFromTree } from './tree-helpers';

export function modifySourceFile(
  getFilename: (tree: Tree) => string,
  computeModifications: (
    sourceFile: typescript.SourceFile,
    filename: string
  ) => SourceFileModification[]
): Rule {
  return (tree: Tree) => {
    const filename = getFilename(tree);

    if (filename) {
      const sourceFile = openSourceFileFromTree(tree, filename);

      if (sourceFile) {
        applyModificationsToTreeFile(tree, filename, computeModifications(sourceFile, filename));
      }
    }

    return tree;
  };
}
