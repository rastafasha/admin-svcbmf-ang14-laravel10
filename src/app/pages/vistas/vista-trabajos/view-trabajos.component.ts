import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Trabajo } from '../../../models/trabajos';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-congreso',
  templateUrl: './view-trabajos.component.html',
  styleUrls: ['./view-trabajos.component.css']
})
export class ViewTrabajosComponent implements OnInit {

  title = 'View Trabajos';
  trabajos: Trabajo;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  trabajos$: Observable<Trabajo>;

  constructor(
    public trabajoService: TrabajosService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.trabajos$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.trabajoService.getTrabajo(+params.get('id'))
      )
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
