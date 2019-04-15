import { DragDropModule } from '@angular/cdk/drag-drop';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { APP_INITIALIZER, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'ngx-dropdown';
import { ElementsModule } from 'src/components/elements/elements.module';
import { ImageElementConfig } from 'src/components/elements/image/image.config';
import { GeneralModule } from 'src/components/general/general.module';
import { PropertiesComponentModule } from 'src/components/properties/properties.module';
import { DirectivesModule } from 'src/directives/directives.module';
import { ModalModule } from 'src/modules/modal';
import { LoaderService } from 'src/services/loader.service';
import { AppComponent } from './app.component';

export function staticProviderFactory(provider: LoaderService) {
  return () => provider.getLocationUrl();
}

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
    },
    { provide: APP_INITIALIZER, useFactory: staticProviderFactory, deps: [LoaderService], multi: true }
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const config = ImageElementConfig.config;
    const imageProperty = config.properties.find((property) => property.name == 'image')
    imageProperty.src = imageProperty.src.replace('undefined', LoaderService.locationUrl);

    const eassessmentContentEditor = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('eassessment-content-editor')) {
      customElements.define('eassessment-content-editor', eassessmentContentEditor);
    }
  }
}
