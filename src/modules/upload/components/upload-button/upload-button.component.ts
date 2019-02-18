import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(public uploadService: UploadService) {}

  ngOnInit() {}

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: {
      [key: string]: File
    } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  upload() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {

    }
    this.uploading = true;

    this.progress = this.uploadService.upload(this.files);

    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {

      this.uploadSuccessful = true;
      this.uploading = false;
    }, (error) => {
      console.log(error);
      this.uploadSuccessful = false;
      this.uploading = false;
    });

  }

}
