import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs';

import { StateTie, BtnStateType } from '../shared/Helpers';
import { TarjetaTieComponent } from '../tarjeta-tie/tarjeta-tie.component'

@Component({
  selector: 'app-solicitudes-interno',
  templateUrl: './solicitudes-interno.component.html',
  styleUrls: ['./solicitudes-interno.component.css']
})
export class SolicitudesInternoComponent implements OnInit {

  BtnNotaGeneral: BtnStateType = new BtnStateType(false, "");

  Solicitada: StateTie = StateTie.Solicitada;
  UrlSolicitada: string = 'solicitudes/solicitadas';  
  BtnAceptSolicitud: BtnStateType = new BtnStateType(true, "Aprobar");  
  BtnCancelSolicitud: BtnStateType = new BtnStateType(true, "Rechazar");

  Aprobada: StateTie = StateTie.Aprobada;
  UrlAprobada: string = 'solicitudes/aprobadas';
  BtnNotaInterventoria: BtnStateType = new BtnStateType(true, "Nota");
  BtnAceptAprobada: BtnStateType = new BtnStateType(true, "Verificar");
  BtnCancelAprobada: BtnStateType = new BtnStateType(true, "Rechazar");

  Verificada: StateTie = StateTie.Verificada;
  UrlVerificada: string = 'solicitudes/verificada';
  BtnAceptVerificada: BtnStateType = new BtnStateType(true, "Parcial");
  BtnCancelVerificada: BtnStateType = new BtnStateType(true, "Rechazar");

  Parcial: StateTie = StateTie.Parcial;
  UrlParcial: string = 'solicitudes/parcial';
  BtnAceptParcial: BtnStateType = new BtnStateType(true, "Autorizar");
  BtnCancelParcial: BtnStateType = new BtnStateType(true, "Rechazar");

  Autorizada: StateTie = StateTie.Autorizada;
  UrlAutorizada: string = 'solicitudes/autorizada';

  Rechazada: StateTie = StateTie.Rechazada;
  UrlRechazada: string = 'solicitudes/rechazada';
  BtnAceptRechazada: BtnStateType = new BtnStateType(false, "");
  BtnCancelRechazada: BtnStateType = new BtnStateType(false, "");

  @ViewChild('TieSolicitud') TieSolicitud!: TarjetaTieComponent;
  @ViewChild('TieAprobadas') TieAprobadas!: TarjetaTieComponent;
  @ViewChild('TieVerificada') TieVerificada!: TarjetaTieComponent;
  @ViewChild('TieParcial') TieParcial!: TarjetaTieComponent;
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
        case StateTie.Verificada:
          this.TieVerificada.getAllTieState();
          break;
        case StateTie.Parcial:
          this.TieParcial.getAllTieState();
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
