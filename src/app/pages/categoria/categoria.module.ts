import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaComponent } from './categoria.component';


@NgModule({
  declarations: [
    CategoriaComponent
  ],
  exports: [
    CategoriaComponent
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
export class CategoriaModule { }
