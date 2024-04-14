import { Injectable } from '@angular/core';
import { Afiliaciones } from '../models/afiliaciones';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AfiliacionesService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getAfiliaciones() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/afiliaciones";
    return this.http.get(URL, {headers:headers});
    
  }

  getAfiliacione(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/afiliaciones/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createAfiliacione(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/afiliaciones/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateAfiliacione(data:any, id:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/afiliaciones/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteAfiliacione(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/afiliaciones/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

  
}
