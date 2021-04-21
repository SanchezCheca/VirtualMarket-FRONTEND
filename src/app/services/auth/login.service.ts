import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Login data is stored in session
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";

  constructor(private router: Router, private http: HttpClient) {}

  //Login petition
  public login = (email: string, password: string) => {
    const url = environment.dirBack + 'login';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  }

  //Check if user is logged and stores its data
  public isUserSignedIn() {
    return !_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY));
  }

  //Stores user data in session
  public saveUser(user: any) {
    sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(user));
  }

  //If user is logged, returns its object
  public getUser(): any {
    let user: any | null = {
      access_token: "",
      name: "",
      email: ""
    };
    if (this.isUserSignedIn()) {
      user = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      user = JSON.parse(user);
    }
    return user;
  }

  //Deletes Access Token from session
  public logout() {
    sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
  }

}