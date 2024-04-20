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
    this.configuracionService.getSettings().subscribe((resp:any)=>{
      this.configuracions = resp.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.configuracionService.deleteSetting(+id).subscribe(
        (res:any) => {
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
