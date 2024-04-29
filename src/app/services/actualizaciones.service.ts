import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionesService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getActualizacione() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/actualizacion";
    return this.http.get(URL, {headers:headers});
    
  }

  getActualizacio(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/actualizacion/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createActualizacion(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/actualizacion/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateActualizacione(data:any, id:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/actualizacion/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteActualizacione(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/actualizacion/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

  
}
