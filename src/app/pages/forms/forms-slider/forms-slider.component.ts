import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../../services/slider.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forms-slider',
  templateUrl: './forms-slider.component.html',
  styleUrls: ['./forms-slider.component.css']
})
export class FormsSliderComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  imagePath2: string;

  sliderForm: UntypedFormGroup;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: UntypedFormBuilder,
    private sliderService: SliderService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Slider';
      this.sliderService.getSlider(+id).subscribe(
        (res:any) => {
          this.sliderForm.patchValue({
            title: res.slider.title,
            description: res.slider.description,
            is_activeText: res.slider.is_activeText,
            is_activeBot: res.slider.is_activeBot,
            is_active: res.slider.is_active,
            boton: res.slider.boton,
            enlace: res.slider.enlace,
            target: res.slider.target,
            id: res.slider.id
          });
          this.imagePath = res.slider.image;
          this.imagePath2 = res.slider.imagemovil;
        }
      );
    } else {
      this.pageTitle = 'Create Slider';
    }

    this.sliderForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      is_activeText: ['displayBlok'],
      is_activeBot: ['displayBlok'],
      is_active: ['1'],
      boton: [''],
      enlace: [''],
      target: [''],
      image: [''],
      imagemovil: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sliderForm.get('image').setValue(file);
    }
  }
  onSelectedFile2(event) {
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.sliderForm.get('imagemovil').setValue(file2);
    }
  }

  get title() { return this.sliderForm.get('title'); }
  get description() { return this.sliderForm.get('description'); }
  get boton() { return this.sliderForm.get('boton'); }
  get enlace() { return this.sliderForm.get('enlace'); }
  get target() { return this.sliderForm.get('target'); }
  get is_activeText() { return this.sliderForm.get('is_activeText'); }
  get is_activeBot() { return this.sliderForm.get('is_activeBot'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.sliderForm.get('title').value);
    formData.append('description', this.sliderForm.get('description').value);
    formData.append('boton', this.sliderForm.get('boton').value);
    formData.append('enlace', this.sliderForm.get('enlace').value);
    formData.append('target', this.sliderForm.get('target').value);
    formData.append('is_activeText', this.sliderForm.get('is_activeText').value);
    formData.append('is_activeBot', this.sliderForm.get('is_activeBot').value);
    formData.append('is_active', this.sliderForm.get('is_active').value);
    formData.append('image', this.sliderForm.get('image').value);
    formData.append('imagemovil', this.sliderForm.get('imagemovil').value);

    const id = this.sliderForm.get('id').value;

    if (id) {
      this.sliderService.updateSlider(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/slider']);
          }
        },
        error => this.error = error
      );
    } else {
      this.sliderService.createSlider(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/slider']);
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
