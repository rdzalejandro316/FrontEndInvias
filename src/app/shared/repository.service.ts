import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

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
 

  public updateReturnConf (route: string, body : any) : number 
  {    
    this.http.put<any>(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders()).subscribe(
        data => { return Number(data)}
    )    
    
    return 0;
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