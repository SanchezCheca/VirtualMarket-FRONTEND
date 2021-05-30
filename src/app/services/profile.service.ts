import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  //Devuelve la información necesaria para mostrar de un usuario
  public getUserData = (username: any) => {
    const url = environment.dirBack + 'getUserData';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`, 'Content-Type': 'application/json'});

    return this.http.post(url, { 'username': username }, { headers: headers });
  }

  //El usuario iniciado sigue al usuario con el nombre especificado
  public follow = (username: any) => {
    const url = environment.dirBack + 'followUser';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`, 'Content-Type': 'application/json'});

    return this.http.post(url, { 'username': username }, { headers: headers });
  }

  //El usuario iniciado deja de seguir al usuario con el nombre especificado
  public unfollow = (username: any) => {
    const url = environment.dirBack + 'unfollowUser';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`, 'Content-Type': 'application/json'});

    return this.http.post(url, { 'username': username }, { headers: headers });
  }

}
