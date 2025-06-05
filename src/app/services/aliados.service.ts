import { Injectable } from '@angular/core';
import { Aliado } from '../models/aliados';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getAliados() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/aliados";
    return this.http.get(URL, {headers:headers});
    
  }

  getAliado(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/aliados/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createAliado(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/aliados/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateAliado(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/aliados/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteAliado(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/aliados/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
