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

  logged: any;  //Si el usuario ha iniciado sesión
  username: any;  //Nombre de usuario del perfil que se está mirando
  isLoggedUser: any;  //Si el perfil del usuario que se está mirando es el que ha iniciado sesión
  userData: any;  //Información útil para mostrar del usuario
  publicDirBack: any;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private loginService: LoginService, private profileService: ProfileService) {
    this.logged = this.loginService.isUserSignedIn();
    this.isLoggedUser = false;
    //Valores por defecto para evitar errores
    this.username = '';
    this.userData = {
      'username': '',
      'name': '',
      'nImages': 0,
    };
    //Inicializa el directorio público del back para que sea usado por la plantilla en las imágenes
    this.publicDirBack = environment.publicDirBack;
  }

  ngOnInit(): void {
    //Recupera el nombre de usuario0
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
        console.log(this.userData);
       },
       (error: any) => {
         console.log(error);
       }
     );

     console.log('ES LOGGED USER: ' + this.isLoggedUser);
  }

}
