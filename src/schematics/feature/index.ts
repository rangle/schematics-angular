import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { addRouteToRoutingModule } from '../../ast/add-route-to-routing-module/add-route-to-routing-module';
import { addImportToNgModule } from '../../ast/ast-wrappers';
import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { runPrettier } from '../../rules/run-prettier.rule';
import { runTslintFix } from '../../rules/run-tslint-fix.rule';
import {
  findModuleFilenameInTree,
  findParentRoutingModuleFilenameInTree
} from '../../rules/tree-helpers';
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
        schematic('type', {
          ...options,
          name: `${options.name}-state`
        }),
        schematic('ngrx', {
          ...options,
          asFeature: true
        })
      ]);
    },
    modifySourceFile(
      tree => findModuleFilenameInTree(tree, options),
      (sourceFile, moduleFilename) =>
        addImportToNgModule(
          sourceFile,
          moduleFilename,
          strings.classify(`${options.name}RoutingModule`),
          `.${Folders.Features}/${strings.dasherize(options.name)}/${strings.dasherize(
            options.name
          )}-routing.module`
        )
    ),
    modifySourceFile(
      tree => findParentRoutingModuleFilenameInTree(tree, options),
      sourceFile => addRouteToRoutingModule(sourceFile, options.name)
    ),
    runPrettier(),
    runTslintFix(options)
  ]);
}
