import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';
import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addStateMemberToParentStateInterface } from './add-state-member-to-parent-state-interface';

describe('addStateMemberToParentState()', () => {
  let sourceFile: typescript.SourceFile;

  it('add child state as a member to the parent app state interface', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app-state.interface.txt');

    const modifications = addStateMemberToParentStateInterface(
      sourceFile,
      Folders.Features,
      'stuff'
    );

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(0);
    expect(modifications[0].toAdd).toEqual(
      `import { StuffState } from '../../features/stuff/types/stuff-state/stuff-state.interface';\n`
    );
    expect(modifications[1].index).toEqual(27);
    expect(modifications[1].toAdd).toEqual(`stuffState: StuffState;`);
  });

  it('add child state as a member to the parent feature state interface', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/feature-state.interface.txt');

    const modifications = addStateMemberToParentStateInterface(
      sourceFile,
      Folders.Features,
      'stuff'
    );

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(0);
    expect(modifications[0].toAdd).toEqual(
      `import { StuffState } from '../../features/stuff/types/stuff-state/stuff-state.interface';\n`
    );
    expect(modifications[1].index).toEqual(31);
    expect(modifications[1].toAdd).toEqual(`stuffState: StuffState;`);
  });
});
