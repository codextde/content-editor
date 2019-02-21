import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { HelperService } from 'src/services/helper.service';
import { UploadService } from '../../services/upload.service';
declare var kendo: any;

@Component({
  selector: 'upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadButtonComponent),
    multi: true
  }]
})
export class UploadButtonComponent implements OnInit, ControlValueAccessor {
  @ViewChild('file') file;
  @ViewChild('imageUpload') imageUpload;
  public files: Set < File > = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  selectedImagePath: string = '';


  constructor(
    public uploadService: UploadService,
    private toastCtrl: ToastController,
    private helperService: HelperService) {
      
    }

  fixImageThumbs() {
      setTimeout(()=> {
        document.querySelector('div.imageUpload ul').scroll(100, 100)
        document.querySelector('div.imageUpload ul').scroll(0,0)
      }, 100)
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedImagePath = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {}
  /** NgModel End */

  onChange: any = () => {};


  ngOnInit() {
    const imageBrowserPath = '../../' + this.helperService.studyName + '/ImageBrowser/';
    const kendoImageBrowserConfig: kendo.ui.EditorImageBrowser | kendo.ui.EditorOptions = {
      transport: {
        read: {
          url: imageBrowserPath + 'Read'
        },
        destroy: {
          url: imageBrowserPath + 'Destroy',
          type: 'POST'
        },
        create: {
          url: imageBrowserPath + 'Create',
          type: 'POST'
        },
        thumbnailUrl: imageBrowserPath + 'Thumbnail',
        uploadUrl: imageBrowserPath + 'Upload',
        imageUrl: '~/Content/UserFiles/Upload/{0}'
      },
      change: (e: any) => {
        this.selectedImagePath = `${this.helperService.basePath}designer/~/Content/UserFiles/Upload/${this.helperService.studyName}/${e.sender.path()}${e.selected.name}`;
        
      }
    }

    kendo.jQuery(this.imageUpload.nativeElement).kendoImageBrowser(kendoImageBrowserConfig);

  }

  insert() {
    this.onChange(this.selectedImagePath);
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: {
      [key: string]: File
    } = this.file.nativeElement.files;
    for (const key in files) {
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

    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(async end => {

      this.uploadSuccessful = true;
      this.uploading = false;
      this.progress = 0;
      const toast = await this.toastCtrl.create({
        message: 'Upload Successful',
        duration: 3000
      });
      toast.present();
    }, async (error) => {
      this.progress = 0;
      const toast = await this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000
      });
      toast.present();
      this.uploadSuccessful = false;
      this.uploading = false;
    });

  }

}
