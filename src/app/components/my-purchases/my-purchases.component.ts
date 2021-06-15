import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.scss']
})
export class MyPurchasesComponent implements OnInit {

  publicDirBack: any;
  user: any;
  userPurchasedImages: any[] = [];
  paginationGuide: any[] = [];  //Array vacío auxiliar para la paginación en el html
  currentPage: any;
  totalPages: any;
  imagesPerPage = 16;   //Valor constante de cara a poder modificarlo o hacerlo dinámico en un futuro
  mostrandoUltimas: boolean = false;  //Define si se están mostrando las últimas imágenes
  paginatedImages: any[] = [];

  constructor(private loginService: LoginService) {
    this.currentPage = 1;
    this.totalPages = 0;
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.publicDirBack = environment.publicDirBack;

    if (this.user.purchasedImages) {
      for (let index = 0; index < this.user.purchasedImages.length; index++) {
        this.userPurchasedImages.push(this.user.purchasedImages[index].filename);
      }

    }
    console.log(this.userPurchasedImages);
    this.paginate();
  }

  //Devuelve a la página 1 y divide las imágenes
  paginate() {
    this.totalPages = Math.ceil(this.userPurchasedImages.length / this.imagesPerPage);
    this.paginationGuide = new Array(this.totalPages);
    this.currentPage = 1;
    //this.currentPage = this.route.snapshot.queryParamMap.get("p");
    this.paginatedImages = [...this.userPurchasedImages];
    this.paginatedImages.splice(this.imagesPerPage,(this.userPurchasedImages.length-this.imagesPerPage));
  }

  //Cambia a otra página
  toPage(page: any) {
    this.currentPage = page;
    this.paginatedImages = [...this.userPurchasedImages];
    this.paginatedImages.splice(0, (this.imagesPerPage * (this.currentPage - 1)));  //Elimina los elementos desde el 0 hasta el primero de la nueva página sin incluir
    this.paginatedImages.splice(this.imagesPerPage, (this.paginatedImages.length - this.imagesPerPage));  //Elimina los elementos que se encuentran más allá de la página actual
  }

}
