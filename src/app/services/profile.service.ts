import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  //Actualiza la información de un usuario
  public updateUser = (username: any, name: any, email: any, about: any, image: any) => {
    const url = environment.dirBack + 'updateUser/' + username;

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    const fd = new FormData;
    if (image){
      fd.append('image', image, image.name);
    }
    fd.append('username', username);
    fd.append('name', name);
    fd.append('email', email);
    fd.append('about',about);

    return this.http.post(url, fd, {headers: headers});
  }

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
