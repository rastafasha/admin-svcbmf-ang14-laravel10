import { Component, OnInit } from '@angular/core';
import { FormacionService } from '../../../services/formacion.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-formacion',
  templateUrl: './forms-formacion.component.html',
  styleUrls: ['./forms-formacion.component.css']
})
export class FormsFormacionComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  formacionForm: UntypedFormGroup;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: UntypedFormBuilder,
    private formacionService: FormacionService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editar Formación';
      this.formacionService.getFormacion(+id).subscribe(
        (res:any) => {
          this.formacionForm.patchValue({
            title: res.formacion.title,
            tipoPrograma: res.formacion.tipoPrograma,
            aval: res.formacion.aval,
            tiempoFormacion: res.formacion.tiempoFormacion,
            frecuencia: res.formacion.frecuencia,
            director: res.formacion.director,
            is_featured: res.formacion.is_featured,
            is_active: res.formacion.is_active,
            id: res.formacion.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Formacion';
    }

    this.formacionForm = this.fb.group({
      id: [''],
      title: [''],
      tipoPrograma: [''],
      aval: [''],
      tiempoFormacion: [''],
      frecuencia: [''],
      director: [''],
      is_featured: [''],
      is_active: ['1'],
    });
  }


  get title() { return this.formacionForm.get('title'); }
  get tipoPrograma() { return this.formacionForm.get('tipoPrograma'); }
  get aval() { return this.formacionForm.get('aval'); }
  get tiempoFormacion() { return this.formacionForm.get('tiempoFormacion'); }
  get frecuencia() { return this.formacionForm.get('frecuencia'); }
  get director() { return this.formacionForm.get('director'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.formacionForm.get('title').value);
    formData.append('tipoPrograma', this.formacionForm.get('tipoPrograma').value);
    formData.append('aval', this.formacionForm.get('aval').value);
    formData.append('tiempoFormacion', this.formacionForm.get('tiempoFormacion').value);
    formData.append('frecuencia', this.formacionForm.get('frecuencia').value);
    formData.append('director', this.formacionForm.get('director').value);
    formData.append('is_featured', this.formacionForm.get('is_featured').value);
    formData.append('is_active', this.formacionForm.get('is_active').value);

    const id = this.formacionForm.get('id').value;

    if (id) {
      this.formacionService.updateFormacion(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/formacion']);
          }
        },
        error => this.error = error
      );
    } else {
      this.formacionService.createFormacion(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/formacion']);
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
