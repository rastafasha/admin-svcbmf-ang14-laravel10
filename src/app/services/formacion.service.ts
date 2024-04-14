import { Injectable } from '@angular/core';
import { Formacion } from '../models/formacion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getFormacions() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/formacions";
    return this.http.get(URL, {headers:headers});
    
  }

  getFormacion(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/formacions/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createFormacion(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/formacions/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateFormacion(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/formacions/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteFormacion(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/formacions/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

  
}
