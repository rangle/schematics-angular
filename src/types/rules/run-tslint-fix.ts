import { DirEntry, Rule, SchematicsException, SchematicContext, Tree } from '@angular-devkit/schematics';
import { TslintFixTask } from '@angular-devkit/schematics/tasks';

export function runTslintFix(path: string): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let dir: DirEntry | null = tree.getDir(path.substr(0, path.lastIndexOf('/')));

    console.log(dir.path);

    do {
      if ((dir.subfiles as string[]).includes('tslint.json')) {
        break;
      }

      dir = dir.parent;

      console.log(dir.path);
    } while (dir !== null);

    if (dir === null) {
      throw new SchematicsException('Asked to run lint fixes, but could not find a tslint.json.');
    }

    // Only include files that have been touched.
    const files = tree.actions.reduce((acc: Set<string>, action) => {
      const p = action.path.substr(1);  // Remove the starting '/'.
      if (p.endsWith('.ts') && dir && action.path.startsWith(dir.path)) {
        acc.add(p);
      }

      return acc;
    }, new Set<string>());

    console.log(files);

    context.addTask(
      new TslintFixTask({
        ignoreErrors: true,
        tsConfigPath: 'tsconfig.json',
        files: [...files]
      })
    );
  };
}
