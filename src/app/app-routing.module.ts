import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeajesComponent } from './peajes/peajes.component';

import {  TarjetaTieComponent } from './tarjeta-tie/tarjeta-tie.component'
import {  SolicitudIndividualComponent } from './solicitud-individual/solicitud-individual.component'


const routes: Routes = [
  {path : 'tarjeta-component', component: TarjetaTieComponent},
  {path : 'peajes-component', component: PeajesComponent},
  {path : 'solicitud-individual', component: SolicitudIndividualComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
