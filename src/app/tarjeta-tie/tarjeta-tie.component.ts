import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Solicitudes_tie } from '../models/Solicitudes'
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from '../shared/repository.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FilterTypes } from '../shared/Helpers';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-tarjeta-tie',
  templateUrl: './tarjeta-tie.component.html',
  styleUrls: ['./tarjeta-tie.component.css']
})
export class TarjetaTieComponent implements OnInit, AfterViewInit {


  solicitudes: Solicitudes_tie[] = [];
  displayedColumns: string[] = ['id_solicitud', 'fecha', 'nombre_peticionario', 'tipo_peticionario', 'nombre_peaje', 'estado','placa_vehiculo','opciones'];

  // TABLE 
  
  public dataSource = new MatTableDataSource<Solicitudes_tie>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  FilterTypes = FilterTypes;


  @ViewChild('TABLE') table!: ElementRef;
  @ViewChild('InpIdSolicitud') InpIdSolicitud!: ElementRef;
  @ViewChild('InpFecha') InpFecha!: ElementRef;
  @ViewChild('InpPeticionario') InpPeticionario!: ElementRef;
  @ViewChild('InpTipo') InpTipo!: ElementRef;
  @ViewChild('InpPeaje') InpPeaje!: ElementRef;
  @ViewChild('InpEstado') InpEstado!: ElementRef;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.getAllOwners();

  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('solicitudes')
      .subscribe(res => {
        this.dataSource.data = res as Solicitudes_tie[];
      })
  }


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
      case FilterTypes.estado:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.estado.toLowerCase().includes(filter); };
        break;
    }
    
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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

    this.dataSource.filter = "";
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

}


