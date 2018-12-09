import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PropertiesComponent } from './properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaddingPropertyComponent } from './properties/padding/padding.component';
import { HtmlPropertyComponent } from './properties/html/html.component';
import { BackgroundPropertyComponent } from './properties/background/background.component';
import { TextPropertyComponent } from './properties/text/text.component';
import { ImagePropertyComponent } from './properties/image/image.component';
import { GeneralPropertyComponent } from './properties/general/general.component';
import { BorderPropertyComponent } from './properties/border/border.component';
import { CssPropertyComponent } from './properties/css/css.component';
import { JavascriptPropertyComponent } from './properties/javascript/javascript.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SwitchPropertyComponent } from './properties/switch/switch.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
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
    SwitchPropertyComponent
  ],
  exports: [
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
    SwitchPropertyComponent
  ],
  imports: [
    IonicModule,
    ColorPickerModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule
  ]
})
export class PropertiesComponentModule { }