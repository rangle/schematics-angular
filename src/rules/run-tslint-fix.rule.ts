import { Rule, Tree } from '@angular-devkit/schematics';
import { Linter } from 'tslint';

import { getTouchedFiles } from './tree-helpers';

export function runTslintFixRule(): Rule {
  return (tree: Tree) => {
    const linter = new Linter({
      fix: true
    });

    getTouchedFiles(tree).forEach(file => {
      linter.lint(file, tree.read(file).toString());
      tree.overwrite(file, linter.getResult().output);
    });
  };
}
