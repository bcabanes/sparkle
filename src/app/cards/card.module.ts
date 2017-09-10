import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// app
import { SharedModule } from '../shared/shared.module';
import { CardService } from './card.service';
import { cardReducer } from './ngrx/card.reducer';
import { CardEffects } from './ngrx/card.effect';
import { CARDS_COMPONENTS } from './components/index';

@NgModule({
  declarations: [
    ...CARDS_COMPONENTS
  ],
  imports  : [
    SharedModule,
    StoreModule.forFeature('card', cardReducer),
    EffectsModule.forFeature([ CardEffects ])
  ],
  providers: [
    CardService
  ],
  exports: [
    ...CARDS_COMPONENTS
  ]
})
export class CardModule {
}
