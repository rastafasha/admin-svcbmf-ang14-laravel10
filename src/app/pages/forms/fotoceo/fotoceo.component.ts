import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { Fotoceo } from 'src/app/models/fotoceo';
import { FotoceoService } from '../../../services/fotoceo.service';

@Component({
  selector: 'app-fotoceo',
  templateUrl: './fotoceo.component.html',
  styleUrls: ['./fotoceo.component.css']
})
export class FotoceoComponent implements OnInit {


  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  fotoceo:Fotoceo;
  fotoceo_id:any;

  fotoceoForm: UntypedFormGroup;

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
    private fotoceoService: FotoceoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los


    this.activatedRoute.params.subscribe((resp:any)=>{
      this.fotoceo_id = resp.id; 
     })

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Ceo';

      this.fotoceoService.getFotoceo(+id).subscribe(
        (res:any) => {
          this.fotoceoForm.patchValue({
            titulo: res.fotoceo.titulo,
            periodo: res.fotoceo.periodo,
            id: res.fotoceo.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Crear Ceo';
    }

    this.fotoceoForm = this.fb.group({
      id: [''],
      titulo: [''],
      periodo: [''],

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

  get titulo() { return this.fotoceoForm.get('titulo'); }
  get periodo() { return this.fotoceoForm.get('periodo'); }


  onSubmit (form) {
    const formData = new FormData();
    formData.append('titulo', this.fotoceoForm.get('titulo').value);
    formData.append('periodo', this.fotoceoForm.get('periodo').value);
    // formData.append('image', this.fotoceoForm.get('image').value);

    formData.append('user_id', this.user_id);
    
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.fotoceo_id;

    if (id) {
      this.fotoceoService.updateFotoceo(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error' && res.data ) {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            this.router.navigate(['/dashboard/fotoceo']);
          }
        },
        error => this.error = error
      );
    } else {
      this.fotoceoService.createFotoceo(formData).subscribe(
        (res:any) => {
          if (res.status === 'error' ) {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/dashboard/fotoceo']);

          }
        },
        error => this.error = error
      );
    }
    console.log(this.fotoceoForm);
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }


}
