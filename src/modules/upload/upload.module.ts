import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadDataWindowComponent } from './components/upload-data-window/upload-data-window.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ModalModule } from '../modal';



@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    UploadDataWindowComponent,
    UploadButtonComponent
  ],
  exports: [
    UploadDataWindowComponent,
    UploadButtonComponent
  ]
})
export class UploadModule {}
