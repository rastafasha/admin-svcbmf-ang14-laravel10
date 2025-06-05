import { Injectable } from '@angular/core';
import { Bancuadrado } from '../models/ban-cuadrado';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BanncuadradoService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getBancuadrados() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/bancuadrados";
    return this.http.get(URL, {headers:headers});
    
  }

  getBancuadrado(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/bancuadrados/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createBancuadrado(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/bancuadrados/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateBancuadrado(data:any, id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/bancuadrados/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteBancuadrado(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/bancuadrados/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
