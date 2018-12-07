import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeadlineElementComponent } from './headline/headline.component';
import { TextElementComponent } from './text/text.component';
import { VideoElementComponent } from './video/video.component';



@NgModule({
  declarations: [
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
    CommonModule,
    NgModule
  ]
})
export class ElementsModule { }
