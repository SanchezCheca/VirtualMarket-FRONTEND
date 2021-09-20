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

  tituloGraficaImagenesPublicadas: String = "";
  tituloGraficaCompras: String = "";

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

  //---------DATOS POR DEFECTO GRÁFICO Nº DE IMÁGENES SUBIDAS
  public graficoImagenesData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Imágenes publicadas' },
  ];
  public graficoImagenesLabels: Label[] = ['0', '0', '0', '0', '0', '0'];
  graficoImagenesOptions = {
    responsive: true,
  };
  graficoImagenesColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#FF5C6C',
    },
  ];
  graficoImagenesLegend = true;
  graficoImagenesPlugins = [];
  graficoImagenesType = 'line' as ChartType;

  //---------DATOS POR DEFECTO GRÁFICO Nº DE COMPRAS
  public graficoComprasData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Imágenes publicadas' },
  ];
  public graficoComprasLabels: Label[] = ['0', '0', '0', '0', '0', '0'];
  graficoComprasOptions = {
    responsive: true,
  };
  graficoComprasColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#B5D572',
    },
  ];
  graficoComprasLegend = true;
  graficoComprasPlugins = [];
  graficoComprasType = 'line' as ChartType;

  //---------INICIALIZACIÓN
  ngOnInit(): void {
    this.statsService.getStats(this.dateOp[0].id).subscribe(
      (response: any) => {
        //Carga las estadísticas del back
        this.stats = response.message;
        this.actualizarTablaImagenesPublicadas(response.message.datosTImages[1], response.message.datosTImages[0]);
        this.actualizarTablaCompras(response.message.datosTPurchases[1], response.message.datosTPurchases[0]);
        this.tituloGraficaImagenesPublicadas = "Imágenes publicadas (nº de imágenes / hora del día de hoy)";
        this.tituloGraficaCompras = "Compras (nº de compras / hora del día de hoy)";
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //--------SELECTOR DE RANGO DE FECHAS
  onChange() {
    let data = this.selectForm.value;
    //Cambia el título de las gráficas
    if (data.selectedDate == "today") {
      this.tituloGraficaImagenesPublicadas = "Imágenes publicadas (nº de imágenes / hora del día de hoy)";
      this.tituloGraficaCompras = "Compras (nº de compras / hora del día de hoy)";
    } else {
      this.tituloGraficaImagenesPublicadas = "Imágenes publicadas (nº de imágenes / día)";
      this.tituloGraficaCompras = "Compras (nº de compras / día)";
    }

    //Carga los nuevos datos
    this.statsService.getStats(data.selectedDate).subscribe(
      (response: any) => {
        this.stats = response.message;
        this.actualizarTablaImagenesPublicadas(response.message.datosTImages[1], response.message.datosTImages[0]);
        this.actualizarTablaCompras(response.message.datosTPurchases[1], response.message.datosTPurchases[0]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //-------ACTUALIZA LOS DATOS DE LA TABLA DE COMPRAS
  actualizarTablaCompras(data: any[], labels: any[]) {
    this.graficoComprasData = [
      {data: data, label: 'Compras'},
    ];

    this.graficoComprasLabels = labels;
  }

  //-------ACTUALIZA LOS DATOS DE LA TABLA DE IMÁGENES PUBLICADAS
  actualizarTablaImagenesPublicadas(data: any[], labels: any[]) {
    this.graficoImagenesData = [
      { data: data, label: 'Imágenes publicadas' },
    ];

    this.graficoImagenesLabels = labels;
  }
}