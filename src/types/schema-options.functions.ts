import * as strings from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  branchAndMerge,
  mergeWith,
  move,
  template,
  url,
  Rule,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';

import { SchemaOptions } from './schema-options.interface';

export function validateRegularSchema(options: SchemaOptions) {
  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }
}

export function getModuleFolderPath(path: string) {
  return path.endsWith('modules') ? path : `${path}/modules`;
}

export function getComponentFolderPath(path: string) {
  return path.endsWith('components') ? path : `${path}/components`;
}

export function getModulePath(options: SchemaOptions) {
  return (options.path ? `${getModuleFolderPath(options.path)}` : 'src') + `/${options.name}`;
}

export function processTemplates(options: SchemaOptions, directory: string = options.path): Rule {
  return branchAndMerge(
    mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...{ uppercase: (value: string) => value.toUpperCase() },
          ...options
        }),
        move(directory)
      ])
    )
  );
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