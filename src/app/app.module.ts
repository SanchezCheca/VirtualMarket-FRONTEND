import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from './components/upload/upload.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ImageProductComponent } from './components/image-product/image-product.component';
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
import { CrudComponent } from './components/crud/crud.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminStatsComponent } from './components/admin-stats/admin-stats.component';
import { ChartsModule } from 'ng2-charts';
import { ImageModerationComponent } from './components/image-moderation/image-moderation.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    IndexComponent,
    ProfileComponent,
    FooterComponent,
    UploadComponent,
    EditProfileComponent,
    SearchComponent,
    FiltersComponent,
    SearchResultComponent,
    ImageProductComponent,
    MyPurchasesComponent,
    CrudComponent,
    AdminMenuComponent,
    AdminStatsComponent,
    ImageModerationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
