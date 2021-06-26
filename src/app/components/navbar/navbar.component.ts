import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * COMPONENT DESCRIPTION:
 * Top-var
 */

export class NavbarComponent implements OnInit {

  user: any;
  logged: boolean;
  balance: any;

  constructor(private loginService: LoginService) {
    this.logged = false;
    this.user = loginService.getUser();
    if (this.user.profileImage == null) {
      this.user.profileImage = '/assets/img/defaultUserImage.png';
    } else {
      this.user.profileImage = environment.publicDirBack + 'profileImage/' + this.user.profileImage;
    }
  }

  ngOnInit(): void {
    if (this.loginService.isUserSignedIn()) {
      this.logged = true;
      this.balance = this.user.balance;
    }
  }

  logout() {
    this.loginService.logout();
    this.logged = false;
  }

}
