import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoceomanageComponent } from '../manage/fotoceomanage/fotoceomanage.component';
import { CeoComponent } from './ceo/ceo.component';
import { FormsAfiliacionesComponent } from './forms-afiliaciones/forms-afiliaciones.component';
import { FormsAliadosComponent } from './forms-aliados/forms-aliados.component';
import { FormsBancuadradoComponent } from './forms-bancuadrado/forms-bancuadrado.component';
import { FormsBanhorizontalComponent } from './forms-banhorizontal/forms-banhorizontal.component';
import { FormsBanverticalComponent } from './forms-banvertical/forms-banvertical.component';
import { FormsBlogComponent } from './forms-blog/forms-blog.component';
import { FormsDocumentosComponent } from './forms-documentos/forms-documentos.component';
import { FormsFormacionComponent } from './forms-formacion/forms-formacion.component';
import { FormsGaleriaComponent } from './forms-galeria/forms-galeria.component';
import { FormsPacientesComponent } from './forms-pacientes/forms-pacientes.component';
import { FormsRevistaComponent } from './forms-revista/forms-revista.component';
import { FormsSliderComponent } from './forms-slider/forms-slider.component';
// import { FormsUsersComponent } from './forms-users/forms-users.component';
import { FotoceoComponent } from './fotoceo/fotoceo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { OrderModule } from 'ngx-order-pipe';

import { QRCodeModule } from 'angular2-qrcode';
import { CKEditorModule } from 'ckeditor4-angular';

import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsDirregionalComponent } from './forms-dirregional/forms-dirregional.component';



@NgModule({
  declarations: [
    FormsAfiliacionesComponent,
      // FormsDirectorioComponent,
      FormsBlogComponent,
      FormsRevistaComponent,
      FormsBancuadradoComponent,
      FormsBanverticalComponent,
      FormsBanhorizontalComponent,
      FormsGaleriaComponent,
      // FormsUsersComponent,
      FormsDocumentosComponent,
      FormsPacientesComponent,
      FormsFormacionComponent,
      FormsSliderComponent,
      FormsAliadosComponent,
      // FormNewsintagramComponent,
      CeoComponent,
      FotoceoComponent,
      FotoceomanageComponent,
      FormsDirregionalComponent
  ],
  exports: [
    FormsAfiliacionesComponent,
      FormsBlogComponent,
      FormsRevistaComponent,
      FormsBancuadradoComponent,
      FormsBanverticalComponent,
      FormsBanhorizontalComponent,
      FormsGaleriaComponent,
      // FormsUsersComponent,
      FormsDocumentosComponent,
      FormsPacientesComponent,
      FormsFormacionComponent,
      FormsSliderComponent,
      FormsAliadosComponent,
      // FormNewsintagramComponent,
      CeoComponent,
      FotoceoComponent,
      FotoceomanageComponent,
      FormsDirregionalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
      FormsModule,
      NgxPaginationModule,
      PipesModule,
        CKEditorModule
  ]
})
export class FormulariosModule { }
