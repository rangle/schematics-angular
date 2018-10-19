import { SchemaOptions } from '../schema-options/schema-options.interface';

export interface ProjectSchemaOptions extends SchemaOptions {
  prefix: string;
  project: string;
  selector: string;
}
