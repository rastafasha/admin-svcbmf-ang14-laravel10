import { Component, OnInit } from '@angular/core';
import { FormacionService } from '../../../services/formacion.service';
import { Formacion } from '../../../models/formacion';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-formacion',
  templateUrl: './manage-formacion.component.html',
  styleUrls: ['./manage-formacion.component.css']
})
export class ManageFormacionComponent implements OnInit {

  title = 'Manage Formacion ';
  formacions: Formacion;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    public formacionService: FormacionService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.formacionService.getFormacions().subscribe((resp:any)=>{
      this.formacions = resp.formacions.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.formacionService.deleteFormacion(+id).subscribe(
        (res:any) => {
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
