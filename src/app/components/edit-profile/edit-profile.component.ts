import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  image: any; //Recurso de imagen para subirla
  user: any;
  editProfileForm: FormGroup;
  profileImage: any;  //url de la imagen de perfil

  constructor(private profileService: ProfileService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.user = this.loginService.getUser();
    console.log(this.user);
    this.editProfileForm = this.formBuilder.group({
      username: [this.user.username],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      image: [],
      about: [this.user.about]
    });
    if (this.user.profileImage != null) {
      this.profileImage = environment.publicDirBack + 'profileImage/' + this.user.profileImage;
    } else {
      this.profileImage = 'http://localhost:8000/defaultUserImage.png';
    }

  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.editProfileForm.invalid) {
      return;
    }
    let userData = this.editProfileForm.value;
    console.log(userData);
    const username = userData.username;
    const name = userData.name;
    const email = userData.email;
    const about = userData.about;

    this.profileService.updateUser(username, name, email, about, this.image).subscribe(
      (response: any) => {
        if (this.image != null) {
          this.loginService.updateProfile(response.message.profileImage, name, email, about);
        }
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * Se ha seleccionado una imagen, la guarda
   * @param event
   */
   saveImage(event: any) {
    this.image = <File>event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.profileImage = reader.result;

    reader.readAsDataURL(this.image);
  }

}
