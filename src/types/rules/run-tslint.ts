import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

import { getTouchedFiles } from '../../utils/tree-utils';

export function runTslint(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new TslintFixTask({
        ignoreErrors: true,
        tsConfigPath: 'tsconfig.json',
        files: getTouchedFiles(tree)
      })
    );
  };
}
