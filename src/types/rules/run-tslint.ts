import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

export function runTslint(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dir = tree.getDir('/');

    if (dir && (dir.subfiles as string[]).includes('tslint.json')) {
      context.addTask(
        new TslintFixTask({
          ignoreErrors: true,
          tsConfigPath: 'tsconfig.json'
        })
      );
    }
  };
}
