import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  /**
   * Devuelve las últimas 50 imágenes subidas al servidor
   */
  public getLasts() {
    const url = environment.dirBack + "search/getLasts";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let respuesta = this.http.get(url);
    console.log(respuesta);
    return respuesta;
  }
}
