import { Component, OnInit } from '@angular/core';
import { BannhorizontalService } from '../../../services/ban-horizontal.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-banhorizontal',
  templateUrl: './forms-banhorizontal.component.html',
  styleUrls: ['./forms-banhorizontal.component.css']
})
export class FormsBanhorizontalComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  horizontalForm: UntypedFormGroup;

  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private bannhorizontalService: BannhorizontalService,
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
      this.pageTitle = 'Edit Banner Vertical';
      this.bannhorizontalService.getBanhorizontal(+id).subscribe(
        (res:any) => {
          this.horizontalForm.patchValue({
            enlace: res.banhorizontal.enlace,
            target: res.banhorizontal.target,
            titulo: res.banhorizontal.titulo,
            is_active: res.banhorizontal.is_active,
            id: res.banhorizontal.id
          });
          this.imagePath = res.banhorizontal.image;
        }
      );
    } else {
      this.pageTitle = 'Create Banner Vertical';
    }

    this.horizontalForm = this.fb.group({
      id: [''],
      enlace: ['', Validators.required],
      target: ['', Validators.required],
      titulo: [''],
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

  get enlace() { return this.horizontalForm.get('enlace'); }
  get target() { return this.horizontalForm.get('target'); }
  get titulo() { return this.horizontalForm.get('titulo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('enlace', this.horizontalForm.get('enlace').value);
    formData.append('target', this.horizontalForm.get('target').value);
    formData.append('titulo', this.horizontalForm.get('titulo').value);
    formData.append('is_active', this.horizontalForm.get('is_active').value);
    formData.append('user_id', this.user_id);

    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.horizontalForm.get('id').value;

    if (id) {
      this.bannhorizontalService.updateBanhorizontal(formData, +id).subscribe(
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
            this.router.navigate(['/dashboard/banner-horizontal']);
          }
        },
        error => this.error = error
      );
    } else {
      this.bannhorizontalService.createBanhorizontal(formData).subscribe(
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
            this.router.navigate(['/dashboard/banner-horizontal']);
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
