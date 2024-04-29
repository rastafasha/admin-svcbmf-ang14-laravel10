import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfiliacionesComponent } from './afiliaciones/afiliaciones.component';
import { CeomanageComponent } from './ceomanage/ceomanage.component';
import { ConfiguracionMComponent } from './configuracion-m/configuracion-m.component';
import { ManageAliadosComponent } from './manage-aliados/manage-aliados.component';
import { ManageBanncuadradoComponent } from './manage-banncuadrado/manage-banncuadrado.component';
import { ManageBannhorizontalComponent } from './manage-bannhorizontal/manage-bannhorizontal.component';
import { ManageBannverticalComponent } from './manage-bannvertical/manage-bannvertical.component';
import { ManageBlogComponent } from './manage-blog/manage-blog.component';
import { ManageContactosComponent } from './manage-contactos/manage-contactos.component';
import { ManageDirregionalComponent } from './manage-dirregional/manage-dirregional.component';
import { ManageDocumentosComponent } from './manage-documentos/manage-documentos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { CKEditorModule } from 'ckeditor4-angular';
// import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VistasModule } from '../vistas/vistas.module';
import { ManageFormacionComponent } from './manage-formacion/manage-formacion.component';
import { ManageGaleriaComponent } from './manage-galeria/manage-galeria.component';
import { ManagePacientesComponent } from './manage-pacientes/manage-pacientes.component';
import { ManageRevistaComponent } from './manage-revista/manage-revista.component';
import { ManageSliderComponent } from './manage-slider/manage-slider.component';
import { ManageTrabajoscComponent } from './manage-trabajosc/manage-trabajosc.component';
import { ManageUsuariosComponent } from './manage-usuarios/manage-usuarios.component';
import { NewsintagramComponent } from './newsintagram/newsintagram.component';
import { ActualizacionesComponent } from './actualizaciones/actualizaciones.component';



@NgModule({
  declarations: [
    ConfiguracionMComponent,
    ManageAliadosComponent,
    ManageBanncuadradoComponent,
    ManageBannhorizontalComponent,
    ManageBannverticalComponent,
    ManageBlogComponent,
    ManageContactosComponent,
    ManageDirregionalComponent,
    ManageDocumentosComponent,
    ManageFormacionComponent,
    CeomanageComponent,
    AfiliacionesComponent,
    ManageRevistaComponent,
    ManageGaleriaComponent,
    ManageUsuariosComponent,
    ManagePacientesComponent,
    ManageTrabajoscComponent,
    ManageSliderComponent,
    NewsintagramComponent,
    ActualizacionesComponent,
  ],
  exports: [
    ConfiguracionMComponent,
    ManageAliadosComponent,
    ManageBanncuadradoComponent,
    ManageBannhorizontalComponent,
    ManageBannverticalComponent,
    ManageBlogComponent,
    ManageContactosComponent,
    ManageDirregionalComponent,
    ManageDocumentosComponent,
    ManageFormacionComponent,
    CeomanageComponent,
    AfiliacionesComponent,
    ManageRevistaComponent,
    ManageGaleriaComponent,
    ManageUsuariosComponent,
    ManagePacientesComponent,
    ManageTrabajoscComponent,
    ManageSliderComponent,
    NewsintagramComponent,
    ActualizacionesComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // OrderModule,
    NgxPaginationModule,
    CKEditorModule,
    QRCodeModule,
    PipesModule,
    HttpClientModule,
    RouterModule,
    VistasModule
  ]
})
export class ManageModule { }
