import { Injectable } from '@angular/core';
import { Banhorizontal } from '../models/ban-horizontal';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BannhorizontalService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getBanhorizontals() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banhorizontal";
    return this.http.get(URL, {headers:headers});
    
  }

  getBanhorizontal(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banhorizontal/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createBanhorizontal(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banhorizontal/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateBanhorizontal(data:any, id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banhorizontal/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteBanhorizontal(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/banhorizontal/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
