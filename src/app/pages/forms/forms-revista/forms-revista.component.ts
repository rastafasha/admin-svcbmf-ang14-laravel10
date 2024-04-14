import { Component, OnInit } from '@angular/core';
import { RevistaService } from '../../../services/revista.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
    private fb: UntypedFormBuilder,
    private revistaService: RevistaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

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

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.revistaForm.get('image').setValue(file);
    }
  }

  onSelectedPdf(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.revistaForm.get('archivo').setValue(file);
    }
  }

  get volumen() { return this.revistaForm.get('volumen'); }
  get numero() { return this.revistaForm.get('numero'); }
  get fecha() { return this.revistaForm.get('fecha'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('volumen', this.revistaForm.get('volumen').value);
    formData.append('numero', this.revistaForm.get('numero').value);
    formData.append('fecha', this.revistaForm.get('fecha').value);
    formData.append('archivo', this.revistaForm.get('archivo').value);
    formData.append('image', this.revistaForm.get('image').value);

    const id = this.revistaForm.get('id').value;

    if (id) {
      this.revistaService.updateRevista(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/revista']);
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
            this.router.navigate(['/revista']);
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
