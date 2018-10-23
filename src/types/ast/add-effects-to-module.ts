import { getDecoratorMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

function getNgModuleNode(sourceFile: typescript.SourceFile): typescript.ObjectLiteralExpression {
  const nodes = getDecoratorMetadata(sourceFile, 'NgModule', '@angular/core');

  return nodes.length === 1 && nodes[0].kind === typescript.SyntaxKind.ObjectLiteralExpression
    ? (nodes[0] as typescript.ObjectLiteralExpression)
    : null;
}

function getNgModuleNodeProperty(
  ngModuleNode: typescript.ObjectLiteralExpression,
  propertyName: string
): typescript.PropertyAssignment {
  const properties = ngModuleNode.properties
    .filter(property => property.kind === typescript.SyntaxKind.PropertyAssignment)
    .filter(property => property.name.kind === typescript.SyntaxKind.Identifier)
    .filter(property => (property.name as typescript.Identifier).text === propertyName);

  return properties.length === 1 ? (properties[0] as typescript.PropertyAssignment) : null;
}

export function getPropertyAssignmentArrayElements(
  propertyAssignment: typescript.PropertyAssignment
): typescript.Node[] {
  return ((propertyAssignment.initializer as typescript.ArrayLiteralExpression)
    .elements as {}) as typescript.Node[];
}

export function addEffectsToModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): Change[] {
  const ngModuleNode = getNgModuleNode(sourceFile);

  if (ngModuleNode) {
    const propertyAssignment = getNgModuleNodeProperty(ngModuleNode, 'imports');

    if (propertyAssignment) {
      const elements = getPropertyAssignmentArrayElements(propertyAssignment);

      if (elements.length === 0) {
        console.log('this array has no imports... how did this happen?');
      } else if (elements.map(element => element.getText()).includes('EffectsModule')) {
        console.log('has effects module already');
      } else {
        return [
          new InsertChange(
            modulePath,
            elements[elements.length - 1].getEnd(),
            `, EffectsModule.forFeature([${classifiedName}])`
          ),
          insertImport(sourceFile, modulePath, classifiedName, importPath)
        ];
      }
    }
  }

  return [];
}
