import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

import { findParentFilename } from '../../utils/tree-utils';

export function runTslintFix(path: string): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tslintConfigFilename = findParentFilename(tree.getDir(path), file =>
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
