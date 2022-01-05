import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { SolicitudesIterno, EstadoSolicitudes } from '../models/Solicitudes'
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from '../shared/repository.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FilterTypes } from '../shared/Helpers';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tarjeta-tie',
  templateUrl: './tarjeta-tie.component.html',
  styleUrls: ['./tarjeta-tie.component.css']
})
export class TarjetaTieComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['check', 'id_solicitud', 'fecha', 'nombre_peticionario', 'tipo_peticionario', 'nombre_peaje', 'estado_tie_interno', 'placa_vehiculo', 'opciones'];

  //#region solicitudes
  public dataSourceSolictud = new MatTableDataSource<SolicitudesIterno>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  FilterTypes = FilterTypes;
  //#endregion

  //#region  aprobadas
  public dataSourceAprobadas = new MatTableDataSource<SolicitudesIterno>();
  //#endregion

  //#region  autorizada
  public dataSourceAutorizada = new MatTableDataSource<SolicitudesIterno>();
  //#endregion

  //#region Rechazada
  public dataSourceRechazada = new MatTableDataSource<SolicitudesIterno>();
  //#endregion

  @ViewChild('TABLE1') table!: ElementRef;
  @ViewChild('InpIdSolicitud') InpIdSolicitud!: ElementRef;
  @ViewChild('InpFecha') InpFecha!: ElementRef;
  @ViewChild('InpPeticionario') InpPeticionario!: ElementRef;
  @ViewChild('InpTipo') InpTipo!: ElementRef;
  @ViewChild('InpPeaje') InpPeaje!: ElementRef;
  @ViewChild('InpEstado') InpEstado!: ElementRef;

  constructor(private repoService: RepositoryService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllSolicitudes();
    this.getAllAprobadas();
    this.getAllAutorizada();
    this.getAllRechazada();
  }


  ngAfterViewInit(): void {
    this.dataSourceSolictud.sort = this.sort;
    this.dataSourceSolictud.paginator = this.paginator;
  }

  public getAllSolicitudes = () => {
    this.repoService.getData('solicitudes/solicitadas').subscribe(res => { this.dataSourceSolictud.data = res as SolicitudesIterno[]; })
  }

  public getAllAprobadas = () => {
    this.repoService.getData('solicitudes/aprobadas').subscribe(res => { this.dataSourceAprobadas.data = res as SolicitudesIterno[]; })
  }

  public getAllAutorizada = () => {
    this.repoService.getData('solicitudes/autorizada').subscribe(res => { this.dataSourceAutorizada.data = res as SolicitudesIterno[]; })
  }

  public getAllRechazada = () => {
    this.repoService.getData('solicitudes/rechazada').subscribe(res => { this.dataSourceRechazada.data = res as SolicitudesIterno[]; })
  }

  //#region  filtros

  public doFilter = (value: string, tipo: FilterTypes) => {

    switch (tipo) {
      case FilterTypes.id_solicitud:
        this.dataSourceSolictud.filterPredicate = function (data, filter: string): boolean { return data.id_solicitud.toString().includes(filter); };
        break;
      case FilterTypes.fecha:
        this.dataSourceSolictud.filterPredicate = function (data, filter: string): boolean { return data.fecha.includes(filter); };
        break;
      case FilterTypes.peticionario:
        this.dataSourceSolictud.filterPredicate = function (data, filter: string): boolean { return data.nombre_peticionario.includes(filter); };
        break;
      case FilterTypes.tipo:
        this.dataSourceSolictud.filterPredicate = function (data, filter: string): boolean { return data.tipo_peticionario.toLowerCase().includes(filter); };
        break;
      case FilterTypes.peaje:
        this.dataSourceSolictud.filterPredicate = function (data, filter: string): boolean { return data.nombre_peaje.toLowerCase().includes(filter); };
        break;
    }

    this.dataSourceSolictud.filter = value.trim().toLocaleLowerCase();
  }

  ClearFilters() {
    this.InpIdSolicitud.nativeElement.value = '';
    this.InpIdSolicitud.nativeElement.value = '';
    this.InpFecha.nativeElement.value = '';
    this.InpPeticionario.nativeElement.value = '';
    this.InpTipo.nativeElement.value = '';
    this.InpPeaje.nativeElement.value = '';
    this.InpEstado.nativeElement.value = '';

    this.dataSourceSolictud.filter = "";
  }

  ExportTable() {
    try {

      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'solicitudes.xlsx');
    }
    catch (e) {
      window.alert("error XD:" + e);
    }
  }


  //#endregion 



  Accept(idest: number, id_solicitud: number) {
    try {

      var message = confirm('Usted desea aprobar la solicitud ' + id_solicitud + '?');

      if (message) {


        const estados = {
          idestado: idest,
          check_estado: true
        };

        var a = this.repoService.update('solicitudes/estadoanterior', estados);

        /////////// insert estado
        var date = new Date();

        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: "Aprobada",
          //fecha_estado: "2022-01-05T00:00:00",
          fecha_estado: date.toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue aprobada con exito");

        this.getAllSolicitudes();
        this.getAllAprobadas();
        this.getAllRechazada();
      }

    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }

  Cancel(idest: number, id_solicitud: number) {

    try {

      var message = confirm('Usted desea rechazar la solicitud ' + id_solicitud + '?');

      if (message) {

        const estados = {
          idestado: idest,
          check_estado: true
        };

        var a = this.repoService.update('solicitudes/estadoanterior', estados);

        /////////// insert estado
        var date = new Date();

        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: "Rechazada",
          //fecha_estado: "2022-01-05T00:00:00",
          fecha_estado: date.toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue rechazada con exito");

        this.getAllSolicitudes();
        this.getAllAprobadas();
        this.getAllRechazada();

      }

    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }


  Accept2(idest: number, id_solicitud: number) {
    try {

      var message = confirm('Usted desea autorizar la solicitud ' + id_solicitud + '?');

      if (message) {


        const estados = {
          idestado: idest,
          check_estado: true
        };

        var a = this.repoService.update('solicitudes/estadoanterior', estados);

        /////////// insert estado
        var date = new Date();

        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: "Aprobada",
          //fecha_estado: "2022-01-05T00:00:00",
          fecha_estado: date.toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue autorizada con exito");

        this.getAllSolicitudes();
        this.getAllAprobadas();
        this.getAllRechazada();

      }

    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }

  Cancel2(idest: number, id_solicitud: number) {

    try {

      var message = confirm('Usted desea rechazar la solicitud ' + id_solicitud + '?');

      if (message) {

        const estados = {
          idestado: idest,
          check_estado: true
        };

        var a = this.repoService.update('solicitudes/estadoanterior', estados);

        /////////// insert estado
        var date = new Date();

        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: "Rechazada",
          //fecha_estado: "2022-01-05T00:00:00",
          fecha_estado: date.toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue rechazada con exito");

        this.getAllSolicitudes();
        this.getAllAprobadas();
        this.getAllRechazada();

      }

    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }


}


