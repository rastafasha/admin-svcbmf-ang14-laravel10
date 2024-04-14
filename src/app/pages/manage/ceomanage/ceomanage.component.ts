import { Component, OnInit } from '@angular/core';
import { CeoService } from '../../../services/ceo.service';
import { Ceo } from '../../../models/ceo';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-ceomanage',
  templateUrl: './ceomanage.component.html',
  styleUrls: ['./ceomanage.component.css']
})
export class CeomanageComponent implements OnInit {


  title = 'Junta Directiva Nacional';
  ceos: Ceo;
  error: string;
  public cargo;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 10;

  constructor(
    public ceoService: CeoService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.ceoService.getCeos().subscribe((resp:any)=>{
      this.ceos= resp.ceos.data;
    })

    this.getCargosDirectiva();
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.ceoService.deleteCeo(+id).subscribe(
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

  getCargosDirectiva(){
    return this.ceoService.getCargos().subscribe(
      resp => {
        this.cargo = resp;
      }
    );
  }

}
