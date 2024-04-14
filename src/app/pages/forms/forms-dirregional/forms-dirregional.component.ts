import { Component, OnInit } from '@angular/core';
import { DirregionalService } from '../../../services/dirregional.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-forms-dirregional',
  templateUrl: './forms-dirregional.component.html',
  styleUrls: ['./forms-dirregional.component.css']
})
export class FormsDirregionalComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  dirregionalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dirregionalService: DirregionalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Directiva Regional';
      this.dirregionalService.getDirRegional(+id).subscribe(
        (resp:any) => {
          this.dirregionalForm.patchValue({
            title: resp.dirregional.title,
            presidente: resp.dirregional.presidente,
            secretario: resp.dirregional.secretario,
            tesorero: resp.dirregional.tesorero,
            vocal: resp.dirregional.vocal,
            primerSuplente: resp.dirregional.primerSuplente,
            id: resp.dirregional.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Directiva Regional';
    }

    this.dirregionalForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      presidente: ['', Validators.required],
      secretario: [''],
      tesorero: [''],
      vocal: [''],
      primerSuplente: [''],
    });
  }

  get title() { return this.dirregionalForm.get('title'); }
  get presidente() { return this.dirregionalForm.get('presidente'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.dirregionalForm.get('title').value);
    formData.append('presidente', this.dirregionalForm.get('presidente').value);
    formData.append('secretario', this.dirregionalForm.get('secretario').value);
    formData.append('tesorero', this.dirregionalForm.get('tesorero').value);
    formData.append('vocal', this.dirregionalForm.get('vocal').value);
    formData.append('primerSuplente', this.dirregionalForm.get('primerSuplente').value);

    const id = this.dirregionalForm.get('id').value;

    if (id) {
      this.dirregionalService.updateDirRegional(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dirregional']);
          }
        },
        error => this.error = error
      );
    } else {
      this.dirregionalService.createDirRegional(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dirregional']);
          }
        },
        error => this.error = error
      );
    }
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
