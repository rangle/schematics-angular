import { Tree } from '@angular-devkit/schematics';
import * as prettier from 'prettier';

// noinspection TsLint
const prettierConfig = require('../schematics/tslint-and-prettier/files/prettier.config');

import { getTouchedFiles } from './tree-helpers';

export function runPrettier() {
  return (tree: Tree) => {
    getTouchedFiles(tree).forEach(file => {
      prettier.format(tree.read(file).toString(), {
        ...prettierConfig,
        parser: 'typescript'
      });
    });
  };
}
