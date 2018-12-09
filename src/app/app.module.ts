import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import '@progress/kendo-ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataService } from 'src/services/data.service';
import { HelperService } from 'src/services/helper.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsService } from 'src/services/elements.service';

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
    HelperService,
    DataService,
    ElementsService,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
