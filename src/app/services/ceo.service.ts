import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CeoService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }

  getCeos() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/ceo";
    return this.http.get(URL, {headers:headers});
    
  }

  getCeo(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/ceo/show/"+id;
    return this.http.get(URL,{headers:headers});
  }


  createCeo(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/ceo/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateCeo(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/ceo/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteCeo(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/ceo/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

  getCargos() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/cargo";
    return this.http.get(URL, {headers:headers});
    
  }

  
}
