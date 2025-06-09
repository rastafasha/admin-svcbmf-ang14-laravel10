import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import {ScrollingModule} from '@angular/cdk/scrolling';

//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { DirectoryModule } from './directorio/directory.module';
//Qr
import { QRCodeModule } from 'angular2-qrcode';
import { CKEditorModule } from 'ckeditor4-angular';
import { InstallPwaComponent } from './install-pwa/install-pwa.component';
import { FormulariosModule } from './forms/formularios.module';
import { ManageModule } from './manage/manage.module';
import { VistasModule } from './vistas/vistas.module';
import { UserModule } from './user/user.module';
import { CategoriaModule } from './categoria/categoria.module';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    HelpComponent,
    ContactComponent,
    PagesComponent,
    InstallPwaComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    HelpComponent,
    ContactComponent,
    PagesComponent,
    InstallPwaComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AngularFileUploaderModule,
    DirectoryModule,
    QRCodeModule,
    ScrollingModule,
    CKEditorModule,
    FormulariosModule,
    ManageModule,
    VistasModule,
    UserModule,
    CategoriaModule

  ],
  providers: [
  ],
})
export class PagesModule { }
