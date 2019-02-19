import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  forkJoin
} from 'rxjs';
import {
  UploadService
} from '../../services/upload.service';
import {
  ToastController
} from '@ionic/angular';
declare var kendo: any;

@Component({
  selector: 'upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  @ViewChild('file') file;
  @ViewChild('imageUpload') imageUpload;
  public files: Set < File > = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(
    public uploadService: UploadService,
    private toastCtrl: ToastController) {}

  ngOnInit() {

    kendo.jQuery(this.imageUpload.nativeElement).kendoImageBrowser({
        imageBrowser: {
          messages: {
            dropFilesHere: 'Drop files here'
          },
          transport: {
            read: '../ImageBrowser/Read',
            destroy: {
              url: '../ImageBrowser/Destroy',
              type: 'POST'
            },
            create: {
              url: '../ImageBrowser/Create',
              type: 'POST'
            },
            thumbnailUrl: '../ImageBrowser/Thumbnail',
            uploadUrl: '../ImageBrowser/Upload',
            imageUrl: '~/Content/UserFiles/Upload/'
          },
          change: (e) => {
            // const imageUrl = this.value() + this.helperService.getCookie('X-IEA-Study') + '/' + e.selected.name;
            console.log(e);

          }
        }
      });

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
        console.log(error);
        this.uploadSuccessful = false;
        this.uploading = false;
      });

    }

  }
