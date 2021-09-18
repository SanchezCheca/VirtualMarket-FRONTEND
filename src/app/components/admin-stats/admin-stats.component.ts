import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats.service';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})

export class AdminStatsComponent implements OnInit {

  chart = [];
  stats: any;

  dateOp: any;
  dateOption: any;
  selectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private statsService: StatsService) {
    this.dateOp = [
      {
        'id': 'today',
        'name': 'Hoy'
      },
      {
        'id': 'last28',
        'name': 'Últimos 28 días'
      },
      {
        'id': 'last90',
        'name': 'Últimos 90 días'
      },
      {
        'id': 'always',
        'name': 'Desde siempre'
      },
    ];

    this.dateOption = this.dateOp[0].id;  //Valor de fecha predefinido

    this.selectForm = this.formBuilder.group({
      selectedDate: []
    });
  }

  get form() { return this.selectForm.controls; }

  ngOnInit(): void {
    this.statsService.getStats(this.dateOp[0].id).subscribe(
      (response: any) => {
        this.stats = response.message;

        this.actualizarTablaImagenesPublicadas(response.message.datosT[1],response.message.datosT[0]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //---------DATOS CHART LINEAL (IMÁGENES PUBLICADAS)
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Imágenes publicadas' },
  ];

  public lineChartLabels: Label[] = ['0', '0', '0', '0', '0', '0'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#FF5C6C',
    },
  ];
  lineChartXAxisID = "Aaa=;";
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line' as ChartType;

  //--------SELECTOR DE RANGO DE FECHAS
  onChange() {
    let data = this.selectForm.value;
    this.statsService.getStats(data.selectedDate).subscribe(
      (response: any) => {
        this.stats = response.message;
        console.log(response);

        this.actualizarTablaImagenesPublicadas(response.message.datosT[1],response.message.datosT[0]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //-------ACTUALIZA LOS DATOS DE LA TABLA DE IMÁGENES PUBLICADAS
  actualizarTablaImagenesPublicadas(data: any[], labels: any[]) {
    this.lineChartData = [
      { data: data, label: 'Imágenes publicadas' },
    ];

    this.lineChartLabels = labels;
  }
}