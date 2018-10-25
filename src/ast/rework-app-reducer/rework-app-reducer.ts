import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change, RemoveChange, ReplaceChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import {
  getInterfaceDeclarationByType,
  getTypeArgumentOfVariableDeclaration,
  getVariableDeclaration
} from '../ast-helpers';

export function reworkAppReducer(
  sourceFile: typescript.SourceFile,
  appReducerPath: string
): Change[] {
  const stateDeclaration = getInterfaceDeclarationByType(sourceFile, 'State');
  const reducers = getVariableDeclaration(sourceFile, 'ActionReducerMap');
  const metaReducers = getVariableDeclaration(sourceFile, 'Array');

  if (!stateDeclaration || !reducers || !metaReducers) {
    return [];
  }

  return [
    insertImport(sourceFile, appReducerPath, 'AppState', '../types/app-state/app-state.interface'),
    new RemoveChange(appReducerPath, stateDeclaration.pos, stateDeclaration.getText()),
    new ReplaceChange(
      appReducerPath,
      getTypeArgumentOfVariableDeclaration(reducers).pos,
      'State',
      'AppState'
    ),
    new ReplaceChange(
      appReducerPath,
      getTypeArgumentOfVariableDeclaration(metaReducers).pos,
      'MetaReducer<State>',
      'MetaReducer<AppState>'
    )
  ];
}
