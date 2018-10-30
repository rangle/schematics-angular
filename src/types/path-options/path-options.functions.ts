import { normalize } from '@angular-devkit/core';

import { Folders } from '../folders/folders.enum';

import { PathOptions } from './path-options.interface';

function getReversedPathFragments(options: PathOptions) {
  return normalize(options.path)
    .split('/')
    .reverse();
}

export function getFolderType(options: PathOptions): Folders {
  for (const pathFragment of getReversedPathFragments(options)) {
    switch (`/${pathFragment}`) {
      case Folders.Modules:
        return Folders.Modules;
    }
  }

  return Folders.Features;
}

export function findParentModuleName(options: PathOptions): string {
  const pathFragments = getReversedPathFragments(options);

  const featuresOrModulesIndex = pathFragments.findIndex(pathFragment => {
    switch (`/${pathFragment}`) {
      case Folders.Features:
      case Folders.Modules:
        return true;
      default:
        return false;
    }
  });

  return featuresOrModulesIndex + 1 <= pathFragments.length
    ? pathFragments[featuresOrModulesIndex + 1]
    : null;
}
