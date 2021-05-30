import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: any;
  editProfileForm: FormGroup;

  constructor(private profileService: ProfileService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.user = this.loginService.getUser();
    this.editProfileForm = this.formBuilder.group({
      username: [this.user.username],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.editProfileForm.invalid) {
      return;
    }
    let userData = this.editProfileForm.value;
    const username = userData.username;
    const name = userData.name;
    const email = userData.email;

    this.profileService.updateUser(username, name, email).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
