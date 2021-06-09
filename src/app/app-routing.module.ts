import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ImageProductComponent } from './components/image-product/image-product.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {path: 'image/JI4crXIgx94O6MDJ5Rg1DsV2Lmpsnm8DR3TfSRfL.jpg', component: ImageProductComponent},
  {path: 'search/perro', component: SearchResultComponent},
  {path: 'editProfile', component: EditProfileComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'user/:username', component: ProfileComponent, children: [
    {
      path: 'images', component: ProfileComponent
    }
  ]},
  //{path: 'user/:username/images', component: UserImagesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'inicio', component: IndexComponent},
  {path: '', component: IndexComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
