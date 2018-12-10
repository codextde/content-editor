import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, HostListener } from '@angular/core';
import { faArrowsAlt, faCogs, faHandPointer, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/services/data.service';
import { ElementsService } from 'src/services/elements.service';
import { HelperService } from 'src/services/helper.service';
import { ToastController } from '@ionic/angular';


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

  test;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == 's') {
      event.preventDefault();
      this.save();
    }

  }

  constructor(
    public helper: HelperService,
    public data: DataService,
    public elements: ElementsService,
    public toast: ToastController
  ) {}

  ngOnInit() {
    const storageOptions = localStorage.getItem('editorOptions');
    if (storageOptions) {
      this.data.editorOptions = JSON.parse(storageOptions);
      console.log(this.data.editorOptions);
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
      this.data.editorOptions.elements[event.currentIndex] = JSON.parse(JSON.stringify(currentObject));
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
    const toast = await this.toast.create({message: 'Saved', duration: 2000});
    toast.present();
  }


}
