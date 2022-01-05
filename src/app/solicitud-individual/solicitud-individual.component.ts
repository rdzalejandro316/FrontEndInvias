import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SolicitudesIterno } from '../models/Solicitudes'
import { TypesPopUp } from '../shared/Helpers';
import { RepositoryService } from '../shared/repository.service';

@Component({
  selector: 'app-solicitud-individual',
  templateUrl: './solicitud-individual.component.html',
  styleUrls: ['./solicitud-individual.component.css']
})
export class SolicitudIndividualComponent implements OnInit {

  //#region popup
  
  showPopUp: boolean = false;
  titlePopUp: string = '';
  messagePopUp: string = '';
  tipo : TypesPopUp = TypesPopUp.OK; 


  //#endregion

  solicitudes: SolicitudesIterno[] = [];
  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void 
  {

    this.repoService.getData('solicitudes/individual_peticionario?idpet=1033796537')
    .subscribe((data) => { this.solicitudes = data as SolicitudesIterno[]; });

  }


  NewTie() {
    try {
      //result= this.markLibrary(argument);
      //window.alert("F");
      //throw new Error();

      this.titlePopUp = 'Envio de solicitud exitoso';
      this.messagePopUp = 'la solicitud #123456789 fue enviada exitosamente y entrara en el proceso de revision por parte del personal del invias';
      this.tipo = TypesPopUp.OK;
      this.showPopUp = true;

    }
    catch (e) {
      window.alert("error XD:" + e);
    }

  }

  CancelTie()
  {
    this.titlePopUp = 'ERROR AL CANCELAR';
    this.messagePopUp = 'se registro un error';
    this.tipo = TypesPopUp.Fail;
    this.showPopUp = true;
  }


  ClosePopUp(show : boolean) 
  {
    this.showPopUp = show;
  }



}
