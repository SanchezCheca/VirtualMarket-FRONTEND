import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})

/**
 * SERVICE DESCRIPTION:
 * Logic for back-end communication for user log-in and session management
 */

export class LoginService {

  //Login data is stored in session
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";

  constructor(private router: Router, private http: HttpClient) {}

  //Login petition
  public login = (emailorusername: string, password: string) => {
    const url = environment.dirBack + 'login';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, { 'emailorusername': emailorusername, 'password': password }, { headers: headers });
  }

  //Check if user is logged and stores its data
  public isUserSignedIn() {
    return !_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY));
  }

  //Stores user data in session
  public saveUser(user: any) {
    //this.balance = user.balance;
    sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(user));
  }

  //If user is logged, returns its object
  public getUser(): any {
    let user: any | null = {
      access_token: "",
      username: "",
      name: "",
      email: "",
      rol: "",
      balance: 0,
      profileImage: "/assets/img/defaultUserImage.png",
      purchasedImages: []
    };
    if (this.isUserSignedIn()) {
      user = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      user = JSON.parse(user);
    }

    //this.balance = user.balance;
    return user;
  }

  //Updates profileImage
  public updateProfile(profileImage: string, name: string, email: string, about: string) {
    let user: any | null = {
      about: "",
      access_token: "",
      username: "",
      name: "",
      email: "",
      rol: "",
      balance: 0,
      profileImage: "/assets/img/defaultUserImage.png"
    };
    if (this.isUserSignedIn()) {
      user = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      user = JSON.parse(user);
      if (profileImage != '') {
        user.profileImage = profileImage;
      }
      user.name = name;
      user.email = email;
      user.about = about;
      //this.balance = user.balance;
      this.saveUser(user);
    }
  }

  //Deletes Access Token from session
  public logout() {
    sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
  }

  public reducirBalance(cantidad: any) {
    if (this.isUserSignedIn()) {
      let user = this.getUser();
      user.balance -= cantidad;
      this.saveUser(user);
    }
  }

  public imagenComprada(filename: any) {
    if (this.isUserSignedIn()) {
      let user = this.getUser();

      var aaa = {
        'filename': filename
      };

      user.purchasedImages.push(aaa);
      this.saveUser(user);
    }
  }

}
