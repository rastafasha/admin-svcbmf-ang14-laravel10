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

  constructor(
    private fb: UntypedFormBuilder,
    private banncuadradoService: BanncuadradoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

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

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cuadradoForm.get('image').setValue(file);
    }
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
    formData.append('image', this.cuadradoForm.get('image').value);

    const id = this.cuadradoForm.get('id').value;

    if (id) {
      this.banncuadradoService.updateBancuadrado(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/banner-cuadrado']);
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
            this.router.navigate(['/banner-cuadrado']);
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
