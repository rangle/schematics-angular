import { normalize } from '@angular-devkit/core';

import { Folders } from '../folders/folders.enum';

import { PathOptions } from './path-options.interface';

export function getFolderType(options: PathOptions): Folders {
  for (const pathFragment of normalize(options.path)
    .split('/')
    .reverse()) {
    switch (`/${pathFragment}`) {
      case Folders.Modules:
        return Folders.Modules;
    }
  }

  return Folders.Features;
}
