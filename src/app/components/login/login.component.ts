import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  message: string;
  user: any;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    
    this.user = {
      access_token: "",
      name: "",
      email: ""
    }

    this.message = "";
  }

  ngOnInit(): void {
    console.log("hola");
    //If user is already logged, return to index page
    if (this.loginService.isUserSignedIn()) {
      console.log("logueado");
      this.router.navigate(['/inicio']);
    } else {
      console.log("no logueado");
    }
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    console.log("datos recogidos");
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let userData = this.loginForm.value;
    const email = userData.email;
    const password = userData.password;
    this.onReset();

    this.login(email, password);
  }

  //Login subscription using login.service
  login(email: string, password: string) {
    this.loginService.login(email, password).subscribe(
      (response: any) => {
        console.log(response.message);
        this.message = "Login correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;

        //Save user data
        this.user.name = response.message.datos_user.name;
        this.user.email = response.message.datos_user.email;

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
