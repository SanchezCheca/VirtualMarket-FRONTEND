import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.scss']
})
export class ImageProductComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  atras() {
    this.location.back();
  }

}
