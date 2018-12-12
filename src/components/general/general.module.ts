import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { StepperComponent } from './stepper/stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    TooltipComponent,
    StepperComponent,
    CardComponent
  ],
  entryComponents: [
    TooltipComponent,
    StepperComponent,
    CardComponent
  ],
  exports: [
    TooltipComponent,
    StepperComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class GeneralModule { }
