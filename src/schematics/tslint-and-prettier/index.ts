import { chain, Rule } from '@angular-devkit/schematics';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { addNpmDependenciesRule } from '../../rules/add-npm-dependencies.rule';
import { deleteFilesRule } from '../../rules/delete-files.rule';
import { runNpmInstallRule } from '../../rules/run-npm-install.rule';
import { processTemplates } from '../../types/path-options/path-options.functions';
import { PathOptions } from '../../types/path-options/path-options.interface';

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
