import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// app
import { CardService } from './card.service';
import { cardReducer } from './ngrx/card.reducer';
import { CardEffects } from './ngrx/card.effect';

@NgModule({
  imports  : [
    StoreModule.forFeature('card', cardReducer),
    EffectsModule.forFeature([ CardEffects ])
  ],
  providers: [
    CardService
  ]
})
export class CardModule {
}
