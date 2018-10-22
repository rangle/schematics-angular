import { SchematicsException, Tree } from '@angular-devkit/schematics';

import { SchemaOptions } from './schema-options.interface';

export function validateRegularSchema(options: SchemaOptions) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }

  if (!options.path) {
    throw new SchematicsException('Option (path) is required.');
  }
}

export function getContainingFolderPath(path: string, folder: string) {
  return path.endsWith(folder) ? path : `${path}${folder}`;
}

export function updateBarrelFile(tree: Tree, options: SchemaOptions, newContent: string | Buffer) {
  const barrelFile = options.path + '/index.ts';

  if (!tree.exists(barrelFile)) {
    tree.create(barrelFile, newContent);
  } else {
    const existingContent = tree.read(barrelFile);

    if (existingContent) {
      tree.overwrite(barrelFile, existingContent.toString() + newContent);
    }
  }
}
