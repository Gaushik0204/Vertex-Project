import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class ApiService {

  title = 'Angular 2';
  constructor(private httpclient:Http) { }
  getMovies(url):Observable<any>{
    return this.httpclient.get(url);
  } 

  
}
