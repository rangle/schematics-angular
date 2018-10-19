import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';

const defaultPrefix = 'app';

import { ProjectSchemaOptions } from './project-schema-options.interface';

export function getProject(tree: Tree, options: ProjectSchemaOptions) {
  return getWorkspace(tree).projects[options.project];
}

export function getProjectPrefix(tree: Tree, options: ProjectSchemaOptions) {
  if (options.prefix) {
    return options.prefix;
  }

  try {
    const project = getProject(tree, options);

    return project && project.prefix ?
      project.prefix :
      defaultPrefix;
  } catch (noWorkspaceError) {
    return defaultPrefix;
  }
}