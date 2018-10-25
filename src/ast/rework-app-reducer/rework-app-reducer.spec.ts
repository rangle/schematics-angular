import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { reworkAppReducer } from './rework-app-reducer';

describe('reworkAppReducer()', () => {
  let sourceFile: typescript.SourceFile;

  beforeEach(() => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.reducer.txt');
  });

  it('remove State interface and replace State with AppState', () => {
    const changes: Change[] = reworkAppReducer(sourceFile, 'app.reducer.txt');

    expect(changes.length).toEqual(4);
    expect(changes[0].order).toEqual(194);
    expect((changes[0] as InsertChange).toAdd).toContain(
      `import { AppState } from '../types/app-state/app-state.interface'`
    );
    expect(changes[1].order).toEqual(195);
    expect(changes[2].order).toEqual(272);
  });
});
