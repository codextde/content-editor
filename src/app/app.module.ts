import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import '@progress/kendo-ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataService } from 'src/services/data.service';
import { ElementsService } from 'src/services/elements.service';
import { EventsService } from 'src/services/event.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    EventsService,
    DataService,
    ElementsService,
    {
      provide: APP_BASE_HREF,
      useValue: window['_app_base'] || '/'
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
