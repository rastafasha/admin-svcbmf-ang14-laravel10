import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Fotoceo } from '../models/fotoceo';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class FotoceoService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getFotoceos() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/fotoceo";
    return this.http.get(URL, {headers:headers});
  }

  getFotoceo(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/fotoceo/show/"+id;
    return this.http.get(URL,{headers:headers});
  }


  createFotoceo(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/fotoceo/store";
    return this.http.post(URL,data,{headers:headers});
  }

  updateFotoceo(data:any, id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/fotoceo/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteFotoceo(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/fotoceo/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
  }

}
