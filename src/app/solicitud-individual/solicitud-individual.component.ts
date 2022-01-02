import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Solicitudes_tie } from '../models/Solicitudes'


@Component({
  selector: 'app-solicitud-individual',
  templateUrl: './solicitud-individual.component.html',
  styleUrls: ['./solicitud-individual.component.css']
})
export class SolicitudIndividualComponent implements OnInit {
  
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



}
