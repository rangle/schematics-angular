import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): Change[] {
  console.log(
    sourceFile.statements.find(
      statement => statement.kind === typescript.SyntaxKind.VariableStatement
    )
  );

  return [];
}
