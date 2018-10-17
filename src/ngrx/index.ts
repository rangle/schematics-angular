import { chain, Rule } from '@angular-devkit/schematics';

import { ngrxActions } from '../ngrx-actions/index';
import { ngrxEffects } from '../ngrx-effects/index';
import { ngrxReducer } from '../ngrx-reducer/index';
import { ngrxStore } from '../ngrx-store/index';
import { Options } from '../options.interface';

export function ngrx(options: Options): Rule {
  return chain([
    ngrxActions(options),
    ngrxEffects(options),
    ngrxReducer(options),
    ngrxStore(options)
  ]);
}
