import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { Ceo } from 'src/app/models/ceo';
import { CeoService } from '../../../services/ceo.service';

@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.css'],
})
export class CeoComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  cargo;
  ceo: Ceo;

  ceoForm: UntypedFormGroup;

  ceo_id: any;
  user: any;
  user_id: any;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any;
  public FILE_AVATAR_MOVIL: any;
  public IMAGE_PREVISUALIZA_MOVIL: any;
  valid_form: boolean = false;
  valid_form_success: boolean = false;
  text_validation: any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private ceoService: CeoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem('user'); // se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER : ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los

    this.activatedRoute.params.subscribe((resp: any) => {
      this.ceo_id = resp.id;
    });
    this.getCargosDirectiva();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Ceo';

      this.ceoService.getCeo(+id).subscribe((res: any) => {
        this.ceoForm.patchValue({
          name: res.ceo.name,
          cargo_id: res.ceo.cargo_id,
          cargoceo_name: res.ceo.cargoceo_name,
          id: res.ceo.id,
        });
        this.imagePath = res.image;
      });
    } else {
      this.pageTitle = 'Crear Ceo';
    }

    this.ceoForm = this.fb.group({
      id: [''],
      name: [''],
      cargo_id: [''],
      cargoceo_name: [''],
      image: [''],
    });
  }

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image')) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

  get name() {
    return this.ceoForm.get('name');
  }
  get cargo_id() {
    return this.ceoForm.get('cargo_id');
  }
  get cargoceo_name() {
    return this.ceoForm.get('cargoceo_name');
  }

  onSubmit(form) {
    const formData = new FormData();
    formData.append('name', this.ceoForm.get('name').value);
    formData.append('cargo_id', this.ceoForm.get('cargo_id').value);
    formData.append('cargoceo_name', this.ceoForm.get('cargoceo_name').value);
    // formData.append('image', this.ceoForm.get('image').value);
    formData.append('user_id', this.user_id);

    if (this.FILE_AVATAR) {
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.ceo_id;

    if (id) {
      this.ceoService.updateCeo(formData, +id).subscribe(
        (res: any) => {
          if (res.status === 'error' && res.data) {
            //this.uploadError = res.message;
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: res.message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Los cambios fueron actualizados',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/dashboard/ceo']);
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.ceoService.createCeo(formData).subscribe(
        (res: any) => {
          if (res.status === 'error') {
            //this.uploadError = res.message;
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
              title: 'Los cambios fueron actualizados',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/dashboard/ceo']);
          }
        },
        (error) => (this.error = error)
      );
    }
    console.log(this.ceoForm);
  }

  getCargosDirectiva() {
    return this.ceoService.getCargos().subscribe((res: any) => {
      this.cargo = res.cargos.data;
      //console.log(this.cargo);
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }
}
