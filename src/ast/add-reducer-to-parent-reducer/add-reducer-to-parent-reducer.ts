import * as strings from '@angular-devkit/core/src/utils/strings';
import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';
import { getVariableDeclaration } from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addReducerToParentReducer(
  sourceFile: typescript.SourceFile,
  name: string
): SourceFileModification[] {
  const reducers = getVariableDeclaration(sourceFile, 'ActionReducerMap');

  if (reducers) {
    const actionReducerMap = reducers.initializer as typescript.ObjectLiteralExpression;

    if (actionReducerMap) {
      return [
        addImportStatementToFile(
          sourceFile,
          `${strings.camelize(name)}Reducer`,
          `..${Folders.Features}/${strings.dasherize(name)}/store/${strings.dasherize(
            name
          )}.reducer`
        ),
        {
          index: actionReducerMap.properties.pos,
          toAdd: `${strings.camelize(name)}State: ${strings.camelize(name)}Reducer,`
        }
      ];
    }
  }

  return [];
}
