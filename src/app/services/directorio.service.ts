import { Injectable } from '@angular/core';
import { Directorio } from '../models/directorio';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  public directories: Directorio;
  public directory: Directorio;
  public directoriesPublished: Directorio;


  constructor(
    private http: HttpClient,
    public authService: AccountService,
  ) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }

  get status(): 'PUBLISHED'| 'PENDING' | 'REJECTED' {
    return this.directory.status!;
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token,
      }
    }
  }

 

  getDirectorios() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = apiUrl+"/directory";
    return this.http.get(URL, {headers:headers});
    
  }

  getDirectorio(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = apiUrl+"/directory/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  createDirectorio(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = apiUrl+"/directory/store/";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateDirectorio(data:any, id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = apiUrl+"/directory/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteDirectorio(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = apiUrl+"/directory/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }



  
  search(query=''){
    return this.http.get(`${apiUrl}/directory/search`, {params: {buscar: query}})

  }


}
