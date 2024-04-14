import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { QRCodeModule } from 'angular2-qrcode';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpClientModule } from '@angular/common/http';
//Qr
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import {PipesModule} from '../pipes/pipes.module';
import {ModalComponent} from './modal/modal.component';
import { DirectorioComponent } from './directorio/directorio.component';


@NgModule({
  declarations: [
    UsuariosRecientesComponent,
    ModalComponent,
    DirectorioComponent,
    
  ],
  exports: [
    UsuariosRecientesComponent,
    ModalComponent,
    DirectorioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    QRCodeModule,
    NgxPayPalModule,
    NgxPaginationModule
    // CKEditorModule
  ]
})
export class ComponentsModule { }
