import { Rule, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { insertTreeChanges, openTypescriptSourceFile } from './tree-helpers';

export function modifySourceFileRule(
  getFilename: (tree: Tree) => string,
  computeChanges: (sourceFile: typescript.SourceFile, moduleFilename: string) => Change[]
): Rule {
  return (tree: Tree) => {
    const filename = getFilename(tree);

    if (filename) {
      const sourceFile = openTypescriptSourceFile(tree, filename);

      if (sourceFile) {
        insertTreeChanges(tree, filename, computeChanges(sourceFile, filename));
      }
    }

    return tree;
  };
}
