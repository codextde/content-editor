import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { ReplaceTagDirective } from './replace-tag.directive';


@NgModule({
  declarations: [
    TooltipDirective,
    ReplaceTagDirective
  ],
  exports: [
    TooltipDirective,
    ReplaceTagDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
