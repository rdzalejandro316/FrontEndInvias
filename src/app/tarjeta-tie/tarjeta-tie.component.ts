import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Solicitudes_tie,SolicitudesIterno,EstadoSolicitudes } from '../models/Solicitudes'
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

  
  displayedColumns: string[] = ['check','id_solicitud', 'fecha', 'nombre_peticionario', 'tipo_peticionario', 'nombre_peaje','placa_vehiculo','opciones'];

  // TABLE 

   form = new FormGroup({
    first: new FormControl('Nancy', Validators.minLength(2)),
    last: new FormControl('Drew'),
  });
  
  //#region solicitudes
  public dataSourceSolictud = new MatTableDataSource<SolicitudesIterno>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  FilterTypes = FilterTypes;
  //#endregion

  //#region  aprobadas
  public dataSourceAprobadas = new MatTableDataSource<SolicitudesIterno>();
  //#endregion


  @ViewChild('TABLE') table!: ElementRef;
  @ViewChild('InpIdSolicitud') InpIdSolicitud!: ElementRef;
  @ViewChild('InpFecha') InpFecha!: ElementRef;
  @ViewChild('InpPeticionario') InpPeticionario!: ElementRef;
  @ViewChild('InpTipo') InpTipo!: ElementRef;
  @ViewChild('InpPeaje') InpPeaje!: ElementRef;
  @ViewChild('InpEstado') InpEstado!: ElementRef;

  constructor(private repoService: RepositoryService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllOwners();

  }


  ngAfterViewInit(): void {
    this.dataSourceSolictud.sort = this.sort;
    this.dataSourceSolictud.paginator = this.paginator;
  }

  public getAllOwners = () => {
    
    this.repoService.getData('solicitudes/solicitadas').subscribe(res => {this.dataSourceSolictud.data = res as SolicitudesIterno[];})
    this.repoService.getData('solicitudes/aprobadas').subscribe(res => {this.dataSourceAprobadas.data = res as SolicitudesIterno[];})
    
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

  ClearFilters()
  {
    this.InpIdSolicitud.nativeElement.value = '';
    this.InpIdSolicitud.nativeElement.value = '';
    this.InpFecha.nativeElement.value = '';
    this.InpPeticionario.nativeElement.value = '';
    this.InpTipo.nativeElement.value = '';
    this.InpPeaje.nativeElement.value = '';
    this.InpEstado.nativeElement.value = '';

    this.dataSourceSolictud.filter = "";
  }

  ExportTable()
  {
    try {
      
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);      
      const wb: XLSX.WorkBook = XLSX.utils.book_new();      
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');                
      XLSX.writeFile(wb, 'solicitudes.xlsx');
    }
    catch (e) {
      window.alert("error XD:" + e);
    }    
  }


  //#endregion 

  postId:number =  0;

  Accept(idest: number,id_solicitud: number)
  {
    try 
    {
      var c = confirm('Confirm?');
      
      if(c)
      {
          //window.alert("sii"+id_solicitud);

        // const estados = new EstadoSolicitudes();
        // estados.idestado = idest;
        // estados.check_estado = true;

        const estados = { 
          idestado: idest,
          check_estado: true
        };
        

        var a = this.repoService.update('solicitudes/estadoanterior',estados);
        //var a = this.repoService.updateReturnConf('solicitudes/estadoanterior',estados);
        
    
        //  this.http.put<any>('https://localhost:44330/solicitudes/estadoanterior', estados)
        // .subscribe(data => this.postId = data.id);

        // this.http.put<any>('https://localhost:44330/solicitudes/estadoanterior', estados)
        // .subscribe();
        window.alert("AAA:"+a);




        /////////// insert estado

        const estados_nuevos = { 
          id_solicitud_estado: id_solicitud,
          estado: "",
          fecha_estado: "2022-01-04T00:00:00",
          check_estado: true,
          estado_tie_interno: "",
          nota: "",
        };

        var b= this.repoService.create('solicitudes/nuevoestado',estados_nuevos);
        window.alert("BBB:"+b);


        
      }
      else
      {
        ///window.alert("no");
      }

    }
    catch (e) {
      window.alert("error XD:" + e);
    }
  }

  Cancel()
  {


  }

}


