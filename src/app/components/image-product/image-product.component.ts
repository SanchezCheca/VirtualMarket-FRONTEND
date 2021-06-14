import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.scss']
})
export class ImageProductComponent implements OnInit {

  imageFilename: any;
  image: any;
  publicDirBack: any;

  isOwner: boolean; //Define si el usuario que está viendo la imagen es su propietario

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private location: Location, private searchService: SearchService) {
    this.isOwner = false;

    this.publicDirBack = environment.publicDirBack;

    this.image = {
      'filename': '',
      'creatorName': '',
      'creatorUsername': '',
      'categoryName': '',
      'price': '',
      'format': '',
      'width': '',
      'height': ''
    }

  }

  ngOnInit(): void {
    //Recupera el término de búsqueda de usuario de la url y lo busca cada vez que cambia la url
    this.route.params.subscribe(event => {
      console.log('FILENAME: ' + event.filename);
      this.imageFilename = event.filename;
      if (!this.imageFilename) {
        //No hay nada en la url, 404
        this.router.navigate(['/']);
      }
    });

    this.searchService.getImageInfo(this.imageFilename).subscribe(
      (response: any) => {
        this.image = response.message;
        this.isOwner = this.loginService.getUser().username.toLowerCase() == this.image.creatorUsername.toLowerCase();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  atras() {
    this.location.back();
  }

}
