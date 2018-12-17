import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { faArrowsAlt, faCogs, faHandPointer, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/services/data.service';
import { ElementsService } from 'src/services/elements.service';
import { HelperService } from 'src/services/helper.service';
import { ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {
  // Icons
  faTrash = faTrash;
  faHandPointer = faHandPointer;
  faArrowsAlt = faArrowsAlt;
  faCogs = faCogs;


  activeElement: any;
  propertiesActive: boolean = false;
  tab: string = 'elements';


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == 's') {
      event.preventDefault();
      this.save();
    }

  }

  constructor(
    private helper: HelperService,
    private data: DataService,
    private elements: ElementsService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const storageOptions = localStorage.getItem('editorOptions');
    if (storageOptions) {
      this.data.editorOptions = JSON.parse(storageOptions);
      console.log(this.data.editorOptions);
    } else {
      this.clear();
    }

    if (this.data.editorOptions.bodyStyleOptions.css) {
      this.helper.applyStyle(this.data.editorOptions.bodyStyleOptions.css);
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const currentObject = this.data.editorOptions.elements[event.currentIndex];
      currentObject.id = this.helper.uuidv4();
      this.data.editorOptions.elements[event.currentIndex] = this.helper.clearObject(currentObject);
    }
  }

  cssCodeChange() {
    this.helper.applyStyle(this.data.editorOptions.bodyStyleOptions.css);
  }

  openProperties(element) {
    this.activeElement = element;
    this.propertiesActive = true;
  }

  delete(element) {
    this.propertiesActive = false;
    this.activeElement = {};
    this.data.editorOptions.elements = this.data.editorOptions.elements.filter((el) => el  !==  element);
  }

  async save() {
    console.log(this.data.editorOptions);
    localStorage.setItem('editorOptions', JSON.stringify(this.data.editorOptions));
    const toast = await this.toastCtrl.create({message: 'Saved', duration: 2000});
    toast.present();
  }

  clear() {
    this.data.editorOptions = this.helper.clearObject(this.data.editorDefaultOptions);
    this.cdr.detectChanges();
    this.save();
  }

  async import() {
    const alert = await this.alertCtrl.create({
      header: 'Import',
      subHeader: 'Paste the Json String',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: '{}'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Import',
          handler: (data) => {
            if (data && data.value) {
              this.data.editorOptions = JSON.parse(data.value);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async export() {
    const config = JSON.stringify(this.data.editorOptions);
    const alert = await this.alertCtrl.create({
      header: 'Export',
      subHeader: 'Copy the Json String',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: '{}',
          value: config
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


}
