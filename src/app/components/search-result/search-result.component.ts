import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  mostrandoUltimas: boolean = false;  //Define si se están mostrando las últimas imágenes

  filtersForm: FormGroup;
  filters: any;

  originalSearchResult: any[] = [];
  images: any[] = [];
  categories: any[] = [];
  publicDirBack = '';
  searchTerm: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    this.filters = {
      'price': '1',
      'size': '1',
      'facing': '1'
    };

    this.filtersForm = this.formBuilder.group({
      price: [],
      size: [],
      facing: []
    });

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

  //Aplica los filtros establecidos
  applyFilters() {
    this.images = [...this.originalSearchResult]; //Devuelve el array al estado original para no perder ningún resultado

    //------------- Aplica filtros del PRECIO
    if (this.filters.price == 'leq1') {
      //Imágenes con un precio menor o igual que 1

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].price > 1) {
          this.images.splice(index, 1);
        }
      }
    } else if (this.filters.price == 'leq10') {
      //Imágenes con un precio menor o igual que 10

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].price > 10) {
          this.images.splice(index, 1);
        }
      }
    } else if (this.filters.price == 'g10') {
      //Imágenes con un precio mayor que 10

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].price <= 10) {
          this.images.splice(index, 1);
        }
      }
    }

    //------------- Aplica filtros del TAMAÑO
    if (this.filters.size == 'small') {
      //Ancho hasta 512 pixeles

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].width > 512) {
          this.images.splice(index, 1);
        }
      }
    } else if (this.filters.size == 'medium') {
      //Ancho hasta 1024 pixeles

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].width > 1024) {
          this.images.splice(index, 1);
        }
      }
    } else if (this.filters.size == 'large') {
      //Ancho mayor que 1024 pixeles

      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].width < 1024) {
          this.images.splice(index, 1);
        }
      }
    }

    //------------- Aplica filtros de la ORIENTACIÓN
    if (this.filters.facing == 'horizontal') {
      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].width <= this.images[index].height) {
          this.images.splice(index, 1);
        }
      }
    } else if (this.filters.facing == 'vertical') {
      for (let index = this.images.length-1 ; index >= 0; index--) {
        if (this.images[index].width >= this.images[index].height) {
          this.images.splice(index, 1);
        }
      }
    }

  }

  //Vuelve a buscar para limpiar los filtros
  resetFilters() {
    this.search(this.searchTerm);
  }

  //Recupera la lista de categorías
  getCategories() {
    this.searchService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.message;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Realiza una búsqueda usando el servicio searchService
  search(searchTerm: any) {
    this.mostrandoUltimas = false;

    this.searchService.search(this.searchTerm).subscribe(
      (response: any) => {
        //console.log(response);
        this.images = response.message;
        this.originalSearchResult = [...this.images];

        console.log(this.images);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Recupera las últimas imágenes subidas
  getLastImages() {
    this.mostrandoUltimas = true;

    this.searchService.getLastImages().subscribe(
      (response: any) => {
        this.images = response.message;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
