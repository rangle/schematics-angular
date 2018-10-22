import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

export function runTslint(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new TslintFixTask({
        ignoreErrors: true,
        tsConfigPath: 'tsconfig.json',
        files: tree.actions.reduce((files, action) => {
          return action.path.endsWith('.ts') ? files.concat([action.path]) : files;
        }, [])
      })
    );
  };
}
