import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementsModule } from 'src/components/elements/elements.module';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { MainPage } from './main.page';


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
    DragDropModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    ElementsModule,
    PropertiesComponentModule,
    ReactiveFormsModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
