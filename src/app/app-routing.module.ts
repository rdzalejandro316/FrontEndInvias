import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeajesComponent } from './peajes/peajes.component';

import { SolicitudesInternoComponent   } from './solicitudes-interno/solicitudes-interno.component'
import {  SolicitudIndividualComponent } from './solicitud-individual/solicitud-individual.component'


const routes: Routes = [
  {path : 'solicitudes', component: SolicitudesInternoComponent},
  {path : 'peajes-component', component: PeajesComponent},
  {path : 'solicitud-individual', component: SolicitudIndividualComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
