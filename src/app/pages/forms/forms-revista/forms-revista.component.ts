import { Component, OnInit } from '@angular/core';
import { RevistaService } from '../../../services/revista.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-revista',
  templateUrl: './forms-revista.component.html',
  styleUrls: ['./forms-revista.component.css']
})
export class FormsRevistaComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  filePath: string;

  revistaForm: UntypedFormGroup;

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
    private revistaService: RevistaService,
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
      this.pageTitle = 'Edit Revista';
      this.revistaService.getRevista(+id).subscribe(
        (res:any) => {
          this.revistaForm.patchValue({
            volumen: res.revista.volumen,
            numero: res.revista.numero,
            fecha: res.revista.fecha,
            id: res.revista.id
          });
          this.imagePath = res.revista.image;
          this.filePath = res.revista.archivo;
        }
      );
    } else {
      this.pageTitle = 'Create Revista';
    }

    this.revistaForm = this.fb.group({
      id: [''],
      archivo: [''],
      volumen: [''],
      numero: [''],
      fecha: [''],
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

  onSelectedPdf(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.revistaForm.get('archivo').setValue(file);
    }
  }

  // loadFileMovil($event:any){
  //   if($event.target.files[0].type.indexOf("image")){
  //     this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
  //     return;
  //   }
  //   this.text_validation = '';
  //   this.FILE_AVATAR_MOVIL = $event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(this.FILE_AVATAR_MOVIL);
  //   reader.onloadend = ()=> this.IMAGE_PREVISUALIZA_MOVIL = reader.result;
  // }

  get volumen() { return this.revistaForm.get('volumen'); }
  get numero() { return this.revistaForm.get('numero'); }
  get fecha() { return this.revistaForm.get('fecha'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('volumen', this.revistaForm.get('volumen').value);
    formData.append('numero', this.revistaForm.get('numero').value);
    formData.append('fecha', this.revistaForm.get('fecha').value);
    formData.append('imagenn', this.revistaForm.get('archivo').value);
    // formData.append('image', this.revistaForm.get('image').value);


    // formData.append('user_id', this.user_id);

    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }


    const id = this.revistaForm.get('id').value;

    if (id) {
      this.revistaService.updateRevista(formData, +id).subscribe(
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
            this.router.navigate(['/dashboard/revista']);
          }
        },
        error => this.error = error
      );
    } else {
      this.revistaService.createRevista(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/revista']);
          }
        },
        error => this.error = error
      );
    }
    //portada
    
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
