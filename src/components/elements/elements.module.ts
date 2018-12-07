import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoElementComponent } from './video/video.component';
import { TextElementComponent } from './text/text.component';
import { HeadlineElementComponent } from './headline/headline.component';


@NgModule({
  declarations: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent
  ],
  entryComponents: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent
  ],
  exports: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ElementsModule { }
