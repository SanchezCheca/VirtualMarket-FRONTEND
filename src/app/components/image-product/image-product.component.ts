import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.scss']
})
export class ImageProductComponent implements OnInit {

  balance: any;

  userPurchasedImages: any[] = [];
  compraRealizada: boolean;
  mensaje: any;
  comprando: boolean;
  confirmandoCompra: boolean;
  imageFilename: any;
  image: any;
  publicDirBack: any;
  hoverBuyText: any;

  isOwner: boolean; //Define si el usuario que está viendo la imagen es su propietario

  constructor(private purchaseService: PurchaseService, private loginService: LoginService, private route: ActivatedRoute, private router: Router, private location: Location, private searchService: SearchService) {
    this.compraRealizada = false;
    this.mensaje = '';
    this.confirmandoCompra = false;
    this.balance = 0;
    //this.balance = this.loginService.getUser().balance;
    this.comprando = false;
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
    let user = this.loginService.getUser();
    if (user.purchasedImages) {
      for (let index = 0; index < user.purchasedImages.length; index++) {
        this.userPurchasedImages.push(user.purchasedImages[index].filename);
      }
    }

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
        if (this.isOwner) {
          this.hoverBuyText = '¡No puedes comprar tu propia imagen!';
        } else {
          this.hoverBuyText = 'Comprar imagen';
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Botón "SI"
  confirmarCompra() {
    this.purchaseService.purchase(this.imageFilename).subscribe(
      (response: any) => {
        this.loginService.reducirBalance(this.image.price);
        this.loginService.imagenComprada(this.image.filename);
        this.mensaje = response.message;
        if (response.code == 200) {
          this.userPurchasedImages.push(this.image.filename);
          this.cancelar();
        }
      },
      (error: any) => {
        console.log(error);
        this.mensaje = error.error.message;
      }
    );
  }

  //Botón "Comprar"
  comprar() {
    this.comprando = true;
  }

  //Botón "Atrás"
  atras() {
    this.location.back();
  }

  //Botón "Aceptar"
  aceptar() {
    this.confirmandoCompra = true;
  }

  //Botones "Cancelar" ó "NO"
  cancelar() {
    this.confirmandoCompra = false;
    this.comprando = false;
  }

  //Descarga!
  descargar() {
    this.purchaseService.download(this.image.filename).subscribe(
      (response: any) => {
        if (response.code == 200) {
          console.log(response);
          //this.router.navigate([environment.publicDirBack + 'download/' + this.image.filename]);
          window.open(environment.publicDirBack + 'download/' + this.image.filename, "_blank");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
