import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesViewComponent } from './roles/roles-view/roles-view.component';


// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    RolesViewComponent,
    ConfiguracionComponent

  ],
  exports: [
    ConfiguracionesComponent,
    RolesViewComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PipesModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AngularFileUploaderModule,
    CKEditorModule
  ]
})
export class ConfModule { }
