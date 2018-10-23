import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): Change[] {
  const variableStatement = sourceFile.statements.find(
    statement => statement.kind === typescript.SyntaxKind.VariableStatement
  );

  const declarations = (variableStatement as typescript.VariableStatement).declarationList.declarations;

  declarations.forEach(
    declaration => {
      console.log(declaration.type);
      console.log((declaration.type as typescript.TypeReferenceNode).typeName);
    }
  );

  /*const routes = declarations.find(
    declaration => (declaration.type as typescript.TypeReferenceNode).typeName === 'Routes'
  );*/

  return [];
}
