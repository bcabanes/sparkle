import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LAYOUTS_COMPONENTS } from './layouts/index';

import { environment } from '../environments/environment'; // Only dev for now.

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ...LAYOUTS_COMPONENTS
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule, // For Material animations.

    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    SharedModule
  ],
  providers   : [],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
