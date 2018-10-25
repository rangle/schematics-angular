import * as typescript from 'typescript';

import {
  getInterfaceDeclarationByType,
  getTypeArgumentOfVariableDeclaration,
  getVariableDeclaration
} from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function reworkAppReducer(
  sourceFile: typescript.SourceFile,
  appReducerPath: string
): SourceFileModification[] {
  const modifications = [
    addImportStatementToFile(
      sourceFile,
      appReducerPath,
      'AppState',
      '../types/app-state/app-state.interface'
    )
  ];

  const stateDeclaration = getInterfaceDeclarationByType(sourceFile, 'State');

  if (stateDeclaration) {
    modifications.push({
      index: stateDeclaration.pos,
      toRemove: stateDeclaration.getText()
    });
  }

  const reducers = getVariableDeclaration(sourceFile, 'ActionReducerMap');

  if (reducers) {
    modifications.push({
      index: getTypeArgumentOfVariableDeclaration(reducers).pos,
      toRemove: 'State',
      toAdd: 'AppState'
    });
  }

  const metaReducers = getVariableDeclaration(sourceFile, 'MetaReducer');

  if (metaReducers) {
    modifications.push({
      index: getTypeArgumentOfVariableDeclaration(metaReducers).pos,
      toRemove: 'MetaReducer<State>',
      toAdd: 'MetaReducer<AppState>'
    });
  }

  return modifications;
}
