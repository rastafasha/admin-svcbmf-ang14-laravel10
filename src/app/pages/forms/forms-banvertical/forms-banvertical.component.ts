import { Component, OnInit } from '@angular/core';
import { BanverticalService } from '../../../services/ban-vertical.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-banvertical',
  templateUrl: './forms-banvertical.component.html',
  styleUrls: ['./forms-banvertical.component.css']
})
export class FormsBanverticalComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  verticalForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private banverticalService: BanverticalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Banner Vertical';
      this.banverticalService.getBanvertical(+id).subscribe(
        (res:any) => {
          this.verticalForm.patchValue({
            enlace: res.banvertical.enlace,
            target: res.banvertical.target,
            titulo: res.banvertical.titulo,
            is_active: res.banvertical.is_active,
            id: res.banvertical.id
          });
          this.imagePath = res.banvertical.image;
        }
      );
    } else {
      this.pageTitle = 'Create Banner Vertical';
    }

    this.verticalForm = this.fb.group({
      id: [''],
      enlace: ['', Validators.required],
      target: ['', Validators.required],
      titulo: [''],
      is_active: ['1'],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.verticalForm.get('image').setValue(file);
    }
  }

  get enlace() { return this.verticalForm.get('enlace'); }
  get target() { return this.verticalForm.get('target'); }
  get titulo() { return this.verticalForm.get('titulo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('enlace', this.verticalForm.get('enlace').value);
    formData.append('target', this.verticalForm.get('target').value);
    formData.append('titulo', this.verticalForm.get('titulo').value);
    formData.append('is_active', this.verticalForm.get('is_active').value);
    formData.append('image', this.verticalForm.get('image').value);

    const id = this.verticalForm.get('id').value;

    if (id) {
      this.banverticalService.updateBanvertical(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/banner-vertical']);
          }
        },
        error => this.error = error
      );
    } else {
      this.banverticalService.createBanvertical(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/banner-vertical']);
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
