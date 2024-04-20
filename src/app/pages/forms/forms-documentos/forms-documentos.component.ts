import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documento.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Documento } from 'src/app/models/documentos';

@Component({
  selector: 'app-forms-documentos',
  templateUrl: './forms-documentos.component.html',
  styleUrls: ['./forms-documentos.component.css']
})
export class FormsDocumentosComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  documentos:Documento;
  filePath: string;

  user: any;
  user_id: any;
  document_id: any;

  documentoForm: UntypedFormGroup;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: UntypedFormBuilder,
    private documentoService: DocumentoService,
    private router: Router,
    public ativatedRoute: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {

    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los

    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.document_id = resp.id; 
     })

    const id = this.ativatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Documento';
      this.documentoService.getDocumento(+id).subscribe(
        (res:any) => {
          this.documentoForm.patchValue({
            titulo: res.documento.titulo,
            archivo: res.documento.archivo,
            id: res.documento.userID
          });
          this.imagePath = res.documento.archivo;
        }
      );
    } else {
      this.pageTitle = 'Create Documento';
    }

    this.documentoForm = this.fb.group({
      id: [''],
      titulo: [''],
      archivo: [''],
    });
  }

  onSelectedPdf(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentoForm.get('archivo').setValue(file);
    }
  }

  get titulo() { return this.documentoForm.get('titulo'); }
  get archivo() { return this.documentoForm.get('archivo'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('titulo', this.documentoForm.get('titulo').value);
    formData.append('imagenn', this.documentoForm.get('archivo').value);
    formData.append('user_id', this.user_id);

    const id = this.document_id;

    if (id) {
      this.documentoService.updateDocumento(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/documentos']);
          }
        },
        error => this.error = error
      );
    } else {
      this.documentoService.createDocumento(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/documentos']);
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
