import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-usuarios',
  templateUrl: './manage-usuarios.component.html',
  styleUrls: ['./manage-usuarios.component.css']
})
export class ManageUsuariosComponent implements OnInit {

  
  title = 'Usuarios Registrados';
  users: User;
  error: string;
  isAgregar:boolean= true;
isEditar:boolean= false;
  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    public userService: UserService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.userService.getAll().subscribe(
      (data: User) => this.users = data,
      error => this.error = error
    );
  }

  onDelete(id: any) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.userService.deleteById(id).subscribe(
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
