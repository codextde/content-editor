import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { StepperComponent } from './stepper/stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { ToggleComponent } from './toggle/toggle.component';


@NgModule({
  declarations: [
    TooltipComponent,
    StepperComponent,
    CardComponent,
    ToggleComponent
  ],
  entryComponents: [
    TooltipComponent,
    StepperComponent,
    CardComponent,
    ToggleComponent
  ],
  exports: [
    TooltipComponent,
    StepperComponent,
    CardComponent,
    ToggleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class GeneralModule { }
