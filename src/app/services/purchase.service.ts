import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  //Compra una imagen
  public purchase(filename: any) {
    const url = environment.dirBack + 'purchase';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, { 'buyerUsername': this.loginService.getUser().username, 'imageFilename': filename }, { headers: headers });
  }

  //Solicita que se habilite la descarga de una imagen
  public download(filename: any) {
    const url = environment.dirBack + 'download';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, { 'filename': filename }, { headers: headers });
  }

}
