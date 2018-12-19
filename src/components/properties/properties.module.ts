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
import { PipesModule } from 'src/pipes/pipes.module';
import { PropertiesComponent } from './properties.component';

import {   PaddingPropertyComponent,
          MarginPropertyComponent,
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
          PositionPropertyComponent } from './properties';

const properties = [
  PropertiesComponent,
  PaddingPropertyComponent,
  MarginPropertyComponent,
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
