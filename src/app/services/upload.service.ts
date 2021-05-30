import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './auth/login.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  message: string;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router, private searchService: SearchService) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
    this.message = "";
  }

  //Sube una imagen
  public uploadImage = (image: any, price: any, category: any, tags: any) => {
    const url = environment.dirBack + "uploadImage";
    const fd = new FormData;
    fd.append('image', image, image.name);
    fd.append('price', price);
    fd.append('category', category);
    fd.append('tags', tags);

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, fd, {headers: headers, reportProgress: true, observe: 'events'});
  }

}
