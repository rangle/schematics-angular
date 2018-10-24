import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies';

export function addNpmDependenciesRule(dependencies: NodeDependency[]): Rule {
  return (tree: Tree, context: SchematicContext) => {
    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);

      context.logger.log('info', `Added "${dependency.name}" into ${dependency.type}`);
    });

    return tree;
  };
}
