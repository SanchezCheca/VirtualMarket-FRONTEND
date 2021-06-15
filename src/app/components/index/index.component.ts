import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  userPurchasedImages: any[] = [];
  images: any[] = [];
  imageRoutes = '';
  publicDirBack = '';

  constructor(private searchService: SearchService, private loginService: LoginService) {


    this.publicDirBack = environment.publicDirBack;
  }

  ngOnInit(): void {
    let user = this.loginService.getUser();
    if (user.purchasedImages) {
      for (let index = 0; index < user.purchasedImages.length; index++) {
        this.userPurchasedImages.push(user.purchasedImages[index].filename);
      }
    }

    this.getLastImages();
  }

  //Recupera las últimas imágenes subidas haciendo uso del SearchService
  getLastImages() {
    this.searchService.getLastImages().subscribe(
      (response: any) => {
        this.images = response.message;
        this.images.splice(30, this.images.length - 30);
        console.log(this.images);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
