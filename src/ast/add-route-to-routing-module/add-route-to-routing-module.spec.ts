import { InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addRouteToRoutingModule } from './add-route-to-routing-module';

describe('addRouteToRoutingModule()', () => {
  let sourceFile: typescript.SourceFile;

  beforeEach(() => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app-routing.module.txt');
  });

  it('add a route to an empty routes array', () => {
    const changes: InsertChange[] = addRouteToRoutingModule(
      sourceFile,
      'app-routing.module.txt',
      'stuff'
    ) as InsertChange[];

    expect(changes.length).toEqual(1);
    expect(changes[0].toAdd).toEqual(
      `{ path: 'stuff', loadChildren: './features/stuff/stuff.module#StuffModule' }`
    );
    expect(changes[0].order).toEqual(126);
  });
});
