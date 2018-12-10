import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropdownModule } from 'ngx-dropdown';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PropertiesComponent } from './properties.component';
import { BackgroundPropertyComponent } from './properties/background/background.component';
import { BorderPropertyComponent } from './properties/border/border.component';
import { CssPropertyComponent } from './properties/css/css.component';
import { GeneralPropertyComponent } from './properties/general/general.component';
import { HtmlPropertyComponent } from './properties/html/html.component';
import { ImagePropertyComponent } from './properties/image/image.component';
import { JavascriptPropertyComponent } from './properties/javascript/javascript.component';
import { PaddingPropertyComponent } from './properties/padding/padding.component';
import { SwitchPropertyComponent } from './properties/switch/switch.component';
import { TextPropertyComponent } from './properties/text/text.component';
import { VideoPropertyComponent } from './properties/video/video.component';



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
    SwitchPropertyComponent,
    VideoPropertyComponent
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
    SwitchPropertyComponent,
    VideoPropertyComponent
  ],
  imports: [
    DropdownModule,
    IonicModule,
    ColorPickerModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule,
    MatSliderModule
  ]
})
export class PropertiesComponentModule { }
