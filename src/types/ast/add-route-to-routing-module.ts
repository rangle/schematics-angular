import { Change } from '@schematics/angular/utility/change';
import * as typescript from 'typescript';

function printAllChildren(node: typescript.Node, depth = 0) {
  console.log(new Array(depth + 1).join('--'), node.kind, node.pos, node.end);
  depth++;
  node.getChildren().forEach(c=> printAllChildren(c, depth));
}

export function addRouteToRoutingModule(
  sourceFile: typescript.SourceFile,
  modulePath: string,
  classifiedName: string,
  importPath: string
): Change[] {
  printAllChildren(sourceFile);

  const variableStatement = sourceFile.statements.find(
    statement => statement.kind === typescript.SyntaxKind.VariableStatement
  );

  const declarations = (variableStatement as typescript.VariableStatement).declarationList.declarations;

  declarations.forEach(
    declaration => {
      console.log(declaration.type._typeNodeBrand);
    }
  );

  /*const routes = declarations.find(
    declaration => (declaration.type as typescript.TypeReferenceNode).typeName === 'Routes'
  );*/

  return [];
}
