import { chain, Rule } from '@angular-devkit/schematics';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { addNpmDependenciesRule } from '../../rules/add-npm-dependencies.rule';
import { addNpmScriptsRule } from '../../rules/add-npm-scripts.rule';
import { deleteFilesRule } from '../../rules/delete-files.rule';
import { processTemplates } from '../../rules/process-templates.rule';
import { runNpmInstallRule } from '../../rules/run-npm-install.rule';
import { PathOptions } from '../../types/path-options/path-options.interface';

export default function(options: PathOptions): Rule {
  return chain([
    deleteFilesRule(['/tslint.json', '/prettier.config.js']),
    processTemplates(options, '/'),
    addNpmDependenciesRule([
      { type: NodeDependencyType.Dev, version: '^1.14.3', name: 'prettier' },
      { type: NodeDependencyType.Dev, version: '^1.15.0', name: 'tslint-config-prettier' }
    ]),
    addNpmScriptsRule([
      { name: 'pretty:check', command: 'prettier --list-different "src/**/*.ts"' },
      { name: 'pretty:fix', command: 'prettier --write "src/**/*.ts"' },
      { name: 'lint:check', command: 'ng lint' },
      { name: 'lint:fix', command: 'ng lint --fix' },
      { name: 'check', command: 'npm run pretty:check && npm run lint:check' },
      { name: 'fix', command: 'npm run pretty:fix && npm run lint:fix' }
    ]),
    runNpmInstallRule()
  ]);
}
