import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { KeysPipe } from './keys.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    EscapeHtmlPipe,
    KeysPipe
  ],
  exports: [
    ImagenPipe,
    EscapeHtmlPipe,
    KeysPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
