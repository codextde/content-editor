import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ModalModule } from '../modal';
import { UploadService } from './services/upload.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralModule } from 'src/components/general/general.module';

@NgModule({
    imports: [CommonModule, ModalModule, HttpClientModule, GeneralModule],
    declarations: [UploadButtonComponent],
    exports: [UploadButtonComponent],
    providers: [UploadService],
})
export class UploadModule {}
