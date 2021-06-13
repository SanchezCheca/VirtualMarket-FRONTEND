import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {


  images: any[] = [];
  categories: any[] = [];
  publicDirBack = '';
  searchTerm: any;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {

    this.publicDirBack = environment.publicDirBack;
  }

  ngOnInit(): void {
    //Recupera el término de búsqueda de usuario de la url y lo busca cada vez que cambia la url
    this.route.params.subscribe(event => {
      this.searchTerm = event.searchTerm;
      if (!this.searchTerm) {
        //No hay nada en la url, es el caso en que no se ha buscado nada: Se recuperan las últimas imágenes
        this.getLastImages();
      } else {
        this.search(this.searchTerm);
      }
    });

    //Recupera las categorías
    this.getCategories();
  }

  applyFilter(filterId: any) {
    console.log(filterId);
  }

  //Recupera la lista de categorías
  getCategories() {
    this.searchService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.message;
        console.log(this.categories);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Realiza una búsqueda usando el servicio searchService
  search(searchTerm: any) {
    this.searchService.search(this.searchTerm).subscribe(
      (response: any) => {
        //console.log(response);
        this.images = response.message;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Recupera las últimas imágenes subidas
  getLastImages() {
    this.searchService.getLastImages().subscribe(
      (response: any) => {
        this.images = response.message;
        console.log(this.images);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
