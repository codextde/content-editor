import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HelperService } from 'src/services/helper.service';
import { UploadService } from '../../services/upload.service';
declare var kendo: any;
// import '@progress/kendo-ui';  

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
  imageBrowser: any;

  selectedImagePath: string = '';


  constructor(
    public uploadService: UploadService,
    private helperService: HelperService) {

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
    const kendoImageBrowserConfig: /*kendo.ui.EditorImageBrowser | kendo.ui.EditorOptions*/ any = {
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
      execute: (e: any) => {
        console.log('execute', e);
        this.refreshData();
      },
      change: (e: any) => {
        console.log('change', e);
        this.selectedImagePath = `${this.helperService.basePath}designer/~/Content/UserFiles/Upload/${this.helperService.studyName}/${e.sender.path()}${e.selected.name}`;
      },
      error: (e: any) => {
        console.log('error', e)
      }

    };

    const imageBrowserElement = kendo.jQuery(this.imageUpload.nativeElement).kendoImageBrowser(kendoImageBrowserConfig);
    this.imageBrowser = imageBrowserElement.data('kendoImageBrowser');
    
    this.imageBrowser.dataSource.bind('requestEnd', (req) => {
      if(req.type != 'read') {
        this.refreshData();
      }
    });

  }

  refreshData() {
    if (this.imageBrowser) {
      this.imageBrowser.dataSource.read();
    }
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
      const toastCtrl: any = {};
      const toast = await toastCtrl.create({
        message: 'Upload Successful',
        duration: 3000
      });
      toast.present();
    }, async (error) => {
      this.progress = 0;
      const toastCtrl: any = {};
      const toast = await toastCtrl.create({
        message: 'Upload failed',
        duration: 3000
      });
      toast.present();
      this.uploadSuccessful = false;
      this.uploading = false;
    });

  }

}
