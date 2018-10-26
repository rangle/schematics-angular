import * as strings from '@angular-devkit/core/src/utils/strings';
import * as typescript from 'typescript';

import { addImportStatementToFile } from '../ast-wrappers';
import { SourceFileModification } from '../source-file-modification.interface';

export function addDefaultValueToParentStateFunctions(
  sourceFile: typescript.SourceFile,
  name: string
): SourceFileModification[] {
  const createFunction = sourceFile.statements.find(
    statement => statement.kind === typescript.SyntaxKind.FunctionDeclaration
  ) as typescript.FunctionDeclaration;

  if (!createFunction || !createFunction.name.getText().startsWith('create')) {
    return [];
  }

  const returnStatement = (createFunction.body as typescript.Block).statements.find(
    statement => statement.kind === typescript.SyntaxKind.ReturnStatement
  ) as typescript.ReturnStatement;

  if (returnStatement.expression.kind !== typescript.SyntaxKind.ObjectLiteralExpression) {
    return [];
  }

  return [
    addImportStatementToFile(
      sourceFile,
      `create${strings.classify(name)}State`,
      `../../features/${strings.dasherize(name)}/types/${strings.dasherize(
        name
      )}-state/${strings.dasherize(name)}-state.functions`
    ),
    {
      index: (returnStatement.expression as typescript.ObjectLiteralExpression).properties.end,
      toAdd: ', stuffState: createStuffState()\r\n'
    }
  ];
}
