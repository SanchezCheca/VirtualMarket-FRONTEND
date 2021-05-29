import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  images: any[] = [];
  imageRoutes = '';
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
        //this.imageRoutes = environment.publicDirBack + 'thumbnail/' + this.images;
        console.log(this.images);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
