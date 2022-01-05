import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { StateTie, BtnStateType } from '../shared/Helpers';
import {TarjetaTieComponent} from '../tarjeta-tie/tarjeta-tie.component'

@Component({
  selector: 'app-solicitudes-interno',
  templateUrl: './solicitudes-interno.component.html',
  styleUrls: ['./solicitudes-interno.component.css']
})
export class SolicitudesInternoComponent implements OnInit {

  Solicitada: StateTie = StateTie.Solicitada;
  UrlSolicitada: string = 'solicitudes/solicitadas';
  BtnAceptSolicitud: BtnStateType = new BtnStateType(true, "Aprobar");
  BtnCancelSolicitud: BtnStateType = new BtnStateType(true, "Rechazar");


  Aprobada: StateTie = StateTie.Aprobada;
  UrlAprobada: string = 'solicitudes/aprobadas';
  BtnAceptAprobada: BtnStateType = new BtnStateType(true, "Autorizar");
  BtnCancelAprobada: BtnStateType = new BtnStateType(true, "Rechazar");

  Autorizada: StateTie = StateTie.Autorizada;
  UrlAutorizada: string = 'solicitudes/autorizada';

  Rechazada: StateTie = StateTie.Rechazada;
  UrlRechazada: string = 'solicitudes/rechazada';
  BtnAceptRechazada: BtnStateType = new BtnStateType(false, "");
  BtnCancelRechazada: BtnStateType = new BtnStateType(false, "");

  @ViewChild('TieSolicitud') TieSolicitud!: TarjetaTieComponent;
  @ViewChild('TieAprobadas') TieAprobadas!: TarjetaTieComponent;
  @ViewChild('TieAutorizadas') TieAutorizadas!: TarjetaTieComponent;
  @ViewChild('TieRechazadas') TieRechazadas!: TarjetaTieComponent;

  constructor() {


  }

  ngOnInit(): void {

  }

  sucesfullChangeState(value: StateTie) {
    try {
      
      switch (value) {
        case StateTie.Aprobada:           
          this.TieAprobadas.getAllTieState();
          break;
        case StateTie.Autorizada:
          this.TieAutorizadas.getAllTieState();                  
          break;
        case StateTie.Rechazada:
          this.TieRechazadas.getAllTieState();        
          break;
      }
    }
    catch (e) {
      window.alert("error EN sucesfullChangeState:" + e);
    }
  }



}
