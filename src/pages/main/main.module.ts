import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementsModule } from 'src/components/elements/elements.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';


const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    MatCardModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    ElementsModule,
    PropertiesComponentModule,
    ColorPickerModule,
    ReactiveFormsModule,
    MonacoEditorModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
