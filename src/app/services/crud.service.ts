import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAllUsersData() {
    const url = environment.dirBack + 'getAllUsersData';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});
    
    return this.http.post(url, {}, { headers: headers });
  }

  public updateUser(id: any, name: any, email: any, rol: any, balance: any) {
    const url = environment.dirBack + 'updateUserCRUD';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, { 'id' : id, 'name' : name, 'email' : email, 'rol' : rol, 'balance' : balance }, { headers: headers });
  }

  public removeUser(id: any) {
    const url = environment.dirBack + 'removeUser';

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}`});

    return this.http.post(url, { 'id' : id }, { headers: headers });
  }

}
