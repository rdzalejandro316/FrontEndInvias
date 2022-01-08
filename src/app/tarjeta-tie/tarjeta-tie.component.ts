import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from "@angular/material/dialog";
import * as XLSX from 'xlsx';

import { SolicitudesIterno } from '../models/Solicitudes'
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from '../shared/repository.service';
import { FilterTypes, StateTie, BtnStateType, InterventoriaParamentros, EstadosMsivo } from '../shared/Helpers';
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { ElementSchemaRegistry } from '@angular/compiler';
import { ignoreElements } from 'rxjs';


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
  PopUpIdSolicitud: number = 0;
  PopUpIdEstado: number = 0;
  showPopUp: boolean = false;
  //#region table  

  //#region 
  displayedColumns: string[] = ['check', 'id_solicitud', 'fecha', 'nombre_peticionario', 'tipo_peticionario', 'nombre_peaje', 'estado_tie_interno', 'placa_vehiculo', 'opciones'];
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
  FilterNota: string = '';

  //#endregion

  constructor(private repoService: RepositoryService, private router: Router, public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.getAllTieState();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllTieState() {
    this.repoService.getData(this.UrlStateTie).subscribe(res => {
      this.dataSource.data = res as SolicitudesIterno[];

      this.dataSource.data.forEach(element => {
        element.check_table = false;
      });

    });


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
      case FilterTypes.nota:
        this.dataSource.filterPredicate = function (data, filter: string): boolean { return data.estado_tie_interno.toLowerCase().includes(filter); };
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
    this.FilterNota = '';
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

  sucesfullChangeState(value: StateTie) {
    this.newItemEvent.emit(value);
  }

  GetNewState(): StateTie {
    let NewStateTie = StateTie.Ninguna;
    switch (this.estadoInput) {
      case StateTie.Solicitada:
        NewStateTie = StateTie.Aprobada
        break
      case StateTie.Aprobada:
        NewStateTie = StateTie.Verificada
        break
      case StateTie.Verificada:
        NewStateTie = StateTie.Parcial
        break
      case StateTie.Parcial:
        NewStateTie = StateTie.Autorizada
        break
    }

    return NewStateTie;
  }



  ChangeState(element: SolicitudesIterno, cancel?: boolean) {
    try {

      let message = "F";
      let NewStateTie = this.GetNewState();

      switch (this.estadoInput) {
        case StateTie.Solicitada:
          message = "Usted desea aprobar la solicitud:" + element.id_solicitud + "?";
          break
        case StateTie.Aprobada:
          message = "Usted desea verificar la solicitud:" + element.id_solicitud + "?";
          break
        case StateTie.Verificada:
          message = "Usted desea enviar al aprobador parcial la solicitud:" + element.id_solicitud + "?";
          break
        case StateTie.Parcial:
          message = "Usted desea enviar autorizar la solicitud:" + element.id_solicitud + "?";
          break
      }

      if (cancel) {
        message = "Usted desea rechazar la solicitud:" + element.id_solicitud + "?";
        NewStateTie = StateTie.Rechazada;
      }


      this.dialogo
        .open(DialogoConfirmacionComponent, { data: message })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {

            ///// se marcar el estado anterior para no incluirlo en los filtros de las solicitudes
            const estados = {
              idestado: element.idestado,
              check_estado: true
            };


            const estados_nuevos = {
              id_solicitud_estado: element.id_solicitud,
              estado: NewStateTie.toString(),
              fecha_estado: new Date().toISOString(),
              check_estado: false,
              estado_tie_interno: "",
              nota: "",
            };

            this.repoService.updateState('solicitudes/estadoanterior', estados).subscribe
              (
                up => {
                  this.repoService.CreateState('solicitudes/nuevoestado', estados_nuevos).subscribe
                    (
                      ins => {
                        this.getAllTieState();
                        this.sucesfullChangeState(NewStateTie);
                      }
                    );
                }
              );


          }
        });
    }
    catch (e) {
      window.alert("error EN Accept:" + e);
    }
  }


  GetChecks(): boolean {
    var flag = false;
    this.dataSource.data.forEach(element => {
      if (element.check_table) flag = true;
    });
    return flag;
  }

  Masivo(rechazo: boolean) {
    try {


      if (this.GetChecks()) {

        let message = "F";
        switch (this.estadoInput) {
          case StateTie.Solicitada:
            message = "Usted desea aprobar masivamente las solicitudes seleccionadas?";
            break
          case StateTie.Aprobada:
            message = "Usted desea verificar masivamente las solicitudes seleccionadas?";
            break
          case StateTie.Verificada:
            message = "Usted desea enviar al estado aprobador parcial masivamente las solicitudes seleccionadas?";                     
            break
          case StateTie.Parcial:
            message = "Usted desea autorizar masivamente las solicitudes seleccionadas?";            
            break
        }
        
        if(rechazo) message = "Usted desea rechazar masivamente las solicitudes seleccionadas?";
        
        var confirmation = confirm(message);

        if (confirmation) {

          this.dataSource.data.forEach(elem => {
            if (elem.check_table == true) {
              this.MasivoAccept(elem, rechazo)
            }
          });

          window.alert("el cambio de estado masivo fue existoso");
          this.getAllTieState();
          if(rechazo == true){this.sucesfullChangeState(StateTie.Rechazada);}          
          else{this.sucesfullChangeState(this.GetNewState());}

        }

      }
      else {
        window.alert("no se ha seleccionado ninguna solicitud");
      }

    }
    catch (e) {
      window.alert("error Masivo:" + e);
    }

  }


  MasivoAccept(solicitud: SolicitudesIterno, rechazo?: boolean) {
    try {

      let NewStateTie = this.GetNewState();
      if (rechazo) NewStateTie = StateTie.Rechazada;

      ///// se marcar el estado anterior para no incluirlo en los filtros de las solicitudes
      const estados = {
        idestado: solicitud.idestado,
        check_estado: true
      };

      var a = this.repoService.update('solicitudes/estadoanterior', estados);

      /////////// insert estado nuevo en falso para se visualisado en los otros filtros        
      const estados_nuevos = {
        id_solicitud_estado: solicitud.id_solicitud,
        estado: NewStateTie.toString(),
        fecha_estado: new Date().toISOString(),
        check_estado: false,
        estado_tie_interno: "",
        nota: "",
      };

      var b = this.repoService.create('solicitudes/nuevoestado', estados_nuevos);

    }
    catch (e) {
      window.alert("error en MasivoAccept:" + e);
    }
  }








  Note(idest: number, id_solicitud: number) {
    this.PopUpIdEstado = idest;
    this.PopUpIdSolicitud = id_solicitud;
    this.showPopUp = true;
  }

  ConfirmatioNote(accept: InterventoriaParamentros) {
    try {
      this.showPopUp = false;

      if (accept.succesfull) {

        const inter = {
          idestado: accept.idestado,
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


  Detalle(idsolicitud: number) {
    this.router.navigateByUrl('/detalle-solicitud/' + idsolicitud);
  }





}


