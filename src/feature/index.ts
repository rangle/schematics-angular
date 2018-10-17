import { chain, Rule } from '@angular-devkit/schematics';

import { component } from '../component/index';
import { module } from '../module/index';
import { ngrx } from '../ngrx/index';
import { Options } from '../options.interface';
import { routes } from '../routes/index';
import { service } from '../service/index';
import { type } from '../type/index';

export function feature(options: Options): Rule {
  const childOptions = {
    path: `${options.path}/${options.name}` || `src/${options.name}`,
    name: options.name
  };

  return chain([
    component(childOptions),
    service(childOptions),
    ngrx(childOptions),
    type({
      path: `${childOptions.path}`,
      name: `${childOptions.name}-state`
    }),
    module(childOptions),
    routes(childOptions)
  ]);
}
