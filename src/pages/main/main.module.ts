import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementsModule } from 'src/components/elements/elements.module';
import { GeneralModule } from 'src/components/general/general.module';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { DirectivesModule } from 'src/directives/directives.module';
import { MainPage } from './main.page';
import { DropdownModule } from 'ngx-dropdown';
import { ModalModule } from 'src/modules/modal';


const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    ModalModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    ElementsModule,
    PropertiesComponentModule,
    ReactiveFormsModule,
    GeneralModule,
    DirectivesModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
