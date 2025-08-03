import { Component, OnInit } from '@angular/core';
import { AliadoService } from '../../../services/aliados.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-aliados',
  templateUrl: './forms-aliados.component.html',
  styleUrls: ['./forms-aliados.component.css']
})
export class FormsAliadosComponent implements OnInit {


  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  aliadoForm: UntypedFormGroup;

  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private aliadoService: AliadoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Aliado';
      this.aliadoService.getAliado(+id).subscribe(
        (res:any) => {
          this.aliadoForm.patchValue({
            title: res.aliado.title,
            enlace: res.aliado.enlace,
            target: res.aliado.target,
            is_active: res.aliado.is_active,
            id: res.aliado.id
          });
          this.imagePath = res.aliado.image;
        }
      );
    } else {
      this.pageTitle = 'Create Aliado';
    }

    this.aliadoForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      enlace: [''],
      target: [''],
      is_active: ['1'],
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

  get title() { return this.aliadoForm.get('title'); }
  get enlace() { return this.aliadoForm.get('enlace'); }
  get target() { return this.aliadoForm.get('target'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.aliadoForm.get('title').value);
    formData.append('enlace', this.aliadoForm.get('enlace').value);
    formData.append('target', this.aliadoForm.get('target').value);
    formData.append('is_active', this.aliadoForm.get('is_active').value);
    formData.append('user_id', this.user_id);

    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }

    const id = this.aliadoForm.get('id').value;

    if (id) {
      this.aliadoService.updateAliado(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
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
            this.router.navigate(['/dashboard/aliados']);
          }
        },
        error => this.error = error
      );
    } else {
      this.aliadoService.createAliado(formData).subscribe(
        (res:any) => {
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
            this.router.navigate(['/dashboard/aliados']);
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
