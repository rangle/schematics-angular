import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class <%= classify(name) %>Service {

  constructor(private httpClient: HttpClient) {}

}
