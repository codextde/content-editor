import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: window.location.pathname + 'assets',
  defaultOptions: { scrollBeyondLastLine: false }
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: window.location.pathname || '/'
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
