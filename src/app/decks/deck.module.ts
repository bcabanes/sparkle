import { NgModule } from '@angular/core';
import { DeckService } from './deck.service';
import { deckReducer } from './ngrx/deck.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DeckEffects } from './ngrx/deck.effect';

@NgModule({
  imports: [
    StoreModule.forFeature('deck', deckReducer),
    EffectsModule.forFeature([DeckEffects])
  ],
  providers: [
    DeckService
  ]
})
export class DeckModule {
}
