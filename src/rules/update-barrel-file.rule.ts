import { Rule, Tree } from '@angular-devkit/schematics';

export function updateBarrelFile(path: string, newContent: string | Buffer): Rule {
  return (tree: Tree) => {
    const barrelFile = path + '/index.ts';

    if (!tree.exists(barrelFile)) {
      tree.create(barrelFile, newContent);
    } else {
      const existingContent = tree.read(barrelFile);

      if (existingContent) {
        tree.overwrite(barrelFile, existingContent.toString() + newContent);
      }
    }
  };
}
