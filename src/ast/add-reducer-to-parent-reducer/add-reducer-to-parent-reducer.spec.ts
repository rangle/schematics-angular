import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addReducerToParentReducer } from './add-reducer-to-parent-reducer';

describe('addReducerToParentReducer()', () => {
  let sourceFile: typescript.SourceFile;

  it('add child reducer to the parent app state ActionReducerMap', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.reducer.txt');

    const modifications = addReducerToParentReducer(sourceFile, 'stuff');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(263);
    expect(modifications[0].toAdd).toContain(
      `import { stuffReducer } from '../features/stuff/store/stuff.reducer'`
    );
    expect(modifications[1].index).toEqual(320);
    expect(modifications[1].toAdd).toEqual('stuffState: stuffReducer,');
  });

  it('add child reducer to the parent feature state reducer that has no compose reducers', () => {
    sourceFile = openSourceFileFromFileSystem(
      __dirname + '/feature.reducer.no-compose-reducers.txt'
    );

    const modifications = addReducerToParentReducer(sourceFile, 'child');

    expect(modifications.length).toEqual(3);
    expect(modifications[0].index).toEqual(244);
    expect(modifications[0].toAdd).toContain(`import { combineReducers } from '@ngrx/store'`);
    expect(modifications[1].index).toEqual(244);
    expect(modifications[1].toAdd).toContain(
      `import { childReducer } from '../features/child/store/child.reducer'`
    );
    expect(modifications[2].index).toEqual(477);
    expect(modifications[2].removeToIndex).toEqual(484);
    expect(modifications[2].toAdd).toEqual(
      'combineReducers<StuffState>({ childState: childReducer })(state, action);'
    );
  });

  it('add child reducer to the parent feature state reducer that has has compose reducers', () => {
    sourceFile = openSourceFileFromFileSystem(
      __dirname + '/feature.reducer.has-compose-reducers.txt'
    );

    const modifications = addReducerToParentReducer(sourceFile, 'child');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(312);
    expect(modifications[0].toAdd).toContain(
      `import { childReducer } from '../features/child/store/child.reducer'`
    );
    expect(modifications[1].index).toEqual(609);
    expect(modifications[1].toAdd).toEqual(', childState: childReducer');
  });
});