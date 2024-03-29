import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { StepperComponent } from './stepper/stepper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { ToggleComponent } from './toggle/toggle.component';
import { PxPercentageSwitchComponent } from './px-percentage-switch/px-percentage-switch.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

const properties = [
    TooltipComponent,
    StepperComponent,
    CardComponent,
    ToggleComponent,
    PxPercentageSwitchComponent,
    ProgressBarComponent,
];

@NgModule({
    declarations: [...properties],
    exports: [...properties],
    imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class GeneralModule {}
