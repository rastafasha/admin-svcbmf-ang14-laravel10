import { Injectable } from '@angular/core';
import { Documento } from '../models/documentos';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getDocumentos() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/documento";
    return this.http.get(URL, {headers:headers});
    
  }

  getDocumento(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/documento/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createDocumento(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/documento/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateDocumento(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/documento/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteDocumento(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/documento/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
