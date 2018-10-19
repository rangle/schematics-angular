import { Rule, Tree } from '@angular-devkit/schematics';

import { getProjectPrefix } from '../../types/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options.interface';
import { getComponentFolderPath, validateRegularSchema } from '../../types/schema-options.function';
import { processTemplates } from '../../util/util';

export function component(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return (tree: Tree) => {
    options.path = getComponentFolderPath(options.path);
    options.prefix = getProjectPrefix(tree, options);

    return processTemplates(options, `${options.path}`);
  };
}
