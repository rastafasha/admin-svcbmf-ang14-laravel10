import { Component, OnInit } from '@angular/core';
import { AfiliacionesService } from '../../../services/afiliaciones.service';
import { Afiliaciones } from '../../../models/afiliaciones';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-afiliaciones',
  templateUrl: './afiliaciones.component.html',
  styleUrls: ['./afiliaciones.component.css']
})
export class AfiliacionesComponent implements OnInit {


  title = 'Manage Afiliaciones';
  afiliaciones: Afiliaciones;
  error: string;
  archivo: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  constructor(
    public afiliacionesService: AfiliacionesService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.afiliacionesService.getAfiliaciones().subscribe((resp:any)=>{
      this.afiliaciones = resp.afiliaciones.data;
    })
    //console.log(this.afiliaciones)
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.afiliacionesService.deleteAfiliacione(+id).subscribe(
        res => {
          ////console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
