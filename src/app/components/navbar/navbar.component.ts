import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

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

  logged: boolean;

  constructor(private loginService: LoginService) {
    this.logged = false;
  }

  ngOnInit(): void {
    if (this.loginService.isUserSignedIn()) {
      this.logged = true;
    }
  }

  logout() {
    this.loginService.logout();
    this.logged = false;
  }

}
