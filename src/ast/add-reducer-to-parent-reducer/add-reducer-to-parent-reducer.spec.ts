import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';
import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addReducerToParentReducer } from './add-reducer-to-parent-reducer';

describe('addReducerToParentReducer()', () => {
  let sourceFile: typescript.SourceFile;

  it('add child reducer to the parent app state ActionReducerMap', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.reducer.txt');

    const modifications = addReducerToParentReducer(sourceFile, Folders.Features, 'stuff');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(254);
    expect(modifications[0].toAdd).toContain(
      `import { stuffReducer } from '../features/stuff/store/stuff.reducer'`
    );
    expect(modifications[1].index).toEqual(309);
    expect(modifications[1].toAdd).toEqual('stuffState: stuffReducer,');
  });

  it('add child reducer to the parent feature state reducer that has no compose reducers', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/feature.reducer.no-child-states.txt');

    const modifications = addReducerToParentReducer(sourceFile, Folders.Features, 'child');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(239);
    expect(modifications[0].toAdd).toContain(
      `import { childReducer } from '../features/child/store/child.reducer'`
    );
    expect(modifications[1].index).toEqual(463);
    expect(modifications[1].removeToIndex).toEqual(470);
    expect(modifications[1].toAdd).toEqual(
      ' { ...state, childState: childReducer(state.childState, action) };'
    );
  });

  it('add child reducer to the parent feature state reducer that has has compose reducers', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/feature.reducer.has-child-states.txt');

    const modifications = addReducerToParentReducer(sourceFile, Folders.Features, 'child');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(306);
    expect(modifications[0].toAdd).toContain(
      `import { childReducer } from '../features/child/store/child.reducer'`
    );
    expect(modifications[1].index).toEqual(606);
    expect(modifications[1].toAdd).toEqual(', childState: childReducer(state.childState, action)');
  });
});
