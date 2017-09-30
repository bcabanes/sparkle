import { NgModule } from '@angular/core';
// app
import { ViewerComponent } from './viewer.component';
import { ViewerRoutingModule } from './viewer-routing.module';
import { DeckModule } from '../decks/deck.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  imports     : [
    ViewerRoutingModule,
    DeckModule,
    SharedModule
  ],
  exports     : []
})
export class ViewerModule {
}
