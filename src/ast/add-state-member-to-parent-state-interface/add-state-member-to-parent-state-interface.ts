import * as strings from '@angular-devkit/core/src/utils/strings';
import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';
import { getInterfaceDeclarationByType } from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addStateMemberToParentStateInterface(
  sourceFile: typescript.SourceFile,
  name: string
): SourceFileModification[] {
  const appStateInterface = getInterfaceDeclarationByType(sourceFile, 'AppState');

  if (appStateInterface) {
    return [
      addImportStatementToFile(
        sourceFile,
        `${strings.classify(name)}State`,
        `../..${Folders.Features}/${strings.camelize(name)}/types/${strings.camelize(
          name
        )}-state/${strings.camelize(name)}-state.interface`
      ),
      {
        index: appStateInterface.members.pos,
        toAdd: `${strings.camelize(name)}State: ${strings.classify(name)}State;`
      }
    ];
  }

  return [];
}
