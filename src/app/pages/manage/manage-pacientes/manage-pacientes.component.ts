import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-pacientes',
  templateUrl: './manage-pacientes.component.html',
  styleUrls: ['./manage-pacientes.component.css']
})
export class ManagePacientesComponent implements OnInit {

  title = 'Manage Tips Pacientes';
  pacientes: Paciente;
  error: string;
  isAgregar:boolean= true;
isEditar:boolean= false;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    public pacienteService: PacienteService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.pacienteService.getPacientes().subscribe((resp:any)=>{
      this.pacientes = resp.pacientes.data
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.pacienteService.deletePaciente(+id).subscribe(
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
