import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  stats: any;

  constructor(private router: Router, private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getStats().subscribe(
      (response: any) => {
        this.stats = response.message;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
