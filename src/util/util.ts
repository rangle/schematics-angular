import * as strings from '@angular-devkit/core/src/utils/strings';
import {
  apply,
  branchAndMerge,
  mergeWith,
  move,
  template,
  url,
  Rule
} from '@angular-devkit/schematics';

import { SchemaOptions } from '../types/schema-options.interface';

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
