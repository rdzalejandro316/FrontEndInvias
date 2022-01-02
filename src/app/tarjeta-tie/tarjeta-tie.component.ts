import { HttpClient, HttpHeaders } from '@angular/common/http';
import { core } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { Solicitudes_tie } from '../models/Solicitudes'


@Component({
  selector: 'app-tarjeta-tie',
  templateUrl: './tarjeta-tie.component.html',
  styleUrls: ['./tarjeta-tie.component.css']
})
export class TarjetaTieComponent implements OnInit {

  solicitudes: Solicitudes_tie[] = [];
  displayedColumns: string[] = ['codigo_peaje', 'placa_vehiculo', 'marca_vehiculo','actions'];  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
      })
    };

    this.http.get<Solicitudes_tie[]>('https://gestiotie.azurewebsites.net/solicitudes', httpOptions).subscribe((data) => { this.solicitudes = data; });
  }

}


