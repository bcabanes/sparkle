import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngrx/app.reducer';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CustomRouterStateSerializer } from './shared/helpers/custom-router-state-serializer';

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

    /**
     * NGRX modules
     */
    StoreModule.forRoot(appReducer),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),

    /**
     * App Modules
     */
    SharedModule
  ],
  providers   : [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
