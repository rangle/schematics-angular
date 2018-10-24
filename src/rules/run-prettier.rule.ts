import { Tree } from '@angular-devkit/schematics';
import * as prettier from 'prettier';

/* tslint:disable-next-line */
const prettierConfig = require('../schematics/tslint-and-prettier/files/prettier.config');

import { getTouchedFiles } from './tree-helpers';

export function runPrettier() {
  return (tree: Tree) => {
    getTouchedFiles(tree).forEach(file => {
      tree.overwrite(
        file,
        prettier.format(tree.read(file).toString(), {
          ...prettierConfig,
          parser: 'typescript'
        })
      );
    });
  };
}
