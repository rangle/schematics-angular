import * as strings from '@angular-devkit/core/src/utils/strings';
import * as typescript from 'typescript';

import { Folders } from '../../types/folders/folders.enum';

import {
  filterNodeArray,
  getObjectProperty,
  getVariableDeclaration,
  insertIntoArray
} from '../ast-helpers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  name: string
): SourceFileModification[] {
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
      routes,
      `{ path: '${strings.dasherize(name)}', loadChildren: '.${
        Folders.Features
      }/${strings.dasherize(name)}/${strings.dasherize(name)}.module#${strings.classify(
        name
      )}Module' }`
    )
  ];
}
