import { chain, Rule } from '@angular-devkit/schematics';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { processTemplates } from '../../types/path-options/path-options.functions';
import { PathOptions } from '../../types/path-options/path-options.interface';
import { addNpmDependenciesRule } from '../../types/rules/add-npm-dependencies.rule';
import { deleteFilesRule } from '../../types/rules/delete-files.rule';
import { runNpmInstallRule } from '../../types/rules/run-npm-install.rule';

export default function(options: PathOptions): Rule {
  return chain([
    deleteFilesRule(['/tslint.json', '/prettier.config.js']),
    processTemplates(options, '/'),
    addNpmDependenciesRule([
      { type: NodeDependencyType.Dev, version: '^1.14.3', name: 'prettier' },
      { type: NodeDependencyType.Dev, version: '^1.15.0', name: 'tslint-config-prettier' }
    ]),
    runNpmInstallRule()
  ]);
}
