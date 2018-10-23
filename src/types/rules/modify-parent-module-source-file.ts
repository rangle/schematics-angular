import { Rule, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import {
  findParentModuleFilename,
  insertTreeChanges,
  openTypescriptSourceFile
} from '../../utils/tree-utils';
import { SchemaOptions } from '../schema-options/schema-options.interface';

export function modifyParentModuleSourceFile(
  options: SchemaOptions,
  computeChanges: (sourceFile: typescript.SourceFile, moduleFilename: string) => Change[]
): Rule {
  return (tree: Tree) => {
    const moduleFilename = findParentModuleFilename(tree.getDir(options.path));

    if (moduleFilename) {
      const sourceFile = openTypescriptSourceFile(tree, moduleFilename);

      if (sourceFile) {
        insertTreeChanges(tree, moduleFilename, computeChanges(sourceFile, moduleFilename));
      }
    }

    return tree;
  };
}
