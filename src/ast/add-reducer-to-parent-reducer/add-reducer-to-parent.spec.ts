import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addReducerToParentReducer } from './add-reducer-to-parent-reducer';

describe('addReducerToParentReducer()', () => {
  let sourceFile: typescript.SourceFile;

  beforeEach(() => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.reducer.txt');
  });

  it('add reducer to ActionReducerMap', () => {
    const modifications = addReducerToParentReducer(sourceFile, 'stuff');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(263);
    expect(modifications[0].toAdd).toContain(
      `import { stuffReducer } from '../features/stuff/store/stuff.reducer'`
    );
    expect(modifications[1].index).toEqual(320);
    expect(modifications[1].toAdd).toEqual('stuffState: stuffReducer,');
  });
});
