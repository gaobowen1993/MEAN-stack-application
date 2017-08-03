import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http: Http) { }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }  

  registerUser(user): Observable<any> {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('register', user, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  authenticateUser(user): Observable<any>  {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('authenticate', user, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);    
  }

  getProfile(): Observable<any>  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('users/profile', {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);      
  }

  storeUserData(token, user): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logOut(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
