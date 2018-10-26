import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addStateMemberToParentState } from './add-state-member-to-parent-state';

describe('addStateMemberToParentState()', () => {
  let sourceFile: typescript.SourceFile;

  beforeEach(() => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app-state.interface.txt');
  });

  it('remove State interface and replace State with AppState', () => {
    const modifications = addStateMemberToParentState(sourceFile, 'stuff');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(0);
    expect(modifications[0].toAdd).toEqual(
      `import { StuffState } from '../../features/stuff/types/stuff-state/stuff-state.interface';\r\n`
    );
    expect(modifications[1].index).toEqual(27);
    expect(modifications[1].toAdd).toEqual(`stuffState: StuffState;`);
  });
});
