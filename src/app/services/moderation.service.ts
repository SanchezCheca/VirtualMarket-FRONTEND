import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ModerationService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  //Recupera la información de una imagen a moderar
  public getImageToModerate() {
    const url = environment.dirBack + 'getImageToModerate';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, {}, { headers: headers });
  }

  //Acepta una imagen
  public acceptImage(imageId: number) {
    const url = environment.dirBack + 'voteImage';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, {'imageId' : imageId, 'decision' : 1}, { headers: headers });
  }

  //Rechaza una imagen
  public rejectImage(imageId: number) {
    const url = environment.dirBack + 'voteImage';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, {'imageId' : imageId, 'decision' : 0}, { headers: headers });
  }

}
