import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {


  images: any[] = [];
  publicDirBack = '';

  constructor(private searchService: SearchService) {

    this.publicDirBack = environment.publicDirBack;
  }

  ngOnInit(): void {
    this.getLastImages();
  }

  //Recupera las últimas imágenes subidas haciendo uso del SearchService
  getLastImages() {
    this.searchService.getLastImages().subscribe(
      (response: any) => {
        this.images = response.message;
        this.images = this.images.slice(21,this.images.length);
        //this.imageRoutes = environment.publicDirBack + 'thumbnail/' + this.images;
        console.log(this.images);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
