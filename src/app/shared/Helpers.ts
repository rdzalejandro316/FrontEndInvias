import { TileCoordinator } from "@angular/material/grid-list/tile-coordinator";

export enum TypesPopUp {
    OK,
    Fail,
    Left,
    Right,
  }

  export enum FilterTypes {
    id_solicitud,
    fecha,
    peticionario,
    tipo,
    peaje,
    estado
  }

  export enum StateTie {
    Ninguna = "Ninguna",
    Solicitada = "Solicitada",
    Aprobada = "Aprobada",
    Verificada = "Verificada",
    Parcial = "Parcial",
    Autorizada = "Autorizada",
    Rechazada = "Rechazada",
    Cancelada = "Cancelada"
  }

  export class BtnStateType 
  {
    
    constructor(visible:boolean,titulo:string) {
      this.visible = visible;
      this.titulo = titulo;

    }

    visible:boolean = true;
    titulo:string = '';
  }


  export class InterventoriaParamentros {
    succesfull:boolean = true;
    tipo:string = '';
    nota:string = '';;
  }