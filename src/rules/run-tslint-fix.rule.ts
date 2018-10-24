import { Rule, Tree } from '@angular-devkit/schematics';
import { Configuration, Linter } from 'tslint';

import { PathOptions } from '../types/path-options/path-options.interface';

import { findFilenameInTree, getTouchedFiles } from './tree-helpers';

function getTslintJsonFilename(tree: Tree, options: PathOptions) {
  console.log('searching for tslint')
  return findFilenameInTree(tree.getDir(options.path), file => file.includes('tslint.json'));
}

function getLinterConfiguration(tslintJsonFilename: string) {
  return Configuration.findConfiguration(Configuration.JSON_CONFIG_FILENAME, tslintJsonFilename)
    .results;
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
        linter.lint(file, tree.read(file).toString(), getLinterConfiguration(tslintJsonFilename));

        tree.overwrite(file, linter.getResult().output);
      });
    }
  };
}
