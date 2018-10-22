import { MergeStrategy, Rule } from '@angular-devkit/schematics';

import { processTemplates } from '../../types/path-options/path-options.functions';
import { PathOptions } from '../../types/path-options/path-options.interface';

export function tslint(options: PathOptions): Rule {
  return processTemplates(options, '/', MergeStrategy.AllowOverwriteConflict);
}
