import { parseJson } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';

import { NpmScript } from '../types/npm-script/npm-script.interface';

const PackageJsonFilename = 'package.json';

export function addNpmScriptsRule(scripts: NpmScript[]): Rule {
  return (tree: Tree) => {
    const packageJson = tree.read(PackageJsonFilename);

    if (packageJson) {
      const json = parseJson(packageJson.toString('utf-8')) as any;

      if (!json.scripts) {
        json.scripts = {};
      }

      scripts.forEach(script => (json.scripts[script.name] = script.command));

      tree.overwrite(PackageJsonFilename, JSON.stringify(json, null, 2));
    }

    return tree;
  };
}
