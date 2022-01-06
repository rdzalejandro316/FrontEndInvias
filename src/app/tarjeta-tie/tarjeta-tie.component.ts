import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { SolicitudesIterno, EstadoSolicitudes } from '../models/Solicitudes'
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from '../shared/repository.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FilterTypes, StateTie, BtnStateType, InterventoriaParamentros } from '../shared/Helpers';

import * as XLSX from 'xlsx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tarjeta-tie',
  templateUrl: './tarjeta-tie.component.html',
  styleUrls: ['./tarjeta-tie.component.css']
})
export class TarjetaTieComponent implements OnInit, AfterViewInit {


  @Input() estadoInput!: StateTie;
  @Input() UrlStateTie: string = "";
  @Input() BtnNota!: BtnStateType;
  @Input() BtnAccept!: BtnStateType;
  @Input() BtnCancel!: BtnStateType;

  @Output() newItemEvent = new EventEmitter<StateTie>();

  //interventoria
  showPopUp: boolean = false;  


  sucesfullChangeState(value: StateTie) {
    this.newItemEvent.emit(value);
  }

  displayedColumns: string[] = ['check', 'id_solicitud', 'fecha', 'nombre_peticionario', 'tipo_peticionario', 'nombre_peaje', 'estado_tie_interno', 'placa_vehiculo', 'opciones'];

  //#region table
  @ViewChild('TABLE', { static: true }) table!: ElementRef;
  public dataSource = new MatTableDataSource<SolicitudesIterno>();
  //#endregion

  //#region filtros
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  FilterTypes = FilterTypes;

  FilterSolicitud: string = '';
  FilterFecha: string = '';
  FilterPeticionario: string = '';
  FilterTipo: string = '';
  FilterPeaje: string = '';

  //#endregion

  constructor(private repoService: RepositoryService,private router: Router) { }

  ngOnInit(): void {
    this.getAllTieState();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllTieState = () => {
    this.repoService.getData(this.UrlStateTie).subscribe(res => { this.dataSource.data = res as SolicitudesIterno[]; })
  }



  //#region  filtros

  public doFilter = (value: string, tipo: FilterTypes) => {

    switch (tipo) {
      case FilterTypes.id_solicitud:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.id_solicitud.toString().includes(filter); };
        break;
      case FilterTypes.fecha:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.fecha.includes(filter); };
        break;
      case FilterTypes.peticionario:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.nombre_peticionario.includes(filter); };
        break;
      case FilterTypes.tipo:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.tipo_peticionario.toLowerCase().includes(filter); };
        break;
      case FilterTypes.peaje:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.nombre_peaje.toLowerCase().includes(filter); };
        break;
    }

    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ClearFilters() {
    this.FilterSolicitud = '';
    this.FilterFecha = '';
    this.FilterPeticionario = '';
    this.FilterTipo = '';
    this.FilterPeaje = '';
    this.dataSource.filter = "";
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

      let message = "F";
      let NewStateTie = StateTie.Ninguna;

      switch (this.estadoInput) {
        case StateTie.Solicitada:
          message = "Usted desea aprobar la solicitud:" + id_solicitud + "?";
          NewStateTie = StateTie.Aprobada
          break
        case StateTie.Aprobada:
          message = "Usted desea verificar la solicitud:" + id_solicitud + "?";
          NewStateTie = StateTie.Verificada
          break
        case StateTie.Verificada:
          message = "Usted desea enviar al aprobador parcial la solicitud:" + id_solicitud + "?";
          NewStateTie = StateTie.Parcial
          break
        case StateTie.Parcial:
          message = "Usted desea enviar autorizar la solicitud:" + id_solicitud + "?";
          NewStateTie = StateTie.Autorizada
          break
      }

      var confirmation = confirm(message);

      if (confirmation) {

        ///// se marcar el estado anterior para no incluirlo en los filtros de las solicitudes
        const estados = {
          idestado: idest,
          check_estado: true
        };

        var a = this.repoService.update('solicitudes/estadoanterior', estados);

        /////////// insert estado nuevo en falso para se visualisado en los otros filtros        
        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: NewStateTie.toString(),
          fecha_estado: new Date().toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue procesada con exito");

        this.getAllTieState();

        this.sucesfullChangeState(NewStateTie);

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
        let NewStateTie = StateTie.Rechazada;

        const estados_nuevos = {
          id_solicitud_estado: id_solicitud,
          estado: NewStateTie.toString(),
          fecha_estado: new Date().toISOString(),
          check_estado: false,
          estado_tie_interno: "",
          nota: "",
        };

        var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

        window.alert("la solicitud fue rechazada con exito");

        this.getAllTieState();
        this.sucesfullChangeState(NewStateTie);
      }

    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }



  Note() {    
    this.showPopUp = true;
  }

  ConfirmatioNote(accept: InterventoriaParamentros) {
    try {
      this.showPopUp = false;

      if (accept.succesfull) 
      {        
        const inter = {
          idestado: 107,
          estado_tie_interno: accept.tipo
        };
        
        var a = this.repoService.update('solicitudes/estadointerventoria', inter);
        window.alert("la interventoria fue exitosa");
        this.getAllTieState();

      }
    }
    catch (e) {
      window.alert("error ConfirmatioNote:" + e);
    }

  }


  Detalle(idsolicitud:number){
    this.router.navigateByUrl('/detalle-solicitud/'+idsolicitud);
    
      
  }


}


