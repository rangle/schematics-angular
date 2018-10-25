import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

import { getNgModuleNode, getObjectProperty, insertIntoArray } from './ast-helpers';

export function addEffectsToModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): Change[] {
  const ngModuleNode = getNgModuleNode(sourceFile);

  if (!ngModuleNode) {
    return [];
  }

  const propertyAssignment = getObjectProperty(ngModuleNode.properties, 'imports');

  if (
    !propertyAssignment ||
    propertyAssignment.initializer.kind !== typescript.SyntaxKind.ArrayLiteralExpression
  ) {
    return [
      new InsertChange(
        modulePath,
        ngModuleNode.properties.pos,
        `imports: [EffectsModule.forFeature([${classifiedName}])],`
      ),
      insertImport(sourceFile, modulePath, classifiedName, importPath)
    ];
  }

  const imports = (propertyAssignment.initializer as typescript.ArrayLiteralExpression).elements;

  const effectsModuleImport = imports.find(element =>
    element.getText().startsWith('EffectsModule')
  );

  if (effectsModuleImport && effectsModuleImport.kind === typescript.SyntaxKind.CallExpression) {
    const forFeatureArguments = (effectsModuleImport as typescript.CallExpression).arguments;
    const effects = (forFeatureArguments[0] as typescript.ArrayLiteralExpression).elements;

    return [
      insertIntoArray(modulePath, effects, classifiedName),
      insertImport(sourceFile, modulePath, classifiedName, importPath)
    ];
  } else {
    return [
      insertIntoArray(modulePath, imports, `EffectsModule.forFeature([${classifiedName}])`),
      insertImport(sourceFile, modulePath, classifiedName, importPath)
    ];
  }
}
