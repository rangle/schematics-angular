import { chain, schematic, Tree } from '@angular-devkit/schematics';

export default function() {
  return chain([
    schematic('tslint-and-prettier', {}),
    (tree: Tree) => {
      const filesToDelete = ['src/app/app.component.spec.ts', 'src/app/app.effects.spec.ts'];

      filesToDelete.forEach(filename => {
        if (tree.exists(filename)) {
          tree.delete(filename);
        }
      });

      const filesToRename = [
        {
          from: 'src/app/app.component.html',
          to: 'src/app/components/app.component.html'
        },
        {
          from: 'src/app/app.component.scss',
          to: 'src/app/components/app.component.scss'
        },
        {
          from: 'src/app/app.component.ts',
          to: 'src/app/components/app.component.ts'
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

      filesToRename.forEach(filename => {
        if (tree.exists(filename.from)) {
          tree.rename(filename.from, filename.to);
        }
      });
    }
  ]);
}
