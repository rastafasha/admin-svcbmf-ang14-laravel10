import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos.service';
import { Trabajo } from '../../../models/trabajos';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-trabajosc',
  templateUrl: './manage-trabajosc.component.html',
  styleUrls: ['./manage-trabajosc.component.css']
})
export class ManageTrabajoscComponent implements OnInit {

  title = 'Administrar Trabajos Científicos';
  trabajos: Trabajo;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;
  isAgregar:boolean= true;
isEditar:boolean= false;
  p: Number = 1;
  count: Number = 8;
  data: any[];

  

  constructor(
    public trabajoService: TrabajosService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

 

  ngOnInit() {
    this.trabajoService.getTrabajos().subscribe(
      (data: Trabajo) => this.trabajos = data,
      error => this.error = error
    );
    
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.trabajoService.deleteTrabajo(+id).subscribe(
        res => {
          console.log(res);
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
