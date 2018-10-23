import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function runNpmInstall(): Rule {
  return (_, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}
