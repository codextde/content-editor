import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropdownModule } from 'ngx-dropdown';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { DirectivesModule } from 'src/directives/directives.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { GeneralModule } from '../general/general.module';
import { BackgroundPropertyComponent, BorderPropertyComponent, CssPropertyComponent, DividerPropertyComponent, GeneralPropertyComponent, HeadlinePropertyComponent, HtmlPropertyComponent, ImagePropertyComponent, InitialLetterPropertyComponent, JavascriptPropertyComponent, MarginPropertyComponent, PaddingPropertyComponent, PositionPropertyComponent, SwitchPropertyComponent, TextPropertyComponent, VideoPropertyComponent } from './properties';
import { PropertiesComponent } from './properties.component';


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
    GeneralModule,
    DirectivesModule,
    PipesModule
  ]
})
export class PropertiesComponentModule { }
