import { chain, Rule } from '@angular-devkit/schematics';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { processTemplates } from '../../types/path-options/path-options.functions';
import { PathOptions } from '../../types/path-options/path-options.interface';
import { addNpmDependencies } from '../../types/rules/add-npm-dependencies';
import { deleteFiles } from '../../types/rules/delete-files';
import { runNpmInstall } from '../../types/rules/run-npm-install';

export default function(options: PathOptions): Rule {
  return chain([
    deleteFiles(['/tslint.json', '/prettier.config.js']),
    processTemplates(options, '/'),
    addNpmDependencies([
      { type: NodeDependencyType.Dev, version: '^1.14.3', name: 'prettier' },
      { type: NodeDependencyType.Dev, version: '^1.15.0', name: 'tslint-config-prettier' }
    ]),
    runNpmInstall()
  ]);
}
