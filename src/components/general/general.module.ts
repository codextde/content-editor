import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { StepperComponent } from './stepper/stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TooltipComponent,
    StepperComponent
  ],
  entryComponents: [
    TooltipComponent,
    StepperComponent
  ],
  exports: [
    TooltipComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class GeneralModule { }
