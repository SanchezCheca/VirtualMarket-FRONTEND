import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminStatsComponent } from './components/admin-stats/admin-stats.component';
import { CrudComponent } from './components/crud/crud.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ImageProductComponent } from './components/image-product/image-product.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {path: 'image/:filename', component: ImageProductComponent},
  {path: 'crud', component: CrudComponent},
  {path: 'AdminStats', component: AdminStatsComponent},
  {path: 'admin', component: AdminMenuComponent},
  {path: 'purchases', component: MyPurchasesComponent},
  {path: 'search/:searchTerm', component: SearchResultComponent},
  {path: 'search', component: SearchResultComponent},
  {path: 'editProfile', component: EditProfileComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'user/:username', component: ProfileComponent, children: [
    {
      path: 'images', component: ProfileComponent
    }
  ]},
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
