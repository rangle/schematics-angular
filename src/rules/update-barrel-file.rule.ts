import { Rule, Tree } from '@angular-devkit/schematics';

import { SchemaOptions } from '../types/schema-options/schema-options.interface';

export function updateBarrelFile(options: SchemaOptions, newContent: string | Buffer): Rule {
  return (tree: Tree) => {
    const barrelFile = options.path + '/index.ts';

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
