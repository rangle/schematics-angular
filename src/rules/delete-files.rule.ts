import { Rule, Tree } from '@angular-devkit/schematics';

import { deleteFile } from './tree-helpers';

export function deleteFilesRule(files: string[]): Rule {
  return (tree: Tree) => {
    files.forEach(file => deleteFile(tree, file));
  };
}
