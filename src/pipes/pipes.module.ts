import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';


@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  exports: [
    SanitizeHtmlPipe
  ],
  imports: [
  ]
})
export class PipesModule { }
