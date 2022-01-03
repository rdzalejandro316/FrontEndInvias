import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Solicitudes_tie } from '../models/Solicitudes'
import { TypesPopUp } from '../shared/Helpers';


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

  solicitudes: Solicitudes_tie[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
      })
    };

    this.http.get<Solicitudes_tie[]>('https://gestiotie.azurewebsites.net/solicitudes/individual_peticionario?idpet=1033796537', httpOptions).subscribe((data) => { this.solicitudes = data; });
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
