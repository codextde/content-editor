import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot(),
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: window.location.pathname || '/',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
