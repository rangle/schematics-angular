import * as strings from '@angular-devkit/core/src/utils/strings';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';

import {
  filterNodeArray,
  getObjectProperty,
  getVariableDeclaration,
  insertIntoArray
} from '../ast-helpers';

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  name: string
): Change[] {
  const routesDeclaration = getVariableDeclaration(sourceFile, 'Routes');

  if (!routesDeclaration) {
    return [];
  }

  const routes = filterNodeArray<typescript.ObjectLiteralExpression>(
    (routesDeclaration.initializer as typescript.ArrayLiteralExpression)
      .elements as typescript.NodeArray<typescript.ObjectLiteralExpression>,
    route => {
      const pathProperty = getObjectProperty(route.properties, 'path');

      return (pathProperty.initializer as typescript.Identifier).text !== '**';
    }
  );

  return [
    insertIntoArray(
      modulePath,
      routes,
      `{ path: '${strings.dasherize(name)}', loadChildren: '.${
        Folders.Features
      }/${strings.dasherize(name)}/${strings.dasherize(name)}.module#${strings.classify(
        name
      )}Module' }`
    )
  ];
}
