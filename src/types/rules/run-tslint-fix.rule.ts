import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

import { findFilenameInTree } from '../../utils/tree-utils';

export function runTslintFixRule(path: string): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tslintConfigFilename = findFilenameInTree(tree.getDir(path), file =>
      file.includes('tslint.json')
    );

    if (tslintConfigFilename) {
      context.addTask(
        new TslintFixTask({
          ignoreErrors: true,
          tslintPath: tslintConfigFilename,
          tsConfigPath: 'tsconfig.json'
        })
      );
    }
  };
}
