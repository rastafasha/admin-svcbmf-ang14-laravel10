import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { FotoceoService } from '../../../services/fotoceo.service';
import { Fotoceo } from '../../../models/fotoceo';

@Component({
  selector: 'app-fotoceomanage',
  templateUrl: './fotoceomanage.component.html',
  styleUrls: ['./fotoceomanage.component.css']
})
export class FotoceomanageComponent implements OnInit {



  title = 'Foto Principal ';
  fotoceos: Fotoceo;
  error: string;
  isAgregar:boolean= false;
  isEditar:boolean= false;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 10;

  constructor(
    public fotoceoService: FotoceoService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.fotoceoService.getFotoceos().subscribe((resp:any)=>{
      this.fotoceos = resp.fotoceos.data;
    })

  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.fotoceoService.deleteFotoceo(+id).subscribe(
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
