import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  paginationGuide: any[] = [];  //Array vacío auxiliar para la paginación en el html
  currentPage: any;
  totalPages: any;
  imagesPerPage = 16;   //Valor constante de cara a poder modificarlo o hacerlo dinámico en un futuro
  mostrandoUltimas: boolean = false;  //Define si se están mostrando las últimas imágenes
  paginatedImages: any[] = [];

  loggedUser: any;

  viendoImagenes: boolean;  //Indica si se están viendo sólo las imágenes del usuario
  textoSiguiendo: any;  //Texto "Siguiendo" o "dejar de seguir" cuando se pasa el mouse por encima
  logged: any;  //Si el usuario ha iniciado sesión
  username: any;  //Nombre de usuario del perfil que se está mirando
  isLoggedUser: any;  //Si el perfil del usuario que se está mirando es el que ha iniciado sesión
  userData: any;  //Información útil para mostrar del usuario
  profileImage: any; //url a la imagen de perfil
  publicDirBack: any; //Directorio al back para ser usado por la plantilla html

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private loginService: LoginService, private profileService: ProfileService) {
    this.viendoImagenes = router.url.endsWith('/images');
    this.loggedUser = loginService.getUser();

    this.textoSiguiendo = 'Siguiendo';
    this.logged = this.loginService.isUserSignedIn();
    this.isLoggedUser = false;
    //Valores por defecto para evitar errores
    this.username = '';
    this.userData = {
      'username': '',
      'name': '',
      'nImages': 0,
      'userImages': [],
      'nFollowers': 0,
      'nFollowing': 0,
      'about': '',
      'profileImage': '/assets/img/defaultUserImage.png'
    };
    //Inicializa el directorio público del back para que sea usado por la plantilla en las imágenes
    this.publicDirBack = environment.publicDirBack;
    //Imagen de perfil por defecto
    this.profileImage = '/assets/img/defaultUserImage.png';
  }

  ngOnInit(): void {
    //Recupera el nombre de usuario de la url
    this.route.params.subscribe(event => {
      this.username = event.username;
     });

     //Comprueba si se está viendo el perfil propio
     if (this.loginService.getUser().username.toLowerCase() == this.username.toLowerCase()) {
       this.isLoggedUser = true;
     }

     //Recupera los datos útiles del usuario
     this.profileService.getUserData(this.username).subscribe(
       (response: any) => {
        this.userData = response.message.userData;
        this.paginate();
        //Establece correctamente la url de la imagen de perfil si la hay. Si no, establece la imagen por defecto
        if (this.userData.profileImage != null) {
          this.userData.profileImage = environment.publicDirBack + 'profileImage/' + this.userData.profileImage;
        } else {
          this.userData.profileImage = '/assets/img/defaultUserImage.png';
        }
        console.log(this.userData);
       },
       (error: any) => {
         console.log(error);
       }
     );
  }

  //Seguir al usuario
  follow() {
    this.profileService.follow(this.username).subscribe(
      (response: any) => {
        if (response.code == 201) {
          this.userData.isFollowing = true;
          this.userData.nFollowers++;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Dejar de seguir al usuario
  unfollow() {
    this.profileService.unfollow(this.username).subscribe(
      (response: any) => {
        if (response.code == 201) {
          this.userData.isFollowing = false;
          this.userData.nFollowers--;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Funciones para cambiar el texto de "Siguiendo" a "Dejar de seguir" y viceversa
  siguiendoIN() {
    this.textoSiguiendo = 'Dejar de seguir';
  }
  siguiendoOUT() {
    this.textoSiguiendo = 'Siguiendo';
  }

  //--------PAGINACIÓN (vista imágenes)
    //Devuelve a la página 1 y divide las imágenes
    paginate() {
      this.totalPages = Math.ceil(this.userData.userImages.length / this.imagesPerPage);
      this.paginationGuide = new Array(this.totalPages);
      this.currentPage = 1;
      //this.currentPage = this.route.snapshot.queryParamMap.get("p");
      this.paginatedImages = [...this.userData.userImages];
      this.paginatedImages.splice(this.imagesPerPage,(this.userData.userImages.length-this.imagesPerPage));
    }

    //Cambia a otra página
    toPage(page: any) {
      this.currentPage = page;
      this.paginatedImages = [...this.userData.userImages];
      this.paginatedImages.splice(0, (this.imagesPerPage * (this.currentPage - 1)));  //Elimina los elementos desde el 0 hasta el primero de la nueva página sin incluir
      this.paginatedImages.splice(this.imagesPerPage, (this.paginatedImages.length - this.imagesPerPage));  //Elimina los elementos que se encuentran más allá de la página actual
    }

}
