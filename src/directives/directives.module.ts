import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';


@NgModule({
  declarations: [
    TooltipDirective
  ],
  exports: [
    TooltipDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
