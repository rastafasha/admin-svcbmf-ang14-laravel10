import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from 'src/app/services/configuracion.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  configForm: UntypedFormGroup;
  title= 'Configuración';


  constructor(
    private fb: UntypedFormBuilder,
    private configuracionService: ConfiguracionService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Configuración';
      this.configuracionService.getSetting(+id).subscribe(
        (res:any) => {
          this.configForm.patchValue({
            direccion: res.setting.direccion,
            telefono: res.setting.telefono,
            telefonoActivo: res.setting.telefonoActivo,
            telPresidencia: res.setting.telPresidencia,
            telPresActivo: res.setting.telPresActivo,
            telSecretaria: res.setting.telSecretaria,
            telSecActivo: res.setting.telSecActivo,
            telTesoreria: res.setting.telTesoreria,
            telTesActivo: res.setting.telTesActivo,
            id: res.setting.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
    }

    this.configForm = this.fb.group({
      id: [''],
      direccion: [''],
      telefono: [''],
      telefonoActivo: [''],
      telPresidencia: [''],
      telPresActivo: [''],
      telSecretaria: [''],
      telSecActivo: [''],
      telTesoreria: [''],
      telTesActivo: [''],
    });

  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.configForm.get('image').setValue(file);
    }
  }

  get direccion() { return this.configForm.get('direccion'); }
  get telefono() { return this.configForm.get('telefono'); }
  get telefonoActivo() { return this.configForm.get('telefonoActivo'); }
  get telPresidencia() { return this.configForm.get('telPresidencia'); }
  get telPresActivo() { return this.configForm.get('telPresActivo'); }
  get telSecretaria() { return this.configForm.get('telSecretaria'); }
  get telSecActivo() { return this.configForm.get('telSecActivo'); }
  get telTesoreria() { return this.configForm.get('telTesoreria'); }
  get telTesActivo() { return this.configForm.get('telTesActivo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('direccion', this.configForm.get('direccion').value);
    formData.append('telefono', this.configForm.get('telefono').value);
    formData.append('telefonoActivo', this.configForm.get('telefonoActivo').value);
    formData.append('telPresidencia', this.configForm.get('telPresidencia').value);
    formData.append('telPresActivo', this.configForm.get('telPresActivo').value);
    formData.append('telSecretaria', this.configForm.get('telSecretaria').value);
    formData.append('telSecActivo', this.configForm.get('telSecActivo').value);
    formData.append('telTesoreria', this.configForm.get('telTesoreria').value);
    formData.append('telTesActivo', this.configForm.get('telTesActivo').value);

    const id = this.configForm.get('id').value;

    if (id) {
      this.configuracionService.updateSetting(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/settings']);
          }
        },
        error => this.error = error
      );
    } else {
      this.configuracionService.createSetting(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/settings']);
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
