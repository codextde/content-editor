import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropdownModule } from 'ngx-dropdown';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { DirectivesModule } from 'src/directives/directives.module';
import { GeneralModule } from '../general/general.module';
import { PropertiesComponent } from './properties.component';
import { BackgroundPropertyComponent } from './properties/background/background.component';
import { BorderPropertyComponent } from './properties/border/border.component';
import { CssPropertyComponent } from './properties/css/css.component';
import { DividerPropertyComponent } from './properties/divider/divider.component';
import { GeneralPropertyComponent } from './properties/general/general.component';
import { HeadlinePropertyComponent } from './properties/headline/headline.component';
import { HtmlPropertyComponent } from './properties/html/html.component';
import { ImagePropertyComponent } from './properties/image/image.component';
import { InitialLetterPropertyComponent } from './properties/initial-letter/initial-letter.component';
import { JavascriptPropertyComponent } from './properties/javascript/javascript.component';
import { PaddingPropertyComponent } from './properties/padding/padding.component';
import { PositionPropertyComponent } from './properties/position/position.component';
import { SwitchPropertyComponent } from './properties/switch/switch.component';
import { TextPropertyComponent } from './properties/text/text.component';
import { VideoPropertyComponent } from './properties/video/video.component';
import { PipesModule } from 'src/pipes/pipes.module';

const properties = [
  PropertiesComponent,
  PaddingPropertyComponent,
  HtmlPropertyComponent,
  CssPropertyComponent,
  JavascriptPropertyComponent,
  BackgroundPropertyComponent,
  TextPropertyComponent,
  ImagePropertyComponent,
  GeneralPropertyComponent,
  BorderPropertyComponent,
  SwitchPropertyComponent,
  VideoPropertyComponent,
  DividerPropertyComponent,
  HeadlinePropertyComponent,
  InitialLetterPropertyComponent,
  PositionPropertyComponent
];

@NgModule({
  declarations: [
    ...properties
  ],
  exports: [
    ...properties
  ],
  imports: [
    TextareaAutosizeModule,
    DropdownModule,
    ColorPickerModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule,
    GeneralModule,
    DirectivesModule,
    PipesModule
  ]
})
export class PropertiesComponentModule { }
