import { Component, OnInit } from '@angular/core';
import { BanncuadradoService } from '../../../services/ban-cuadrado.service';
import { Bancuadrado } from '../../../models/ban-cuadrado';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-banncuadrado',
  templateUrl: './manage-banncuadrado.component.html',
  styleUrls: ['./manage-banncuadrado.component.css']
})
export class ManageBanncuadradoComponent implements OnInit {

  title = 'Manage Banner Cuadrado';
  bancuadrados: Bancuadrado;
  error: string;
  isAgregar:boolean=true;
isEditar:boolean=false

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 10;

  constructor(
    public banncuadradoService: BanncuadradoService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.banncuadradoService.getBancuadrados().subscribe((resp:any)=>{
      this.bancuadrados = resp.bancuadrados.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.banncuadradoService.deleteBancuadrado(+id).subscribe(
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
