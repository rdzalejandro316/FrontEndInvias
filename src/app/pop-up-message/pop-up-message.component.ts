import { Component, OnInit, Input , Output , EventEmitter} from '@angular/core';

import { TypesPopUp } from '../shared/Helpers';

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css']
})
export class PopUpMessageComponent implements OnInit {

    
  TypesPopUp = TypesPopUp;
  @Input() tipo : TypesPopUp = TypesPopUp.OK; 
  statusEnum: typeof TypesPopUp = TypesPopUp;

  @Input() ShowPopUp : boolean = false; 
  @Input() PopUpTitle : string = 'titulo de pop up'; 
  @Input() PopUpMessage : string = 'texto de pop up informativo que se envia por parametro para identificar la accion a realizar'; 

  @Output() newItemEvent = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void { 
    //window.alert("recibio mierda");
  }
  

  getColor(tipo : TypesPopUp) { 
    switch (tipo) {
      case TypesPopUp.OK:return 'green';
      case TypesPopUp.Fail: return 'red';
      default: return 'blue';
    }
  }

  ClosePopUp(value: boolean)
  {
    this.newItemEvent.emit(value);
  }



}
