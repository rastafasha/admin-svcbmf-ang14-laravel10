import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { DirectorioService } from 'src/app/services/directorio.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  directorioForm: FormGroup;
  directory: Directorio;
  infoDirectorio: Directorio;

  public user: User;
  userprofile!: User;
  id:any;
  error:string;
  pageTitle:string;

  //Qr
  vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href : string;
  vcard: string;

  uploadError: string;

  submitted = false;

  public storage = environment.apiUrlMedia


  constructor(
    private directorioService: DirectorioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private accountService: AccountService,
    private fb: FormBuilder,

  ) {
this.user = this.userService.user;
  }



  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.getUser();
    this.validarFormulario();

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.id = this.user.id;
  }

  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Directorio';
      this.accountService.getUsuario(+id).subscribe(
        (res:any) => {
          this.directorioForm.patchValue({
            id: res.user.id,
            name: res.user.name,
            surname: res.directory.surname,
            n_doc: res.directory.n_doc,
            role: res.user.role,
            email: res.user.email,
          });
          // this.imagePath = res.image;
          this.infoDirectorio = res;
          // console.log(this.infoDirectorio);
        }
      );
    } else {
      this.pageTitle = 'Crear Directorio';
    }
  }

  validarFormulario(){
    this.directorioForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      n_doc: ['', Validators.required],
      email: ['', Validators.required],
      
      status: ['PENDING'],
    })
  }

  get name() { return this.directorioForm.get('name'); }
    get surname() { return this.directorioForm.get('surname'); }
    get password() { return this.directorioForm.get('password'); }
    get email() { return this.directorioForm.get('email'); }
    get role() { return this.directorioForm.get('role'); }
    get n_doc() { return this.directorioForm.get('n_doc'); }
    get status() { return this.directorioForm.get('status'); }
    

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.directorioForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }





  guardarDirectorio() {
    this.submitted = true;
    if(this.directorioForm.invalid){
      return;
        }

    const formData = new FormData();
    formData.append('name', this.directorioForm.get('name').value);
    formData.append('surname', this.directorioForm.get('surname').value);
    formData.append('password', this.directorioForm.get('password').value);
    formData.append('role', this.directorioForm.get('role').value);
    formData.append('email', this.directorioForm.get('email').value);
    formData.append('n_doc', this.directorioForm.get('n_doc').value);
    formData.append('status', 'PENDING');
    

    const id = this.directorioForm.get('id').value;

    if (id) {
      const data = {
        ...this.directorioForm.value,
        user_id: this.user.id
      }
      this.userService.update(data).subscribe(
        (res:any) => {
          this.infoDirectorio = res;
          Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          this.router.navigate(['/dashboard/users']);
        },
        error => this.error = error
      );
    } else {
      const data = {
        ...this.directorioForm.value,
        user_id: this.user.id
      }
      this.accountService.crearUsuario(data).subscribe(
        (res:any) => {
          Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/dashboard/users']);
        },
        error => this.error = error
      );
    }


  }




}
