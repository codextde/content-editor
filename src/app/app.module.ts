import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { ModalModule } from 'src/modules/modal';
import { DropdownModule } from 'ngx-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ElementsModule } from 'src/components/elements/elements.module';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { GeneralModule } from 'src/components/general/general.module';
import { DirectivesModule } from 'src/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    ModalModule,
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
    IonicModule.forRoot(),
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
  constructor(private injector: Injector) {
    
  }
  ngDoBootstrap() {
    const eassessmentContentEditor = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('eassessment-content-editor', eassessmentContentEditor);
  }
}
