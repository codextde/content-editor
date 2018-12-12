import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoElementComponent } from './video/video.component';
import { TextElementComponent } from './text/text.component';
import { HeadlineElementComponent } from './headline/headline.component';
import { HtmlElementComponent } from './html/html.component';
import { PipesModule } from 'src/pipes/pipes.module';
import { ImageElementComponent } from './image/image.component';
import { ClearfixElementComponent } from './clearfix/clearfix.component';
import { DirectivesModule } from 'src/directives/directives.module';
import { DividerElementComponent } from './divider/divider.component';
import { AngularDraggableModule } from 'angular2-draggable';


@NgModule({
  declarations: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent,
    ImageElementComponent,
    ClearfixElementComponent,
    DividerElementComponent
  ],
  entryComponents: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent,
    ImageElementComponent,
    ClearfixElementComponent,
    DividerElementComponent
  ],
  exports: [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent,
    ImageElementComponent,
    ClearfixElementComponent,
    DividerElementComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    DirectivesModule,
    AngularDraggableModule
  ]
})
export class ElementsModule { }
