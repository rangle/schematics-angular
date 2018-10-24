import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

import { PathOptions } from '../types/path-options/path-options.interface';

import { findFilenameInTree, getTouchedFiles } from './tree-helpers';

function getTslintJsonFilename(tree: Tree, options: PathOptions) {
  return `.${findFilenameInTree(tree.getDir(options.path), file => file.includes('tslint.json'))}`;
}

export function runTslintFix(options: PathOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new TslintFixTask({
        tslintPath: getTslintJsonFilename(tree, options),
        files: getTouchedFiles(tree)
      })
    );
  };
}
