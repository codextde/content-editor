import {
    CdkDragDrop,
    copyArrayItem,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    OnInit,
} from '@angular/core';
import {
    faArrowsAlt,
    faCogs,
    faHandPointer,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AlertController, ToastController } from '@ionic/angular';
import { IBodyProperties } from 'models/bodyProperties.model';
import { IElement } from 'models/element.model';
import { DataService } from 'services/data.service';
import { ElementService } from 'services/element.service';
import { ElementsService } from 'services/elements.service';
import { EventsService } from 'services/event.service';
import { FontService } from 'services/font.service';
import { HelperService } from 'services/helper.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    tab: string = 'elements';

    // Icons
    faTrash = faTrash;
    faHandPointer = faHandPointer;
    faArrowsAlt = faArrowsAlt;
    faCogs = faCogs;

    // Property Panel
    activeElement: any;
    propertiesActive: boolean = false;

    // Body Properties
    directionRtl: boolean = false;
    bodyProperties: IBodyProperties = {
        styles: {},
        background: {},
        padding: {},
        css: '',
        direction: '',
    };

    // Keyboard Listener for Save Feature
    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            this.save();
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
        private eventsService: EventsService
    ) {}

    ngOnInit() {
        this.loadBodyProperties();

        this.checkDrag();
        this.eventsService.subscribe('property-change', () => {
            this.checkDrag();
        });
    }

    checkDrag() {
        this.dataService.contentEditorElements.forEach((element: IElement) => {
            element.properties.forEach(property => {
                if (
                    property.name == 'position' &&
                    property.position == 'absolute'
                ) {
                    element.disableDrag = true;
                } else if (property.name == 'position') {
                    element.disableDrag = false;
                }
            });
        });
    }

    drop(event: CdkDragDrop<string[]>, prevent?) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            copyArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            // currentObject.id = this.helper.uuidv4();

            const currentObject =
                this.dataService.contentEditorElements[event.currentIndex];
            console.log(this.dataService.contentEditorElements);
            this.dataService.contentEditorElements[event.currentIndex] =
                HelperService.clearObject(currentObject);
        }
    }

    cssCodeChange(ev?) {
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
            this.propertiesActive = true;
        }
        if (this.propertiesActive) {
            this.activeElement = element;
        }
    }

    delete(element) {
        this.propertiesActive = false;
        this.activeElement = {};
        this.dataService.contentEditorElements =
            this.dataService.contentEditorElements.filter(el => el !== element);

        this.save();
    }

    async save() {
        await this.dataService.convertToDesigner();
        const toast = await this.toastCtrl.create({
            message: 'Saved',
            duration: 2000,
        });
        toast.present();
    }

    clear() {
        this.dataService.contentEditorElements = [];
        this.bodyProperties = {
            styles: {},
            background: {},
            padding: {},
            css: '',
            direction: '',
        };
        this.cdr.detectChanges();
        localStorage.removeItem('content');
        // this.save();
        console.log(this.bodyProperties);
    }

    async import() {
        // TODO Add Import Feature
        const alert = await this.alertCtrl.create({
            header: 'Import',
            subHeader: 'Paste the Json String',
            inputs: [
                {
                    name: 'value',
                    type: 'text',
                    placeholder: '{}',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: 'Import',
                    handler: data => {
                        if (data && data.value) {
                            // this.dataService.editorOptions = JSON.parse(data.value);
                        }
                    },
                },
            ],
        });

        await alert.present();
    }

    async export() {
        // TODO Add Export Feature
        const config = ''; // JSON.stringify(this.dataService.editorOptions);
        const alert = await this.alertCtrl.create({
            header: 'Export',
            subHeader: 'Copy the Json String',
            inputs: [
                {
                    name: 'value',
                    type: 'text',
                    placeholder: '{}',
                    value: config,
                },
            ],
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {},
                },
            ],
        });

        await alert.present();
    }

    // Improve Load Body Properties Function // Move to Service
    async loadBodyProperties() {
        const properties = this.dataService.contentEditorProperties;

        this.dataService.bodyPropertiesTypes.forEach(propertyName => {
            const index = this.dataService.contentEditorProperties.findIndex(
                data => data.name == propertyName
            );
            if (index == -1) {
                return;
            }
            if (typeof properties[index].value !== 'undefined') {
                this.bodyProperties[propertyName] = properties[index].value;
            } else {
                this.bodyProperties[propertyName] = properties[index];
            }
        });

        this.bodyProperties.styles = this.elementService.loadStyleProperties(
            this.dataService.contentEditorProperties
        );
        this.cssCodeChange();
        this.loadDirection();
    }

    // Improve Set Body Properties Function // Move to Service
    setBodyProperties() {
        const properties = this.dataService.contentEditorProperties;

        this.dataService.bodyPropertiesTypes.forEach(propertyName => {
            let index = properties.findIndex(data => data.name == propertyName);
            if (index == -1) {
                properties.push({ name: propertyName });
            }
            index = properties.findIndex(data => data.name == propertyName);
            if (typeof properties[index].value !== 'undefined') {
                properties[index].value = this.bodyProperties[propertyName];
            } else {
                properties[index] = {
                    name: propertyName,
                    ...this.bodyProperties[propertyName],
                };
            }
        });

        this.bodyProperties.styles = this.elementService.loadStyleProperties(
            this.dataService.contentEditorProperties
        );
    }
}
