import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  image: any;
  submitted = false;
  message: string;

  constructor(private formbuilder: FormBuilder, private router: Router, private UploadService: UploadService) {
    this.uploadForm = this.formbuilder.group({
      image: ['', Validators.required]
    });
    this.message = "";
  }
  
  get form() {return this.uploadForm.controls;}

  ngOnInit(): void {
  }
  
  /**
   * Se ha seleccionado una imagen, la guarda
   * @param event 
   */
  saveImage(event: any) {
    this.image = <File>event.target.files[0];
  }

  /**
   * Manda guardar la imagen al back
   * @returns 
   */
  onSubmit() {
    this.submitted = true;
    if (this.uploadForm.invalid){
      return;
    }
    this.UploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
