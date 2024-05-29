import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';
import { ActualizacionesService } from 'src/app/services/actualizaciones.service';
import { Directorio } from 'src/app/models/directorio';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-form-actualizacion',
  templateUrl: './form-actualizacion.component.html',
  styleUrls: ['./form-actualizacion.component.css']
})
export class FormActualizacionComponent implements OnInit {

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
    private actualizacionService: ActualizacionesService,
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
      this.pageTitle = 'Editar Actualización';
      this.actualizacionService.getActualizacio(+id).subscribe(
        (res:any) => {
          this.directorioForm.patchValue({
            id: res.actualizacion.id,
            nombre: res.actualizacion.nombre,
            surname: res.actualizacion.surname,
            especialidad: res.actualizacion.especialidad,
            org: res.actualizacion.org,
            universidad: res.actualizacion.universidad,
            ano: res.actualizacion.ano,
            website: res.actualizacion.website,
            email: res.actualizacion.email,
            direccion: res.actualizacion.direccion,
            direccion1: res.actualizacion.direccion1,
            estado: res.actualizacion.estado,
            ciudad: res.actualizacion.ciudad,
            telefonos: res.actualizacion.telefonos,
            tel1: res.actualizacion.tel1,
            telhome: res.actualizacion.telhome,
            telmovil: res.actualizacion.telmovil,
            telprincipal: res.actualizacion.telprincipal,
            facebook: res.actualizacion.facebook,
            instagram: res.actualizacion.instagram,
            twitter: res.actualizacion.twitter,
            linkedin: res.actualizacion.linkedin,
            vcard: this.vCardInfo,
            user_id: res.actualizacion.user_id,
            status: res.actualizacion.status,
            avatar: res.actualizacion.avatar,
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
      nombre: ['', Validators.required],
      surname: ['', Validators.required],
      especialidad: ['', Validators.required],
      universidad: ['', Validators.required],
      ano: [''],
      org: ['SVCBMF'],
      website: [''],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      direccion1: [''],
      estado: [''],
      ciudad: [''],
      telefonos: [''],
      tel1: [''],
      telhome: [''],
      telmovil: [''],
      telprincipal: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      vcard: [this.vCardInfo],
      user_id: [''],
      image: [''],
      status: ['PENDING'],
    })
  }

  get nombre() { return this.directorioForm.get('nombre'); }
    get surname() { return this.directorioForm.get('surname'); }
    get especialidad() { return this.directorioForm.get('especialidad'); }
    get universidad() { return this.directorioForm.get('universidad'); }
    get org() { return this.directorioForm.get('org'); }
    get ano() { return this.directorioForm.get('ano'); }
    get website() { return this.directorioForm.get('website'); }
    get email() { return this.directorioForm.get('email'); }
    get direccion() { return this.directorioForm.get('direccion'); }
    get direccion1() { return this.directorioForm.get('direccion1'); }
    get estado() { return this.directorioForm.get('estado'); }
    get ciudad() { return this.directorioForm.get('ciudad'); }
    get telefonos() { return this.directorioForm.get('telefonos'); }
    get tel1() { return this.directorioForm.get('tel1'); }
    get telhome() { return this.directorioForm.get('telhome'); }
    get telmovil() { return this.directorioForm.get('telmovil'); }
    get telprincipal() { return this.directorioForm.get('telprincipal'); }
    get facebook() { return this.directorioForm.get('facebook'); }
    get instagram() { return this.directorioForm.get('instagram'); }
    get twitter() { return this.directorioForm.get('twitter'); }
    get linkedin() { return this.directorioForm.get('linkedin'); }
    get status() { return this.directorioForm.get('status'); }
    get user_id() { return this.directorioForm.get('user_id'); }
    get image() { return this.directorioForm.get('image'); }
    

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.directorioForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }





  guardarDirectorio() {debugger
    this.submitted = true;
    if(this.directorioForm.invalid){
      return;
        }

    const formData = new FormData();
    formData.append('nombre', this.directorioForm.get('nombre').value);
    formData.append('surname', this.directorioForm.get('surname').value);
    formData.append('especialidad', this.directorioForm.get('especialidad').value);
    formData.append('universidad', this.directorioForm.get('universidad').value);
    formData.append('org', 'SVCBMF');
    formData.append('ano', this.directorioForm.get('ano').value);
    formData.append('website', this.directorioForm.get('website').value);
    formData.append('email', this.directorioForm.get('email').value);
    formData.append('direccion', this.directorioForm.get('direccion').value);
    formData.append('direccion1', this.directorioForm.get('direccion1').value);
    formData.append('estado', this.directorioForm.get('estado').value);
    formData.append('ciudad', this.directorioForm.get('ciudad').value);
    formData.append('telefonos', this.directorioForm.get('telefonos').value);
    formData.append('tel1', this.directorioForm.get('tel1').value);
    formData.append('telhome', this.directorioForm.get('telhome').value);
    formData.append('telmovil', this.directorioForm.get('telmovil').value);
    formData.append('telprincipal', this.directorioForm.get('telprincipal').value);
    formData.append('facebook', this.directorioForm.get('facebook').value);
    formData.append('instagram', this.directorioForm.get('instagram').value);
    formData.append('twitter', this.directorioForm.get('twitter').value);
    formData.append('linkedin', this.directorioForm.get('linkedin').value);
    formData.append('status', 'PENDING');
    
    if(this.directorioForm.value.image){
      formData.append('image', this.directorioForm.get('image').value);
    }

    formData.append('user_id', this.directorioForm.get('user_id').value);
    formData.append('vcard', this.vCardInfo);

    const id = this.directorioForm.get('id').value;

    if (id) {
      const data = {
        ...this.directorioForm.value,
         vcard: this.vCardInfo,
        user_id: this.user.id
      }
      this.actualizacionService.updateActualizacione(data, +id).subscribe(
        (res:any) => {
          this.infoDirectorio = res;
          Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          this.router.navigate(['/dashboard/directorio']);
        },
        error => this.error = error
      );
    } else {
      const data = {
        ...this.directorioForm.value,
         vcard: this.vCardInfo,
        user_id: this.user.id
      }
      this.actualizacionService.createActualizacion(data).subscribe(
        res => {
          Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/dashboard/directorio']);
        },
        error => this.error = error
      );
    }

  }



  

}
