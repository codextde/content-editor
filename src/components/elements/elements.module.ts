import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoElementComponent } from './video/video.component';
import { TextElementComponent } from './text/text.component';
import { HeadlineElementComponent } from './headline/headline.component';
import { HtmlElementComponent } from './html/html.component';
import { PipesModule } from 'src/pipes/pipes.module';


@NgModule({
  declarations: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent
  ],
  entryComponents: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent
  ],
  exports: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent
  ],
  imports: [
    PipesModule,
    CommonModule
  ]
})
export class ElementsModule { }
