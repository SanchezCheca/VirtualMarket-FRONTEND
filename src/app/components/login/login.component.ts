import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * COMPONENT DESCRIPTION:
 * Complete view for user sign up
 */

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  message: string;
  user: any;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      emailorusername: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.user = {
      access_token: "",
      id: "",
      username: "",
      name: "",
      email: "",
      rol: "",
      profileImage: "",
      purchasedImages: []
    }

    this.message = "";
  }

  ngOnInit(): void {
    //If user is already logged, return to index page
    if (this.loginService.isUserSignedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let userData = this.loginForm.value;
    const emailorusername = userData.emailorusername;
    const password = userData.password;
    this.onReset();

    this.login(emailorusername, password);
  }

  //Login subscription using login.service
  login(emailorusername: string, password: string) {
    this.loginService.login(emailorusername, password).subscribe(
      (response: any) => {
        //console.log(response.message);
        this.message = "Login correcto";

        //Save user data
        this.user.access_token = response['message']['access_token'];
        this.user.id = response.message.user.id;
        this.user.username = response.message.user.username;
        this.user.name = response.message.user.name;
        this.user.email = response.message.user.email;
        this.user.rol = response.message.user.rol;
        this.user.balance = response.message.user.balance;
        this.user.profileImage = response.message.user.profileImage;
        this.user.about = response.message.user.about;
        this.user.purchasedImages = response.message.purchasedImages;

        //Formatea correctamente la url del perfil si existe
        if (this.user.profileImage != null) {
          //this.user.profileImage = environment.publicDirBack + 'profileImage/' + this.user.profileImage;
        }

        console.log(this.user);

        //Save user in session
        this.loginService.saveUser(this.user);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.log(error.error.message);
        this.message = error.error.message;
      }
    ), 5000;
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
