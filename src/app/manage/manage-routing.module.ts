import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
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
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ManageRoutingModule {
}
