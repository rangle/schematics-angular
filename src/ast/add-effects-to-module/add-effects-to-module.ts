import * as typescript from 'typescript';

import { getNgModuleNode, getObjectProperty, insertIntoArray } from '../ast-helpers';
import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addEffectsToModule(
  sourceFile: typescript.SourceFile,
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
      addImportStatementToFile(sourceFile, classifiedName, importPath),
      {
        index: ngModuleNode.properties.pos,
        toAdd: `imports: [EffectsModule.forFeature([${classifiedName}])],`
      }
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
      addImportStatementToFile(sourceFile, classifiedName, importPath),
      insertIntoArray(effects, classifiedName)
    ];
  } else {
    return [
      addImportStatementToFile(sourceFile, classifiedName, importPath),
      insertIntoArray(imports, `EffectsModule.forFeature([${classifiedName}])`)
    ];
  }
}
