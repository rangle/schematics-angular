import * as typescript from 'typescript';

import { getNgModuleNode, getObjectProperty, insertIntoArray } from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addEffectsToModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): SourceFileModification[] {
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
      {
        index: ngModuleNode.properties.pos,
        toAdd: `imports: [EffectsModule.forFeature([${classifiedName}])],`
      },
      addImportStatementToFile(sourceFile, modulePath, classifiedName, importPath)
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
      insertIntoArray(effects, classifiedName),
      addImportStatementToFile(sourceFile, modulePath, classifiedName, importPath)
    ];
  } else {
    return [
      insertIntoArray(imports, `EffectsModule.forFeature([${classifiedName}])`),
      addImportStatementToFile(sourceFile, modulePath, classifiedName, importPath)
    ];
  }
}
