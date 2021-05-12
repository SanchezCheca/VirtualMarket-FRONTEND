import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: any;
  user: any;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.username = event.username;
     });
  }

}
