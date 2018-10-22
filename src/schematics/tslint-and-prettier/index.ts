import { chain, MergeStrategy, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { processTemplates } from '../../types/path-options/path-options.functions';
import { PathOptions } from '../../types/path-options/path-options.interface';

const dependencies: NodeDependency[] = [
  { type: NodeDependencyType.Dev, version: '^1.14.3', name: 'prettier' },
  { type: NodeDependencyType.Dev, version: '^1.15.0', name: 'tslint-config-prettier' }
];

export default function(options: PathOptions): Rule {
  return chain([
    processTemplates(options, '/', MergeStrategy.AllowOverwriteConflict),
    (tree: Tree, context: SchematicContext) => {
      dependencies.forEach(dependency => {
        addPackageJsonDependency(tree, dependency);

        context.logger.log('info', `Added "${dependency.name}" into ${dependency.type}`);
      });

      return tree;
    }
  ]);
}
