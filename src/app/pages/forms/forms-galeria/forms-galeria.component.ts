import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../../services/galeria.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-galeria',
  templateUrl: './forms-galeria.component.html',
  styleUrls: ['./forms-galeria.component.css']
})
export class FormsGaleriaComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  imagePath1: string;

  galeriaForm: UntypedFormGroup;
  galeria_id:any;
  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  public FILE_AVATAR_MOVIL:any;
  public IMAGE_PREVISUALIZA_MOVIL:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private galeriaService: GaleriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los


    this.activatedRoute.params.subscribe((resp:any)=>{
      this.galeria_id = resp.id; 
     })
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Image';
      this.galeriaService.getGaleria(+id).subscribe(
        (res:any)  => {
          this.galeriaForm.patchValue({
            id: res.galeria.id,
            titulo: res.galeria.titulo
          });
          this.imagePath = res.galeria.image;
        }
      );
    } else {
      this.pageTitle = 'Agregar a Galeria';
    }

    this.galeriaForm = this.fb.group({
      id: [''],
      titulo: [''],
      image: [''],
    });
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  get titulo() { return this.galeriaForm.get('titulo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('titulo', this.galeriaForm.get('titulo').value);
    // formData.append('image', this.galeriaForm.get('image').value);

    formData.append('user_id', this.user_id);
    
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.galeria_id;

    if (id) {
      this.galeriaService.updateGaleria(formData, +id).subscribe(
        (res:any)  => {
          if (res.status === 'error') {
            // this.uploadError = res.message;
            Swal.fire({
                          position: 'top-end',
                          icon: 'warning',
                          title: res.message,
                          showConfirmButton: false,
                          timer: 1500,
                        });
          } else {
            Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: res.message,
                          showConfirmButton: false,
                          timer: 1500,
                        });
            this.router.navigate(['/dashboard/galeria']);
          }
        },
        error => this.error = error
      );
    } else {
      this.galeriaService.createGaleria(formData).subscribe(
        (res:any)  => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/galeria']);
          }
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
