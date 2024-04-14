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

  fotoceoForm: UntypedFormGroup;



  constructor(
    private fb: UntypedFormBuilder,
    private fotoceoService: FotoceoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

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

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotoceoForm.get('image').setValue(file);
    }
  }

  get titulo() { return this.fotoceoForm.get('titulo'); }
  get periodo() { return this.fotoceoForm.get('periodo'); }


  onSubmit (form) {
    const formData = new FormData();
    formData.append('titulo', this.fotoceoForm.get('titulo').value);
    formData.append('periodo', this.fotoceoForm.get('periodo').value);
    formData.append('image', this.fotoceoForm.get('image').value);

    const id = this.fotoceoForm.get('id').value;

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
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se Actualizó correctamente',
              text: ''
            });
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
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente',
              text: ''
            });

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
