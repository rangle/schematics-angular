import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as fs from 'fs';
import * as typescript from 'typescript';

export function openSourceFileFromFileSystem(filename: string) {
  return openSourceFile(filename, () => fs.readFileSync(filename, 'utf-8'));
}

export function openSourceFile(filename: string, readSourceText: () => string) {
  if (filename) {
    const sourceText = readSourceText();

    if (sourceText) {
      return typescript.createSourceFile(
        filename,
        sourceText,
        typescript.ScriptTarget.Latest,
        true
      ) as typescript.SourceFile;
    }
  }

  return null;
}

export function getNgModuleNode(
  sourceFile: typescript.SourceFile
): typescript.ObjectLiteralExpression {
  const nodes = getDecoratorMetadata(sourceFile, 'NgModule', '@angular/core');

  return nodes.length === 1 && nodes[0].kind === typescript.SyntaxKind.ObjectLiteralExpression
    ? (nodes[0] as typescript.ObjectLiteralExpression)
    : null;
}

export function getInterfaceDeclarationByType(sourceFile: typescript.SourceFile, type: string) {
  return sourceFile.statements.find(
    statement =>
      statement.kind === typescript.SyntaxKind.InterfaceDeclaration &&
      (statement as typescript.InterfaceDeclaration).name.getText() === type
  );
}

export function getVariableDeclaration(sourceFile: typescript.SourceFile, type: string) {
  return sourceFile.statements
    .filter(statement => statement.kind === typescript.SyntaxKind.VariableStatement)
    .map(statement => (statement as typescript.VariableStatement).declarationList.declarations[0])
    .find(
      declaration => (declaration.type as typescript.TypeReferenceNode).typeName.getText() === type
    );
}

export function getTypeArgumentOfVariableDeclaration(
  variableDeclaration: typescript.VariableDeclaration
) {
  return (((variableDeclaration.type as unknown) as typescript.TypeReference)
    .typeArguments[0] as unknown) as typescript.TypeReferenceNode;
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

export function filterNodeArray<T extends typescript.Node>(
  array: typescript.NodeArray<T>,
  condition: (node: T) => boolean
): typescript.NodeArray<T> {
  const textRange = {
    pos: array.pos,
    end: array.end
  };

  const newArray = (array.filter(condition) as {}) as typescript.NodeArray<T>;
  newArray.pos = textRange.pos;
  newArray.end = textRange.end;

  return newArray;
}

export function insertIntoArray(
  modulePath: string,
  array: typescript.NodeArray<typescript.Node>,
  symbolToInsert: string
): Change {
  return new InsertChange(
    modulePath,
    array.length >= 1 ? array[array.length - 1].end : ((array as {}) as typescript.TextRange).end,
    array.length >= 1 ? `, ${symbolToInsert}` : symbolToInsert
  );
}
