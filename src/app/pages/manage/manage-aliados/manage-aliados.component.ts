import { Component, OnInit } from '@angular/core';
import { AliadoService } from '../../../services/aliados.service';
import { Aliado } from '../../../models/aliados';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-aliados',
  templateUrl: './manage-aliados.component.html',
  styleUrls: ['./manage-aliados.component.css']
})
export class ManageAliadosComponent implements OnInit {

  title = 'Manage Aliados';
  aliados: Aliado;
  error: string;
  isAgregar:boolean= true
isEditar:boolean= false

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    public aliadoService: AliadoService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.aliadoService.getAliados().subscribe((resp:any)=>{
      this.aliados = resp.aliados.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.aliadoService.deleteAliado(+id).subscribe((resp:any)=>{
        this.aliados = resp.aliados.data;
      })
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
