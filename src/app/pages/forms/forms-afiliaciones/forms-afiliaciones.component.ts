import { Component, OnInit } from '@angular/core';
import { AfiliacionesService } from '../../../services/afiliaciones.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Afiliaciones } from 'src/app/models/afiliaciones';

@Component({
  selector: 'app-forms-afiliaciones',
  templateUrl: './forms-afiliaciones.component.html',
  styleUrls: ['./forms-afiliaciones.component.css']
})
export class FormsAfiliacionesComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  afiliaciones:Afiliaciones

  afiliacionesForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private afiliacionesService: AfiliacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Afiliacion';
      this.afiliacionesService.getAfiliacione(+id).subscribe(
        (res:any) => {
          this.afiliacionesForm.patchValue({
            nombres: res.afiliaciones.nombres,
            apellidos: res.afiliaciones.apellidos,
            titulo: res.afiliaciones.titulo,
            universidad: res.afiliaciones.universidad,
            graduacion: res.afiliaciones.graduacion,
            ciudad: res.afiliaciones.ciudad,
            estado: res.afiliaciones.estado,
            telefono: res.afiliaciones.telefonos,
            email: res.afiliaciones.email,
            archivo: res.afiliaciones.archivo,
            id: res.afiliaciones.id
          });
          this.imagePath = res.archivo;
        }
      );
    } else {
      this.pageTitle = 'Create Afiliacion';
    }

    this.afiliacionesForm = this.fb.group({
      id: [''],
      nombres: [''],
      apellidos: [''],
      titulo: [''],
      universidad: [''],
      graduacion: [''],
      ciudad: [''],
      estado: [''],
      telefonos: [''],
      email: [''],
      archivo: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.afiliacionesForm.get('archivo').setValue(file);
    }
  }

  get nombres() { return this.afiliacionesForm.get('nombres'); }
  get apellidos() { return this.afiliacionesForm.get('apellidos'); }
  get titulo() { return this.afiliacionesForm.get('titulo'); }
  get universidad() { return this.afiliacionesForm.get('universidad'); }
  get graduacion() { return this.afiliacionesForm.get('graduacion'); }
  get ciudad() { return this.afiliacionesForm.get('ciudad'); }
  get estado() { return this.afiliacionesForm.get('estado'); }
  get telefonos() { return this.afiliacionesForm.get('telefonos'); }
  get archivo() { return this.afiliacionesForm.get('archivo'); }
  get email() { return this.afiliacionesForm.get('email'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('nombres', this.afiliacionesForm.get('nombres').value);
    formData.append('apellidos', this.afiliacionesForm.get('apellidos').value);
    formData.append('titulo', this.afiliacionesForm.get('titulo').value);
    formData.append('universidad', this.afiliacionesForm.get('universidad').value);
    formData.append('graduacion', this.afiliacionesForm.get('graduacion').value);
    formData.append('ciudad', this.afiliacionesForm.get('ciudad').value);
    formData.append('estado', this.afiliacionesForm.get('estado').value);
    formData.append('telefonos', this.afiliacionesForm.get('telefonos').value);
    formData.append('email', this.afiliacionesForm.get('email').value);
    formData.append('archivo', this.afiliacionesForm.get('archivo').value);

    const id = this.afiliacionesForm.get('id').value;

    if (id) {
      this.afiliacionesService.updateAfiliacione(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/afiliaciones']);
          }
        },
        error => this.error = error
      );
    } else {
      this.afiliacionesService.createAfiliacione(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/afiliaciones']);
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
