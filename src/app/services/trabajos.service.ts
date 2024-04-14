import { Injectable } from '@angular/core';
import { Trabajo } from '../models/trabajos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrabajos() {
    return this.http.get<Trabajo>(this.serverUrl + 'api_trabajo/adminTrabajos/').pipe(
      catchError(this.handleError)
    );
  }

  getTrabajo(id: number) {
    return this.http.get<Trabajo>(this.serverUrl + 'api_trabajo/adminTrabajo/' + id).pipe(
      catchError(this.handleError)
    );
  }

  
  deleteTrabajo(id: number) {
    return this.http.delete(this.serverUrl + 'api_trabajo/deleteTrabajo/' + id).pipe(
      catchError(this.handleError)
    );
  }

  // export to excel

  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // //metodo
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  //    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  // }

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
