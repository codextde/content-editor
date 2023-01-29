import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPage } from './main.page';
import { DropdownModule } from 'ngx-dropdown';
import { ElementsModule } from 'components/elements/elements.module';
import { GeneralModule } from 'components/general/general.module';
import { PropertiesComponentModule } from 'components/properties/properties.module';
import { DirectivesModule } from 'directives/directives.module';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
    },
];

@NgModule({
    imports: [
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
        DirectivesModule,
    ],
    declarations: [MainPage],
})
export class MainPageModule {}
