import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { faArrowsAlt, faCogs, faHandPointer, faTrash, faDesktop, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from 'src/services/data.service';
import { ElementService } from 'src/services/element.service';
import { ElementsService } from 'src/services/elements.service';
import { HelperService } from 'src/services/helper.service';
import { IBodyProperties } from 'src/models/bodyProperties.model';
import { FontService } from 'src/services/font.service';
import { EventsService } from 'src/services/event.service';
import { IElement } from 'src/models/element.model';
import { ModalComponent } from 'src/modules/modal/modal.component';
import { MonacoService } from 'src/services/monaco.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'main-frame',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('modalRoot') modalRoot: ModalComponent;

  // Designer Data Input
  @Input()
  set designerData(designerData: string) {
    if (designerData) {
      try {
        designerData = JSON.parse(designerData);
        this.dataService.convertToContenteditor(designerData);
        // this.dataLoaded = true;
      } catch {
        console.error('no valid json Data');
        // this.dataLoaded = true;
      }
    }
  }
  @Input() locationUrl: string;
  @Output() designerDataChange = new EventEmitter<string>();

  dataLoaded: boolean = true;
  tab: string = 'elements';

  // Icons
  faTrash = faTrash;
  faHandPointer = faHandPointer;
  faArrowsAlt = faArrowsAlt;
  faCogs = faCogs;
  faDesktop = faDesktop;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  // Property Panel
  activeElement: any = {};
  propertiesActive: boolean = false;

  // Body Properties
  directionRtl: boolean = false;
  bodyProperties: IBodyProperties = {
    styles: {},
    background: {},
    padding: {},
    css: '',
    direction: ''
  };

  public passagePlayerWrapper: boolean = false;


  // Keyboard Listener for Save Feature
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.code == 'MetaLeft') && event.key == 's') {
      event.preventDefault();
      // this.save();
      this.eventsService.publish('designer-data-change');
    }
  }

  constructor(
    private helper: HelperService,
    public dataService: DataService,
    public elements: ElementsService,
    private elementService: ElementService,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private fontService: FontService,
    private eventsService: EventsService,
    private monacoService: MonacoService,
    public  matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    HelperService.locationUrl = this.locationUrl;
    // Set Location URL for Fonts
    this.fontService.loadFonts(this.locationUrl);
    this.monacoService.loadMonaco(this.locationUrl);
    this.matIconRegistry.addSvgIcon('aspect-ratio', this.domSanitizer.bypassSecurityTrustResourceUrl(HelperService.locationUrl + 'assets/icons/material.io/baseline-aspect_ratio-24px.svg'));

    this.checkDrag();
    this.eventsService.subscribe('property-change', () => {
      this.checkDrag();
    });

    this.eventsService.subscribe('designer-data-change', () => {
      const designerData = this.dataService.convertToDesigner();
      this.designerDataChange.emit(JSON.stringify(designerData));
    });

    this.eventsService.subscribe('body-properties-change', () => {
      this.loadBodyProperties();
    });
  }


  checkDrag() {
    this.dataService.contentEditorElements.forEach((element: IElement) => {
      element.properties.forEach((property) =>  {
        if (property.name == 'position' && property.position == 'absolute') {
          element.disableDrag = true;
        } else if (property.name == 'position') {
          element.disableDrag = false;
        }
      });
    });
  }


  drop(event: CdkDragDrop < string[] > , prevent ? ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      // currentObject.id = this.helper.uuidv4();

      const currentObject = this.dataService.contentEditorElements[event.currentIndex];
      this.dataService.contentEditorElements[event.currentIndex] = HelperService.clearObject(currentObject);

    }
    this.eventsService.publish('designer-data-change');
  }

  
  cssCodeChange() {
    this.helper.applyStyle(this.bodyProperties.css);
  }

  loadDirection() {
    const direction = this.bodyProperties.direction;
    if (direction == 'rtl') {
      this.directionRtl = true;
    } else if (direction == 'ltr') {
      this.directionRtl = false;
    }
  }
  directionChange(ev) {
    if (ev) {
      this.bodyProperties.direction = 'rtl';
    } else {
      this.bodyProperties.direction = 'ltr';
    }
  }

  openProperties(element, forceOpen: boolean = false) {
    if (forceOpen) {
      this.modalRoot.show();
      this.propertiesActive = true;
    }
    if (this.propertiesActive) {
      this.activeElement = element;
    }
  }

  delete(element) {
    this.propertiesActive = false;
    this.activeElement = {};
    this.dataService.contentEditorElements = this.dataService.contentEditorElements.filter((el) => el !== element);

    this.save();
  }


  async save() {
    const designerData = await this.dataService.convertToDesigner();
    
    const toast = await this.toastCtrl.create({message: 'Saved', duration: 2000});
    toast.present();
  }

  clear() {
    this.dataService.contentEditorElements = [];
    this.bodyProperties = {
      styles: {},
      background: {},
      padding: {},
      css: '',
      direction: ''
    };
    this.cdr.detectChanges();
    localStorage.removeItem('content');
    // this.save();
  }

  async import() {
    // TODO Add Import Feature
    const alert = await this.alertCtrl.create({
      header: 'Import',
      subHeader: 'Paste the Json String',
      inputs: [{
        name: 'value',
        type: 'text',
        placeholder: '{}'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Import',
        handler: (data) => {
          if (data && data.value) {
            // this.dataService.editorOptions = JSON.parse(data.value);
          }
        }
      }]
    });

    await alert.present();
  }

  async export () {
    // TODO Add Export Feature
    const config = ''; // JSON.stringify(this.dataService.editorOptions);
    const alert = await this.alertCtrl.create({
      header: 'Export',
      subHeader: 'Copy the Json String',
      inputs: [{
        name: 'value',
        type: 'text',
        placeholder: '{}',
        value: config
      }],
      buttons: [{
        text: 'Ok',
        handler: () => {}
      }]
    });

    await alert.present();
  }


    // Improve Load Body Properties Function // Move to Service
    async loadBodyProperties() {
      const properties = this.dataService.contentEditorProperties;

      this.dataService.bodyPropertiesTypes.forEach((propertyName) => {
        const index = this.dataService.contentEditorProperties.findIndex((data) => data.name == propertyName);
        if (index == -1) { return; }
        if (typeof properties[index].value !== 'undefined') {
          this.bodyProperties[propertyName] = properties[index].value;
        } else {
          this.bodyProperties[propertyName] = properties[index];
        }
      });

      this.bodyProperties.styles = this.elementService.loadStyleProperties(this.dataService.contentEditorProperties);
      this.cssCodeChange();
      this.loadDirection();
    }

    // Improve Set Body Properties Function // Move to Service
    setBodyProperties() {
      const properties = this.dataService.contentEditorProperties;

      this.dataService.bodyPropertiesTypes.forEach((propertyName) => {
        let index = properties.findIndex((data) => data.name == propertyName);
        if (index == -1) {
          properties.push({name: propertyName});
        }
        index = properties.findIndex((data) => data.name == propertyName);
        if (typeof properties[index].value !== 'undefined') {
          properties[index].value = this.bodyProperties[propertyName];
        } else {
          properties[index] = {name: propertyName, ...this.bodyProperties[propertyName]};
        }
      });

      this.bodyProperties.styles = this.elementService.loadStyleProperties(this.dataService.contentEditorProperties);


    }


}
