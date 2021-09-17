import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  public getStats() {
    const url = environment.dirBack + "getAdminStats";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let respuesta = this.http.get(url, { headers: headers });
    return respuesta;
  }

}
