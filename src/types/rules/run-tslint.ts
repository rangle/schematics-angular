import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

export function runTslint(): Rule {
  return (_, context: SchematicContext) => {
    context.addTask(
      new TslintFixTask({
        ignoreErrors: true
      })
    );
  };
}
