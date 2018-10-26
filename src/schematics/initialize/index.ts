import { chain, schematic, Rule, Tree } from '@angular-devkit/schematics';

import { reworkAppReducer } from '../../ast/rework-app-reducer/rework-app-reducer';
import { modifySourceFile } from '../../rules/modify-source-file.rule';
import { updateBarrelFile } from '../../rules/update-barrel-file.rule';

const AppModule = 'src/app/app.module.ts';
const AppReducer = 'src/app/store/app.reducer.ts';

export default function(): Rule {
  return chain([
    schematic('tslint-and-prettier', {}),
    schematic('type', {
      path: 'src/app',
      name: 'app-state',
      addMember: false
    }),
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
          to: AppReducer
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
      if (tree.exists(AppModule)) {
        tree.overwrite(
          AppModule,
          tree
            .read(AppModule)
            .toString()
            .replace(`'./app.component'`, `'./components'`)
            .replace(`'./app.effects'`, `'./store/app.effects'`)
            .replace(`'./reducers'`, `'./store/app.reducer'`)
        );
      }
    },
    (tree: Tree) => {
      if (tree.exists(AppReducer)) {
        return modifySourceFile(() => AppReducer, sourceFile => reworkAppReducer(sourceFile));
      }
    }
  ]);
}
