import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../shared/repository.service';
import { Solicitudes_tie } from '../models/Solicitudes'

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {

  idsolicitud : number = 0;
  detalleSolicitud:Solicitudes_tie = new Solicitudes_tie();

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private repoService: RepositoryService

    ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.repoService.getData('solicitudes/individual?id='+id).subscribe(res => { this.detalleSolicitud = res as Solicitudes_tie; })
    
    //window.alert(id);

    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
  }

  goBack(): void {    
    this._location.back();
  }

}
