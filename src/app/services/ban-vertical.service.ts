import { Injectable } from '@angular/core';
import { Banvertical } from '../models/ban-vertical';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BanverticalService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getBanverticals() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banvertical";
    return this.http.get(URL, {headers:headers});
    
  }

  getBanvertical(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banvertical/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createBanvertical(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banvertical/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateBanvertical(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banvertical/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteBanvertical(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banvertical/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
