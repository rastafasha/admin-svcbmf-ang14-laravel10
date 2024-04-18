import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../../services/galeria.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-galeria',
  templateUrl: './forms-galeria.component.html',
  styleUrls: ['./forms-galeria.component.css']
})
export class FormsGaleriaComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  imagePath1: string;

  galeriaForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private galeriaService: GaleriaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Image';
      this.galeriaService.getGaleria(+id).subscribe(
        (res:any)  => {
          this.galeriaForm.patchValue({
            id: res.galeria.id,
            titulo: res.galeria.titulo
          });
          this.imagePath = res.galeria.image;
        }
      );
    } else {
      this.pageTitle = 'Agregar a Galeria';
    }

    this.galeriaForm = this.fb.group({
      id: [''],
      titulo: [''],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.galeriaForm.get('image').setValue(file);
    }
  }

  get titulo() { return this.galeriaForm.get('titulo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('titulo', this.galeriaForm.get('titulo').value);
    formData.append('image', this.galeriaForm.get('image').value);

    const id = this.galeriaForm.get('id').value;

    if (id) {
      this.galeriaService.updateGaleria(formData, +id).subscribe(
        (res:any)  => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/galeria']);
          }
        },
        error => this.error = error
      );
    } else {
      this.galeriaService.createGaleria(formData).subscribe(
        (res:any)  => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/galeria']);
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
