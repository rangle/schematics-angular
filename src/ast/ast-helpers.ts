import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

export function getNgModuleNode(
  sourceFile: typescript.SourceFile
): typescript.ObjectLiteralExpression {
  const nodes = getDecoratorMetadata(sourceFile, 'NgModule', '@angular/core');

  return nodes.length === 1 && nodes[0].kind === typescript.SyntaxKind.ObjectLiteralExpression
    ? (nodes[0] as typescript.ObjectLiteralExpression)
    : null;
}

export function getVariableDeclarationOfType(
  variableStatement: typescript.VariableStatement,
  type: string
) {
  return (variableStatement as typescript.VariableStatement).declarationList.declarations.find(
    declaration => (declaration.type as typescript.TypeReferenceNode).typeName.getText() === type
  );
}

export function getObjectProperty(
  properties: typescript.NodeArray<typescript.ObjectLiteralElement>,
  propertyName: string
): typescript.PropertyAssignment {
  return properties
    .filter(property => property.kind === typescript.SyntaxKind.PropertyAssignment)
    .filter(property => property.name.kind === typescript.SyntaxKind.Identifier)
    .find(
      property => (property.name as typescript.Identifier).text === propertyName
    ) as typescript.PropertyAssignment;
}

export function getArrayElements(expression: typescript.ArrayLiteralExpression): typescript.Node[] {
  return (expression.elements as {}) as typescript.Node[];
}

export function insertIntoArray(
  modulePath: string,
  array: typescript.Node[],
  symbolToInsert: string
): Change {
  console.log(array);

  return new InsertChange(
    modulePath,
    array.length >= 1 ? array[array.length - 1].end : ((array as {}) as typescript.TextRange).end,
    array.length >= 1 ? `, ${symbolToInsert}` : symbolToInsert
  );
}
