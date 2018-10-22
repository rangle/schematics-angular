import * as strings from '@angular-devkit/core/src/utils/strings';
import { Rule, Tree } from '@angular-devkit/schematics';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import {
  getContainingFolderPath,
  updateBarrelFile,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';

export default function(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return (tree: Tree) => {
    options.path = getContainingFolderPath(options.path, Folders.Components);
    options.prefix = getProjectPrefix(tree, options);

    updateBarrelFile(
      tree,
      options,
      `export * from './${strings.dasherize(options.name)}/${strings.dasherize(
        options.name
      )}.component';\r\n`
    );

    return processTemplates(options, options.path);
  };
}
