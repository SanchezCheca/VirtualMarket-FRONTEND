import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  images = '';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    //Carga las últimas imágenes subidas
    let images = this.searchService.getLasts();
    //console.log(images);
  }

}
