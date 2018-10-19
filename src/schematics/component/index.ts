import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule, Tree } from '@angular-devkit/schematics';

import { getProjectPrefix } from '../../types/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options.interface';
import {
  getComponentFolderPath,
  processTemplates,
  updateBarrelFile,
  validateRegularSchema
} from '../../types/schema-options.functions';

export function component(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return (tree: Tree) => {
    options.path = getComponentFolderPath(options.path);
    options.prefix = getProjectPrefix(tree, options);

    updateBarrelFile(
      tree, options,
      `export * from './${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.component';`
    );

    return chain([
      processTemplates(options, `${options.path}`)
    ]);
  };
}
