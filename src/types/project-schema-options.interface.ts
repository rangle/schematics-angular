import { SchemaOptions } from './schema-options.interface';

export interface ProjectSchemaOptions extends SchemaOptions {
  prefix: string;
  project: string;
  selector: string;
}
