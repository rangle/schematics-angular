import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';
import { SourceFileModification } from '../source-file-modification.interface';

import { addRouteToRoutingModule } from './add-route-to-routing-module';

describe('addRouteToRoutingModule()', () => {
  let sourceFile: typescript.SourceFile;

  it('add a route to an empty routes array', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app-routing.module.empty-routes.txt');

    const modifications: SourceFileModification[] = addRouteToRoutingModule(sourceFile, 'stuff');

    expect(modifications.length).toEqual(1);
    expect(modifications[0].toAdd).toEqual(
      `{ path: 'stuff', loadChildren: './features/stuff/stuff.module#StuffModule' }`
    );
    expect(modifications[0].index).toEqual(123);
  });

  it('add a route to an existing routes array', () => {
    sourceFile = openSourceFileFromFileSystem(
      __dirname + '/app-routing.module.existing-routes.txt'
    );

    const modifications: SourceFileModification[] = addRouteToRoutingModule(sourceFile, 'stuff');

    expect(modifications.length).toEqual(1);
    expect(modifications[0].toAdd).toEqual(
      `, { path: 'stuff', loadChildren: './features/stuff/stuff.module#StuffModule' }`
    );
    expect(modifications[0].index).toEqual(203);
  });
});
