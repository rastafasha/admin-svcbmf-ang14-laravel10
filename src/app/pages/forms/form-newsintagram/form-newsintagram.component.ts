import { Component, OnInit } from '@angular/core';
import { NewsInstagramService } from '../../../services/newsInstagram.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-newsintagram',
  templateUrl: './form-newsintagram.component.html',
  styleUrls: ['./form-newsintagram.component.css']
})
export class FormNewsintagramComponent implements OnInit {



  pageTitle: string;
  error: string;
  uploadError: string;

  newsinstForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private newsInstagramService: NewsInstagramService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Plugin Instagram';
      this.newsInstagramService.getNewsIntagram(+id).subscribe(
        res => {
          this.newsinstForm.patchValue({
            code: res.code,
            isActive: res.isActive,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Plugin Instagram';
    }

    this.newsinstForm = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      isActive: ['1'],
    });
  }


  get code() { return this.newsinstForm.get('code'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('code', this.newsinstForm.get('code').value);
    formData.append('isActive', this.newsinstForm.get('isActive').value);

    const id = this.newsinstForm.get('id').value;

    if (id) {
      this.newsInstagramService.updateNewsIntagram(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/news-instagram']);
          }
        },
        error => this.error = error
      );
    } else {
      this.newsInstagramService.createNewsIntagram(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/news-instagram']);
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
