import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
 
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
 
const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api="https://www.controlelectoralcctarija.com/api/auth";
  constructor(private http: HttpClient) {
    this.loadToken();
  }
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
 
 
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {usuario, password}): Observable<any> {
    return this.http.post(`${this.api}`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  getUserToken(): Observable<any> {
    const helper = new JwtHelperService();
    const options={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:'authjwt='+this.token
      })
    }
    console.log(this.token);
    
    const decoded= helper.decodeToken(this.token);
    console.log(decoded);
    return this.http.get(`https://www.controlelectoralcctarija.com/api/users/`+decoded._id,options);
  }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }

  logoutRemoveToke(){
    return this.http.get(this.api);
  }
}
