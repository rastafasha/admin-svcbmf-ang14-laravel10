import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/models/configuracion';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { Location } from '@angular/common';
import { HttpClient, HttpBackend} from '@angular/common/http';


@Component({
  selector: 'app-configuracion-m',
  templateUrl: './configuracion-m.component.html',
  styleUrls: ['./configuracion-m.component.css']
})
export class ConfiguracionMComponent implements OnInit {

  title = 'Manage Configuración';
  configuracions: Configuracion;
  error: string;

  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    private configuracionService: ConfiguracionService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.configuracionService.getConfiguracions().subscribe(
      (data: Configuracion) => this.configuracions = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.configuracionService.deleteConfiguracion(+id).subscribe(
        res => {
          ////console.log(res););
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
