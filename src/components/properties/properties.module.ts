import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PropertiesComponent } from './properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PropertiesComponent
  ],
  entryComponents: [
    PropertiesComponent
  ],
  exports: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule
  ]
})
export class PropertiesComponentModule { }
