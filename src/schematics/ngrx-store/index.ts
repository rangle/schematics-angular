import * as strings from '@angular-devkit/core/src/utils/strings';
import { chain, Rule } from '@angular-devkit/schematics';
import { addProviderToModule } from '@schematics/angular/utility/ast-utils';

import { Folders } from '../../types/folders/folders.enum';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { modifyParentModuleSourceFile } from '../../types/rules/modify-parent-module-source-file';
import {
  getContainingFolderPath,
  validateRegularSchema
} from '../../types/schema-options/schema-options.functions';
import { SchemaOptions } from '../../types/schema-options/schema-options.interface';

export default function(options: SchemaOptions): Rule {
  validateRegularSchema(options);

  options.path = getContainingFolderPath(options.path, Folders.Store);

  return chain([
    processTemplates(options, options.path),
    modifyParentModuleSourceFile(options, (sourceFile, moduleFilename) =>
      addProviderToModule(
        sourceFile,
        moduleFilename,
        strings.classify(`${options.name}Store`),
        `.${Folders.Store}/${strings.dasherize(options.name)}.store`
      )
    )
  ]);
}
