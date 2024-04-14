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

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    RolesViewComponent,

  ],
  exports: [
    ConfiguracionesComponent,
    RolesViewComponent,
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
    AngularFileUploaderModule
  ]
})
export class ConfModule { }
