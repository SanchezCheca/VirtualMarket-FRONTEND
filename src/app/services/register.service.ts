import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient) {
    this.user = {
      name: "",
      email: ""
    }
    this.message = "";
  }

  public Register = (name: string, email: string, password: string) => {
    const url = environment.dirBack + "register";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post(url, { 'name' : name, 'email': email, 'password': password }, { headers: headers });
  }
}
