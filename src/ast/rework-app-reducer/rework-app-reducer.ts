import * as typescript from 'typescript';

import {
  getInterfaceDeclarationByType,
  getTypeArgumentOfVariableDeclaration,
  getVariableDeclaration
} from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function reworkAppReducer(sourceFile: typescript.SourceFile): SourceFileModification[] {
  const modifications = [
    addImportStatementToFile(sourceFile, 'AppState', '../types/app-state/app-state.interface')
  ];

  const stateDeclaration = getInterfaceDeclarationByType(sourceFile, 'State');

  if (stateDeclaration) {
    modifications.push({
      index: stateDeclaration.pos,
      removeToIndex: stateDeclaration.end
    });
  }

  const reducers = getVariableDeclaration(sourceFile, 'ActionReducerMap');

  if (reducers) {
    const typeArgument = getTypeArgumentOfVariableDeclaration(reducers);

    modifications.push({
      index: typeArgument.pos,
      removeToIndex: typeArgument.end,
      toAdd: 'AppState'
    });
  }

  const metaReducers = getVariableDeclaration(sourceFile, 'MetaReducer');

  if (metaReducers) {
    const typeArgument = getTypeArgumentOfVariableDeclaration(metaReducers);
    modifications.push({
      index: typeArgument.pos,
      removeToIndex: typeArgument.end,
      toAdd: 'AppState'
    });
  }

  return modifications;
}
