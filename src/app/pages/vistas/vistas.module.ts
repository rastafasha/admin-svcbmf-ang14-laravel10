import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './buscador/buscador.component';
import { ViewTrabajosComponent } from './vista-trabajos/view-trabajos.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    BuscadorComponent,
    ViewTrabajosComponent
  ],
  exports: [
    BuscadorComponent,
    ViewTrabajosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class VistasModule { }
