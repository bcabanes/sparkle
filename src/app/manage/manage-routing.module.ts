import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { DeckFormComponent } from '../decks/components/deck-form.component';
import { DeckDetailsComponent } from './components/decks';

const routes: Routes = [
  {
    path: 'decks/:deckUid',
    component: DeckDetailsComponent
  },
  { // TODO: => DeckUpdateComponent
    path: 'decks/:deckUid/update',
    component: DeckFormComponent
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
