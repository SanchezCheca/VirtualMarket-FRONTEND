import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * COMPONENT DESCRIPTION:
 * Complete view for user sign up
 */

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  message: string;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.message = "";
  }

  ngOnInit(): void {
  }

  get form() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let userData = this.registerForm.value;
    const username = userData.username;
    const name = userData.name;
    const email = userData.email;
    const password = userData.password;

    this.registerService.Register(username, name, email, password).subscribe(
      (response: any) => {
        this.message = response.message.message;
        console.log(response);
      },
      (error) => {
        console.log(error.message);
      }
    );

    this.onReset();
    this.message = this.registerService.message;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
