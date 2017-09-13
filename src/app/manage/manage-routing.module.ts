import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { CardDetailsComponent, CardEditComponent } from './components/cards';
import { DeckDetailsComponent, DeckEditComponent } from './components/decks';

const routes: Routes = [
  {
    path     : 'decks/new',
    component: DeckEditComponent
  },
  {
    path     : 'decks/:deckUid/edit',
    component: DeckEditComponent
  },
  {
    path     : 'decks/:deckUid',
    component: DeckDetailsComponent
  },
  {
    path     : 'cards/new',
    component: CardEditComponent
  },
  {
    path     : 'cards/:cardUid/edit',
    component: CardEditComponent
  },
  {
    path     : 'cards/:cardUid',
    component: CardDetailsComponent
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ManageRoutingModule {
}
