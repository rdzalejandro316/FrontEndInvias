import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { compileClassMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  public create = (route: string, body: any) => {
    return this.http.post<any>(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders()).subscribe();
  }
 
  public update = (route: string, body : any) => {
    return this.http.put<any>(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders()).subscribe();
  }
 

  public CreateState(route: string, body : any) 
  {    
    
    var valor = this.http.post<any>(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());    
    console.log("SERVICIO CREATE")
    return valor;
  }

  public updateState(route: string, body : any) 
  {    
    
    var valor = this.http.put<string>(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
    console.log("SERVICIO UPDATE")
    return valor;      
  }

  // public delete = (route: string) => {
  //   return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  // }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}