import { Component, OnInit } from '@angular/core';
import { ModerationService } from 'src/app/services/moderation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-moderation',
  templateUrl: './image-moderation.component.html',
  styleUrls: ['./image-moderation.component.scss']
})
export class ImageModerationComponent implements OnInit {

  image: any;
  publicDirBack: string;
  nImages: number;
  userStats: any;

  constructor(private moderationService: ModerationService) {
    this.publicDirBack = environment.publicDirBack;
    this.nImages = 0;
  }

  ngOnInit(): void {
    this.cargar();
  }

  aceptar() {
    this.moderationService.acceptImage(this.image.id).subscribe(
      (response: any) => {
        this.image = response.message.image;
        this.nImages = response.message.nImages;
        this.userStats = response.message.userStats;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  rechazar() {
    this.moderationService.rejectImage(this.image.id).subscribe(
      (response: any) => {
        this.image = response.message.image;
        this.nImages = response.message.nImages;
        this.userStats = response.message.userStats;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cargar() {
    let respuesta = this.moderationService.getImageToModerate().subscribe(
      (response: any) => {
        console.log(response);
        this.image = response.message.image;
        this.nImages = response.message.nImages;
        this.userStats = response.message.userStats;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
