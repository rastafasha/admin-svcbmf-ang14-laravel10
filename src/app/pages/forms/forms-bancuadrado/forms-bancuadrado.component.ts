import { Component, OnInit } from '@angular/core';
import { BanncuadradoService } from '../../../services/ban-cuadrado.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-bancuadrado',
  templateUrl: './forms-bancuadrado.component.html',
  styleUrls: ['./forms-bancuadrado.component.css']
})
export class FormsBancuadradoComponent implements OnInit {

  
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  cuadradoForm: UntypedFormGroup;
  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private banncuadradoService: BanncuadradoService,
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
      this.pageTitle = 'Edit Banner Cuadrado';
      this.banncuadradoService.getBancuadrado(+id).subscribe(
        (res:any) => {
          this.cuadradoForm.patchValue({
            enlace: res.bancuadrado.enlace,
            target: res.bancuadrado.target,
            titulo: res.bancuadrado.titulo,
            is_active: res.bancuadrado.is_active,
            id: res.bancuadrado.id
          });
          this.imagePath = res.bancuadrado.image;
        }
      );
    } else {
      this.pageTitle = 'Create Banner Cuadrado';
    }

    this.cuadradoForm = this.fb.group({
      id: [''],
      enlace: ['', Validators.required],
      target: ['', Validators.required],
      titulo: [''],
      is_active: [''],
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

  get enlace() { return this.cuadradoForm.get('enlace'); }
  get target() { return this.cuadradoForm.get('target'); }
  get titulo() { return this.cuadradoForm.get('titulo'); }
  get is_active() { return this.cuadradoForm.get('is_active'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('enlace', this.cuadradoForm.get('enlace').value);
    formData.append('target', this.cuadradoForm.get('target').value);
    formData.append('titulo', this.cuadradoForm.get('titulo').value);
    formData.append('is_active', this.cuadradoForm.get('is_active').value);
    formData.append('user_id', this.user_id);

    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }

    const id = this.cuadradoForm.get('id').value;

    if (id) {
      this.banncuadradoService.updateBancuadrado(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/banner-cuadrado']);
          }
        },
        error => this.error = error
      );
    } else {
      this.banncuadradoService.createBancuadrado(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/banner-cuadrado']);
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
