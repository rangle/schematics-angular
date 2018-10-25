import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { addRouteToRoutingModule } from '../../ast/add-route-to-routing-module/add-route-to-routing-module';
import { modifySourceFileRule } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { runPrettier } from '../../rules/run-prettier.rule';
import { runTslintFix } from '../../rules/run-tslint-fix.rule';
import { findParentRoutingModuleFilenameInTree } from '../../rules/tree-helpers';
import { Folders } from '../../types/folders/folders.enum';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';

export default function(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return chain([
    (tree: Tree) => {
      options.path = `${getContainingFolderPath(options.path, Folders.Features)}/${options.name}`;
      options.prefix = getProjectPrefix(tree, options);

      return chain([
        processTemplates(options),
        schematic('component', options),
        schematic('service', options),
        schematic('ngrx', options),
        schematic('type', {
          ...options,
          name: `${options.name}-state`
        })
      ]);
    },
    modifySourceFileRule(
      tree => findParentRoutingModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addRouteToRoutingModule(sourceFile, moduleFilename, options.name)
    ),
    runPrettier(),
    runTslintFix(options)
  ]);
}
