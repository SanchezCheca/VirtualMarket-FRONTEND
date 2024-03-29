import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imageSrc: any;

  uploadForm: FormGroup;
  image: any;
  submitted = false;
  message: string;

  processing: boolean;
  uploadProgress: number;
  fileName: string;

  categories: any[];
  imageData: any;


  constructor(private formbuilder: FormBuilder, private router: Router, private UploadService: UploadService, private searchService: SearchService) {
    this.uploadForm = this.formbuilder.group({
      image: ['', Validators.required],
      price: [, Validators.required],
      category: [],
      tags: ['', Validators.required]
    });
    this.message = "";
    this.uploadProgress = 0;
    this.categories = [];
    this.imageData = {
      'category': 1
    };
    this.imageSrc = '';
    this.processing = false;
    this.fileName = 'Selecciona un archivo';
  }

  get form() { return this.uploadForm.controls; }

  ngOnInit(): void {
    this.searchService.getCategories().subscribe(
      (response: any) => {
        const allCategories = response.message;


        allCategories.forEach((element: {
          id: any; name: any
        }) => {
          //Omite el valor 1, correspondiente a "Sin categoría"
          if (element.id != 1) {
            let category = {
              'id': element.id,
              'name': element.name
            };
            this.categories.push(category);
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * Se ha seleccionado una imagen, la guarda
   * @param event
   */
  saveImage(event: any) {
    this.fileName = <string>event.target.files[0].name;

    this.image = <File>event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.image);
  }

  /**
   * Manda guardar la imagen al back
   * @returns
   */
  onSubmit() {
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    }
    let data = this.uploadForm.value;
    const price = data.price;
    const category = data.category;
    const tags = data.tags;

    if (this.image) {
      this.UploadService.uploadImage(this.image, price, category, tags).subscribe(
        (event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            if (this.uploadProgress == 100) {
              this.uploadProgress = 0;
              this.processing = true;
            }
          }
          if (event.type == HttpEventType.Response) {
            //Hay respuesta
            if (event.body.message.exito) {
              this.router.navigate(['/image/' + event.body.message.filename]);
            } else {
              this.message = 'Ha ocurrido algún error';
            }
          }
        }
      );
    }

  }

}
