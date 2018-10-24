import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function runNpmInstallRule(): Rule {
  return (_, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}
