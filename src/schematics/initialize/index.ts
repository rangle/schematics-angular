import { chain, schematic, Tree } from '@angular-devkit/schematics';

import { updateBarrelFile } from '../../rules/update-barrel-file.rule';

export default function() {
  return chain([
    schematic('tslint-and-prettier', {}),
    updateBarrelFile('src/app/components', `export * from './app/app.component'`),
    (tree: Tree) => {
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
        if (tree.exists(filename.from) && !tree.exists(filename.to)) {
          tree.create(filename.to, tree.read(filename.from));
          tree.delete(filename.from);
        }
      });

      tree.delete('src/app/reducers');
    },
    (tree: Tree) => {
      const filesToDelete = [
        'src/app/app.component.spec.ts',
        'src/app/app.effects.spec.ts',
        'src/app/reducers'
      ];

      filesToDelete.forEach(filename => {
        if (tree.exists(filename)) {
          tree.delete(filename);
        }
      });
    },
    (tree: Tree) => {
      tree.overwrite(
        'src/app/app.module.ts',
        tree
          .read('src/app/app.module.ts')
          .toString()
          .replace(`'./app.component'`, `'./components'`)
          .replace(`'./app.effects'`, `'./store/app.effects'`)
          .replace(`'./reducers'`, `'./store/app.reducer'`)
      );
    }
  ]);
}
