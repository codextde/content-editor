import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';


@NgModule({
  declarations: [
    TooltipComponent
  ],
  entryComponents: [
    TooltipComponent
  ],
  exports: [
    TooltipComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
