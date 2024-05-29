import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { ActualizacionesService } from 'src/app/services/actualizaciones.service';
import { DirectorioService } from 'src/app/services/directorio.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actualizaciones',
  templateUrl: './actualizaciones.component.html',
  styleUrls: ['./actualizaciones.component.css']
})
export class ActualizacionesComponent implements OnInit {

  title = "Actualizaciones de Directorio"

  loading = false;
  usersCount = 0;
  usuarios: User[]=[];
  user: User;
  directory: Directorio;
  
  p: number = 1;
  count: number = 8;
  
  error: string;
  msm_error: string;
  actualizacions: any;
  query:string ='';


  ServerUrl = environment.apiUrl;

  constructor(
    private actualizacionesService: ActualizacionesService,
    private location: Location,
    private http: HttpClient,
    private userService: UserService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    this.userService.closeMenu();
    this.getDirectorios();
    window.scrollTo(0,0);
  }

  getDirectorios(): void {
    this.actualizacionesService.getActualizacione().subscribe(
      (res:any) =>{
        this.actualizacions = res.actualizacions;
        error => this.error = error;
        console.log(this.actualizacions);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  eliminarDirectory(id:number){
    this.actualizacionesService.deleteActualizacione(+id).subscribe(
      res=>{
        Swal.fire('Eliminado', 'directorio eliminado', 'success');
        this.getDirectorios();
      }
    )
  }

  // cambiarStatus(directory: Directorio){
  //   this.directorioService.updateDirectorio(directory).subscribe(
  //     resp =>{ 
  //       // console.log(resp);
  //       Swal.fire('Actualizado', `actualizado correctamente`, 'success');
  //       this.getDirectorios();
  //     }
  //   )
  // }

  public PageSize(): void {
    this.getDirectorios();
    this.query = '';
  }


  search() {
    return this.actualizacionesService.search(this.query).subscribe(
      (res:any)=>{
        this.actualizacions = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

}
