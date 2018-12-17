import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultUrlSerializer, RouteReuseStrategy, UrlSerializer, UrlTree } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import '@progress/kendo-ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataService } from 'src/services/data.service';
import { ElementsService } from 'src/services/elements.service';
import { EventsService } from 'src/services/event.service';
import { HelperService } from 'src/services/helper.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}


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
    HelperService,
    DataService,
    ElementsService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
