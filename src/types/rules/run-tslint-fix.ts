import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

import { findParentFilename, getTouchedFiles } from '../../utils/tree-utils';

export function runTslintFix(path: string): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tslintConfigFilename = findParentFilename(tree.getDir(path), file =>
      file.includes('tslint.json')
    );

    console.log(tslintConfigFilename);

    if (tslintConfigFilename) {
      context.addTask(
        new TslintFixTask({
          ignoreErrors: true,
          tsConfigPath: 'tsconfig.json',
          files: getTouchedFiles(tree)
        })
      );
    }
  };
}
