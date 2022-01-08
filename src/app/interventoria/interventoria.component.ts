import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

import {InterventoriaParamentros} from '../shared/Helpers';

@Component({
  selector: 'app-interventoria',
  templateUrl: './interventoria.component.html',
  styleUrls: ['./interventoria.component.css']
})
export class InterventoriaComponent implements OnInit {
    
  tipo:string = '';
  nota:string = '';

  @Input() IdSolicitud : number = 0;   
  @Input() IdEstado : number = 0;   
  @Input() ShowPopUp : boolean = false;   
  @Output() StateEvent = new EventEmitter<InterventoriaParamentros>();  
  
  constructor() { }

  ngOnInit(): void {
  }


  BtnSave(value:boolean)
  {  
    var interv =  new InterventoriaParamentros();
    interv.succesfull = true;
    interv.nota = this.nota;
    interv.tipo = this.tipo;
    interv.idestado = this.IdEstado;
    interv.idsolicitud = this.IdSolicitud;
    this.StateEvent.emit(interv);
  }

  BtnCancel(value:boolean)
  {
    var interv =  new InterventoriaParamentros();
    interv.succesfull = false;
    this.StateEvent.emit(interv);
  }


}
