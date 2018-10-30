import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { reworkAppReducer } from './rework-app-reducer';

describe('reworkAppReducer()', () => {
  let sourceFile: typescript.SourceFile;

  beforeEach(() => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.reducer.txt');
  });

  it('remove State interface and replace State with AppState', () => {
    const modifications = reworkAppReducer(sourceFile);

    expect(modifications.length).toEqual(4);
    expect(modifications[0].index).toEqual(186);
    expect(modifications[0].toAdd).toContain(
      `import { AppState } from '../types/app-state/app-state.interface'`
    );
    expect(modifications[1].index).toEqual(186);
    expect(modifications[1].removeToIndex).toEqual(215);
    expect(modifications[2].index).toEqual(257);
    expect(modifications[2].removeToIndex).toEqual(262);
    expect(modifications[2].toAdd).toEqual('AppState');
    expect(modifications[3].index).toEqual(313);
    expect(modifications[3].removeToIndex).toEqual(318);
    expect(modifications[3].toAdd).toEqual('AppState');
  });
});
