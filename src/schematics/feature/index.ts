import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { getProjectPrefix } from '../../types/project-schema-options/project-schema-options.functions';
import { ProjectSchemaOptions } from '../../types/project-schema-options/project-schema-options.interface';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';

export default function(options: ProjectSchemaOptions): Rule {
  validateRegularSchema(options);

  return (tree: Tree) => {
    options.path = `${getContainingFolderPath(options.path, Folders.Features)}/${options.name}`;
    options.prefix = getProjectPrefix(tree, options);

    return chain([
      schematic('component', options),
      schematic('service', options),
      schematic('ngrx', options),
      schematic('type', {
        ...options,
        name: `${options.name}-state`
      }),
      processTemplates(options)
    ]);
  };
}
