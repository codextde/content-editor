import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { FilterPipe } from './filter-data.pipe';


@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    FilterPipe
  ],
  exports: [
    SanitizeHtmlPipe,
    FilterPipe
  ],
  imports: [
  ]
})
export class PipesModule { }
