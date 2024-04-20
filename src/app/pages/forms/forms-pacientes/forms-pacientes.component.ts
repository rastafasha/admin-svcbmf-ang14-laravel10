import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-forms-pacientes',
  templateUrl: './forms-pacientes.component.html',
  styleUrls: ['./forms-pacientes.component.css']
})
export class FormsPacientesComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  pacienteForm: UntypedFormGroup;
  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  public FILE_AVATAR_MOVIL:any;
  public IMAGE_PREVISUALIZA_MOVIL:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Tips Paciente';
      this.pacienteService.getPaciente(+id).subscribe(
        (res:any) => {
          this.pacienteForm.patchValue({
            title: res.paciente.title,
            description: res.paciente.description,
            is_featured: res.paciente.is_featured,
            is_active: res.paciente.is_active,
            id: res.paciente.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Tips Paciente';
    }

    this.pacienteForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
      image: [''],
    });
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  get title() { return this.pacienteForm.get('title'); }
  get description() { return this.pacienteForm.get('description'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.pacienteForm.get('title').value);
    formData.append('description', this.pacienteForm.get('description').value);
    formData.append('is_featured', this.pacienteForm.get('is_featured').value);
    formData.append('is_active', this.pacienteForm.get('is_active').value);
    // formData.append('image', this.pacienteForm.get('image').value);
    formData.append('user_id', this.user_id);
    
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.pacienteForm.get('id').value;

    if (id) {
      this.pacienteService.updatePaciente(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/pacientes']);
          }
        },
        error => this.error = error
      );
    } else {
      this.pacienteService.createPaciente(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/pacientes']);
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
