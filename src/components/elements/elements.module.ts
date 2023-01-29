import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoElementComponent } from './video/video.component';
import { TextElementComponent } from './text/text.component';
import { HeadlineElementComponent } from './headline/headline.component';
import { HtmlElementComponent } from './html/html.component';
import { ImageElementComponent } from './image/image.component';
import { ClearfixElementComponent } from './clearfix/clearfix.component';
import { DividerElementComponent } from './divider/divider.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from 'directives/directives.module';
import { PipesModule } from 'pipes/pipes.module';

const elements = [
    VideoElementComponent,
    TextElementComponent,
    HeadlineElementComponent,
    HtmlElementComponent,
    ImageElementComponent,
    ClearfixElementComponent,
    DividerElementComponent,
];

@NgModule({
    declarations: [...elements],
    exports: [...elements],
    imports: [
        FontAwesomeModule,
        PipesModule,
        CommonModule,
        DirectivesModule,
        AngularDraggableModule,
    ],
})
export class ElementsModule {}
