import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropdownModule } from 'ngx-dropdown';
import { MonacoEditorModule } from 'ngx-monaco-editor';
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
import { JavascriptPropertyComponent } from './properties/javascript/javascript.component';
import { PaddingPropertyComponent } from './properties/padding/padding.component';
import { SwitchPropertyComponent } from './properties/switch/switch.component';
import { TextPropertyComponent } from './properties/text/text.component';
import { VideoPropertyComponent } from './properties/video/video.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { InitialLetterPropertyComponent } from './properties/initial-letter/initial-letter.component';
import { PositionPropertyComponent } from './properties/position/position.component';

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
    VideoPropertyComponent,
    DividerPropertyComponent,
    HeadlinePropertyComponent,
    InitialLetterPropertyComponent,
    PositionPropertyComponent
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
    VideoPropertyComponent,
    DividerPropertyComponent,
    HeadlinePropertyComponent,
    InitialLetterPropertyComponent,
    PositionPropertyComponent
  ],
  imports: [
    TextareaAutosizeModule,
    DropdownModule,
    IonicModule,
    ColorPickerModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule,
    GeneralModule,
    DirectivesModule
  ]
})
export class PropertiesComponentModule { }
