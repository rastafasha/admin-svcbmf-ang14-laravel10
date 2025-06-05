import { Injectable } from '@angular/core';
import { Revista } from '../models/revista';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    public authService: AccountService,
  ) { }
  getRevistas() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/revistas";
    return this.http.get(URL, {headers:headers});
    
  }

  getRevista(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/revistas/show/"+id;
    return this.http.get(URL,{headers:headers});
  }

  
  createRevista(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/revistas/store";
    return this.http.post(URL,data,{headers:headers});
    

  }

  updateRevista(data:any, id: number) {
    
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/revistas/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteRevista(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/revistas/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }


  // portada

  getImgrevista(id: number) {
    return this.http.get<Revista>(this.serverUrl + 'api_portada/adminImgrevista/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createImgrevista(revista) {
    return this.http.post<any>(this.serverUrl + 'api_portada/createImgRevista/', revista)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateImgrevista(revista, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_portada/updateImgRevista/' + id, revista)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteImgrevista(id: number) {
    return this.http.delete(this.serverUrl + 'api_portada/deleteImgRevista/' + id).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
