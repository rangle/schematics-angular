import { Rule, Tree } from '@angular-devkit/schematics';
import { Linter } from 'tslint';
import { loadConfigurationFromPath } from 'tslint/lib/configuration';

import { PathOptions } from '../types/path-options/path-options.interface';

import { findFilenameInTree, getTouchedFiles } from './tree-helpers';

function getTslintJsonFilename(tree: Tree, options: PathOptions) {
  return `.${findFilenameInTree(tree.getDir(options.path), file => file.includes('tslint.json'))}`;
}

export function runTslintFix(options: PathOptions): Rule {
  return (tree: Tree) => {
    const tslintJsonFilename = getTslintJsonFilename(tree, options);

    if (tslintJsonFilename) {
      const linter = new Linter({
        fix: true,
        formatter: 'verbose'
      });

      getTouchedFiles(tree).forEach(file => {
        linter.lint(
          file,
          tree.read(file).toString(),
          loadConfigurationFromPath(tslintJsonFilename)
        );

        tree.overwrite(file, linter.getResult().output);
      });
    }
  };
}
