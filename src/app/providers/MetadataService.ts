/**
 * Created by Comfort Mawkga on 2017/11/27.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

/*
 Generated class for the DataSets provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Metadataservice {

  headers: Headers;
  options: RequestOptions;

  constructor(private http:Http) {
    }



  getMetadata(url: string, username: string, password: string): Promise<any> {
   this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization':  'Basic '+btoa(username+":"+password)});
  this.options = new RequestOptions({ headers: this.headers });
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
