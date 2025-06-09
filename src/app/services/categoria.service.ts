import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

   serverUrl = environment.apiUrl;
  
    constructor(private http: HttpClient,
      public authService: AccountService,
    ) { }
  
    getCategorias() {
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/category";
      return this.http.get(URL, {headers:headers});
      
    }
  
    getCategory(id: any) {
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/category/show/"+id;
      return this.http.get(URL,{headers:headers});
    }
  
  
    createCategory(data:any) {
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/category/store";
      return this.http.post(URL,data,{headers:headers});
      
    }
  
    updateCategory(data:any, id: number) {
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/category/update/"+id;
      return this.http.post(URL,data,{headers:headers});
    }
  
    deleteCategory(id: number) {
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/category/destroy/"+id;
      return this.http.delete(URL, {headers:headers});
      
    }
  
}
