import { chain, schematic, Tree } from '@angular-devkit/schematics';
import { mkdirSync } from 'fs';

import { updateBarrelFile } from '../../rules/update-barrel-file.rule';

export default function() {
  return chain([
    schematic('tslint-and-prettier', {}),
    updateBarrelFile('src/app/components', `export * from './app/app.component.ts'`),
    (tree: Tree) => {
      const filesToDelete = ['src/app/app.component.spec.ts', 'src/app/app.effects.spec.ts'];

      filesToDelete.forEach(filename => {
        if (tree.exists(filename)) {
          tree.delete(filename);
        }
      });
    },
    (tree: Tree) => {
      mkdirSync('./src');
      mkdirSync('./src/app');
      mkdirSync('./src/app/components');
      mkdirSync('./src/app/components/app');
      mkdirSync('./src/app/store');

      const filesToMove = [
        {
          from: 'src/app/app.component.html',
          to: 'src/app/components/app/app.component.html'
        },
        {
          from: 'src/app/app.component.scss',
          to: 'src/app/components/app/app.component.scss'
        },
        {
          from: 'src/app/app.component.ts',
          to: 'src/app/components/app/app.component.ts'
        },
        {
          from: 'src/app/reducers/index.ts',
          to: 'src/app/store/app.reducer.ts'
        },
        {
          from: 'src/app/app.effects.ts',
          to: 'src/app/store/app.effects.ts'
        }
      ];

      filesToMove.forEach(filename => {
        if (tree.exists(filename.from)) {
          tree.rename(filename.from, filename.to);
        }
      });
    }
  ]);
}
