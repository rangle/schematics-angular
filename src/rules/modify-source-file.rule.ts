import { Rule, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { applyChangesToTreeFile, openSourceFileFromTree } from './tree-helpers';

export function modifySourceFile(
  getFilename: (tree: Tree) => string,
  computeChanges: (sourceFile: typescript.SourceFile, filename: string) => Change[]
): Rule {
  return (tree: Tree) => {
    const filename = getFilename(tree);

    if (filename) {
      const sourceFile = openSourceFileFromTree(tree, filename);

      if (sourceFile) {
        applyChangesToTreeFile(tree, filename, computeChanges(sourceFile, filename));
      }
    }

    return tree;
  };
}
