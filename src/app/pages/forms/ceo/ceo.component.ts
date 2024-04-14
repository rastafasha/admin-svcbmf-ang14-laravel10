import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { Ceo } from 'src/app/models/ceo';
import { CeoService } from '../../../services/ceo.service';



@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.css']
})
export class CeoComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  cargo;
  ceo:Ceo;

  ceoForm: UntypedFormGroup;



  constructor(
    private fb: UntypedFormBuilder,
    private ceoService: CeoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCargosDirectiva();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Ceo';

      this.ceoService.getCeo(+id).subscribe(
        (res:any) => {
          this.ceoForm.patchValue({
            name: res.ceo.name,
            cargo_id: res.ceo.cargo_id,
            cargoceo_name: res.ceo.cargoceo_name,
            id: res.ceo.id
          });
          this.imagePath = res.image;
        }
      );
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

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ceoForm.get('image').setValue(file);
    }
  }

  get name() { return this.ceoForm.get('name'); }
  get cargo_id() { return this.ceoForm.get('cargo_id'); }
  get cargoceo_name() { return this.ceoForm.get('cargoceo_name'); }


  onSubmit (form) {
    const formData = new FormData();
    formData.append('name', this.ceoForm.get('name').value);
    formData.append('cargo_id', this.ceoForm.get('cargo_id').value);
    formData.append('cargoceo_name', this.ceoForm.get('cargoceo_name').value);
    formData.append('image', this.ceoForm.get('image').value);

    const id = this.ceoForm.get('id').value;

    if (id) {
      this.ceoService.updateCeo(formData, +id).subscribe(
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
      this.ceoService.createCeo(formData).subscribe(
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
    console.log(this.ceoForm);
  }

  getCargosDirectiva(){
    return this.ceoService.getCargos().subscribe(
      (res:any) => {
        this.cargo = res.cargos.data;
        //console.log(this.cargo);
      }
    );
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
