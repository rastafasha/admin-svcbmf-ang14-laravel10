import { Injectable } from '@angular/core';
import { Galeria } from '../models/galeria';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getGalerias() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/galeria";
    return this.http.get(URL, {headers:headers});
    
  }

  getGaleria(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/galeria/show/"+id;
    return this.http.get(URL,{headers:headers});
  }
  createGaleria(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/galeria/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateGaleria(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/galeria/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteGaleria(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/galeria/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
