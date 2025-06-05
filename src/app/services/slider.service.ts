import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }


  getSliders() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/sliders";
    return this.http.get(URL, {headers:headers});
    
  }

  getSlider(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/slider/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createSlider(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/slider/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateSlider(data:any, id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/slider/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteSlider(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/slider/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

  
}
