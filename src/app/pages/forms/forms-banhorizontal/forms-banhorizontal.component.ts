import { Component, OnInit } from '@angular/core';
import { BannhorizontalService } from '../../../services/ban-horizontal.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-banhorizontal',
  templateUrl: './forms-banhorizontal.component.html',
  styleUrls: ['./forms-banhorizontal.component.css']
})
export class FormsBanhorizontalComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  horizontalForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private bannhorizontalService: BannhorizontalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Banner Vertical';
      this.bannhorizontalService.getBanhorizontal(+id).subscribe(
        (res:any) => {
          this.horizontalForm.patchValue({
            enlace: res.banhorizontal.enlace,
            target: res.banhorizontal.target,
            titulo: res.banhorizontal.titulo,
            is_active: res.banhorizontal.is_active,
            id: res.banhorizontal.id
          });
          this.imagePath = res.banhorizontal.image;
        }
      );
    } else {
      this.pageTitle = 'Create Banner Vertical';
    }

    this.horizontalForm = this.fb.group({
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
      this.horizontalForm.get('image').setValue(file);
    }
  }

  get enlace() { return this.horizontalForm.get('enlace'); }
  get target() { return this.horizontalForm.get('target'); }
  get titulo() { return this.horizontalForm.get('titulo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('enlace', this.horizontalForm.get('enlace').value);
    formData.append('target', this.horizontalForm.get('target').value);
    formData.append('titulo', this.horizontalForm.get('titulo').value);
    formData.append('is_active', this.horizontalForm.get('is_active').value);
    formData.append('image', this.horizontalForm.get('image').value);

    const id = this.horizontalForm.get('id').value;

    if (id) {
      this.bannhorizontalService.updateBanhorizontal(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/banner-horizontal']);
          }
        },
        error => this.error = error
      );
    } else {
      this.bannhorizontalService.createBanhorizontal(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/banner-horizontal']);
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
