import * as strings from '@angular-devkit/core/src/utils/strings';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { Folders } from '../folders/folders.enum';

import { getArrayElements, insertIntoArray } from './ast-helpers';

function printAllChildren(node: typescript.Node, depth = 0) {
  console.log(new Array(depth + 1).join('--'), node.kind, node.pos, node.end);
  depth++;
  node.getChildren().forEach(c => printAllChildren(c, depth));
}

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  name: string
): Change[] {
  printAllChildren(sourceFile);

  const variableStatement = sourceFile.statements.find(
    statement => statement.kind === typescript.SyntaxKind.VariableStatement
  );

  const routesDeclaration = (variableStatement as typescript.VariableStatement).declarationList.declarations.find(
    declaration =>
      (declaration.type as typescript.TypeReferenceNode).typeName.getText() === 'Routes'
  );

  console.log('routes declaration', routesDeclaration);

  const routes = getArrayElements(
    routesDeclaration.initializer as typescript.ArrayLiteralExpression
  );

  console.log(routes);

  return [
    insertIntoArray(
      modulePath,
      routes,
      `{ path: '${strings.dasherize(name)}', loadChildren: '.${
        Folders.Features
      }/${strings.dasherize(name)}/${strings.dasherize(name)}.module#${strings.classify(
        name
      )}Module }`
    )
  ];
}
