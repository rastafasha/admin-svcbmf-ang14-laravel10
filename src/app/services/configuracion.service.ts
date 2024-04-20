import { Injectable } from '@angular/core';
import { Configuracion } from '../models/configuracion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getSettings() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/setting";
    return this.http.get(URL, {headers:headers});
    
  }

  getSetting(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/setting/show/"+id;
    return this.http.get(URL,{headers:headers});
  }


  createSetting(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/setting/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateSetting(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/setting/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteSetting(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/setting/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
