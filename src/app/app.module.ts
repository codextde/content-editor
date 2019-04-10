import { DragDropModule } from '@angular/cdk/drag-drop';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'ngx-dropdown';
import { ElementsModule } from 'src/components/elements/elements.module';
import { GeneralModule } from 'src/components/general/general.module';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { DirectivesModule } from 'src/directives/directives.module';
import { ModalModule } from 'src/modules/modal';
import { AppComponent } from './app.component';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    ModalModule,
    MatIconModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    FontAwesomeModule,
    ElementsModule,
    PropertiesComponentModule,
    ReactiveFormsModule,
    GeneralModule,
    DirectivesModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: window.location.pathname || '/'
    }
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const eassessmentContentEditor = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('eassessment-content-editor')) {
      customElements.define('eassessment-content-editor', eassessmentContentEditor);
    }
  }
}
