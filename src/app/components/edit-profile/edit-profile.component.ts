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

  messageP: any;
  passSubmitted: boolean = false;
  passIguales: boolean = false;
  submitted: boolean = false;
  message: string;
  image: any; //Recurso de imagen para subirla
  user: any;
  editProfileForm: FormGroup;
  resetPasswordForm: FormGroup;
  profileImage: any;  //url de la imagen de perfil

  constructor(private profileService: ProfileService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.messageP = "";
    this.message = "";
    this.user = this.loginService.getUser();
    console.log(this.user);
    this.editProfileForm = this.formBuilder.group({
      username: [this.user.username],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      image: [],
      about: [this.user.about]
    });
    if (this.user.profileImage != null) {
      this.profileImage = environment.publicDirBack + 'profileImage/' + this.user.profileImage;
    } else {
      this.profileImage = 'http://localhost:8000/defaultUserImage.png';
    }

    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength]],
      newPassword2: ['']
    })

  }

  get form() { return this.editProfileForm.controls; }
  get formPass() { return this.resetPasswordForm.controls; }

  ngOnInit(): void {

  }

  /**
   * Botón 'guardar cambios'
   * @returns
   */
  onSubmit() {
    this.submitted = true;
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
        this.message = response.message.message;
        if (this.image != null) {
          this.loginService.updateProfile(response.message.profileImage, name, email, about);
        } else {
          this.loginService.updateProfile('', name, email, about);
        }
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * Botón 'cambiar contraseña'
   */
  onSubmitPassword() {
    this.passSubmitted = true;
    this.passIguales = this.validarDistintasPass();
    if (this.resetPasswordForm.invalid) {
      return;
    }
    let passwordData = this.resetPasswordForm.value;
    const currentPassword = passwordData.currentPassword;
    const newPassword = passwordData.newPassword;

    this.profileService.resetPassword(currentPassword, newPassword).subscribe(
      (response: any) => {
        console.log(response);
        this.messageP = response.message.message;
      },
      (error: any) => {
        console.log(error);
        this.messageP = error.message.message;
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

  validarDistintasPass() {
    return this.resetPasswordForm.get('password')?.value === this.resetPasswordForm.get('password2')?.value;
  }

}
