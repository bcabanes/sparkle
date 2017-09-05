import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DeckEffects } from './ngrx/deck.effect';
// app
import { SharedModule } from '../shared/shared.module';
import { DeckService } from './deck.service';
import { deckReducer } from './ngrx/deck.reducer';
import { DECKS_COMPONENTS } from './components/index';
import { DeckResolver } from './deck.resolver';

@NgModule({
  declarations: [
    ...DECKS_COMPONENTS
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('deck', deckReducer),
    EffectsModule.forFeature([DeckEffects])
  ],
  providers: [
    DeckResolver,
    DeckService
  ],
  exports: [
    ...DECKS_COMPONENTS
  ]
})
export class DeckModule {
}
