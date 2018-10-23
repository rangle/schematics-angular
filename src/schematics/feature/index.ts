import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { addRouteToRoutingModule } from '../../types/ast/add-route-to-routing-module';
import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import { modifySourceFileRule } from '../../types/rules/modify-source-file.rule';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { findParentRoutingModuleFilenameInTree } from '../../utils/tree-utils';

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
    )
  ]);
}
