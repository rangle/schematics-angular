import * as strings from '@angular-devkit/core/src/utils/strings';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { Folders } from '../folders/folders.enum';

import { getArrayElements, getObjectProperty, insertIntoArray } from './ast-helpers';

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  name: string
): Change[] {
  const variableStatement = sourceFile.statements.find(
    statement => statement.kind === typescript.SyntaxKind.VariableStatement
  );

  const routesDeclaration = (variableStatement as typescript.VariableStatement).declarationList.declarations.find(
    declaration =>
      (declaration.type as typescript.TypeReferenceNode).typeName.getText() === 'Routes'
  );

  const routes = getArrayElements(
    routesDeclaration.initializer as typescript.ArrayLiteralExpression
  ).filter(route => {
    const pathProperty = getObjectProperty(
      (route as typescript.ObjectLiteralExpression).properties,
      'path'
    );

    return (pathProperty.initializer as typescript.Identifier).text !== '**';
  });

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
