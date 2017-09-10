import { NgModule } from '@angular/core';
// app
import { SharedModule } from '../shared/shared.module';
import { CardModule } from '../cards/card.module';
import { DeckModule } from '../decks/deck.module';
import { ManageRoutingModule } from './manage-routing.module';
import { MANAGE_COMPONENTS } from './components/index';

@NgModule({
  declarations: [
    ...MANAGE_COMPONENTS
  ],
  imports: [
    CardModule,
    DeckModule,
    SharedModule,
    ManageRoutingModule
  ]
})
export class ManageModule {

}
