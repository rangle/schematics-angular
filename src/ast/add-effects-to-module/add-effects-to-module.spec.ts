import * as typescript from 'typescript';

import { openSourceFileFromFileSystem } from '../ast-helpers';

import { addEffectsToModule } from './add-effects-to-module';

describe('addEffectsToModule()', () => {
  let sourceFile: typescript.SourceFile;

  it('add NgModule imports property and add EffectsModule', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.module.no-imports.txt');

    const modifications = addEffectsToModule(sourceFile, 'Stuff', './store/stuff.effects');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(87);
    expect(modifications[0].toAdd).toEqual(`import { Stuff } from './store/stuff.effects';\n`);
    expect(modifications[1].index).toEqual(100);
    expect(modifications[1].toAdd).toEqual(`imports: [EffectsModule.forFeature([Stuff])],`);
  });

  it('modify NgModule imports property and add EffectsModule', () => {
    sourceFile = openSourceFileFromFileSystem(__dirname + '/app.module.no-effects-module.txt');

    const modifications = addEffectsToModule(sourceFile, 'Stuff', './store/stuff.effects');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(203);
    expect(modifications[0].toAdd).toEqual(`import { Stuff } from './store/stuff.effects';\n`);
    expect(modifications[1].index).toEqual(269);
    expect(modifications[1].toAdd).toEqual(`, EffectsModule.forFeature([Stuff])`);
  });

  it('modify NgModule imports property and modify empty EffectsModule', () => {
    sourceFile = openSourceFileFromFileSystem(
      __dirname + '/app.module.has-empty-effects-module.txt'
    );

    const modifications = addEffectsToModule(sourceFile, 'Stuff', './store/stuff.effects');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(250);
    expect(modifications[0].toAdd).toEqual(`import { Stuff } from './store/stuff.effects';\n`);
    expect(modifications[1].index).toEqual(345);
    expect(modifications[1].toAdd).toEqual(`Stuff`);
  });

  it('modify NgModule imports property and modify existing EffectsModule', () => {
    sourceFile = openSourceFileFromFileSystem(
      __dirname + '/app.module.has-existing-effects-module.txt'
    );

    const modifications = addEffectsToModule(sourceFile, 'Stuff', './store/stuff.effects');

    expect(modifications.length).toEqual(2);
    expect(modifications[0].index).toEqual(300);
    expect(modifications[0].toAdd).toEqual(`import { Stuff } from './store/stuff.effects';\n`);
    expect(modifications[1].index).toEqual(405);
    expect(modifications[1].toAdd).toEqual(`, Stuff`);
  });
});
